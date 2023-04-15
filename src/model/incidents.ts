import { toRecord, type Union } from "../misc";
import type { ScriptSpecified } from "./core";
import type { AbilityTypeLose, OncePer } from "./roles";


// export type Incident = IncidentInternal & {
//     name: IncidentName,
// }

export type Incident = Union<IncidentsHelper['incidents']>;
export type Incidents = IncidentsHelper['incidents'];

export type DoseNotTriggerIncident = { doseNotTriggerIncidentEffect?: true }

export function isMobIncident(name: string): name is MobIncident {
    if (!isIncidentName(name)) {
        return false;
    }
    const incident = incidents[name];
    return 'mob' in incident && typeof incident.mob === 'number';
}

export function isFakeIncident(name: string): name is MobIncident {
    if (!isIncidentName(name)) {
        return false;
    }
    const incident = incidents[name];
    return 'faked' in incident && incident.faked === true;
}

export function isRepeatedCulpritIncident(name: string): name is MobIncident {
    if (!isIncidentName(name)) {
        return false;
    }
    const incident = incidents[name];
    return 'repeatedCulprit' in incident && incident.repeatedCulprit === true;
}

type IncidentInternal = OncePer<'game', void, {
    name: string,

    effect: readonly (
        {
            description: string,
            prerequisite?: string,
        } |
        {
            type: AbilityTypeLose,
            description?: string,
            prerequisite?: string,
        }
    )[],
    faked?: true,
    repeatedCulprit?: true,
    mob?: number,
} & ScriptSpecified>;

export type IncidentName = keyof IncidentsHelper['incidents'];

type MobIncidentHelper<T> = T extends { 'mob': number } ? T : never;
export type MobIncident = MobIncidentHelper<Incident>['name'];
type FakedIncidentHelper<T> = T extends { 'faked': true } ? T : never;
export type FakedIncident = FakedIncidentHelper<Incident>['name'];


