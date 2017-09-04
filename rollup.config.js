export default {
  entry: './dist/index.js',
  dest: './dist/bundles/angular-component-double.umd.js',
  format: 'umd',
  moduleName: 'angular-component-double',
  globals: {
    '@angular/core': 'ng.core'
  }
}
