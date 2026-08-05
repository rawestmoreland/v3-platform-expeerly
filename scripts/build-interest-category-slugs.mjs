/**
 * Build lib/data/interest-category-slugs.json from lib/data/interest-categories.csv
 * (English fixture slug → per-locale URL segments for player routes).
 *
 * Usage: node scripts/build-interest-category-slugs.mjs
 */
import fs from "node:fs";
import path from "node:path";

const CSV_PATH = path.join("lib/data/interest-categories.csv");
const OUT_PATH = path.join("lib/data/interest-category-slugs.json");

function parseCsvRecords(text) {
  const records = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"';
        i += 1;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n" || (char === "\r" && next === "\n")) {
      row.push(field);
      field = "";
      if (row.some((cell) => cell.length > 0)) records.push(row);
      row = [];
      if (char === "\r") i += 1;
    } else if (char !== "\r") {
      field += char;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    records.push(row);
  }

  return records;
}

function main() {
  const raw = fs.readFileSync(CSV_PATH, "utf8");
  const table = parseCsvRecords(raw);
  if (table.length < 2) {
    throw new Error("interest-categories.csv has no data rows");
  }

  const headers = table[0];
  const slugMap = {};

  for (const values of table.slice(1)) {
    const row = {};
    headers.forEach((header, index) => {
      row[header] = (values[index] ?? "").trim();
    });

    const slugEn = row["URL category slug EN"] ?? "";
    if (!slugEn || /^\d+$/.test(slugEn)) continue;

    slugMap[slugEn] = {
      en: slugEn,
      de: row["URL category slug DE"] || slugEn,
      fr: row["URL category slug FR"] || slugEn,
      it: row["URL category slug IT"] || slugEn,
    };
  }

  fs.writeFileSync(OUT_PATH, `${JSON.stringify(slugMap, null, 2)}\n`);
  console.log(`Wrote ${Object.keys(slugMap).length} categories to ${OUT_PATH}`);
}

main();
