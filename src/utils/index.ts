export const getUniqueId = (prefix: unknown): string =>
  `${prefix ?? 'id'}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
