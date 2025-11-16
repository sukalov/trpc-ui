import { zodSelectorFunction } from "@src/parse/input-mappers/zod/selector";
import type {
  ParseReferences,
  ParsedInputNode,
} from "@src/parse/parseNodeTypes";
import type { ZodDefaultDef } from "zod/v3";
import { castToZodDefWithType } from "../zod-types";

export function parseZodDefaultDef(
  def: ZodDefaultDef,
  refs: ParseReferences,
): ParsedInputNode {
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  return zodSelectorFunction(castToZodDefWithType(def.innerType._def), refs);
}
