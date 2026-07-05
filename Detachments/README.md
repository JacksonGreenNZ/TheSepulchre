# Detachments

Custom detachments: force organisation slots, battlefield roles, and any Prime Advantages the detachment grants.

## Content type: set

Each entry is a folder with `meta.yaml`, `README.md`, and `rules.pdf`. Copy `/_template/`.

## Compatibility

A single custom detachment is additive — `replaces` stays empty. Multiple detachments coexist.

A detachment bundle that functions as a whole army-construction system (a Rites of War style package) replaces `rites of war`. List it under `replaces` so it conflicts with other rites systems.

If detachments use a shared-name mechanic (like the `[Ancient Rite]` tag, where all such detachments in an army must share one name), state that rule in the detachment's own PDF. It governs how the detachments combine within one set, not cross-set conflict.

Prime Advantages tied to a detachment ship inside that detachment's PDF. Standalone advantage collections go in `/prime-advantages/`.
