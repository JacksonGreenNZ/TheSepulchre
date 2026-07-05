// Collect all repo content into a single JSON the Astro site consumes, and copy
// each set's files into site/public/pdfs so they're served statically.
// Run from anywhere: paths are resolved relative to this file (scripts/ -> repo root).

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";
import { marked } from "marked";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = path.join(ROOT, "site");
const DATA_DIR = path.join(SITE, "src", "data");
const PDF_DIR = path.join(SITE, "public", "pdfs");

// Category folders that hold sets (folder-per-set with meta.yaml).
const SET_CATEGORIES = [
  "mission-packs",
  "detachments",
  "restored-content",
  "units",
  "prime-advantages",
  "factions",
];

function readYaml(p) {
  return yaml.load(fs.readFileSync(p, "utf8")) || {};
}

function loadVocab(file, key) {
  const p = path.join(ROOT, file);
  if (!fs.existsSync(p)) return [];
  return (readYaml(p)[key] || []).map((e) => ({
    id: e.id,
    description: (e.description || "").trim(),
  }));
}

// --- sets -----------------------------------------------------------------
const sets = [];
for (const category of SET_CATEGORIES) {
  const catDir = path.join(ROOT, category);
  if (!fs.existsSync(catDir)) continue;
  for (const entry of fs.readdirSync(catDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const folder = path.join(catDir, entry.name);
    const metaPath = path.join(folder, "meta.yaml");
    if (!fs.existsSync(metaPath)) continue;

    const meta = readYaml(metaPath);
    const readmePath = path.join(folder, "README.md");
    const readmeHtml = fs.existsSync(readmePath)
      ? marked.parse(fs.readFileSync(readmePath, "utf8"))
      : "";

    // copy files into public/pdfs/<id>/
    const served = [];
    const destDir = path.join(PDF_DIR, meta.id);
    for (const fn of meta.files || []) {
      const src = path.join(folder, fn);
      if (fs.existsSync(src)) {
        fs.mkdirSync(destDir, { recursive: true });
        fs.copyFileSync(src, path.join(destDir, fn));
        served.push({ name: fn, url: `/pdfs/${meta.id}/${fn}` });
      }
    }

    sets.push({
      id: meta.id,
      title: meta.title,
      author: meta.author,
      version: meta.version,
      license: meta.license,
      category,
      replaces: meta.replaces || [],
      requires: meta.requires || [],
      tags: meta.descriptive_tags || [],
      files: served,
      readmeHtml,
    });
  }
}

// --- tweaks ---------------------------------------------------------------
let tweaks = [];
const tweaksPath = path.join(ROOT, "tweaks", "tweaks.yaml");
if (fs.existsSync(tweaksPath)) {
  tweaks = (readYaml(tweaksPath).tweaks || []).map((t) => ({
    id: t.id,
    title: t.title,
    author: t.author,
    version: t.version,
    text: (t.text || "").trim(),
    affects: t.affects || [],
    target: t.target || null,
    replaces: t.replaces || [],
    requires: t.requires || [],
    conflictsWith: t.conflicts_with || [],
  }));
}

// --- derived --------------------------------------------------------------
const factionSet = new Set();
for (const s of sets) for (const t of s.tags) factionSet.add(t);
// (faction slugs are a subset of tags; the site treats any tag as filterable)

const out = {
  generatedAt: new Date().toISOString(),
  sets,
  tweaks,
  domains: loadVocab("domains.yml", "domains"),
  targets: loadVocab("targets.yml", "targets"),
  categories: SET_CATEGORIES.filter((c) =>
    sets.some((s) => s.category === c)
  ),
  tags: [...factionSet].sort(),
};

fs.mkdirSync(DATA_DIR, { recursive: true });
fs.writeFileSync(
  path.join(DATA_DIR, "content.json"),
  JSON.stringify(out, null, 2)
);

console.log(
  `collected ${sets.length} set(s), ${tweaks.length} tweak(s), ` +
    `${out.domains.length} domain(s), ${out.targets.length} target(s)`
);
