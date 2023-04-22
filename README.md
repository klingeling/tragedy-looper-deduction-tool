# Tragedy Looper

[Tragedy Looper (惨劇 RoopeR)](https://boardgamegeek.com/boardgame/148319/tragedy-looper)
is a scenario-based deduction board game where players take the roles of time
loopers attempting to prevent a tragedy.

Its Fun :)

## So What's this?

This is the code for the website https://lokimidgard.github.io/tragedy-looper-deduction-tool/.

It is a tool that generates script specific deduction matrix for the specific
characters and a checklist for the Mastermind.

It has all premade Scripts of the Z-Man version of the Base Game, Midnight
Circle and Cosmic Evil, pre entered and ready to go. But you can of course made
your own Scripts.

It will safe your custom scripts locally in your Browser, and you can ex-/import
them to text. You can also share the script with others.

## Board Game Geek

There is also a thread on [Board Game Geek](https://boardgamegeek.com/thread/3066363/website-generate-script-specific-mastermind-and-pl) where you can discuss, (or fill bugs if you don't want to create a github account).

## What's Next?

- [ ] Fix Character Metadata: start positions and Forbidden Locations are Wrong for almost everyone
- [ ] Generated Character Cards: The
  [official Website](http://bakafire.main.jp/rooper/sr_dl_04_sozai.htm) has
  blank Cards and the Character images. With this we could generate images for
  cards that contains localization (if available) and use Custom Characters.
- [ ] Validate Data: Not all Rules are enforced, e.g. A Person can be the
  Culprit of many incidents (not only for serial murder). Or a Script may have
  the wrong roles. This would brake some Another Horizon Scripts (which is a good
  thing I guess)
- [ ] Persist Player Aid Choices, so an accidental reload will not delete every thing…
- [ ] Better Localization, with placeholders, so there would be less text overall and it is the same for the same actions.

Not sure when or if I will do anything of this, It is good enough for now I guess.
