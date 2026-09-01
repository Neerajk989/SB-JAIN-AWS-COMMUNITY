# Reference notes — AWS Community Day website

Reference URL: https://www.awscommunityday.dev/

The reference uses a dark cinematic event landing page with a full-screen intro/credits experience, a compact top navigation, a large event hero, event status badge, countdown/stat blocks, and long-form sections for About, Speakers, Agenda, Venue, Partners, Badge, Team, FAQ, and Contact. The visual language is black/charcoal with electric lime-green accents, monospaced and condensed display typography, dotted/terminal-like outlines, repeated marquee text, numbered section rails, dark image cards, and strong full-width transitions.

The homepage content hierarchy is: event-concluded announcement; navigation; hero title and location/date metadata; stats; campus/event identity card; marquee; about/value propositions; why-attend proof points; speaker grid; agenda schedule; venue; partners; participation badge; team; FAQ accordion; contact; credits/footer. Visible interaction cues include a Skip control, event-concluded CTA, maps link, FAQ accordions, badge photo/name inputs, soundtrack toggle, fullscreen credits, replay credits, and social/contact links.

Rebuild direction: match the information architecture, dark immersive pacing, large typographic hero, marquee/section transitions, and interactive cards, but use SB Jain AWS Community content and original/generated assets rather than copying the reference site's proprietary text, logo, or images verbatim. Add a live animated canvas background with low-power mobile behavior and prefers-reduced-motion support.


## Speaker-card verification

The rendered page contains 3 speaker/mentor cards. Computed styles confirm the target treatment: speaker section background rgb(24, 39, 29) (#18271d), card background rgb(16, 26, 42) (#101a2a), rounded 18px cards, and 50% circular portrait wells. Desktop browser verification completed successfully.


## Final speaker/mentor visual check

The reference-style card update is visible in the live page: the speaker/mentor section uses the requested green-black backdrop and the existing 3-card list uses rounded navy boxes with circular portrait wells. The hero and surrounding sections remain unchanged. A desktop browser refresh rendered successfully after the update.


## Hero typography verification

The hero now renders at a smaller reference-style scale: Student, Community, Day 2026, and Nagpur occupy less vertical space while remaining legible. Supporting copy and CTA controls were reduced proportionally, and the browser confirmed the existing navigation, stats, and lower sections remain present.


## Reference structure verification

The rendered speaker section now contains 2 keynote cards and 9 speaker/mentor cards, for 11 total boxes. The section background is rgb(24, 39, 29) (#18271d), and the live canvas layer remains present for animated background behavior.


## Full reference-match findings

The reference uses a dark near-black base with green ambient aura, a compact top navigation and ticker, a large editorial hero, grouped keynote and speaker sections, and rounded dark cards. Its speaker grouping contains 2 keynote cards followed by 9 speaker cards. The local page now follows that grouping and uses the same green-black section tone while retaining SB Jain context.


## Supplied HTML integration verification

The page now includes compatible reference sections for Partners, Community Badge, and Contact, with corresponding navigation anchors. The rendered page confirms the badge download control and live canvas are present, and the speaker grid remains at 11 cards.
