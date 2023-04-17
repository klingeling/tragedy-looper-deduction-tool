import * as data from "../data";
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
    ...data.plots,

    {
        name: 'Lost Heart',
        roles: {
            Agent: 1,
            Brain: 1
        },
        rules: [
            {
                type: 'Mandatory',
                timing: ['Always'],
                prerequisite: 'At least 1 Intrigue, 1 Goodwill, and 1 Paranoia are placed on the character whose original role is a Person',
                description: 'The character gains Goodwill Outburst and Marionette’s ability.'
            }
        ]
    },
    {
        name: 'Shadow Demon King',
        roles: {
            Twilight: 1,
        },
        rules: [
        ]
    },
    {
        name: 'The Devil’s Will',
        roles: {
            Agent: 1,
            Invader: 1,
            Hider: 1,
        },
        rules: [
        ]
    },
    {
        name: 'Parallel World War',
        roles: {
            Agent: 1,
        },
        rules: [
            {
                type: 'Loss condition: Tragedy',
                timing: ['Loop End'],
                prerequisite: 'World Convergence hasn‘t occured this loop.'
            },
            {
                type: 'Script creation',
                description: 'The Agent must be the World Convergent culprit.'
            },
        ]
    },
    {
        name: 'Alien Erosion',
        roles: {
            Brain: 1,
            Invader: 1,
        },
        rules: [
            {
                type: 'Loss condition: Tragedy',
                timing: ['Loop End'],
                prerequisite: 'The current world is Normal world and there are at least 2 Intrigue on the Brain‘s starting Location'
            },
            {
                type: 'Loss condition: Tragedy',
                timing: ['Loop End'],
                prerequisite: 'The current world is Abnormal world and there are at least 2 Intrigue on the Invader‘s starting Location'
            },
        ]
    },
    {
        name: 'The World of Dollhouse',
        roles: {
            Quidnunc: 1,
        },
        rules: [
            {
                type: 'Mandatory',
                timing: ['Always'],
                description: 'All characters whose original role is Person gain Goodwill Outburst.'
            },
        ]
    },
    {
        name: 'Ego Wave',
        roles: {
            Animus: 1,
            Agitator: 1,
        },
        rules: [

        ]
    },
    {
        name: 'The Closed Door',
        roles: {
            Quidnunc: 1,
            Agitator: 1,
        },
        rules: [
            {
                type: 'Optional',
                timing: ['Day Start'],
                description: 'When the Protagonist Leader declares to switch the world, you may refuse it'
            }
        ]
    },
    {
        name: 'Moonside City',
        roles: {
            Quidnunc: 1,
            Neurosis: 1,
        },
        rules: [
            {
                type: 'Mandatory',
                timing: ['Always'],
                prerequisite: 'At least 2 Intrigue on the City',
                description: 'Switching the world is prohibited except for this plot rule ability.'
            },
            {
                type: 'Mandatory',
                timing: ['Always'],
                prerequisite: 'At least 2 Intrigue on the City',
                description: 'Switch the world to Abnormal World.'
            },
        ]
    },
    {
        name: 'Fanatic Fox',
        roles: {
            Animus: 1,
            Fanatic: 1,
        },
        rules: [
            {
                type: 'Loss condition: Tragedy',
                timing: ['Loop End'],
                prerequisite: 'At least three other characters with the same sex as Fanatic died',
            },
        ]
    },
    {
        name: 'Somthing to invite',
        roles: {
            Enchanter: 1,

        },
        rules: []
    },


] as const satisfies readonly PlotInternal[], 'name');


export function isPlotName(name: string): name is PlotName {
    return name in plotsInternal;
}

export const plots = plotsInternal as Record<PlotName, Plot & { rules: readonly Required<Abilitie>[] }>;

