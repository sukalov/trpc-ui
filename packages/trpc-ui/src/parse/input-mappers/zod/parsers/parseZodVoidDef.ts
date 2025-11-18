import type { LiteralNode, ParseReferences } from "@src/parse/parseNodeTypes";
export type ZodVoidDef = {
  typeName: "ZodVoid";
};

export function parseZodVoidDef(
  def: ZodVoidDef, // Changed parameter name from '_' to 'def' to allow its use
  refs: ParseReferences,
): LiteralNode {
  refs.addDataFunctions.addDescriptionIfExists(def as any, refs);
  return {
    type: "literal",
    value: undefined,
    path: refs.path,
  };
}
