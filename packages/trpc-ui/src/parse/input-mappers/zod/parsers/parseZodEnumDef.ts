import { nodePropertiesFromRef } from "@src/parse/utils";
import type { ZodEnumDef } from "../zod-types";
import type { EnumNode, ParseFunction } from "../../../parseNodeTypes";

export const parseZodEnumDef: ParseFunction<ZodEnumDef, EnumNode> = (
  def,
  refs,
) => {
  const values = (def as any).values;
  refs.addDataFunctions.addDescriptionIfExists(def as any, refs);
  return { type: "enum", enumValues: values, ...nodePropertiesFromRef(refs) };
};
