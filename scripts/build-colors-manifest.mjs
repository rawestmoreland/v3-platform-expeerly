import fs from "node:fs";

function cssVarToId(cssVar) {
  return cssVar
    .replace(/^--color-/, "")
    .replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

const src = fs.readFileSync("lib/semantic-color-tokens.ts", "utf8");
const tableStart = src.indexOf("export const SEMANTIC_COLOR_TABLE");
const tableSrc = src.slice(tableStart);

const sections = [];
const sectionRe = /category: "([^"]+)"[\s\S]*?rows: \[([\s\S]*?)\n    \],/g;
let match = sectionRe.exec(tableSrc);
while (match) {
  const category = match[1];
  const rowsBlock = match[2];
  const rows = [];
  const rowRe =
    /token: "([^"]+)"[\s\S]*?legacyName: "([^"]*)"[\s\S]*?hex: "([^"]+)"[\s\S]*?usage: "((?:\\.|[^"\\])*)"[\s\S]*?swatchClass: "([^"]+)"/g;
  let rowMatch = rowRe.exec(rowsBlock);
  while (rowMatch) {
    const token = rowMatch[1];
    rows.push({
      id: cssVarToId(token),
      token,
      legacyName: rowMatch[2],
      hex: rowMatch[3],
      usage: rowMatch[4].replace(/\\"/g, '"'),
      swatchClass: rowMatch[5],
    });
    rowMatch = rowRe.exec(rowsBlock);
  }
  sections.push({ category, rows });
  match = sectionRe.exec(tableSrc);
}

const manifestRows = sections.map((section) => ({
  category: section.category,
  rows: section.rows.map(({ id, token, legacyName, hex, swatchClass }) => ({
    id,
    token,
    legacyName,
    hex,
    swatchClass,
  })),
}));

const localeColors = {};
for (const section of sections) {
  for (const row of section.rows) {
    localeColors[row.id] = { usage: row.usage };
  }
}

const manifestTs = `/** Hex values must match tokens/colors.css — run npm run tokens:check */
export type SemanticColorManifestRow = {
  id: string;
  token: string;
  legacyName: string;
  hex: string;
  swatchClass: string;
};

export type SemanticColorManifestSection = {
  category: string;
  rows: SemanticColorManifestRow[];
};

export const SEMANTIC_COLOR_MANIFEST: SemanticColorManifestSection[] = ${JSON.stringify(manifestRows, null, 2)};
`;

fs.writeFileSync("tokens/colors.manifest.ts", manifestTs);

const bdnLocalePath = "locales/bdn/en.json";
const bdnLocale = JSON.parse(fs.readFileSync(bdnLocalePath, "utf8"));
bdnLocale.designsystem.tokens = {
  colors: localeColors,
};
fs.writeFileSync(bdnLocalePath, `${JSON.stringify(bdnLocale, null, 2)}\n`);

console.log(
  `Wrote tokens/colors.manifest.ts (${manifestRows.length} sections, ${manifestRows.reduce((n, s) => n + s.rows.length, 0)} rows)`,
);
