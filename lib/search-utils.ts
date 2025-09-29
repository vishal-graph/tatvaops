import { serviceCategories } from "./service-data";

export type FlatItem = { label: string; category: string; emoji: string; tokens: string[] };
export type Vendor = { name: string; categories: string[]; rating: number; city?: string; image?: string };

export const AI_CONFIG = {
  enabled: true,
  endpoint: "https://api.longcat.chat/openai/v1/chat/completions",
  apiKey: "ak_1N40y00IF1aB0uI01H7Ab71U9a59W"
};

export const flatItems: FlatItem[] = [];
serviceCategories.forEach(cat => {
  cat.items.forEach(label => flatItems.push({ label, category: cat.name, emoji: cat.emoji, tokens: tokenize(label) }));
});

export const vendors: Vendor[] = [
  { name: 'UrbanCraft Interiors', categories: ['Interior Design & Renovation','Home Improvement & Decor'], rating: 4.8, city:'Mumbai', image:'/placeholder.jpg' },
  { name: 'Prime Paint Co.', categories: ['Home Improvement & Decor'], rating: 4.7, city:'Pune', image:'/professional-painter-working-on-wall-renovation.jpg' },
  { name: 'BlueDrop Plumbing', categories: ['Home Maintenance & Repairs'], rating: 4.6, city:'Mumbai', image:'/placeholder.jpg' },
  { name: 'SparkRight Electric', categories: ['Home Maintenance & Repairs'], rating: 4.5, city:'Navi Mumbai', image:'/placeholder.jpg' },
  { name: 'CleanNest Services', categories: ['Cleaning & Pest Control'], rating: 4.6, city:'Thane', image:'/placeholder.jpg' },
];

export const synonyms: Record<string, string[]> = {
  electrician:["electrical","wiring","fan","switch","light","fixture"],
  plumber:["plumbing","leak","pipe","tap","faucet","drain"],
  carpenter:["wood","furniture","cabinet","door","wardrobe","assembly"],
  ac:["air conditioner","hvac","cooling"],
  fridge:["refrigerator","freezer","cooling"],
  geyser:["water heater"],
  cleaning:["housekeeping","deep clean","shampoo","sofa","kitchen","bathroom"],
  pest:["cockroach","termite","bed bug","mosquito","rodent","ants"],
  paint:["painting","waterproof","wall","decor"],
  purifier:["ro","water purifier","filter","cartridge","softener"],
  move:["relocation","shifting","packers","movers","storage"],
  interior:["interior design","false ceiling","wallpaper","space planning","modular kitchen","wardrobe","renovation"]
};

export const aliases: Record<string, string[]> = {
  int:["interior","interior design"], ren:["renovation","home renovation"], kit:["kitchen","modular kitchen"],
  war:["wardrobe"], pai:["paint","painting"], cle:["cleaning","deep clean"], pes:["pest","pest control"],
  plu:["plumber","plumbing"], ele:["electrician","electrical"], car:["carpenter","carpentry"],
  gey:["geyser","water heater"], ref:["refrigerator","fridge"], sof:["sofa","upholstery"],
  shi:["shifting","relocation","packers"], mov:["moving","relocation"]
};

