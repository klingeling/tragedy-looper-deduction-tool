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
    onesPerLoop?: true,
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
                    onesPerLoop: true,
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
            name: 'An Unsettling Rumor',
            roles: {
                "Conspiracy Theorist": 1,
            },
            rules: [
                {
                    type: 'optional',
                    timing: ['Mastermind Ability'],
                    onesPerLoop: true,
                    description: 'You may place 1 Intrigue on any location.'
                }
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
    ] as const satisfies readonly Plot[];
}

export const plots = toRecord(new Plots().plots.map(x => [x.name, x] as const));