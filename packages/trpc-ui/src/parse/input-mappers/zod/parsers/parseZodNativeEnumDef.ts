import { nodePropertiesFromRef } from "@src/parse/utils";
import type { ZodNativeEnumDef } from "../zod-types";
import type { EnumNode, ParseFunction } from "../../../parseNodeTypes";

export const parseZodNativeEnumDef: ParseFunction<ZodNativeEnumDef, EnumNode> = (
  def,
  refs,
) => {
  const values = Object.values((def as any).values);
  // Filter out numeric keys for string enums if needed, but ZodNativeEnum handles mixed/numeric enums.
  // For display, we just want values.
  // Zod stores the enum object in `values`.
  // We need to extract the actual values.
  // If it's a numeric enum, it has reverse mappings.
  const enumValues = values.filter((v) => typeof v === "string");

  refs.addDataFunctions.addDescriptionIfExists(def as any, refs);
  return { type: "enum", enumValues: enumValues as string[], ...nodePropertiesFromRef(refs) };
};
