---
description: Comprehensive code review for patterns, security, performance, and best practices. Generates severity-based report.
---

# Code Review

Perform comprehensive code review with severity-based issue categorization.

## What This Command Does

1. **Identify Changed Files** — via `git diff` against base branch
2. **Review Code** — Check for patterns, security, performance issues
3. **Generate Report** — Categorize issues by severity
4. **Provide Verdict** — APPROVE, WARNING, or BLOCK

## Review Categories

### CRITICAL (Must Fix)
- Security vulnerabilities (SQL injection, XSS, etc.)
- Data loss potential
- Authentication/authorization bypass
- Hardcoded secrets

### HIGH (Should Fix)
- Missing error handling
- Performance issues (N+1 queries, memory leaks)
- Missing input validation
- Race conditions

### MEDIUM (Consider)
- Code style violations
- Missing documentation
- Suboptimal patterns
- Duplicate code

### LOW (Nice to Have)
- Minor naming improvements
- Additional test coverage
- Code comments

## Workflow Steps

1. Run `git diff [base-branch]...HEAD --name-only` to find changed files
2. Review each file for issues across all categories
3. Run available linters and formatters
4. Generate severity-based report
5. Provide overall verdict

## Approval Criteria

| Status | Condition |
|--------|-----------|
| ✅ Approve | No CRITICAL or HIGH issues |
| ⚠️ Warning | Only MEDIUM issues (merge with caution) |
| ❌ Block | CRITICAL or HIGH issues found |

## Integration with Other Workflows

- Use `/plan` before starting complex features
- Use `/tdd` for test-driven implementation
- Use `/build-fix` if build fails after review fixes
