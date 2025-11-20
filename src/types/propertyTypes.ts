/**
 * Property types for game units
 */

export interface IProperty<T = any> {
  name: string;
  value: T;
  baseValue?: T;
  modifiers?: PropertyModifier<T>[];
  readonly?: boolean;
}

export type PropertyModifier<T> = {
  source: string; // Must be unique, identifier for the source of the modifier (e.g., item ID, buff name)
  value: T | ((current: T) => T);
  priority?: number; // Higher priority modifiers are applied later
};

export type PropertyValue = string | number | boolean | object | null;

export interface IPropertyCollection {
  [key: string]: IProperty;
}

export type PropertyType =
  | 'health'
  | 'attack'
  | 'defense'
  | 'speed'
  | 'mana'
  | 'level'
  | 'experience'
  | 'position'
  | 'trait' // For character traits like depressive, jealous, honest
  | 'custom';

// Character trait types
export type CharacterTrait =
  | 'depressive'
  | 'jealous'
  | 'honest'
  | 'brave'
  | 'cowardly'
  | 'generous'
  | 'greedy'
  | 'loyal'
  | 'deceitful'
  | 'calm'
  | 'angry'
  | 'optimistic'
  | 'pessimistic'
  | 'shy'
  | 'outgoing'
  | 'curious'
  | 'lazy'
  | 'diligent'
  | 'patient'
  | 'impatient'
  | string; // Allow custom traits as well

export interface ICharacterTraitProperty extends IProperty<boolean> {
  traitType: CharacterTrait;
}
