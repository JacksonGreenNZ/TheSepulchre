# Tweaks / QoL Improvements

Atomic rule changes: single-rule edits and quality-of-life adjustments. The modpack layer — users stack a selection of these.

## Content type: tweak

Tweaks are not folders. They are entries in `tweaks.yaml`, one file, many entries. Text-only, no PDF.

```yaml
tweaks:
  - id: vanguard-objective-scoring-jgreen   # unique across all tweaks and sets
    title: "Vanguard objective proximity scoring"
    author: jackson-green
    version: 1.0.0
    text: >
      A unit with Vanguard (X) scores against any enemy unit that started the
      turn within 3" of an objective marker.
    affects: [scoring]          # browse area(s), free grouping
    target: vanguard-scoring    # exact rule changed; from targets.yml
    replaces: []                # domains, only if the tweak needs one
    requires: []
```

## Compatibility

Two tweaks with the same `target` conflict — they edit the same rule, so a user picks one. A new variant conflicts with all existing variants of that target automatically; no pairwise declaration.

Different targets stack freely. Most tweaks have no conflict at all — that is the point of the modpack workflow.

`affects` groups tweaks for browsing and never causes conflict. `target` drives conflict and is drawn from the owner-maintained `targets.yml`. Proposing a new target is a separate PR to that file.

For the rare clash between two tweaks with different targets, use `conflicts_with: [tweak-id]`.
