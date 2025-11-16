import { nodePropertiesFromRef } from "@src/parse/utils";
import type { ZodNativeEnumDef } from "zod/v3";
import type { EnumNode, ParseFunction } from "../../../parseNodeTypes";

export const parseZodNativeEnumDef: ParseFunction<
  ZodNativeEnumDef,
  EnumNode
> = (def, refs) => {
  // Zod v4 uses 'entries' instead of 'values'
  const defAny = def as unknown as { values?: Record<string, string>; entries?: Record<string, string> };
  const enumObj = defAny.values || defAny.entries || {};
  const values = Object.values(enumObj) as string[];
  
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  return { type: "enum", enumValues: values, ...nodePropertiesFromRef(refs) };
};
