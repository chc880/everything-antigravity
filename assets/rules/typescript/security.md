---
trigger: glob
globs: "**/*.ts, **/*.tsx, **/*.js, **/*.jsx"
---

# TypeScript/JavaScript Security

> Extends common security with TypeScript/JavaScript specific content.

## Secret Management

```typescript
// NEVER: Hardcoded secrets
const apiKey = "sk-proj-xxxxx"

// ALWAYS: Environment variables
const apiKey = process.env.OPENAI_API_KEY

if (!apiKey) {
  throw new Error('OPENAI_API_KEY not configured')
}
```

## Best Practices

- Use **security-review** skill for comprehensive security audits
- Run `npm audit` regularly for dependency vulnerabilities
