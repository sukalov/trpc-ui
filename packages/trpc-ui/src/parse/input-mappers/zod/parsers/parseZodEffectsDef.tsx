import { zodSelectorFunction } from "@src/parse/input-mappers/zod/selector";
import type {
  ParseReferences,
  ParsedInputNode,
} from "@src/parse/parseNodeTypes";
import type { ZodEffectsDef } from "zod/v3";
import { castToZodDefWithType } from "../zod-types";

export function parseZodEffectsDef(
  def: ZodEffectsDef,
  refs: ParseReferences,
): ParsedInputNode {
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  
  // Zod v4 uses 'in' property for pipe type, v3 uses 'schema'
  const defAny = def as unknown as { 
    schema?: { _def: unknown }; 
    in?: { def: unknown } 
  };
  
  const innerDef = defAny.schema?._def || defAny.in?.def;
  
  if (!innerDef) {
    throw new Error('Unable to parse ZodEffects: neither schema._def nor in.def found');
  }
  
  return zodSelectorFunction(castToZodDefWithType(innerDef), refs);
}
