---
description: Fix Go build errors, go vet warnings, and linter issues incrementally.
---

# Go Build Fix

Fix Go build errors, vet warnings, and linter issues.

## Workflow Steps

1. Run `go build ./...` → fix compilation errors
2. Run `go vet ./...` → fix potential issues
3. Run `golangci-lint run` (if available) → fix lint issues
4. Repeat until clean

## Common Fixes

### Unused imports/variables
```go
// Remove unused imports or use blank identifier
import _ "unused/package"
```

### Missing error handling
```go
// Wrong
result := doSomething()

// Right
result, err := doSomething()
if err != nil {
    return fmt.Errorf("failed: %w", err)
}
```

### Type mismatches
- Check function signatures
- Use type assertions or conversions
- Verify interface implementations
