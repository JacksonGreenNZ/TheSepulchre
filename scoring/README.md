# Scoring

Changes to how units score: Line, Vanguard, objective control, scoring conditions.

## Content type

Small changes to the existing scoring rules changes should be included in the "Tweaks" folder (e.g. Vanguard is scored against units who start the turn holding an objective). This is for new scoring methods or an overhauled scoring system.

## Compatibility

Two scoring tweaks conflict only when they change the same rule. That is controlled by the `target` field (from `targets.yml`), not by the `scoring` area tag.

Example: five authors rewriting Vanguard objective scoring all use `target: vanguard-scoring`. Same target means they are mutually exclusive variants — a user picks one. Unrelated scoring tweaks (`target: line-scoring`) stack freely.

`affects: scoring` is for browsing. `target` is for conflict. Keep them distinct.
