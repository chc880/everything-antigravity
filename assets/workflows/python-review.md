---
description: Comprehensive Python code review for PEP 8 compliance, type hints, security, and Pythonic idioms.
---

# Python Code Review

Comprehensive Python-specific code review.

## Automated Checks

```bash
# Type checking
mypy .

# Linting and formatting
ruff check .
black --check .
isort --check-only .

# Security scanning
bandit -r .

# Testing
pytest --cov=src --cov-report=term-missing
```

## Review Categories

### CRITICAL (Must Fix)
- SQL/Command injection vulnerabilities
- Unsafe `eval`/`exec` usage
- Pickle unsafe deserialization
- Hardcoded credentials
- YAML `unsafe_load`
- Bare `except` clauses hiding errors

### HIGH (Should Fix)
- Missing type hints on public functions
- Mutable default arguments
- Swallowing exceptions silently
- Not using context managers for resources
- Race conditions without locks

### MEDIUM (Consider)
- PEP 8 formatting violations
- Missing docstrings on public functions
- `print()` statements instead of `logging`
- Magic numbers without named constants
- Not using f-strings

## Common Fixes

### Fix Mutable Defaults
```python
# Bad
def process(items=[]):
    items.append("new")

# Good
def process(items=None):
    if items is None:
        items = []
    items.append("new")
```

### Add Type Hints
```python
# Bad
def calculate(x, y):
    return x + y

# Good
def calculate(x: int | float, y: int | float) -> int | float:
    return x + y
```

### Use Context Managers
```python
# Bad
f = open("file.txt")
data = f.read()
f.close()

# Good
with open("file.txt") as f:
    data = f.read()
```

## Approval Criteria

| Status | Condition |
|--------|-----------|
| ✅ Approve | No CRITICAL or HIGH issues |
| ⚠️ Warning | Only MEDIUM issues |
| ❌ Block | CRITICAL or HIGH issues found |
