export type ZodDefWithType = {
  type: string;
  [key: string]: unknown;
};

export function castToZodDefWithType(def: unknown): ZodDefWithType {
  return def as unknown as ZodDefWithType;
}
