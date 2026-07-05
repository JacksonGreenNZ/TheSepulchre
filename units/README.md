# Units

New or restored unit profiles: datasheets, characters, wargear options.

## Content type: set

Each entry is a folder with `meta.yaml`, `README.md`, and `rules.pdf`. Copy `/_template/`.

## Compatibility

Units are additive. `replaces` stays empty — adding a unit never conflicts with a subsystem.

Tag `units` (and `wargear` if it adds equipment) in `descriptive_tags`. The validator soft-warns on these. Name collisions between two sets that define a same-named unit or item are not auto-checked, because the profiles live in the PDF — reviewers check by hand.

If a unit depends on a subsystem being active (a character that only works under a specific rites system), list that domain under `requires`.
