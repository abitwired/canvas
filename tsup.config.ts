import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"], // Build for CommonJS and ES modules
  dts: true, // Generate declaration file (.d.ts)
  splitting: false,
  sourcemap: true,
  clean: true,
  target: "esnext",
  minify: true,
  ignoreWatch: ["**/.git", "**/node_modules", "dist"],
});