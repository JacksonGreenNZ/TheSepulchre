# Mission Packs

Missions, deployments, and scenario rules. Narrative scenarios, campaign missions, tournament packs.

## Content type: set

Each pack is a folder containing `meta.yaml`, `README.md`, and `rules.pdf`. Copy `/_template/` to start.

## Compatibility

Mission packs are almost always additive and conflict-free. `replaces` stays empty in most cases.

Use `requires` only if a pack depends on a subsystem to function (a mission built around a specific reactions or terrain system). Pick from `domains.yml`.

If a pack ships its own terrain rules, that pack replaces `terrain` — list it under `replaces`, because two terrain systems can't both be active.
