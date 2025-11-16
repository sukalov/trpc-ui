import { parseZodBigIntDef } from "@src/parse/input-mappers/zod/parsers/parseZodBigIntDef";
import { parseZodBrandedDef } from "@src/parse/input-mappers/zod/parsers/parseZodBrandedDef";
import { parseZodDefaultDef } from "@src/parse/input-mappers/zod/parsers/parseZodDefaultDef";
import { parseZodEffectsDef } from "@src/parse/input-mappers/zod/parsers/parseZodEffectsDef";
import { parseZodNullDef } from "@src/parse/input-mappers/zod/parsers/parseZodNullDef";
import { parseZodNullableDef } from "@src/parse/input-mappers/zod/parsers/parseZodNullableDef";
import { parseZodOptionalDef } from "@src/parse/input-mappers/zod/parsers/parseZodOptionalDef";
import { parseZodUndefinedDef } from "@src/parse/input-mappers/zod/parsers/parseZodUndefinedDef";
import { parseZodUnionDef } from "@src/parse/input-mappers/zod/parsers/parseZodUnionDef";
import {
  type ZodArrayDef,
  type ZodBigIntDef,
  type ZodBooleanDef,
  type ZodBrandedDef,
  type ZodDefaultDef,
  type ZodEffectsDef,
  type ZodEnumDef,
  type ZodLiteralDef,
  type ZodNativeEnumDef,
  type ZodNullDef,
  type ZodNullableDef,
  type ZodNumberDef,
  type ZodObjectDef,
  type ZodOptionalDef,
  type ZodStringDef,
  type ZodUndefinedDef,
  type ZodUnionDef,
  type ZodVoidDef,
} from "zod/v3";
import type { ParserSelectorFunction } from "../../parseNodeTypes";
import { parseZodArrayDef } from "./parsers/parseZodArrayDef";
import { parseZodBooleanFieldDef } from "./parsers/parseZodBooleanFieldDef";
import {
  type ZodDiscriminatedUnionDefUnversioned,
  parseZodDiscriminatedUnionDef,
} from "./parsers/parseZodDiscriminatedUnionDef";
import { parseZodEnumDef } from "./parsers/parseZodEnumDef";
import { parseZodLiteralDef } from "./parsers/parseZodLiteralDef";
import { parseZodNativeEnumDef } from "./parsers/parseZodNativeEnumDef";
import { parseZodNumberDef } from "./parsers/parseZodNumberDef";
import { parseZodObjectDef } from "./parsers/parseZodObjectDef";
import { parseZodStringDef } from "./parsers/parseZodStringDef";
import { parseZodVoidDef } from "./parsers/parseZodVoidDef";
import type { ZodDefWithType } from "./zod-types";

export const zodSelectorFunction: ParserSelectorFunction<ZodDefWithType> = (
  def,
  references,
) => {
  // Zod v4 uses def.type (string) instead of def.typeName (enum)
  // Please keep these in alphabetical order
  switch (def.type) {
    case "array":
      return parseZodArrayDef(def as unknown as ZodArrayDef, references);
    case "bigint":
      return parseZodBigIntDef(def as unknown as ZodBigIntDef, references);
    case "boolean":
      return parseZodBooleanFieldDef(def as unknown as ZodBooleanDef, references);
    case "default":
      return parseZodDefaultDef(def as unknown as ZodDefaultDef, references);
    case "enum":
      if ("values" in def && Array.isArray(def.values)) {
        return parseZodEnumDef(def as unknown as ZodEnumDef, references);
      }
      return parseZodNativeEnumDef(def as unknown as ZodNativeEnumDef, references);
    case "literal":
      return parseZodLiteralDef(def as unknown as ZodLiteralDef, references);
    case "null":
      return parseZodNullDef(def as unknown as ZodNullDef, references);
    case "nullable":
      return parseZodNullableDef(def as unknown as ZodNullableDef, references);
    case "number":
      return parseZodNumberDef(def as unknown as ZodNumberDef, references);
    case "object":
      return parseZodObjectDef(def as unknown as ZodObjectDef, references);
    case "optional":
      return parseZodOptionalDef(def as unknown as ZodOptionalDef, references);
    case "pipe":
      return parseZodEffectsDef(def as unknown as ZodEffectsDef, references);
    case "string":
      if ("brand" in def) {
        return parseZodBrandedDef(def as unknown as ZodBrandedDef<any>, references);
      }
      return parseZodStringDef(def as unknown as ZodStringDef, references);
    case "undefined":
      return parseZodUndefinedDef(def as unknown as ZodUndefinedDef, references);
    case "union":
      if ("discriminator" in def) {
        return parseZodDiscriminatedUnionDef(
          def as unknown as ZodDiscriminatedUnionDefUnversioned,
          references,
        );
      }
      return parseZodUnionDef(def as unknown as ZodUnionDef, references);
    case "void":
      return parseZodVoidDef(def as unknown as ZodVoidDef, references);
  }
  return { type: "unsupported", path: references.path };
};
