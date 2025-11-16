import type { ZodOptionalDef } from "zod/v3";
import type { ParseFunction, ParsedInputNode } from "../../../parseNodeTypes";
import { zodSelectorFunction } from "../selector";
import { castToZodDefWithType } from "../zod-types";

export const parseZodOptionalDef: ParseFunction<
  ZodOptionalDef,
  ParsedInputNode
> = (def, refs) => {
  const parsedInner = zodSelectorFunction(castToZodDefWithType(def.innerType._def), refs);
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  return {
    ...parsedInner,
    optional: true,
  };
};
