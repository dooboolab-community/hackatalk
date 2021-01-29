/// <reference path="globals.d.ts" />

declare module 'fbt' {
  export const GenderConst: FBT.GenderConst;
  export const IntlVariations: FBT.IntlVariations;
  export const IntlViewerContext: FBT.IntlViewerContext;

  // These exports (Fbt*) isn't real! It is only syntax abstraction
  // https://github.com/facebookincubator/fbt/blob/8607c1f2798ef18c6142a2cf1c5a9351c6d7df69/transform/babel-plugin-fbt/FbtUtil.js#L28-L40
  export const FbtEnum: React.FC<{
    'enum-range': Array<string> | { [enumKey: string]: string };
    value: string;
  }>;
  export const FbtParam: React.FC<
    FBT.ParamOptions & { name: string; children: React.ReactNode }
  >;
  export const FbtPlural: React.FC<
    FBT.PluralOptions & { count: number; children: string }
  >;
  export const FbtPronoun: React.FC<
    FBT.PronounOptions & {
      type: FBT.PronounType;
      gender: FBT.GenderConstValues;
    }
  >;
  export const FbtName: React.FC<
    Omit<FBT.ParamOptions, 'gender'> & {
      name: string;
      gender: FBT.IntlVariationsGenderValues;
      children: React.ReactNode;
    }
  >;
  export const FbtSameParam: React.FC<{
    name: string;
  }>;

  export interface Fbt {
    (source: string, desc: string, options?: FBT.Options): FBT.FbtResult;

    param(
      paramName: string,
      value: any,
      options?: FBT.ParamOptions,
    ): FBT.FbtResult;
    sameParam(paramName: string): FBT.FbtResult;
    name(name: string, gender: FBT.IntlVariationsGenderValues): FBT.FbtResult;
    plural(
      singularPhrase: string,
      count: number,
      options?: FBT.PluralOptions,
    ): FBT.FbtResult;
    enum<
      Range extends { [enumKey: string]: string },
      RangeKeys extends keyof Range
    >(
      enumKey: RangeKeys,
      enumRange: Range,
    ): FBT.FbtResult;
    enum(index: string, enumRange: Array<string>): FBT.FbtResult;
    pronoun(
      type: FBT.PronounType,
      gender: FBT.GenderConstValues,
      options: FBT.PronounOptions,
    ): FBT.FbtResult;
  }

  export const init: (options: { translations: FBT.Translations, hooks: { getViewerContext: () => any} }) => void;

  export const fbt: Fbt;
}

declare namespace JSX {
  interface IntrinsicElements {
    fbt: any;
  }
}
