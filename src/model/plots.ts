import { toRecord } from "../misc";
import type { ScriptSpecified } from "./core";
import type { Abilitie, RoleName } from "./roles";

export type Plot = Plots[PlotName];
export type Plots = typeof plotsInternal;
type PlotInternal = {
    name: string,
    roles: Readonly<Partial<Record<RoleName, number | readonly [number, number]>>>,
    rules: readonly Abilitie[]
} & ScriptSpecified;


export type PlotName = keyof Plots;



const plotsInternal = toRecord([
    {
        name: 'Light of the Avenger',
        roles: {
            Brain: 1,
        },
        rules: [
            {
                type: 'Loss condition: Tragedy',
                timing: ['Loop End'],
                prerequisite: '2 Intrigue on the Brain’s starting location',
            }
        ]
    },
    {
        name: 'A Place to Protect',
        roles: {
            "Key Person": 1,
            Cultist: 1,
        },
        rules: [
            {
                type: 'Loss condition: Tragedy',
                timing: ['Loop End'],
                prerequisite: '2 Intrigue on the School.',
            }
        ]
    },
    {
        name: 'Shadow of the Ripper',
        roles: {
            "Conspiracy Theorist": 1,
            "Serial Killer": 1,
        },
        rules: []
    },
    {
        name: 'An Unsettling Rumor',
        roles: {
            "Conspiracy Theorist": 1,
        },
        rules: [
            {
                type: 'Optional',
                timing: ['Mastermind Ability'],
                timesPerLoop: 1,
                description: 'You may place 1 Intrigue on any location.'
            }
        ]
    },
    {
        name: 'A Hideous Script',
        roles: {
            "Conspiracy Theorist": 1,
            "Curmudgeon": [0, 2],
            Frind: 1,
        },
        rules: [
            {
                type: 'Script creation',
                description: 'Script writer may choose 0 or 1 or 2 Curmudgeons.'
            }
        ]
    },
    {
        name: 'Shadow of the Ripper',
        roles: {
            "Conspiracy Theorist": 1,
            "Serial Killer": 1,
        },
        rules: []
    },
    {
        name: 'Murder Plan',
        roles: {
            "Key Person": 1,
            Killer: 1,
            Brain: 1,
        },
        rules: []
    },
    {
        name: 'The Sealed Item',
        roles: {
            Brain: 1,
            Cultist: 1,
        },
        rules: [
            {
                type: 'Loss condition: Tragedy',
                timing: ['Loop End'],
                prerequisite: '2 Intrigue on the Shrine.',
            }
        ]
    },
    {
        name: 'Sign with me!',
        roles: {
            'Key Person': 1,
        },
        rules: [
            {
                type: 'Script creation',
                description: 'Key Person must be a girl.'
            },
            {
                type: 'Loss condition: Tragedy',
                timing: ['Loop End'],
                prerequisite: '2 Intrigue on the Key Person.',
            },
        ]
    },
    {
        name: 'Change of Future',
        roles: {
            Cultist: 1,
            "Time Traveler": 1,
        },
        rules: [
            {
                type: 'Loss condition: Tragedy',
                timing: ['Loop End'],
                prerequisite: '˝Butterfly Effect˝ has occured this loop.'
            },
        ]
    },
    {
        name: 'Giant Time Bomb',
        roles: {
            Witch: 1,
        },
        rules: [
            {
                type: 'Loss condition: Tragedy',
                timing: ['Loop End'],
                prerequisite: '2 Intrigue on the Witch’s starting location.'
            },
        ]
    },
    {
        name: 'Circle of Friends',
        roles: {
            Frind: 2,
            "Conspiracy Theorist": 1,
        },
        rules: [
        ]
    },
    {
        name: 'A Love Affair',
        roles: {
            Lover: 1,
            "Loved One": 1,
        },
        rules: [
        ]
    },
    {
        name: 'The hidden Freak',
        roles: {
            "Serial Killer": 1,
        },
        rules: [
        ]
    },
    {
        name: 'Paranoia Virus',
        roles: {
            "Conspiracy Theorist": 1,
        },
        rules: [
            {
                type: 'Mandatory',
                timing: ['Always'],
                description: 'All Persons with at least 3 Paranoia turn into Serial Killers.'
            }
        ]
    },
    {
        name: 'Threads of Fate',
        roles: {
        },
        rules: [
            {
                type: 'Mandatory',
                timing: ['Loop Start'],
                description: 'Place 2 Paranoia on all characters who had Goodwill last loop.'
            }
        ]
    },
    {
        name: 'Unknown Factor X',
        roles: {
            Factor: 1,
        },
        rules: [
        ]
    },
    {
        name: 'The Noble Bloodline',
        roles: {
            "Key Person": 1,
            Vampire: 1,

        },
        rules: [
            {
                type: 'Script creation',
                description: 'Key Person and Vampire must be of oposing sex.'
            }
        ]
    },
    {
        name: 'Moonlight Beast',
        roles: {
            Werwolf: 1,

        },
        rules: []
    },
    {
        name: 'Night Mist Nightmare',
        roles: {
            Nightmare: 1,

        },
        rules: []
    },
    {
        name: 'The Ones from the Grave',
        roles: {
        },
        rules: [
            {
                type: 'Mandatory',
                timing: ['Always'],
                description: 'All corpses that had the role Person, Coward or Show-Off change into having the role of Zombie'
            }
        ]
    },
    {
        name: 'The Cursed Land',
        roles: {
            Ghost: 1,
            "Show-Off": 1,
        },
        rules: [

            {
                type: 'Optional',
                timing: ['Loop Start'],
                description: 'Place a Curse on the Ghost’s starting location'
            },
            {
                type: 'Optional Loss condition: Character Death',
                timing: ['Day End'],
                prerequisite: 'One or more Location Curses can’t be attached to characters',
            }
        ]
    },
    {
        name: 'Those with Habits',
        roles: {
            Ghost: 1,
            "Serial Killer": 1,
            "Loved One": 1,
        },
        rules: [
        ]
    },
    {
        name: 'Witch’s Curse',
        roles: {

            "Conspiracy Theorist": 1,
            "Witch": 1,
        },
        rules: [
            {
                type: 'Optional',
                timing: ['Loop Start'],
                description: 'Place a Curse on the Witch’s startiong location.'
            }
        ]
    },
    {
        name: 'The Key Girl',
        roles: {
            "Key Person": 1,
        },
        rules: [
            {
                type: 'Script creation',
                description: 'The Key Person must be a Girl.',
            }
        ]
    },
    {
        name: 'Monster Intrigue',
        roles: {
            "Conspiracy Theorist": 1,
        },
        rules: [
            {
                type: 'Optional',
                timesPerLoop: 2,
                timesPerDay: 1,

                timing: ['Mastermind Ability'],
                prerequisite: 'A Location where a character with Goodwill Refusal is.',
                description: 'Place an Intrigue on one location.'
            }
        ]
    },
    {
        name: 'Panic and Obsession',
        roles: {
            "Serial Killer": 1,
            "Coward": 1,
            "Witch": 1,
        },
        rules: [
        ]
    },
    {
        name: 'People Who Don’t Listen',
        roles: {
            "Show-Off": 1,
            "Conspiracy Theorist": 1,
            "Coward": 1,
        },
        rules: [
        ]
    },
    {
        name: 'Choir to the Outside God',
        roles: {
            "Key Person": 1,
            "Sacrifice": 1,
            "Immortal": 1,
        },
        rules: [
            {
                type: 'Loss condition: Tragedy',
                timing: ['Loop End'],
                prerequisite: 'At least 5 characters with Intrigue on them.',
            }
        ]
    },
    {
        name: 'The Sacred Wrods of Dagon',
        roles: {
            "Key Person": 1,
            "Cultist": 1,
            "Deep One": 1,
        },
        rules: [
            {
                type: 'Loss condition: Tragedy',
                timing: ['Loop End'],

                prerequisite: 'As manay or more Intrigue on the Shrine then the Extra Gauge shows.',
                description: ' (If the Extra Gauge is at zero, the Protagonists always lose)'
            }
        ]
    },
    {
        name: 'The King in Yellow',
        roles: {
            "Sacrifice": 1,
            "Cultist": 1,
        },
        rules: [
            {
                type: 'Loss condition: Tragedy',
                timing: ['Loop End'],
                prerequisite: 'The Extra Gauge has increased at all this loop.'
            }
        ]
    },
    {
        name: 'Giant Time Bomb Again',
        roles: {
            "Witch": 1,
            "Deep One": 1,
        },
        rules: [
            {
                type: 'Loss condition: Tragedy',
                timing: ['Loop End'],
                prerequisite: '2 Intrigue on the Witch’s starting location.'
            },
        ]
    },
    {
        name: 'Bloody Rites',
        roles: {
            "Witch": 1,
            "Immortal": 1,
        },
        rules: [
            {
                type: 'Loss condition: Tragedy',
                timing: ['Loop End'],
                prerequisite: 'As many or more corpses as the Extra Gauge shows.',
                description: '(If the Extra Gauge is at zero, the Protagonists always lose)'
            },
        ]
    },
    {
        name: 'The Resistacne',
        roles: {
            "Conspiracy Theorist": 1,
            "Wizard": 1,
            "Serial Killer": 1,
        },
        rules: [
        ]
    },
    {
        name: 'People Who Saw',
        roles: {
            "Conspiracy Theorist": 1,
            "Witness": 1,
        },
        rules: [
        ]
    },
    {
        name: 'The Profound Race',
        roles: {
            "Serial Killer": 1,
            "Time Traveler": 1,
        },
        rules: [
        ]
    },
    {
        name: 'Whispers from the Deep',
        roles: {
            "Deep One": 1,
            "Paranoiac": 1,
        },
        rules: [
            {
                type: 'Mandatory',
                timing: ['Always'],
                description: 'The Paranoiac gains all the abilities of the Key Person'
            }
        ]
    },
    {
        name: 'The Faceless God',
        roles: {
            "Wizard": 1,
            "Faceless": 1,
        },
        rules: [
        ]
    },
    {
        name: 'Twisted Truth',
        roles: {
            "Paranoiac": 1,

        },
        scriptSpecified: [
            {
                name: 'Extra Plot',
                type: 'plot'
            }
        ],
        rules: [
            {
                type: 'Script creation',
                description: 'The Informer must be included. The script writer then chooses one "extra" main plot.'
            },
            {
                type: 'Mandatory',
                timing: ['Loop Start'],
                prerequisite: 'The Extra Gauge is on 2 or more.',
                description: 'Druing this loop, the original main plot is replaced by the "extra" main plot.'
            }
        ]
    },
    {
        name: 'Tightrope Plan',
        roles: {
            Brain: 1,
            Killer: 1,
        },
        rules: [
            {
                type: 'Loss condition: Tragedy',
                timing: ['Loop End'],
                prerequisite: 'The Extra Gauge is 1 or lower.'
            }
        ],
    },
    {
        name: 'A Drop of Strychnine',
        roles: {
            "Key Person": 1,
            Poisoner: 1,
            Fool: 1,
        },
        rules: [
            {
                type: 'Mandatory',
                timing: ['Incident step'],
                description: 'When determining whether "Serial Murde," or "Suicide" triggers, count Intrigue counters also as Paranoia counters.'
            }
        ],
    },
    {
        name: 'A Quilt of Incidents',
        roles: {

            Fool: 1,
            "Conspiracy Theorist": 1,
        },
        rules: [
            {
                type: 'Loss condition: Tragedy',
                timing: ['Loop End'],
                prerequisite: 'The Extra Gauge is 3 or more.'
            }
        ],
    },
    {
        name: 'The Black School',
        roles: {

            Brain: 1,
        },
        rules: [
            {
                type: 'Loss condition: Tragedy',
                timing: ['Loop End'],
                prerequisite: 'There are more than X Intrigue counters on the School, X is 1 less than the current loop number.'
            }
        ],
    },
    {
        name: 'Dance of Fools',
        roles: {

            Frind: 1,
            Fool: 1,
        },
        rules: [
        ],
    },
    {
        name: 'Isolated Institution Psycho',
        roles: {

            "Conspiracy Theorist": 1,
            "Therapist": 1,
            "Paranoiac": 1,
        },
        rules: [
            {
                type: 'Mandatory',
                timing: ['Loop Start'],
                prerequisite: 'The Extra Gauge was 2 or less at the end of the previous loop',
                description: 'Increase it by 1.'
            }
        ],
    },
    {
        name: 'An Absolute Will',
        roles: {

            "Obstinate": 1,
        },
        rules: [
        ],
    },
    {
        name: 'Tricky Twins',
        roles: {
            "Twin": 1,
            "Paranoiac": 1,
        },
        rules: [
        ],
    },
    {
        name: 'Smell of Gunpowder',
        roles: {
            "Serial Killer": 1,
        },
        rules: [
            {
                'type': 'Loss condition: Tragedy',
                timing: ['Loop End'],
                prerequisite: 'There are a total of 12 or more Paranoia counters on the remaining charactrs.'
            }
        ],
    },
    {
        name: 'I am a Master Detective',
        roles: {
            "Conspiracy Theorist": 1,
            "Frind": 1,
            "Private Investigator": 1,
        },
        rules: [
        ],
    },
    {
        name: 'Secret Record',
        roles: {
            "Key Person": 1,
            "Brain": 1,
            "Conspiracy Theorist": 1,
        },
        rules: [
            {
                type: 'Loss condition: Tragedy',
                timing: ['Loop End'],
                prerequisite: 'There are at least 2 Intrigde counters on the Shrine.'
            }
        ],
    },
    {
        name: 'The Devil’s Hand',
        roles: {
            "Key Person": 1,
            "Cultist": 1,
            "Ninja": 1,
        },
        rules: [
        ],
    },
    {
        name: 'Male Confrontation',
        roles: {
            "Ninja": 1,
        },
        rules: [
            {
                type: 'Loss condition: Tragedy',
                timing: ['Loop End'],
                prerequisite: 'The Ninja (or its corpse) has at least 2 Intrigde counters.'
            },
            {
                type: 'Script creation',
                description: 'The Ninja (for this plot) must have the tag man.'
            }
        ],
    },
    {
        name: 'Fated Connections',
        roles: {
            "Conspiracy Theorist": 1,
            "Frind": 1,
            "Serial Killer": 1,
        },
        rules: [
            {
                type: 'Mandatory',
                timing: ['Loop Start'],
                prerequisite: 'A Character died the last turn.',
                description: 'Chose one of those. Plac any Extra Card on that character. Character(s) with an Extra card has their role changed into a Key Person.'
            }
        ],
    },
    {
        name: 'Love-Hate Spiral',
        roles: {
            "Frind": 1,
            "Obstinate": 1,
        },
        rules: [
        ],
    },
    {
        name: 'Showtime of Death',
        roles: {
            "Magician": 1,
            "Immortal": 1,
        },
        rules: [
            {
                type: 'Loss condition: Tragedy',
                timing: ['Loop End'],
                prerequisite: 'There are 6 or less characters alive.'
            }
        ],
    },
    {
        name: 'Witches Tea Time',
        roles: {
            "Conspiracy Theorist": 1,
            "Frind": 1,
            "Witch": 2,
        },
        rules: [
        ],
    },
    {
        name: 'Dice of the Gods',
        roles: {
            "Serial Killer": 1,
            "Obstinate": 1,
        },
        rules: [
            {
                type: 'Mandatory',
                timing: ['Loop Start'],
                prerequisite: 'A Character died the last turn.',
                description: 'Chose one of those. Plac any Extra Card on that character.'
            }
        ],
    },
    {
        name: 'Unanswered Heart',
        roles: {
            "Conspiracy Theorist": 1,
            "Magician": 1,
        },
        rules: [
            {
                type: 'Mandatory',
                timing: ['Always'],
                description: '"Forbid Goodwill" has the effect of "Forbid Movement"',
            }
        ],
    },
    {
        name: 'Unsafe Trigger',
        roles: {
            "Factor": 1,
        },
        rules: [
            {
                type: 'Optional',
                timing: ['Mastermind Ability'],
                timesPerLoop: 1,
                prerequisite: 'The Factor is alive.',
                description: 'You may place 1 Intruge counter on the Factor’s location',
            }
        ],
    },
    {
        name: 'Worshippers of the Apocalypse',
        roles: {
            "Prophet": 1,
        },
        rules: [
            {
                type: 'Script creation',
                description: 'There must be at least one Suicide Incident',
            },
            {
                type: 'Mandatory',
                timing: ['Incident step'],
                prerequisite: 'The Culprit is a Person and the Prophet is alive.',
                description: 'When determning whether an Incident triggers, the culprit is regarded as having 1 less than its printed Paranoia limit.',
            },
        ],
    },


] as const satisfies readonly PlotInternal[], 'name');


export function isPlotName(name: string): name is PlotName {
    return name in plotsInternal;
}

export const plots = plotsInternal as Record<PlotName, Plot & { rules: readonly Required<Abilitie>[] }>;

