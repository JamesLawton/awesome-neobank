// Regenerates README.md from data.js. Run: node scripts/build-readme.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = readFileSync(join(root, "data.js"), "utf8");
const { CATEGORIES, PROVIDERS } = new Function(`${src}; return { CATEGORIES, PROVIDERS };`)();

const lines = [];
lines.push("# awesome-neobank");
lines.push("");
lines.push("A curated catalog of the tools and services used to build a neobank, from full-stack platforms to point solutions for every layer of the stack.");
lines.push("");
lines.push("**Browse with filters: [jameslawton.github.io/awesome-neobank](https://jameslawton.github.io/awesome-neobank/)**");
lines.push("");
lines.push(`${PROVIDERS.length} providers across ${CATEGORIES.length} categories. Seeded from [neobank.build](https://www.neobank.build/providers), expanded and re-categorized with independent research. Inclusion is not an endorsement; verify licensing and coverage yourself.`);
lines.push("");
lines.push("## Contents");
lines.push("");
for (const c of CATEGORIES) {
  lines.push(`- [${c.label}](#${c.label.toLowerCase().replace(/[&]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-")})`);
}
lines.push("");
for (const c of CATEGORIES) {
  const rows = PROVIDERS
    .filter(p => p.categories.includes(c.id))
    .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || a.name.localeCompare(b.name));
  lines.push(`## ${c.label}`);
  lines.push("");
  lines.push(`> ${c.blurb}`);
  lines.push("");
  for (const p of rows) {
    const docs = p.docs ? ` ([docs](${p.docs}))` : "";
    lines.push(`- [${p.name}](${p.url})${docs} - ${p.description}`);
  }
  lines.push("");
}
lines.push("## Contributing");
lines.push("");
lines.push("Add or fix a provider by editing [data.js](data.js) and opening a PR. The site and this README both render from that one file. Regenerate the README with `node scripts/build-readme.mjs`.");
lines.push("");
lines.push("## License");
lines.push("");
lines.push("[MIT](LICENSE)");
lines.push("");

writeFileSync(join(root, "README.md"), lines.join("\n"));
console.log(`README.md written: ${PROVIDERS.length} providers, ${CATEGORIES.length} categories`);
