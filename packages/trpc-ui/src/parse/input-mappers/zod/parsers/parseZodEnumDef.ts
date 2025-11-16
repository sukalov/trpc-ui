import { nodePropertiesFromRef } from "@src/parse/utils";
import type { ZodEnumDef } from "zod/v3";
import type { EnumNode, ParseFunction } from "../../../parseNodeTypes";

export const parseZodEnumDef: ParseFunction<ZodEnumDef, EnumNode> = (
  def,
  refs,
) => {
  // Zod v4 uses 'entries' (object) instead of 'values' (array)
  const defAny = def as unknown as { values?: string[]; entries?: Record<string, string> };
  const values = defAny.values || (defAny.entries ? Object.values(defAny.entries) : []);
  
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  return { type: "enum", enumValues: values, ...nodePropertiesFromRef(refs) };
};
