import type { ZodOptionalDef } from "../zod-types";
import type { ParseFunction, ParsedInputNode } from "../../../parseNodeTypes";
import { zodSelectorFunction } from "../selector";

export const parseZodOptionalDef: ParseFunction<
  ZodOptionalDef,
  ParsedInputNode
> = (def, refs) => {
  const parsedInner = zodSelectorFunction(def.innerType._def, refs);
  refs.addDataFunctions.addDescriptionIfExists(def as any, refs);
  return {
    ...parsedInner,
    optional: true,
  };
};
