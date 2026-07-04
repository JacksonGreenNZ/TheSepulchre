# The Sepulchre
Repository for community-made mission packs, detachments, units, and other material for the Horus Heresy Third Edition game. 

Unofficial fan project. Not affiliated with, endorsed by, or associated with Games Workshop. Warhammer, The Horus Heresy, and all related names, marks, and settings are the property of Games Workshop Limited. This project hosts only original work by its contributors and does not reproduce Games Workshop's published rules, profiles, or lore.

## Structure

Top-level folders group content by category. Each rule set is a folder inside one of them, containing three things: a metadata file, a description, and the rules themselves. Example:

```
/mission-packs/
  /Istvaan-3-Jimmy-Space/
    meta.yaml       # metadata: author, tags, compatibility
    README.md       # human-readable description of the content
    missionpack.pdf # the pack (PDF and/or images)
/detachments/
/restored-content/
  /Rites-Of-War-Restored-Reginal-Speeder
    meta.yaml       # metadata: author, tags, compatibility
    README.md       # human-readable description of the content
    rules.pdf       # the rules (PDF and/or images)
/units/
domains.yml
.github/
```

Rules text and images live in the PDF (or image files), never in the YAML or Markdown. The YAML is metadata only. The per-set README describes what the set contains and restates the metadata in plain language.

## Metadata file (meta.yaml)

```yaml
id: istvaan-3-jimmy-space
title: "Istvaan III Mission Pack"
author: Jimmy Space
version: 1.0.0
license: GPL-3.0-only                 # optional
replaces: []                          # subsystems this set overrides
requires: []                          # subsystems this set depends on
descriptive_tags: [narrative, siege, drop-assault]
files:
  - missionpack.pdf
```

## Per-set README

Every set folder has its own README describing the content in prose: what it adds or changes, roughly how much (number of missions, detachments, units), intended points range or play style, and the compatibility tags restated plainly. This is what a reader sees when they open the folder.

## How compatibility works

Compatibility is derived from the tags in `meta.yaml`.

Descriptive tags (`narrative`, `siege`, faction flavour) are for filtering and discovery only. Sharing one never implies a conflict.

`replaces` names a subsystem the set overrides, drawn from the fixed list in `domains.yml` — for example `"restored content: rites of war"`, `"terrain rules"`, `"reactions"`. This is done so that it is clear where two systems conflict. A set may replace more than one.

`requires` names a subsystem the set needs in play, satisfied by whichever set supplies it or by rules from a printed book.

The subsystem list in `domains.yml` is fixed and maintained by the repo owner. Proposing a new subsystem is a separate pull request editing `domains.yml`.

## Contributing

Submissions are pull requests. To add a set:

1. Create a folder under the correct category, named descriptively (`Title-Author-Name`).
2. Add `meta.yaml` with a unique `id`, `version`, `author`, `license`, and tags drawn from `domains.yml`.
3. Add a `README.md` describing the content.
4. Add the content and list under `files` in the metadata.
5. Open a pull request.

By opening a pull request you affirm the work is your own or that you have the right to submit it, and that you release it under the licence below.

## Licensing

All content is released under the GNU General Public License v3 (GPL-3.0). Anyone may use, adapt, and redistribute it; derivative works must remain under the same licence and credit the original author.

Do not submit other people's content without their permission. Public availability is not permission to redistribute; unlicensed rules default to all rights reserved. Get the author's agreement to release under GPL-3.0 first, or link to where they published rather than copying it here.

The licence covers contributors' own work only. It grants no rights to Games Workshop's intellectual property.
