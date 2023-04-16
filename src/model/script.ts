import type { SetIntersection } from "utility-types";
import { type KeysOfUnion, type Union, toRecord } from "../misc";
import { isCharacterName, type CharacterName, type LocationName, isLocationName } from "./characters";
import type { DefinitionRecord, Options, WithScriptSpecification } from "./core";
import { isIncidentName, type IncidentName, type FakedIncident, type MobIncident } from "./incidents";
import type { Plots } from "./plots";
import type { RoleName } from "./roles";
import type { CastOptions, TragedySets } from "./tragedySets";

import * as data from "../data";



export type ScriptIncident<T extends keyof TragedySets = keyof TragedySets> = {
    day: number,
    // incident: Exclude<IncidentName, FakedIncident> | readonly [FakedIncident, Exclude<IncidentName, FakedIncident>],
    incident: Exclude<Union<TragedySets[T]['incidents']>, FakedIncident | MobIncident> | readonly [Exclude<SetIntersection<Union<TragedySets[T]['incidents']>, FakedIncident>, MobIncident>, Exclude<Union<TragedySets[T]['incidents']>, FakedIncident>],
    culprit: CharacterName,
} | {
    day: number,
    // incident: Exclude<IncidentName, FakedIncident> | readonly [FakedIncident, Exclude<IncidentName, FakedIncident>],
    incident: SetIntersection<MobIncident, Exclude<Union<TragedySets[T]['incidents']>, FakedIncident>> | readonly [SetIntersection<MobIncident, SetIntersection<Union<TragedySets[T]['incidents']>, FakedIncident>>, Exclude<Union<TragedySets[T]['incidents']>, FakedIncident>],
    culprit: LocationName,
};



export type ScriptIncidentPlayer = {
    day: number,
    incident: Exclude<IncidentName, FakedIncident>
}
export function toPlayerIncident(params: ScriptIncident): ScriptIncidentPlayer {
    return {
        day: params.day,
        incident: Array.isArray(params.incident) ? params.incident[1] : params.incident,
    }

}

export function isScriptIncident(obj: unknown, omitCulprit: true): obj is ScriptIncidentPlayer;
export function isScriptIncident(obj: unknown): obj is ScriptIncident;
export function isScriptIncident(obj: unknown, omitCulprit?: true): obj is ScriptIncident {

    if (typeof obj !== 'object') {
        return false;
    }
    if (!obj) {
        return false;
    }

    if (!('day' in obj)) {
        return false;
    }
    if (typeof obj.day !== 'number') {
        return false;
    }

    if (!('incident' in obj)) {
        return false;
    }
    if (typeof obj.incident !== 'string' || !isIncidentName(obj.incident)) {
        return false;
    }

    if (!omitCulprit) {
        if (!('culprit' in obj)) {
            return false;
        }
        if ((typeof obj.culprit !== 'string' || !isCharacterName(obj.culprit)) &&
            (!Array.isArray(obj.culprit) || obj.culprit.length != 2 || !isLocationName(obj.culprit[0]) || typeof obj.culprit[1] != 'number')) {
            return false;
        }
    }

    return true;
}

export function isScriptIncidentWithoutCulprit(obj: unknown): obj is ScriptIncidentPlayer {
    return isScriptIncident(obj, true);
}

export function getRoleOfCast(scrtipt: Script, char: CharacterName): RoleName | undefined {
    const castObject = scrtipt.cast[char as keyof Script['cast']] as RoleName
        | readonly [RoleName];
    if (!castObject) {
        return undefined;
    }
    if (typeof castObject == 'string') {
        return castObject;
    }
    else {
        return castObject[0];
    }
}

export type Script = Scripts[keyof Scripts];
export type Scripts = typeof scripts;


export function isScript(obj: any): obj is Script {
console.log('is scripts')
    if (typeof obj == 'object'
        && !Array.isArray(obj)
        && 'title' in obj
    ) {

        return true;
    }
    return false;

}



type getCastOptions<T extends keyof TragedySets> = getCastOptions2<TragedySets[T]>
type getCastOptions2<t> = t extends Required<CastOptions> ? t['castOptions'] : readonly []
    ;
type getAdditionalRoles<t> = t extends { aditionalRoles: readonly RoleName[] } ? t['aditionalRoles'] : never
    ;

type roleToTragedySet<T extends keyof TragedySets> = 'Person' | getAdditionalRoles<TragedySets[T]>[never] | KeysOfUnion<Plots[TragedySets[T]['subPlots'][never]]['roles'] | Plots[TragedySets[T]['mainPlots'][never]]['roles']>;


type ScriptInternal = Union<{
    [k in keyof TragedySets]:
    {
        title: string,
        creator: string,
        set?: {
            name: string,
            number: number
        },
        difficultySets: readonly {
            numberOfLoops: number,
            difficulty: number,
        }[],
        tragedySet: TragedySets[k]['name'],
        mainPlot: readonly WithScriptSpecification<'plot', TragedySets[k]['mainPlots'][number]>[],
        subPlots: readonly WithScriptSpecification<'plot', TragedySets[k]['subPlots'][number]>[],
        daysPerLoop: number,
        cast: DefinitionRecord<'character', 'role', CharacterName, roleToTragedySet<k>, true, getCastOptions<k>>,
        castOptions?: Options,

        incidents: readonly ScriptIncident<k>[],
        specialRules?: string,
        specifics: string,
        story: string,
        mastermindHints: string,
    }
}>



export type ScriptName = keyof Scripts;

export const scripts = toRecord([
    ...data.scripts
] as const satisfies readonly ScriptInternal[], 'title');


export function isScriptName(name: string | undefined | null): name is ScriptName {
    if (!name) {
        return false;
    }
    return name in scripts;
}

