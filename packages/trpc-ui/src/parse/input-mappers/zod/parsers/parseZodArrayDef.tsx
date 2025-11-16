import { nodePropertiesFromRef } from "@src/parse/utils";
import type { ZodArrayDef } from "zod/v3";
import type { ArrayNode, ParseFunction } from "../../../parseNodeTypes";
import { zodSelectorFunction } from "../selector";
import { castToZodDefWithType } from "../zod-types";

// Extend ZodArrayDef to include runtime properties
type ZodArrayDefWithElement = ZodArrayDef & {
  element: { def: unknown };
};

export const parseZodArrayDef: ParseFunction<ZodArrayDef, ArrayNode> = (
  def,
  refs,
) => {
  const { element } = def as ZodArrayDefWithElement;
  const childType = zodSelectorFunction(castToZodDefWithType(element.def), { ...refs, path: [] });
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  return {
    type: "array",
    childType,
    ...nodePropertiesFromRef(refs),
  };
};
