import {
  ZodArray,
  ZodBigInt,
  ZodBoolean,
  ZodDefault,
  ZodEnum,
  ZodLiteral,
  nativeEnum,
  ZodNull,
  ZodNullable,
  ZodNumber,
  ZodObject,
  ZodOptional,
  ZodPromise,
  ZodString,
  ZodUndefined,
  ZodUnion,
  ZodVoid,
  ZodPipe,
  ZodDiscriminatedUnion,
  type ZodType,
} from "zod";

export type ZodTypeDef = ZodType["_def"];
export type ZodDefWithType = ZodTypeDef & { typeName: string };

export type ZodArrayDef = ZodArray<any>["_def"];
export type ZodBigIntDef = ZodBigInt["_def"];
export type ZodBooleanDef = ZodBoolean["_def"];
export type ZodDefaultDef = ZodDefault<any>["_def"];
export type ZodEnumDef = ZodEnum<any>["_def"];
export type ZodLiteralDef = ZodLiteral<any>["_def"];
export type ZodNativeEnum = ReturnType<typeof nativeEnum>;
export type ZodNativeEnumDef = ZodNativeEnum["_def"];
export type ZodNullDef = ZodNull["_def"];

export type ZodNullableDef = ZodNullable<any>["_def"];
export type ZodNumberDef = ZodNumber["_def"];
export type ZodObjectDef = ZodObject<any>["_def"];
export type ZodOptionalDef = ZodOptional<any>["_def"];
export type ZodPromiseDef = ZodPromise<any>["_def"];
export type ZodStringDef = ZodString["_def"];
export type ZodUndefinedDef = ZodUndefined["_def"];
export type ZodUnionDef = ZodUnion<any>["_def"];
export type ZodVoidDef = ZodVoid["_def"];
export type ZodPipeDef = ZodPipe<any, any>["_def"];
export type ZodDiscriminatedUnionDef = ZodDiscriminatedUnion<any, any>["_def"];

