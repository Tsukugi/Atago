/**
 * Property types for game units
 */

export interface IPosition {
  x: number;
  y: number;
  z?: number; // Optional z-coordinate for 3D positioning
}

export interface IUnitPosition {
  unitId: string;
  mapId: string;
  position: IPosition;
}

export type PropertyScalar = string | number | boolean | null;
export type PropertyMap = Record<string, PropertyScalar>;
export type PropertyValue = PropertyScalar | IUnitPosition | PropertyMap;

export interface IProperty<T extends PropertyValue = PropertyValue> {
  name: string;
  value: T;
  baseValue?: T;
  modifiers?: PropertyModifier<T>[];
  readonly?: boolean;
}

export type PropertyModifier<T extends PropertyValue = PropertyValue> = {
  source: string; // Must be unique, identifier for the source of the modifier (e.g., item ID, buff name)
  value: T | ((current: T) => T);
  priority?: number; // Higher priority modifiers are applied later
};

export type IPropertyCollection = Record<string, IProperty<PropertyValue>>;

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