export function tokenize(str: string): string[] {
  return str.toLowerCase().replace(/&/g,' ').replace(/\//g,' ').replace(/[^a-z0-9\s]/g,'').split(/\s+/).filter(Boolean);
}

export function expandQueryTokens(q: string): string[] {
  const base = tokenize(q);
  const expanded = new Set(base);
  base.forEach(t => {
    if(t.length>=3 && aliases[t]) aliases[t].forEach(a=>expanded.add(a));
    Object.keys(synonyms).forEach(key => {
      if(t.includes(key) || key.includes(t)) synonyms[key].forEach(s=>expanded.add(s));
    });
  });
  base.filter(t=>t.length>=3).forEach(t => {
    flatItems.forEach(it => it.tokens.forEach(tok => { if(tok.startsWith(t)) expanded.add(tok); }));
  });
  return Array.from(expanded);
}

export function scoreItem(item: FlatItem, qTokens: string[]): number {
  let score = 0;
  qTokens.forEach(q => {
    item.tokens.forEach((t, idx) => {
      if(t === q) score += 6;
      else if(t.startsWith(q)) score += (q.length>=3 ? 6 : 4);
      else if(t.includes(q)) score += 1;
      if(t.includes(q)) score += Math.max(0, 2 - idx*0.5);
    });
    if(q.length>=3 && item.category.toLowerCase().includes(q)) score += 1.5;
  });
  score += Math.min(3, 8 - Math.min(8, item.tokens.length));
  return score;
}

export function groupResults(items: (FlatItem & {score:number})[]) {
  const map = new Map<string, { meta: FlatItem, items: (FlatItem & {score:number})[] }>();
  items.forEach(it => {
    const k = it.category;
    if(!map.has(k)) map.set(k, { meta: it, items: [] });
    map.get(k)!.items.push(it);
  });
  return Array.from(map.values());
}

export function scoreVendor(v: Vendor, qTokens: string[]): number {
  let s = 0;
  const tokens = tokenize(v.name).concat(...v.categories.map(tokenize).flat());
  qTokens.forEach(q => {
    tokens.forEach(t => {
      if(t===q) s+=6; else if(t.startsWith(q)) s += (q.length>=3?6:4); else if(t.includes(q)) s+=1;
    });
  });
  s += Math.min(3, Math.round(v.rating-4)*2);
  return s;
}

export function highlight(text: string, qTokens: string[]): string {
  let out = text;
  const uniq = Array.from(new Set(qTokens.filter(t=>t.length>1))).sort((a,b)=>b.length-a.length);
  uniq.forEach(q => {
    const re = new RegExp(`(${escapeRegExp(q)})`,'ig');
    out = out.replace(re,'<mark>$1</mark>');
  });
  return out;
}

export function escapeRegExp(s: string){ return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

export function suggestCorrection(q: string){
  const tokens = tokenize(q).filter(t=>t.length>=3);
  if(!tokens.length) return null as null | { corrected: string; token: string; replacement: string };
  const vocab = Array.from(new Set(flatItems.flatMap(it=>it.tokens)));
  let best: string | null = null; let bestScore = Infinity; let tok = tokens[0];
  tokens.forEach(t => { vocab.forEach(v => {
    const dist = editDistance(t, v); const norm = dist / Math.max(t.length, v.length);
    if(norm < bestScore){ bestScore = norm; best = v; tok = t; }
  });});
  if(best && bestScore <= 0.5){ return { corrected: q.replace(tokens[0], best), token: tok, replacement: best }; }
  return null;
}

export function editDistance(a: string, b: string){
  if(a===b) return 0; if(!a.length) return b.length; if(!b.length) return a.length;
  const da: Record<string, number> = {}; const INF = a.length + b.length;
  const d = Array(a.length + 2).fill(0).map(()=>Array(b.length + 2).fill(0)); d[0][0] = INF;
  for(let i=0;i<=a.length;i++){ d[i+1][1] = i; d[i+1][0] = INF; }
  for(let j=0;j<=b.length;j++){ d[1][j+1] = j; d[0][j+1] = INF; }
  for(let i=1;i<=a.length;i++){ let db = 0; for(let j=1;j<=b.length;j++){
    const i1 = da[b[j-1]] || 0; const j1 = db; let cost = 1; if(a[i-1] === b[j-1]){ cost = 0; db = j; }
    d[i+1][j+1] = Math.min(
      d[i][j] + cost,
      d[i+1][j] + 1,
      d[i][j+1] + 1,
      d[i1][j1] + (i - i1 - 1) + 1 + (j - j1 - 1)
    );
  } da[a[i-1]] = i; }
  return d[a.length+1][b.length+1];
}

export async function aiRerank(query: string, matches: (FlatItem & {score:number})[]){
  if(!AI_CONFIG.enabled || !AI_CONFIG.apiKey) return matches;
  try{
    const items = matches.map((m, idx)=>({ index: idx, label: m.label, category: m.category, baseScore: m.score }));
    const body = {
      model: 'LongCat-Flash-Chat',
      messages: [
        { role: 'system', content: 'You are a precise, concise JSON-only re-ranking engine.' },
        { role: 'user', content: `User query: "${query}"\nItems: ${JSON.stringify(items)}\nReturn ONLY JSON {"ranking":[indices],"keep":[indices]}` }
      ],
      stream: false, max_tokens: 200, temperature: 0.0
    };
    const res = await fetch(AI_CONFIG.endpoint, { method:'POST', headers:{ 'Content-Type':'application/json', 'Authorization':`Bearer ${AI_CONFIG.apiKey}` }, body: JSON.stringify(body) });
    if(!res.ok) return matches; const data = await res.json();
    const content = data?.choices?.[0]?.message?.content; if(!content) return matches;
    let parsed; try{ parsed = JSON.parse(content); } catch{ const m = String(content).match(/\{[\s\S]*\}/); if(m){ try{ parsed = JSON.parse(m[0]); } catch{ return matches; } } else { return matches; } }
    if(parsed && Array.isArray(parsed.ranking)){
      const reordered: (FlatItem & {score:number})[] = [];
      parsed.ranking.forEach((i:number)=>{ if(matches[i]) reordered.push(matches[i]); });
      matches.forEach((m)=>{ if(!reordered.includes(m)) reordered.push(m); });
      if(Array.isArray(parsed.keep)) reordered.forEach((m, idx)=>{ if(!parsed.keep.includes(idx)) m.score = Math.min(m.score, 0.1); });
      return reordered;
    }
    return matches;
  }catch{ return matches; }
}


