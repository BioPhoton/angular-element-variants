import { json } from '@angular-devkit/core';

type TargetOptionsMergeStrategy = 'replace';
export type TargetOptionsMergeStrategies = { [field: string]: TargetOptionsMergeStrategy };

export function mergeTargetOptions(
  targetOptionsBase: json.JsonObject,
  targetOptionsApply: json.JsonObject,
  mergeStrategies: TargetOptionsMergeStrategies = {},
  replacePlugins = false
): { [key: string]: any } {
  const parsedOptionsToApply = Object.entries(targetOptionsApply)

    .filter(([_, value]) => value !== undefined)
    .reduce((acc, [key, value]) => ({ ...acc, [key as any]: value }), {});
  const mergedTargetOption = {
    ...targetOptionsBase,
    ...parsedOptionsToApply,
  };
  // special cases here

  return mergedTargetOption;
}
