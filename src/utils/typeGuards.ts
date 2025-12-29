import type { IPosition, IUnitPosition } from '../types';

export const isPosition = (value: unknown): value is IPosition =>
  typeof value === 'object' &&
  value !== null &&
  typeof (value as { x?: unknown }).x === 'number' &&
  typeof (value as { y?: unknown }).y === 'number';

export const isUnitPosition = (value: unknown): value is IUnitPosition => {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<IUnitPosition>;
  return (
    typeof candidate.unitId === 'string' &&
    typeof candidate.mapId === 'string' &&
    isPosition(candidate.position)
  );
};
