export function setupGlobalCompilerOptions(compilerOptions: any): void {
  (window as any).globalCompilerOptions = {};
  const globalCompilerOptions = (window as any).globalCompilerOptions;
  // tslint:disable-next-line:no-unused-expression
  compilerOptions.ngZone && (globalCompilerOptions.ngZone = compilerOptions.ngZone);
  // tslint:disable-next-line:no-unused-expression
  compilerOptions.injector && (globalCompilerOptions.injector = compilerOptions.injector);
  console.log('Consumer provided globalCompilerOptions: ', globalCompilerOptions);
}
