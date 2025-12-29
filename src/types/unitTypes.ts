import type {
  IProperty,
  IPropertyCollection,
  PropertyType,
  PropertyValue,
  PropertyModifier
} from './propertyTypes';

export interface IUnit {
  id: string;
  name: string;
  type: string;
  properties: IPropertyCollection;

  // Property management
  getProperty<T extends PropertyValue = PropertyValue>(name: string): IProperty<T> | undefined;
  getPropertyValue<T extends PropertyValue = PropertyValue>(name: string): T | undefined;
  requireProperty<T extends PropertyValue = PropertyValue>(name: string): IProperty<T>;
  requirePropertyValue<T extends PropertyValue = PropertyValue>(name: string): T;
  setProperty<T extends PropertyValue = PropertyValue>(name: string, value: T, type?: PropertyType): void;
  setBaseProperty<T extends PropertyValue = PropertyValue>(name: string, baseValue: T, type?: PropertyType): void;
  addPropertyModifier<T extends PropertyValue = PropertyValue>(propertyName: string, modifier: PropertyModifier<T>): void;
  removePropertyModifier(propertyName: string, source: string): void;

  // Lifecycle
  update(deltaTime: number): void;
  destroy(): void;
}
