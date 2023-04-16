import * as data from "../data";
import { toRecord, type RequireAtLeastOne } from "../misc";
import type { ScriptSpecified } from "./core";
import type { DoseNotTriggerIncident } from "./incidents";

export type AbilityType = AbilityTypeLose | AbilityTypeCreation | AbilityTypeDefault;
export type AbilityTypeLose = typeof loseTypes[number];
export type AbilityTypeCreation = 'Script creation';
export type AbilityTypeDefault = 'Optional' | 'Mandatory';

export const loseTypes = [
    'Mandatory Loss condition: Character Death',
    'Mandatory Loss condition: Character Death',
    'Optional Loss condition: Character Death',
    'Delayed Loss condition: Character Death',
    'Loss condition: Tragedy'
] as const;

export type timing = 'Always' | 'Day End' | 'Mastermind Ability' | 'Card resolve' | 'Loop End' | 'Loop Start'
    | 'Last Day' | 'First Day' | 'Incident step' | 'Incident trigger' | 'On character death' | 'When this role is to be reveald'
    | 'Mastermind Action step' | 'Goodwill ablility step';


type RoleInternal = {
    name: string,
    max?: number,
    unkillable?: true,
    afterDeath?: true,
    goodwillRefusel?: 'Optional' | 'Mandatory',
    abilities: readonly Abilitie<{ 'Over all Roles'?: true }>[]
} & ScriptSpecified & DoseNotTriggerIncident;

export type OncePer<Text extends string, Constraints extends object | void = void, T = object> = T &
    {
        [k in `timesPer${Capitalize<Text>}`]?: Constraints extends void ? number : number | readonly [number, RequireAtLeastOne<Constraints>]
    };

export type Abilitie<Constraints extends object | void = void> = OncePer<'Loop' | 'day', Constraints, {
    description: string,
    prerequisite?: string,
    type: AbilityTypeDefault,
    // timesPerLoop?: Constraints extends void ? number : number | readonly [number, RequireAtLeastOne<Constraints>],
    // timesPerDay?: Constraints extends void ? number : number | readonly [number, RequireAtLeastOne<Constraints>],
    timing: readonly (timing)[]
} | {
    description?: string,
    prerequisite: string,
    type: AbilityTypeLose,
    // timesPerLoop?: Constraints extends void ? number : number | readonly [number, RequireAtLeastOne<Constraints>],
    // timesPerDay?: Constraints extends void ? number : number | readonly [number, RequireAtLeastOne<Constraints>],
    timing: readonly (timing)[]
}> | {
    description: string,
    type: AbilityTypeCreation,
}

export type Role = Roles[keyof Roles];
export type Roles = typeof rolesInternal;
export type RoleName = Role['name'];



export const rolesInternal = toRecord([

    ...data.roles

] as const satisfies readonly RoleInternal[], 'name');

export const roles = rolesInternal as Record<RoleName, RoleInternal & { name: RoleName }>;


export function isRoleName(name: string): name is RoleName {
    return name in rolesInternal;
}


