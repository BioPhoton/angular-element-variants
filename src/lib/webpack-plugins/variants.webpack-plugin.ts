import {getVariantConfig, postCliBuild, setupBundles} from './plugin.utils';
import {VariantSet} from '../shared';

export function getVariantsPlugin(variants: VariantSet): { config?: any, post?: any, pre?: any } {
    return {
        config(cfg: any, options: any) {
            return setupBundles(cfg, getVariantConfig(options, variants));
        },
        post(options: any) {
            // skip post bundling for serve scripts
            if (options.host !== 'localhost') {
                return postCliBuild(getVariantConfig(options, variants));
            }
        }
    };
}
