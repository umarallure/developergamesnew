import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // React Three Fiber's per-frame model (useFrame) works by mutating
    // preallocated three.js objects and shared frame-state outside React's
    // render cycle — the intended pattern for real-time WebGL, and exactly
    // what keeps this scene allocation- and re-render-free. The compiler
    // immutability lint cannot model this; React Compiler itself bails on
    // these components. Scoped to the WebGL scene only.
    files: ["src/components/skill-core/**"],
    rules: {
      "react-hooks/immutability": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
