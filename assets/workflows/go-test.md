---
description: Enforce TDD workflow for Go. Write table-driven tests first, then implement. Verify 80%+ coverage with go test -cover.
---

# Go TDD

Test-driven development workflow for Go.

## Workflow Steps

1. Write table-driven tests first
2. Run `go test ./...` — verify tests fail
3. Implement minimal code to pass
4. Run `go test -race ./...` — verify tests pass
5. Refactor with tests green
6. Run `go test -cover ./...` — verify 80%+ coverage

## Table-Driven Test Template

```go
func TestFunctionName(t *testing.T) {
    tests := []struct {
        name     string
        input    InputType
        expected OutputType
        wantErr  bool
    }{
        {
            name:     "valid input",
            input:    validInput,
            expected: expectedOutput,
        },
        {
            name:    "invalid input",
            input:   invalidInput,
            wantErr: true,
        },
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got, err := FunctionName(tt.input)
            if (err != nil) != tt.wantErr {
                t.Errorf("error = %v, wantErr %v", err, tt.wantErr)
                return
            }
            if got != tt.expected {
                t.Errorf("got = %v, want %v", got, tt.expected)
            }
        })
    }
}
```

## Coverage Verification

```bash
go test -cover ./...
go test -coverprofile=coverage.out ./...
go tool cover -html=coverage.out
```
