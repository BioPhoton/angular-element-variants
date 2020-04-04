export function setupGlobalCompilerOptions(compilerOptions: any): void {
  (window as any).globalCompilerOptions = {};
  const globalCompilerOptions = (window as any).globalCompilerOptions;
  compilerOptions.ngZone && (globalCompilerOptions.ngZone = compilerOptions.ngZone);
  compilerOptions.injector && (globalCompilerOptions.injector = compilerOptions.injector);
}
