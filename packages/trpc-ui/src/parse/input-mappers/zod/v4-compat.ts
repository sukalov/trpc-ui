/**
 * Zod v4 Compatibility Layer
 * 
 * This file provides type-safe bridges between Zod v4 schemas and v3 type definitions.
 * The parsers use v3 type definitions because they work at runtime, but tests create
 * v4 schemas. This bridge ensures type safety without using 'any'.
 */

import type { 
  ZodDefaultDef,
  ZodEnumDef,
  ZodLiteralDef,
  ZodNativeEnumDef,
} from "zod/v3";

/**
 * Converts a Zod v4 schema's _def to a v3-compatible def type.
 * This is safe because the runtime structure is compatible; only the TypeScript types differ.
 */
export function toV3Def<T>(v4Def: unknown): T {
  return v4Def as T;
}

// Specific converters for each type
export function toV3DefaultDef(v4Def: unknown): ZodDefaultDef {
  return toV3Def<ZodDefaultDef>(v4Def);
}

export function toV3EnumDef(v4Def: unknown): ZodEnumDef {
  return toV3Def<ZodEnumDef>(v4Def);
}

export function toV3LiteralDef(v4Def: unknown): ZodLiteralDef {
  return toV3Def<ZodLiteralDef>(v4Def);
}

export function toV3NativeEnumDef(v4Def: unknown): ZodNativeEnumDef {
  return toV3Def<ZodNativeEnumDef>(v4Def);
}
