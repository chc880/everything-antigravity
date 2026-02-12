---
description: Enforce test-driven development workflow. Write tests FIRST, then implement minimal code to pass. Ensure 80%+ coverage.
---

# TDD Workflow

Enforce strict test-driven development: write tests first, then implement.

## The TDD Cycle

```
RED → GREEN → REFACTOR → VERIFY
```

1. **RED** — Write a failing test
2. **GREEN** — Write minimal code to make the test pass
3. **REFACTOR** — Improve code quality while keeping tests green
4. **VERIFY** — Check coverage is 80%+

## Step-by-Step Process

### Step 1: Understand the Feature
- Read requirements carefully
- Identify success criteria
- List edge cases

### Step 2: Write Tests First
Write tests that describe the expected behavior:
- Happy path tests
- Edge case tests (empty, null, boundary values)
- Error handling tests

### Step 3: Run Tests (They Should Fail)
Verify that tests fail for the right reason — this validates the test is meaningful.

### Step 4: Implement Code
Write **minimal** code to make tests pass. No gold-plating.

### Step 5: Run Tests Again
All tests should now pass.

### Step 6: Refactor
Improve code quality while keeping tests green:
- Remove duplication
- Improve naming
- Optimize performance
- Enhance readability

### Step 7: Verify Coverage
Run coverage report and verify 80%+ coverage achieved.

## Best Practices

1. **Write Tests First** — Always TDD
2. **One Assert Per Test** — Focus on single behavior
3. **Descriptive Test Names** — Explain what's tested
4. **Arrange-Act-Assert** — Clear test structure
5. **Mock External Dependencies** — Isolate unit tests
6. **Test Edge Cases** — Null, undefined, empty, large
7. **Test Error Paths** — Not just happy paths
8. **Keep Tests Fast** — Unit tests <50ms each
9. **Clean Up After Tests** — No side effects
10. **Review Coverage Reports** — Identify gaps

## Language-Specific Commands

- **TypeScript/JavaScript**: `npm test -- --coverage`
- **Python**: `pytest --cov=src --cov-report=term-missing`
- **Go**: `go test -cover ./...`

## Integration with Other Workflows

- Use `/plan` first for complex features
- Use `/code-review` after implementation
- Use `/build-fix` if build errors occur
