# Restored Content

Rules from prior editions adapted for 3rd edition: battlefield roles, Rites of War, unit profiles, wargear, and characters. Content that reintroduces mechanics the current edition dropped.

## Content type: set

Each supplement is a folder with `meta.yaml`, `README.md`, and `rules.pdf`. Copy `/_template/`.

## Compatibility

A supplement that restores Rites of War replaces `rites of war` — list it under `replaces`. Two rites systems (restored or new) cannot both be active, so they conflict.

Restored terrain or reactions rules replace `terrain` or `reactions` respectively.

Restored units, wargear, and characters are additive and do not go under `replaces`. Tag them `units` / `wargear` in `descriptive_tags`. The validator soft-warns on these so a reviewer can check for name collisions with existing content.

Supplements here are usually cross-cutting (one PDF containing detachments, units, and wargear at once). Tag every content type it includes so it surfaces under each browse category.
