import type { CharacterName, Characters, LocationName } from "./characters";
import type { IncidentName, Incidents } from "./incidents";
import type { PlotName, Plots } from "./plots";
import type { RoleName, Roles } from "./roles";


type SpecificationType = 'location' | 'incident' | 'role' | 'character' | 'plot' | 'number' | 'text';

export type ScriptSpecified = { scriptSpecified?: readonly { name: string, type: SpecificationType }[] };

type NameDefinition<Type extends 'role' | 'character' | 'incident' | 'plot' | void> =
    Type extends 'role'
    ? RoleName
    : Type extends 'character'
    ? CharacterName
    : Type extends 'incident'
    ? IncidentName
    : Type extends 'plot'
    ? PlotName
    : never
    ;

type InstancesDefinition<Type extends 'role' | 'character' | 'incident' | 'plot' | void> =
    Type extends 'role'
    ? Roles
    : Type extends 'character'
    ? Characters
    : Type extends 'incident'
    ? Incidents
    : Type extends 'plot'
    ? Plots
    : never
    ;


type NotExtended<Type extends 'role' | 'character' | 'incident' | 'plot', Keys extends NameDefinition<Type>> =

    Type extends 'role'
    ? Keys extends NameDefinition<'role'>
    ? Roles[Keys] extends Required<ScriptSpecified> ? never : Roles[Keys]['name']
    : never

    : Type extends 'character'
    ? Keys extends NameDefinition<'character'>
    ? Characters[Keys] extends Required<ScriptSpecified> ? never : Characters[Keys]['name']
    : never

    : Type extends 'incident'
    ? Keys extends NameDefinition<'incident'>
    ? Incidents[Keys] extends Required<ScriptSpecified> ? never : Incidents[Keys]['name']
    : never


    : Type extends 'plot'
    ? Keys extends NameDefinition<'plot'>
    ? Plots[Keys] extends Required<ScriptSpecified> ? never : Plots[Keys]['name']
    : never
    : never
    ;

type Extended<Type extends 'role' | 'character' | 'incident' | 'plot', Keys extends NameDefinition<Type>> =

    Type extends 'role'
    ? Keys extends NameDefinition<'role'>
    ? Roles[Keys] extends Required<ScriptSpecified> ? Roles[Keys]['name'] : never
    : never

    : Type extends 'character'
    ? Keys extends NameDefinition<'character'>
    ? Characters[Keys] extends Required<ScriptSpecified> ? Characters[Keys]['name'] : never
    : never

    : Type extends 'incident'
    ? Keys extends NameDefinition<'incident'>
    ? Incidents[Keys] extends Required<ScriptSpecified> ? Incidents[Keys]['name'] : never
    : never


    : Type extends 'plot'
    ? Keys extends NameDefinition<'plot'>
    ? Plots[Keys] extends Required<ScriptSpecified> ? Plots[Keys]['name'] : never
    : never
    : never
    ;


type typeLookup<x extends string> =
    x extends 'location'
    ? LocationName
    : x extends 'incident'
    ? IncidentName
    : x extends 'role'
    ? RoleName
    : x extends 'character'
    ? CharacterName
    : x extends 'plot'
    ? PlotName
    : x extends 'number'
    ? number
    : x extends 'text'
    ? string : never;

export type DefinitionRecord<Key extends 'role' | 'character' | 'incident' | 'plot', Value extends 'role' | 'character' | 'incident' | 'plot', KeysKeys extends NameDefinition<Key> = NameDefinition<Key>, ValueKeys extends NameDefinition<Value> = NameDefinition<Value>, optional extends boolean = true> =
    optional extends true
    ? {
        [k in KeysKeys]?: Def<Value, ValueKeys, Key, k>
    } : {
        [k in KeysKeys]: Def<Value, ValueKeys, Key, k>
    };



type ToSpecification<Type extends 'role' | 'character' | 'incident' | 'plot', T> =
    T extends keyof InstancesDefinition<Type>
    ? InstancesDefinition<Type>[T] extends Required<ScriptSpecified>
    ? ToSpecificationObject<InstancesDefinition<Type>[T]['scriptSpecified'][number]>
    : never
    : never
    ;




type ToSpecificationTuple<Type extends 'role' | 'character' | 'incident' | 'plot', T, AdditionalArguments = object> =
    T extends keyof InstancesDefinition<Type>
    ? InstancesDefinition<Type>[T] extends Required<ScriptSpecified>
    ? readonly [T, ToSpecificationObject<InstancesDefinition<Type>[T]['scriptSpecified'][number]> & AdditionalArguments]
    : readonly [T, AdditionalArguments]
    : string
    ;



type Def<Type extends 'role' | 'character' | 'incident' | 'plot', Key extends NameDefinition<Type>, OtherType extends 'role' | 'character' | 'incident' | 'plot', OtherKey extends NameDefinition<OtherType>> =
    isSpecified<OtherType, OtherKey> extends true
    ? ToSpecificationTuple<Type, Key, ToSpecification<OtherType, OtherKey> & { 'Start Location'?: LocationName }>
    : ToSpecificationTuple<Type, Extended<Type, Key>, { 'Start Location'?: LocationName }> | NotExtended<Type, Key>
    | ToSpecificationTuple<Type, NotExtended<Type, Key>, { 'Start Location': LocationName }>
    ;

;

type ToSpecificationObject<T> =
    T extends { name: infer TName, type: infer type }
    ? TName extends string
    ? type extends SpecificationType
    // ? T extends { 'scriptSpecified': infer K } ? mapArray<K>
    ? { [z in TName]: typeLookup<type> }
    : object
    : object
    : object;






type isSpecified<Type extends 'role' | 'character' | 'incident' | 'plot', Id extends NameDefinition<Type>> =
    Type extends 'character'
    ? Id extends NameDefinition<'character'>
    ? Characters[Id] extends { 'scriptSpecified': any }
    ? true

    : false
    : false
    : false
    ;

// const xx: isSpecifiedAny<[['character','Boy Student'], ['role', "Person"]]>
