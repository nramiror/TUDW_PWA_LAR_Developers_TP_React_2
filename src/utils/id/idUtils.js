/** Crea un Set de IDs desde un array de IDs */
export const createIdSetFromArray = (ids) => new Set(ids.map((id) => String(id)));

/** Crea un Set de IDs extrayendo de objetos */
export const createIdSetFromObjects = (objects) =>
  new Set(objects.map((obj) => String(obj.id)));

/** Convierte un Set a Array */
export const setToArray = (set) => Array.from(set);
