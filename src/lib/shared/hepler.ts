// EsVersions: 'es5' | 'es2015'
// CompilationTypes: 'preCompiled' | 'unCompiled'
// ZoneHandling: 'None' | 'Injected' | 'Shipped' | 'Scoped'
// ViewEncapsulation: 0 = Emulated | 1 = Native | 2 = None | 3 = ShadowDom
import {VariantConfig} from "../interfaces";

export function  toReadableEncapsulation(encapsulation: number = 3): string {
    if (encapsulation === 0) {
        return 'Emulated';
    }
    if (encapsulation === 1) {
        return 'Native';
    }
    if (encapsulation === 2) {
        return 'None';
    }
    if (encapsulation === 3) {
        return 'ShadowDom';
    }
    return 'WRONG ENCAPSULATION!!';
}
// ChangeDetection: 0 = OnPush | 1 = Default
export function toReadableChangeDetection(changeDetection: number = 0): string {
    if (changeDetection === 0) {
        return 'Default';
    }
    if (changeDetection === 1) {
        return 'OnPush';
    }
    return 'WRONG ChangeDetection!!';
}
// scriptsShipped: true | false
// polyfillsShipped: true | false
// runtimeShipped: true | false
export function toReadableBoolean(b: boolean = true): string {
    return b ? 'Yes' : 'No';
}

export function logVariantConfig(variant: VariantConfig) {
    console.log('VariantConfig:', variant.name);
    console.log('Encapsulation: ', toReadableEncapsulation(variant.encapsulation));
    console.log('ChangeDetection: ', toReadableChangeDetection(variant.changeDetection));
    console.log('CompilationType:', variant.compilation);
    console.log('ZoneHandling:', variant.zone);
    console.log('EsVersion:', variant.esVersion);
    console.log('BundleName:', variant.bundleName);
    console.log('OutputPath:', variant.outputPath);
    console.log('Polyfills Included:', toReadableBoolean(variant.polyfills));
    console.log('Scripts Included:', toReadableBoolean(variant.scripts));
    console.log('Runtime Included:', toReadableBoolean(variant.runtime));
}

