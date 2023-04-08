import { toRecord } from "../misc";
import type { RoleNames, timing } from "./roles";

export type Plot = {
    name: string,
    roles: Readonly<Partial<Record<RoleNames, number | readonly [number, number]>>>,
    rules: readonly PlotRule[]
}
export type PlotRule = {
    type: 'optional' | 'mandatory' | 'loss condition',
    timing: readonly timing[],
    timesPerLoop?: number,
    timesPerDay?: number,
    description: string,
}

export type PlotNames = Plots['plots'][never]['name'];

export class Plots {
    public readonly plots = [
        {
            name: 'Light of the Avenger',
            roles: {
                Brain: 1,
            },
            rules: [
                {
                    type: 'loss condition',
                    timing: ['Loop End'],
                    description: 'If there is at least 2 Intrigue on the Brain’s starting location, the Protagonists lose.'
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
                    type: 'loss condition',
                    timing: ['Loop End'],
                    description: 'If there is at least 2 Intrigue on the School, the Protagonists lose.'
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
                    type: 'optional',
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
                    type: 'mandatory',
                    timing: ['Script creation'],
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
                    type: 'loss condition',
                    timing: ['Loop End'],
                    description: 'If there is at least 2 Intrigue on the Shrine, the Protagonists lose.'
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
                    type: 'mandatory',
                    timing: ['Script creation'],
                    description: 'Key Person must be a girl.'
                },
                {
                    type: 'loss condition',
                    timing: ['Loop End'],
                    description: 'If there is at least 2 Intrigue on the Key Person, the Protagonists lose.'
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
                    type: 'loss condition',
                    timing: ['Loop End'],
                    description: '˝Butterfly Effect˝ has occured this loop.'
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
                    type: 'loss condition',
                    timing: ['Loop End'],
                    description: 'If there is at least 2 Intrigue on the Witch’s starting location, the Protagonists lose.'
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
                    type: 'mandatory',
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
                    type: 'mandatory',
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
                    type: 'mandatory',
                    timing: ['Script creation'],
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
                    type: 'mandatory',
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
                    type: 'optional',
                    timing: ['Loop Start'],
                    description: 'Place a Curse on the Ghost’s starting location'
                },
                {
                    type: 'optional',
                    timing: ['Day End'],
                    description: 'Unless all Location Curses can be attached to characters, you may kill the Protagonists'
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
                    type: 'optional',
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
                    type: 'mandatory',
                    timing: ['Script creation'],
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
                    type: 'optional',
                    timesPerLoop: 2,
                    timesPerDay: 1,

                    timing: ['Mastermind Ability'],
                    description: 'You may place an Intrigue on one location where a character with Goodwill Refusal is.'
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
                    type: 'loss condition',
                    timing: ['Loop End'],
                    description: 'If there are at least 5 characters with Intrigde on them, the Protagonists lose.'
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
                    type: 'loss condition',
                    timing: ['Loop End'],
                    description: 'If there are as manay or more Intrigue on the Shrine then the Extra Gauge shwos, the Protagonists lose (if the Extra Gauge is at zero, the Protagonists always lose.'
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
                    type: 'loss condition',
                    timing: ['Loop End'],
                    description: 'If the Extra Gauge has increased at all this loop, the Protagonists lose.'
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
                    type: 'loss condition',
                    timing: ['Loop End'],
                    description: 'If there is at least 2 Intrigue on the Witch’s starting location, the Protagonists lose.'
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
                    type: 'loss condition',
                    timing: ['Loop End'],
                    description: 'If there are as many or more corpses as the Extra Gauge shows, the Protagonists lose (if the Extra Gauge is at zero, the Protagonists always lose).'
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
                    type: 'mandatory',
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
            rules: [
                {
                    type: 'mandatory',
                    timing: ['Script creation'],
                    description: 'The Informer must be included. The script writer then chooses one "extra" main plot.'
                },
                {
                    type: 'mandatory',
                    timing: ['Loop Start'],
                    description: 'If the Extra Gauge is on 2 or more, truing that loop, the original main plot is replaced by the "extra" main plot.'
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
                    type: 'loss condition',
                    timing: ['Loop End'],
                    description: 'If the Extra Gauge is 1 or lower, the Protagonists lose'
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
                    type: 'mandatory',
                    timing: ['Always'],
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
                    type: 'loss condition',
                    timing: ['Loop End'],
                    description: 'If the Extra Gauge is 3 or more, the Protagonists lose.'
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
                    type: 'loss condition',
                    timing: ['Loop End'],
                    description: 'If there are more than X Intrigue counters on the School, the Protagonists lose, X is 1 less than the current loop number.'
                }
            ],
        },
        {
            name: 'Dance of Fools',
            roles: {

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
            },
            rules: [
                {
                    type: 'mandatory',
                    timing: ['Loop Start'],
                    description: 'If the Extra Gauge was 2 or less at the end of the previous loop, increase it by 1.'
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
                    'type': 'loss condition',
                    timing: ['Loop End'],
                    description: 'If there are a total of 12 or more Paranoia counters on the remaining charactrs, the Protagonists lose.'
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
                    type: 'loss condition',
                    timing: ['Loop End'],
                    description: 'If there are at least 2 Intrigde counters on the Shrine, the Protagonists Lose.'
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
                    type: 'loss condition',
                    timing: ['Loop End'],
                    description: 'If the Ninja (or its corpse) has at least 2 Intrigde counters, the Protagonists lose.'
                },
                {
                    type: 'mandatory',
                    timing: ['Script creation'],
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
                    type: 'mandatory',
                    timing: ['Loop Start'],
                    description: 'Chose one character that died druing the previous loop. Plac any Extra Card on that character. Character(s) with an Extra card has their role changed into a Key Person.'
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
                    type: 'loss condition',
                    timing: ['Loop End'],
                    description: 'If there are 6 or less characters alave, the Protagonists lose.'
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
                    type: 'mandatory',
                    timing: ['Loop Start'],
                    description: 'Choose one character that died druing the prvious loop and place any Extra crad on that character',
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
                    type: 'mandatory',
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
                    type: 'optional',
                    timing: ['Mastermind Ability'],
                    timesPerLoop: 1,
                    description: 'You may place 1 Intruge counter on the (living) Factor’s location',
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
                    type: 'mandatory',
                    timing: ['Script creation'],
                    description: 'There must be at least one Suicide Incident',
                },
                {
                    type: 'mandatory',
                    timing: ['Incident step'],
                    description: 'When determning whether an Incident triggers, and the culprit is a Person, if the Prophet is alive, the culprit is regarded as having 1 less than its printed Paranoia limit.',
                },
            ],
        },


    ] as const satisfies readonly Plot[];
}

const p = new Plots();

export function isPlotName(name: string): name is PlotNames {
    return p.plots.some(x => x.name == name);
}

export const plots = toRecord<Plot & { name: PlotNames }, PlotNames>(p.plots.map(x => [x.name, x] as const));