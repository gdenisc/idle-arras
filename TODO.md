# TODO list of things that i wanted to do

## Shapes bestiary

Card example:

shape image
shape name
kill count
learnt score from them

## Tabs

Tabs should be displayed as 4x3 instead of 3x3 right now (3 new tabs)

## Hexagon

Hexagon upgrades:

- +1 Evolution (note: capped at 14) (should not be able to buy all in the first prestige)
- Decrease Evolution Time
- Increase Possibility of New Shapes (should be super-exponential)
- Unlock Prestige (read prestige stage)
- Unlock Heptagon Upgrades (should be very expensive)

## Prestige stage (Post-Hexagon)

Hexagon has a prestige upgrade (as a special upgrade of the tab, like pentagon's +1 click damage)
Prestige value is skill points (SP)
After a prestige you unlock a second part of upgrades of every tab (should be displayed at right side of upgrades instead of scrollbar)

You gain 1 skill point per prestige

### Skill point upgrades

General:

- (1 SP) You gain 2.5x more score from all shapes (recommended)
- (1 SP) Rare shapes are 1.33x more common (note: for shadow)
- (1 SP) Unlock square, triangle, pentagon, hexagon unlock permanently (note: just to see them)

Egg:

- (1 SP) You start with all egg upgrades
- (1 SP) You gain 10x more score from eggs
- (1 SP) You start with X score (balancing needed)

Square:

- (1 SP) You start with all square upgrades (egg upgrades should be also bought)
- (1 SP) You gain 10x more score from squares (egg's 10x score should be also bought)
- (2 SP) You keep all your shape cap upgrades. After a prestige all shapes are instantly spawned until the cap

Triangle:

- (1 SP) You start with all triangle upgrades (square upgrades should be also bought)
- (1 SP) You gain 10x more score from triangles (square's 10x score should be also bought)
- (2 SP) Unlock shadow rarity (you should be able to spawn at least one) (note: remember that its 1000x score or 10x score boost)

Pentagon:

- (2 SP) You start with all pentagon upgrades (triangle upgrades should be also bought)
- (1 SP) You gain 10x more score from pentagons (triangle's 10x score should be also bought)
- (2 SP) +1 Click Damage

Hexagon:

- (2 SP) You start with all hexagon upgrades (pentagon upgrades should be also bought)
- (2 SP) You gain 10x more score from hexagons (pentagon's 10x score should be also bought) (note: after that upgrade you can reach heptagons)
- (3 SP) You gain 1 skill point more per prestige

## Heptagon stage (Post-Prestige)

After unlocking heptagon upgrades skill points become logarithmic formula instead of constant

### Heptagon upgrades

- +1 Evolution (note: capped at 19) (super-exponential)
- Decrease Evolution Time
- Increase Possibility of New Shapes (super-exponential)
- Unlock Octagon Upgrades (very expensive)

### Heptagon SP upgrades

- (2 + 2 per upgrade SP) 2x score from heptagons (capped at X upgrades)
- (2 + 2 per upgrade SP) Rare shapes are 1.1x more common
- (10 SP) Unlock Ultra rarity (note: my own rarity instead of rainbow cuz rainbow is harder to implement) (10000x score)

## Octagon stage

### Octagon upgrades

- +1 Evolution (note: capped at 24) (super-exponential)
- Decrease Evolution Time
- Increase Possibility of New Shapes (super-exponential)
- Unlock Nonagon Upgrades (very expensive)

### Octagon SP upgrades

- (20 + 5 per upgrade SP) 2x score from octagons (capped at X upgrades)
- (30 SP) Unlock tanks that kill maxed shapes (tab) (tanks dont have collisions for normal shapes, bullet have collision only with target shape OR crasher, tanks respawn after X time (upgrade in tank's tab))
- (50 SP) Unlock a tab where you can disable/enable spawning shapes and rarities (if it will spawn it will be instantly killed)
- (80 SP) Unlock crashers, they can kill tanks but also give 10x score (note: as a rarity, you cant kill them by mouse)

## Nonagon stage

### Nonagon upgrades

- +1 Evolution (note: NOT CAPPED) (super-exponential)
- Decrease Evolution Time
- Increase Possibility of New Shapes (super-exponential)
- Summon a Final Shape (costs 1.79e308 score, note: cap the global score at 1.79e308 score instead of Infinity)

### Nonagon SP upgrades

- (100 + 25 per upgrade SP) 2x score from nonagons (NOT CAPPED)
- (200 SP) All shapes 10x score or something like it
- (300 SP) Only crashers are spawning. Tanks are invulnerable

## Final shape stage

All shapes are dying, your score is set to Infinite. At the center of arena a final shape is spawned with X hp (you can see its health bar with % which is using logarithm of 10). Only tanks can damage it. The shape is getting weapons over time (becoming like old dreadnought) (lets say at each 10% of its health (in a logarithm of 10)) that can kill tanks. Arena fov is set to max. You cant prestige.

All tabs disabled, new tanks tab:

- Something about Xx damage
- Something about Xx health
- Something about a new tank upgrade (for an example, crackshot)
- Something about growth for tanks (increasing its cap and speed)

When the shape is killed the game is ending and showing total time
