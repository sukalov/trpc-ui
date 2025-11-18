import { parseZodBigIntDef } from "@src/parse/input-mappers/zod/parsers/parseZodBigIntDef";

import { parseZodDefaultDef } from "@src/parse/input-mappers/zod/parsers/parseZodDefaultDef";
import { parseZodEffectsDef } from "@src/parse/input-mappers/zod/parsers/parseZodEffectsDef";
import { parseZodNullDef } from "@src/parse/input-mappers/zod/parsers/parseZodNullDef";
import { parseZodNullableDef } from "@src/parse/input-mappers/zod/parsers/parseZodNullableDef";
import { parseZodOptionalDef } from "@src/parse/input-mappers/zod/parsers/parseZodOptionalDef";
import { parseZodPromiseDef } from "@src/parse/input-mappers/zod/parsers/parseZodPromiseDef";
import { parseZodUndefinedDef } from "@src/parse/input-mappers/zod/parsers/parseZodUndefinedDef";
import { parseZodUnionDef } from "@src/parse/input-mappers/zod/parsers/parseZodUnionDef";

import type { ParserSelectorFunction } from "../../parseNodeTypes";
import { parseZodArrayDef } from "./parsers/parseZodArrayDef";
import { parseZodBooleanFieldDef } from "./parsers/parseZodBooleanFieldDef";
import { parseZodDiscriminatedUnionDef } from "./parsers/parseZodDiscriminatedUnionDef";
import { parseZodEnumDef } from "./parsers/parseZodEnumDef";
import { parseZodLiteralDef } from "./parsers/parseZodLiteralDef";
import { parseZodNativeEnumDef } from "./parsers/parseZodNativeEnumDef";
import { parseZodNumberDef } from "./parsers/parseZodNumberDef";
import { parseZodObjectDef } from "./parsers/parseZodObjectDef";
import { parseZodStringDef } from "./parsers/parseZodStringDef";
import { parseZodVoidDef } from "./parsers/parseZodVoidDef";
import type {
  ZodArrayDef,
  ZodBigIntDef,
  ZodBooleanDef,
  ZodDefaultDef,
  ZodDefWithType,
  ZodDiscriminatedUnionDef,
  ZodEnumDef,
  ZodLiteralDef,
  ZodNativeEnumDef,
  ZodNullDef,
  ZodNullableDef,
  ZodNumberDef,
  ZodObjectDef,
  ZodOptionalDef,
  ZodPipeDef,
  ZodPromiseDef,
  ZodStringDef,
  ZodUndefinedDef,
  ZodUnionDef,
} from "./zod-types";

export const zodSelectorFunction: ParserSelectorFunction<ZodDefWithType> = (
  def,
  references,
) => {
  // const optional = isZodOptional(zodAny);
  // const unwrappedOptional = optional ? zodAny._def.innerType : zodAny;
  // Please keep these in alphabetical order
  console.log("zodSelectorFunction def:", def);
  switch (def.typeName) {
    case "ZodArray":
      return parseZodArrayDef(def as unknown as ZodArrayDef, references);
    case "ZodBoolean":
      return parseZodBooleanFieldDef(def as unknown as ZodBooleanDef, references);
    case "ZodDiscriminatedUnion":
      return parseZodDiscriminatedUnionDef(
        // Zod had some type changes between 3.19 -> 3.20 and we want to support both, not sure there's a way
        // to avoid this.
        def as unknown as ZodDiscriminatedUnionDef,
        references,
      );
    case "ZodEnum":
      return parseZodEnumDef(def as unknown as ZodEnumDef, references);
    case "ZodNativeEnum":
      return parseZodNativeEnumDef(def as unknown as ZodNativeEnumDef, references);
    case "ZodLiteral":
      return parseZodLiteralDef(def as unknown as ZodLiteralDef, references);
    case "ZodNumber":
      return parseZodNumberDef(def as unknown as ZodNumberDef, references);
    case "ZodObject":
      return parseZodObjectDef(def as unknown as ZodObjectDef, references);
    case "ZodOptional":
      return parseZodOptionalDef(def as unknown as ZodOptionalDef, references);
    case "ZodString":
      return parseZodStringDef(def as unknown as ZodStringDef, references);
    case "ZodNullable":
      return parseZodNullableDef(def as unknown as ZodNullableDef, references);
    case "ZodBigInt":
      return parseZodBigIntDef(def as unknown as ZodBigIntDef, references);
    // case "ZodBranded":
    //   return parseZodBrandedDef(def as ZodBrandedDef<any>, references);
    case "ZodDefault":
      return parseZodDefaultDef(def as unknown as ZodDefaultDef, references);
    case "ZodEffects": // Keep for backward compat if needed, but Zod 4 uses ZodPipe
    case "ZodPipe":
      return parseZodEffectsDef(def as unknown as ZodPipeDef, references);
    case "ZodNull":
      return parseZodNullDef(def as unknown as ZodNullDef, references);
    case "ZodPromise":
      return parseZodPromiseDef(def as unknown as ZodPromiseDef, references);
    case "ZodUndefined":
      return parseZodUndefinedDef(def as unknown as ZodUndefinedDef, references);
    case "ZodUnion":
      return parseZodUnionDef(def as unknown as ZodUnionDef, references);
    case "ZodVoid":
      return parseZodVoidDef(def as any, references);
  }
  return { type: "unsupported", path: references.path };
};
