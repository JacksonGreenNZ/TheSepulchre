#!/usr/bin/env python3
"""Validate every submission's meta.yaml against repo rules.

Runs in CI on each pull request. Emits GitHub workflow annotations
(::error:: / ::warning::) and exits non-zero if any errors are found,
which blocks the merge.

Checks (errors, block merge):
  - meta.yaml is valid YAML and a mapping
  - required fields present and non-empty
  - license is exactly the allowed value
  - id is unique across the whole repo
  - every replaces/requires entry exists in domains.yml
  - every file listed under `files` exists in the set folder
  - the set folder contains a README.md

Soft warnings (do not block):
  - a set tagged as adding units or wargear — reviewer should check for
    same-named collisions with existing content (names live in the PDF and
    cannot be auto-checked)
"""

import os
import sys
import glob

try:
    import yaml
except ImportError:
    print("::error::PyYAML is not installed; the workflow must run `pip install pyyaml`")
    sys.exit(1)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REQUIRED_FIELDS = ["id", "title", "author", "version", "license", "files"]
ALLOWED_LICENSE = "GPL-3.0-only"
SOFT_WARN_TAGS = {"units", "wargear"}

errors = []
warnings = []


def skip(rel_path):
    """Ignore templates and anything under an underscore-prefixed top-level folder."""
    parts = rel_path.split(os.sep)
    return parts[0].startswith("_") or "_template" in parts


# --- load domains ---------------------------------------------------------
domains = set()
domains_path = os.path.join(ROOT, "domains.yml")
if not os.path.exists(domains_path):
    errors.append("domains.yml not found at repo root")
else:
    with open(domains_path, encoding="utf-8") as f:
        try:
            data = yaml.safe_load(f) or {}
            for entry in data.get("domains", []):
                domains.add(entry["id"])
        except Exception as exc:  # noqa: BLE001
            errors.append(f"domains.yml failed to parse: {exc}")

# --- find submissions -----------------------------------------------------
meta_files = []
for path in glob.glob(os.path.join(ROOT, "**", "meta.yaml"), recursive=True):
    rel = os.path.relpath(path, ROOT)
    if skip(rel):
        continue
    meta_files.append(path)

seen_ids = {}

for path in meta_files:
    rel = os.path.relpath(path, ROOT)
    folder = os.path.dirname(path)

    with open(path, encoding="utf-8") as f:
        try:
            meta = yaml.safe_load(f)
        except Exception as exc:  # noqa: BLE001
            errors.append(f"{rel}: not valid YAML ({exc})")
            continue

    if not isinstance(meta, dict):
        errors.append(f"{rel}: metadata is not a mapping")
        continue

    for field in REQUIRED_FIELDS:
        if field not in meta or meta[field] in (None, "", []):
            errors.append(f"{rel}: missing required field '{field}'")

    if meta.get("license") != ALLOWED_LICENSE:
        errors.append(
            f"{rel}: license must be '{ALLOWED_LICENSE}' (got '{meta.get('license')}')"
        )

    cid = meta.get("id")
    if cid:
        if cid in seen_ids:
            errors.append(f"{rel}: duplicate id '{cid}' (also in {seen_ids[cid]})")
        else:
            seen_ids[cid] = rel

    for key in ("replaces", "requires"):
        vals = meta.get(key) or []
        if not isinstance(vals, list):
            errors.append(f"{rel}: '{key}' must be a list")
            continue
        for v in vals:
            if v not in domains:
                errors.append(
                    f"{rel}: '{key}' entry '{v}' is not a domain in domains.yml"
                )

    files = meta.get("files") or []
    if isinstance(files, list):
        for fn in files:
            if not os.path.exists(os.path.join(folder, fn)):
                errors.append(f"{rel}: listed file '{fn}' not found in folder")
    else:
        errors.append(f"{rel}: 'files' must be a list")

    if not os.path.exists(os.path.join(folder, "README.md")):
        errors.append(f"{rel}: folder has no README.md")

    hit = set(meta.get("descriptive_tags") or []) & SOFT_WARN_TAGS
    if hit:
        warnings.append(
            f"{rel}: adds {', '.join(sorted(hit))} — check for name collisions "
            f"with existing content (not auto-checked)"
        )

# --- report ---------------------------------------------------------------
for w in warnings:
    print(f"::warning::{w}")
for e in errors:
    print(f"::error::{e}")

print(
    f"\nChecked {len(meta_files)} set(s): "
    f"{len(errors)} error(s), {len(warnings)} warning(s)."
)

sys.exit(1 if errors else 0)
