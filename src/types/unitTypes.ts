import type { IProperty, IPropertyCollection, PropertyType } from './propertyTypes';

export interface IUnit {
  id: string;
  name: string;
  type: string;
  properties: IPropertyCollection;

  // Property management
  getProperty<T = any>(name: string): IProperty<T> | undefined;
  getPropertyValue<T = any>(name: string): T | undefined;
  requireProperty<T = any>(name: string): IProperty<T>;
  requirePropertyValue<T = any>(name: string): T;
  setProperty<T = any>(name: string, value: T, type?: PropertyType): void;
  setBaseProperty<T = any>(name: string, baseValue: T, type?: PropertyType): void;
  addPropertyModifier<T = any>(propertyName: string, modifier: import('./propertyTypes').PropertyModifier<T>): void;
  removePropertyModifier(propertyName: string, source: string): void;

  // Lifecycle
  update(deltaTime: number): void;
  destroy(): void;
}