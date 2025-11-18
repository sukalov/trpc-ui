import { nodePropertiesFromRef } from "@src/parse/utils";
import type { ZodLiteralDef } from "../zod-types";
import type { LiteralNode, ParseFunction } from "../../../parseNodeTypes";

export const parseZodLiteralDef: ParseFunction<ZodLiteralDef, LiteralNode> = (
  def,
  refs,
) => {
  refs.addDataFunctions.addDescriptionIfExists(def as any, refs);
  return {
    type: "literal",
    value: (def as any).value,
    ...nodePropertiesFromRef(refs),
  };
};
