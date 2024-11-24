import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist', // Ensure this matches the root of TypeScript's outDir
      format: 'cjs',
      sourcemap: true,
      entryFileNames: '[name].cjs.js',
    },
    {
      dir: 'dist',
      format: 'esm',
      sourcemap: true,
      entryFileNames: '[name].esm.js',
    },
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json', // Use your updated tsconfig.json
    }),
    postcss({
      extract: true, // Extract CSS to a separate file
      minimize: true, // Minify the CSS
    }),
  ],
  external: ['react'],
};
