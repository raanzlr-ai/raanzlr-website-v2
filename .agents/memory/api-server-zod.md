---
name: API server zod import
description: How to import zod in the api-server — esbuild cannot resolve zod/v4 subpath
---

## Rule
In `artifacts/api-server/src/`, always import zod as:
```ts
import { z } from "zod";
```
Never `from "zod/v4"` — esbuild fails to resolve that subpath export during the build step.

Also: `zod` must be listed as an explicit `dependency` in `artifacts/api-server/package.json`. It is not inherited from the workspace catalog automatically for server bundles.

**Why:** The api-server uses esbuild (not tsc) to bundle. The `zod/v4` subpath is a package.json `exports` map entry that esbuild doesn't resolve correctly during bundling. The plain `zod` import works fine.
