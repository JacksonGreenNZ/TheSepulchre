# Factions

New playable factions and armies: xenos races (Orks, etc.), non-Legion forces, or any wholly new faction with its own roster and rules.

## Content type: set

Each faction is a folder with `meta.yaml`, `README.md`, and `rules.pdf`. Copy `/_template/`. A faction bundling many units, wargear, and detachments is one set, one PDF — tag every content type it contains so it also surfaces under `/units/`, `/detachments/`, etc.

## Compatibility

Additive. Adding a faction does not conflict with a subsystem, so `replaces` stays empty in the normal case.

A faction that ships its own terrain or reactions rules replaces `terrain` / `reactions` — list the domain. A faction with an internal Rites of War style construction replaces `rites of war` only if it overrides the shared army-construction rules; a self-contained xenos roster that stands apart usually does not.

Tag `units` / `wargear` in `descriptive_tags`; the validator soft-warns so a reviewer can check name collisions.

## Faction as a tag (separate use)

"Faction" is also a descriptive tag applied to content filed elsewhere — a Dark Angels detachment in `/detachments/` tagged `dark-angels`. That tag drives per-faction browse filtering and is distinct from this folder, which is for new factions as standalone content. Keep faction slugs consistent (`orks`, `dark-angels`, `iron-hands`, ...) and add new ones by PR.
