import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
// import postcss from '@rollup/plugin-postcss'; // CSS handling
// import image from '@rollup/plugin-image'; // Image handling
import babel from '@rollup/plugin-babel';
import sucrase from '@rollup/plugin-sucrase';
import css from 'rollup-plugin-import-css'

export default {
  input: 'src/index.ts',  // Entry file

  output: [{
    file: 'dist/index.cjs.js',
    format: 'cjs',  // CommonJS format
    sourcemap: true
  },{
    file: 'dist/index.esm.js',
    format: 'esm',  // CommonJS format
    sourcemap: true
  }],
  plugins: [
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx']  // Resolve these extensions
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',  // Path to your tsconfig
      exclude: ['node_modules/**']
    }),
    sucrase({
      exclude: ['node_modules/**'],
      transforms: ['typescript', 'jsx'],
    }),
    css(),
    json(),
    // postcss({
    //   extensions: ['.css'],
    //   plugins: [
    //     require('autoprefixer'),  // Auto-prefix CSS
    //   ]
    // }),
    // image(),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env', '@babel/preset-react']
    }),
  ],
  external: ['react', 'react-dom'],  // Ensure React and ReactDOM are not bundled
 
};
