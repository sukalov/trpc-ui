import { zodSelectorFunction } from "@src/parse/input-mappers/zod/selector";
import type {
  ParseReferences,
  ParsedInputNode,
} from "@src/parse/parseNodeTypes";
import type { AnyZodObject, ZodBrandedDef } from "zod/v3";
import { castToZodDefWithType } from "../zod-types";

export function parseZodBrandedDef(
  def: ZodBrandedDef<AnyZodObject>,
  refs: ParseReferences,
): ParsedInputNode {
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  return zodSelectorFunction(castToZodDefWithType(def.type._def), refs);
}