class IncidentsHelper {
    public readonly incidents = toRecord([
        {
            name: 'Murder',
            effect: [{
                description: 'One (1) other character in culprit’s Location dies',
            }],
        },
        {
            name: 'Increasing Unease',
            effect: [{ description: 'Place 2 Paranoia on any character and 1 Intrigue on another', }],
        },
        {
            name: 'Foul Evil',
            effect: [{ description: 'Place 2 Intrigue on the Shrine.', }],
        },
        {
            name: 'Suicide',
            effect: [{ description: 'The culprit dies.', }],
        },
        {
            name: 'Hospital Incident',
            effect: [
                {
                    prerequisite: '1 Intrigue on the Hospital',
                    description: 'Everyone in the Hospital dies.',
                },
                {
                    type: 'Mandatory Loss condition: Character Death',
                    prerequisite: '2 Intrigue on the Hospital',
                }
            ],
        },
        {
            name: 'Faraway Murder',
            effect: [{ description: 'One character with at least 2 Intrigue dies.', }],
        },
        {
            name: 'Missing Person',
            effect: [{ description: 'Move culprit to any Location. Put 1 Intrigue on that Location.', }],
        },
        {
            name: 'Spreading',
            effect: [{ description: 'Move 2 Goodwill from any character to any other character.', }],
        },
        {
            name: 'Butterfly Effect',
            effect: [{ description: 'Put any counter on any character in culprit’s Location.', }],
        },
        {
            name: 'Serial Murder',
            repeatedCulprit: true,
            effect: [{ description: 'One other character in the culprit’s location dies. The same character may be the culprit of several Serial Murder Incidents.', }],
        },
        {
            name: 'Portent',
            effect: [{ description: '[When determning wether this Incident triggers or not, treat the culprit’s Paranoia limit ats 1 less then its printed limit] Put 1 Paranoia counter on any character in the culprit’s location.', }],
        },
        {
            name: 'Increasing Unease',
            effect: [{ description: 'Place 2 Paranoia on any character, then 1 Intrigue on any other character.', }],
        },
        {
            name: 'Terrorism',
            effect: [
                {
                    prerequisite: '1 Intrigue on the City',
                    description: 'Everyone in the City dies.',
                },
                {
                    type: 'Mandatory Loss condition: Character Death',
                    prerequisite: '2 Intrigue on the City',
                }
            ],
        },
        {
            name: 'Bestial Murder',
            effect: [{ description: '[When determinig wether this Incident triggers or not, treat the culprit’s Paranoia limit as 1 more than its printed limit.] Resolve "Serial Murder" and "Increasing Unease" in that order. Then increase the Extra Gauge by 1 more step.', }],
        },
        {
            name: 'A Suspicious Letter',
            effect: [{ description: 'Move any character in the culprit’s location to any location. If the character actually changed location, that character cannot be moved the next day.', }],
        },
        {
            name: 'Faked Suicide',
            effect: [{ description: 'Set an Extra card on the culprit. Druing the remainder of the loop, the Protagonists may not play movement cards on characte(s) with an Extra card.', }],
        },
        {
            name: 'Closed Circle',
            effect: [{ description: 'Reveal the culprit’s locationto. For 3 days, including the day the incident occurred, any movement to or from that location is nullified.', }],
        },
        {
            name: 'The Silver Bullet',
            effect: [{ description: 'The loop ends after this Incident step (resulting in a Protagonist victory unless any loss condition is fullifilled). This Incident dose not increase the Extra Gauge.', }],
        },
        {
            name: 'Conspiracies',
            effect: [{ description: 'Resolve either a Serial Murder or a Missing Person Incident. Check Intrigue instead of Paranoia conters to trigger the Incident.', }],
        },
        {
            name: 'Uproar',
            effect: [
                {
                    prerequisite: '1 Intrigue on the School',
                    description: 'Everyone in the School dies.',
                },
                {
                    prerequisite: '1 Intrigue on the City',
                    description: 'Everyone in the City dies.',
                },
            ],
        },
        {
            name: 'Fake Incident',
            effect: [
                {
                    type: 'Mandatory Loss condition: Character Death',
                    prerequisite: '2 Intrigue on the culprit’s starting location',
                }
            ],
            faked: true,
        },
        {
            name: 'Breakthrough',
            effect: [
                {
                    description: 'The Protagonist Leader chooses one location or character, and removes 2 Intrigue counters from there.',
                }
            ],
        },
        {
            name: 'Confession',
            effect: [{ description: 'Reveal the culprit and the culprit’s role.', }],
        },
        {
            name: 'Sacrilegious Murder',
            effect: [{ description: 'Either kill another charcter in the same location as the culprit, or place an Intrigue on the culprit’s location.', }],
        },
        {
            name: 'Evil Contamination',
            effect: [{ description: 'Place 2 Intrigue on the Shrine.', }],
        },
        {
            name: 'The Executioner',
            effect: [{ description: 'The leader chooses one character. That charcter is killed.', }],
        },
        {
            name: 'Dark Rumor',
            effect: [{ description: 'Attach a Curse on the culprit.', }],
        },
        {
            name: 'Barricade',
            effect: [{ description: 'For each other character in cluprit’s location, pick any other location and move the character there.', }],
        },
        {
            name: 'Night of Madness',
            mob: 0,
            effect: [
                {
                    type: 'Delayed Loss condition: Character Death',
                    prerequisite: '6 or more zombies when this incident occurs.',
                    description: 'The Protagonists will die after the day has ended.',
                }],
        },
        {
            name: 'Awakened Curse',
            mob: 1,
            effect: [{ description: 'Place a curse on the culprit’s location.', }],
        },
        {
            name: 'Fountain of Filth',
            mob: 2,
            effect: [{ description: 'Place 2 Paranoia on any one character, and an Intrigue on any location.', }],
        },
        {
            name: 'Evangelium of the Dead',
            mob: 2,
            effect: [
                {
                    description: 'Kill all characters in the culprits location.',
                },
                {
                    type: 'Mandatory Loss condition: Character Death',
                    prerequisite: 'After that, if that location has 5 or more corpses',
                },
            ],
        },
        {
            name: 'Insane Murder',
            effect: [{ description: 'Kill any one character (including culprit) in the same location as the culprit.', }],
        },
        {
            name: 'Mass Suicide',
            effect: [{
                prerequisite: '1 Intrigue on the culprit',
                description: 'All characters in the culprit’s location are killed.',
            }],
        },
        {
            name: 'Fire of Demise',
            timesPerGame: 1,
            effect: [{
                type: 'Mandatory Loss condition: Character Death',
                description: 'All characters and the Protagonists are killed.',
            }],
        },
        {

            name: 'Hound Dog Scent',
            effect: [{
                type: "Delayed Loss condition: Character Death",
                description: 'When determinig whether this incident occours or not, count Intrigde instead of Paranoia. For the rest of the loop, if another Incident occours, the Protagonists are killed after the Incident step.',
            }],
        },
        {
            name: 'Discovery',
            effect: [{ description: 'Increase the Extra Gauge 1 step.', }],
        },

        // Haunted Stage
        {
            name: 'Sacrifice',
            effect: [
                {
                    description: '[When determining whether this Incident triggers or not, treat the culprit’s Paranoia limit as 2 less than its printed limit.] Increase Extra Gauge by 1, then the Protagonist Leader chooses one character. That character is killed.'
                }
            ]
        },
        {
            name: 'Blasphemy',
            effect: [
                {
                    description: 'Blasphemy	Place 1 Paranoia and 1 Intrigue on any corpse.'
                }
            ]
        },
        {
            name: 'Monster Liberation',
            effect: [
                {
                    description: 'Put an Extra card on the culprit’s location. Thereafter, the card is treated as a character whose title is Demon Beast and gains Nightmare’s role.'
                }
            ]
        },
        {
            name: 'Hundred Demons Night',
            effect: [
                {
                    prerequisite: 'Culprit is dead',
                    description: 'At least 1 Intrigue on the shrine: Increase Extra Gauge by 4.'
                }
            ]
        },
        {
            name: 'Curse',
            effect: [
                {
                    prerequisite: 'Culprit is dead',
                    description: 'Move any card on the culprit’s location to any other location.'
                }
            ]
        },
        {
            name: 'Infestation',
            effect: [
                {
                    prerequisite: 'Culprit is dead',
                    description: 'Place 2 Intrigue on the culprit’s location.'
                }
            ]
        },
        {
            name: 'Repeating Nightmare',
            effect: [
                {
                    prerequisite: 'Culprit is dead',
                    description: 'Increase the Extra Gauge by 1 and revive the culprit.'
                }
            ]
        },


    ] as const satisfies readonly IncidentInternal[], 'name');
}

const i = new IncidentsHelper();

export function isIncidentName(name: string): name is IncidentName {
    return i.incidents[name as IncidentName] != undefined;
}

export const incidents = i.incidents;