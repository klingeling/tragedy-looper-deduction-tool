import type { SetIntersection } from "utility-types";
import { type KeysOfUnion, type Union, toRecord } from "../misc";
import { isCharacterName, type CharacterName, type LocationName, isLocationName } from "./characters";
import type { DefinitionRecord, Options, WithScriptSpecification } from "./core";
import { isIncidentName, type IncidentName, type FakedIncident, type MobIncident, isIncident } from "./incidents";
import { isPlotName, type Plots } from "./plots";
import { isRoleName, type RoleName } from "./roles";
import { isTragedySetName, type CastOptions, type TragedySets } from "./tragedySets";

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


export function isScript(obj: object): obj is Script {
    if (typeof obj == 'object'
        && !Array.isArray(obj)
        && 'title' in obj
        && typeof obj.title == 'string'
        && 'creator' in obj
        && typeof obj.creator == 'string'
        && (!('set' in obj)
            || (typeof obj.set == 'object'
                && obj.set !== null
                && 'name' in obj.set && typeof obj.set.name == 'string'
                && 'number' in obj.set && typeof obj.set.number == 'number')
        )
        && 'difficultySets' in obj
        && Array.isArray(obj.difficultySets)
        && obj.difficultySets.every((e: object) => typeof e == 'object'
            && e !== null
            && 'numberOfLoops' in e
            && typeof e.numberOfLoops == 'number'
            && 'difficulty' in e
            && typeof e.difficulty == 'number'
        )
        && 'tragedySet' in obj
        && typeof obj.tragedySet == 'string'
        && isTragedySetName(obj.tragedySet)
        && 'mainPlot' in obj
        && Array.isArray(obj.mainPlot)
        && obj.mainPlot.every(isPlotName)
        && 'subPlots' in obj
        && Array.isArray(obj.subPlots)
        && obj.subPlots.every(isPlotName)
        && 'daysPerLoop' in obj
        && 'cast' in obj
        && typeof obj.cast == 'object'
        && obj.cast !== null
        && Object.keys(obj.cast).every(isCharacterName)
        && Object.values(obj.cast).every((value: unknown) => {
            if (typeof value == 'string') {
                return isRoleName(value);
            } else if (Array.isArray(value) && typeof value[0] == 'string') {
                return isRoleName(value[0]) && typeof value[1] == 'object' && value[1] !== null && Object.keys(value[1]).every(x => typeof x == 'string');
            }
        })
        && 'incidents' in obj
        && Array.isArray(obj.incidents)
        && obj.incidents.every(x => isScriptIncident(x))
        && (!('specialRules' in obj)
            || (typeof obj.specialRules == 'object'
                && Array.isArray(obj.specialRules)
                && obj.specialRules.every(x => typeof x == 'string')
            )
        )
        && 'specifics' in obj
        && typeof obj.specifics == 'string'
        && 'story' in obj
        && typeof obj.story == 'string'
        && 'mastermindHints' in obj
        && typeof obj.mastermindHints == 'string'
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
        specialRules?: readonly string[],
        specifics: string,
        story: string,
        mastermindHints: string,
    }
}>


export type ScriptName = keyof Scripts;

export const scripts = toRecord([
    ...data.scripts.filter(x => isScript(x))
] as const satisfies readonly ScriptInternal[], 'title');


export function isScriptName(name: string | undefined | null): name is ScriptName {
    if (!name) {
        return false;
    }
    return name in scripts;
}

