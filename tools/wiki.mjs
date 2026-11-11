// LLM Wiki 工具：lint + 產生 graph + 把 wiki 抽成簡報資料。
// 用法：node tools/wiki.mjs        （有錯誤時 exit code = 1）
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, '$1')), '..');
const WIKI = path.join(ROOT, 'wiki');
const RAW = path.join(ROOT, 'raw');

// 官方名稱（S1 PDF 目錄頁）。lint 用它檢查 wiki 與簡報有沒有寫錯名字。
const OFFICIAL = {
  ASI01: 'Agent Goal Hijack',
  ASI02: 'Tool Misuse and Exploitation',
  ASI03: 'Identity and Privilege Abuse',
  ASI04: 'Agentic Supply Chain Vulnerabilities',
  ASI05: 'Unexpected Code Execution (RCE)',
  ASI06: 'Memory & Context Poisoning',
  ASI07: 'Insecure Inter-Agent Communication',
  ASI08: 'Cascading Failures',
  ASI09: 'Human-Agent Trust Exploitation',
  ASI10: 'Rogue Agents',
};

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
  d.isDirectory() ? walk(path.join(dir, d.name)) : d.name.endsWith('.md') ? [path.join(dir, d.name)] : []);

function parse(file) {
  const text = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const fm = {};
  const m = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (m) for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].startsWith('[') ? kv[2].slice(1, -1).split(',').map((s) => s.trim()).filter(Boolean) : kv[2];
  }
  const body = m ? text.slice(m[0].length) : text;
  const links = [...body.matchAll(/\[\[([^\]|#]+)/g)].map((x) => x[1].trim());
  return { id: path.basename(file, '.md'), file: path.relative(ROOT, file).replace(/\\/g, '/'), fm, body, links };
}

const section = (body, heading) => {
  const m = body.match(new RegExp(`## ${heading}[^\\n]*\\n([\\s\\S]*?)(?=\\n## |$)`));
  return m ? m[1].trim() : '';
};
const bullets = (s) => s.split('\n').filter((l) => /^\s*(\d+\.|-)\s/.test(l)).map((l) => l.replace(/^\s*(\d+\.|-)\s+/, ''));
const plain = (s) => s.replace(/\[\[([^\]]+)\]\]/g, '$1').replace(/\*\*/g, '').replace(/\s*\((S\d(, ?S\d)*|S\d Appendix A)\)/g, '').trim();
const field = (body, label) => (body.match(new RegExp(`\\*\\*${label}\\*\\*：(.+)`)) || [])[1];

const pages = walk(WIKI).map(parse);
const ids = new Set(pages.map((p) => p.id));
const rawIds = new Set(walk(RAW).map((f) => path.basename(f).split('-')[0]));
const errors = [];
const err = (p, msg) => errors.push(`${p}: ${msg}`);

// ---- Lint 1–4：連結、孤兒、來源 ----
const inbound = Object.fromEntries(pages.map((p) => [p.id, 0]));
for (const p of pages) {
  for (const l of p.links) ids.has(l) ? inbound[l]++ : err(p.file, `斷掉的 wikilink [[${l}]]`);
  if (['concept', 'risk'].includes(p.fm.type) && !(p.fm.sources || []).length) err(p.file, '缺少 sources');
  for (const s of p.fm.sources || []) if (!rawIds.has(s)) err(p.file, `sources 指向不存在的來源 ${s}`);
}
for (const p of pages) if (p.id !== 'index' && inbound[p.id] === 0) err(p.file, '孤兒頁（沒有任何頁連到它）');

// ---- Lint 5：風險頁 → 簡報資料（抽不到就是錯） ----
const risks = pages.filter((p) => p.fm.type === 'risk').sort((a, b) => a.fm.asi.localeCompare(b.fm.asi)).map((p) => {
  const r = {
    id: p.fm.asi, page: p.id, name: p.fm.official_name,
    zh: (p.fm.title.match(/（(.+)）/) || [])[1],
    oneLiner: plain(field(p.body, '新手一句話') || ''),
    analogy: plain(field(p.body, '生活比喻') || ''),
    scenario: plain(bullets(section(p.body, '官方情境'))[0] || ''),
    defenses: bullets(section(p.body, '怎麼防')).slice(0, 3).map(plain),
    mapping: plain(section(p.body, '對照').replace(/^- /, '')),
    sources: p.fm.sources,
  };
  if (OFFICIAL[r.id] !== r.name) err(p.file, `官方名稱不符：「${r.name}」應為「${OFFICIAL[r.id]}」`);
  for (const k of ['zh', 'oneLiner', 'analogy', 'scenario', 'mapping']) if (!r[k]) err(p.file, `抽不到「${k}」段落`);
  if (r.defenses.length < 3) err(p.file, '「怎麼防」少於 3 點');
  return r;
});
for (const id of Object.keys(OFFICIAL)) if (!risks.some((r) => r.id === id)) err('wiki/risks', `缺少 ${id} 頁`);

// ---- Lint 6：簡報引用檢查 ----
const htmlFile = path.join(ROOT, 'index.html');
if (fs.existsSync(htmlFile)) {
  const html = fs.readFileSync(htmlFile, 'utf8');
  const refs = [...html.matchAll(/data-wiki="([^"]+)"/g)].flatMap((m) => m[1].split(/\s+/));
  for (const r of refs) if (!ids.has(r)) err('index.html', `data-wiki 指向不存在的頁 ${r}`);
  const slides = (html.match(/<section class="slide/g) || []).length;
  const cited = (html.match(/<section class="slide[^>]*data-wiki=/g) || []).length;
  if (cited < slides) err('index.html', `${slides - cited} 張投影片沒有標 data-wiki 來源`);
  for (const [id, name] of Object.entries(OFFICIAL)) {
    const wrong = [...html.matchAll(new RegExp(`${id}[^<\\n]{0,4}(?:</b>|:)?\\s*([A-Z][A-Za-z&()\\- ]{3,})`, 'g'))]
      .map((m) => m[1].trim()).filter((n) => !name.startsWith(n) && !n.startsWith(name));
    for (const w of wrong) err('index.html', `${id} 寫成「${w}」，官方為「${name}」`);
  }
}

// ---- 輸出 graph ----
const nodes = [
  ...pages.map((p) => ({ id: p.id, label: p.fm.asi || p.fm.title.replace(/（.*|\(.*|—.*/g, '').trim(), title: p.fm.title, group: p.fm.type, file: p.file })),
  ...[...rawIds].sort().map((s) => ({ id: s, label: s, title: `來源 ${s}`, group: 'source', file: `raw/${fs.readdirSync(RAW).find((f) => f.startsWith(s + '-'))}` })),
];
const seen = new Set();
const links = [];
for (const p of pages) {
  for (const l of p.links) {
    const k = [p.id, l].sort().join('|');
    if (ids.has(l) && l !== p.id && !seen.has(k)) { seen.add(k); links.push({ source: p.id, target: l, kind: 'link' }); }
  }
  for (const s of p.fm.sources || []) if (rawIds.has(s)) links.push({ source: p.id, target: s, kind: 'cites' });
}
console.log(`pages=${pages.length} sources=${rawIds.size} nodes=${nodes.length} links=${links.length} risks=${risks.length}`);
// 有錯就不寫檔：簡報永遠只吃到通過 lint 的 Wiki
if (errors.length) { console.error(`\n✗ ${errors.length} 個問題（graph/ 未更新）：\n- ` + errors.join('\n- ')); process.exit(1); }

const graph = { generated: new Date().toISOString(), nodes, links, risks };
fs.mkdirSync(path.join(ROOT, 'graph'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'graph', 'graph.json'), JSON.stringify(graph, null, 2));
fs.writeFileSync(path.join(ROOT, 'graph', 'wiki-data.js'), `// 由 tools/wiki.mjs 自動產生，請勿手改\nwindow.WIKI = ${JSON.stringify(graph)};\n`);
console.log('✓ lint 全部通過，已更新 graph/graph.json、graph/wiki-data.js');
