---
description: Fix build errors, compiler warnings, and linter issues incrementally.
---

# Build Fix

Diagnose and fix build errors incrementally.

## Workflow Steps

1. **Run Build** — Execute the project build command
2. **Analyze Errors** — Parse error messages carefully
3. **Fix Incrementally** — One error at a time (cascading errors may self-resolve)
4. **Verify** — Re-run build after each fix
5. **Repeat** — Until build succeeds

## Common Build Error Patterns

### TypeScript/JavaScript
```bash
npm run build     # or npx tsc --noEmit
```
- Type errors → Fix type annotations
- Import errors → Fix paths or install missing dependencies
- ESLint errors → `npx eslint --fix .`

### Python
```bash
python -m py_compile src/*.py    # or mypy src/
```
- Import errors → Fix module paths or install missing packages
- Type errors → Fix type annotations
- Syntax errors → Fix syntax

### Go
```bash
go build ./...
go vet ./...
```
- Compilation errors → Fix type mismatches, missing imports
- Vet warnings → Fix potential issues
- Lint issues → `golangci-lint run`

## Best Practices

1. Fix one error at a time — later errors may be caused by earlier ones
2. Read the full error message including file and line number
3. Check if the error is a real bug vs. a type system limitation
4. Run the build after each fix to verify
5. If stuck, try `npm ci` / `pip install -r requirements.txt` / `go mod tidy`
