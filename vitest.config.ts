import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: ["**/fixtures/**/*", "dist", "node_modules"],
  },
});
