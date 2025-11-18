import { nodePropertiesFromRef } from "@src/parse/utils";
import type { ZodArrayDef } from "../zod-types";
import type { ArrayNode, ParseFunction } from "../../../parseNodeTypes";
import { zodSelectorFunction } from "../selector";

export const parseZodArrayDef: ParseFunction<ZodArrayDef, ArrayNode> = (
  def,
  refs,
) => {
  const d = def as any;
  const type = d.type || d.element;
  const childType = zodSelectorFunction(type._def, { ...refs, path: [] });
  refs.addDataFunctions.addDescriptionIfExists(def as any, refs);
  return {
    type: "array",
    childType,
    ...nodePropertiesFromRef(refs),
  };
};
