import { nodePropertiesFromRef } from "@src/parse/utils";
import type { ZodNumberDef } from "../zod-types";
import type { NumberNode, ParseFunction } from "../../../parseNodeTypes";

export const parseZodNumberDef: ParseFunction<ZodNumberDef, NumberNode> = (
  def,
  refs,
) => {
  refs.addDataFunctions.addDescriptionIfExists(def as any, refs);
  return {
    type: "number",
    ...nodePropertiesFromRef(refs),
  };
};
