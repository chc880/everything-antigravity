---
description: Comprehensive Go code review for idiomatic patterns, concurrency safety, error handling, and security.
---

# Go Code Review

Comprehensive Go-specific code review.

## Review Checklist

### Idiomatic Go
- [ ] `gofmt` / `goimports` applied
- [ ] Small interfaces (1-3 methods)
- [ ] Accept interfaces, return structs
- [ ] Functional options for configuration
- [ ] Proper use of `context.Context`

### Concurrency Safety
- [ ] No data races (verify with `-race` flag)
- [ ] Proper channel usage and lifecycle
- [ ] `sync.Mutex` / `sync.RWMutex` where needed
- [ ] `sync.WaitGroup` for goroutine synchronization
- [ ] No goroutine leaks

### Error Handling
- [ ] All errors checked (no `_` for error returns)
- [ ] Errors wrapped with `fmt.Errorf("context: %w", err)`
- [ ] Custom error types where appropriate
- [ ] Sentinel errors for expected conditions

### Security
- [ ] No hardcoded secrets
- [ ] SQL injection prevention (parameterized queries)
- [ ] Input validation at boundaries
- [ ] Timeouts via `context.WithTimeout`

## Running Review

```bash
go vet ./...
golangci-lint run
go test -race ./...
gosec ./...
```
