---
trigger: glob
globs: "**/*.ts, **/*.tsx, **/*.js, **/*.jsx"
---

# TypeScript/JavaScript Coding Style

> Extends common coding-style with TypeScript/JavaScript specific content.

## Standards

- Use **strict mode** TypeScript (`strict: true` in tsconfig)
- Prefer `const` over `let`, avoid `var`
- Use template literals over string concatenation

## Immutability

Use `readonly` and `Readonly<T>` for immutable data:

```typescript
interface User {
  readonly id: string
  readonly name: string
}

function updateUser(user: Readonly<User>, changes: Partial<User>): User {
  return { ...user, ...changes }
}
```

## Formatting

- **Prettier** for code formatting
- **ESLint** for linting
- Consistent import ordering (external → internal → relative)

## 编辑后操作（替代 Hooks）

编辑 TypeScript/JavaScript 文件后，应主动执行以下检查：

1. **格式化**: `npx prettier --write {file}`
2. **类型检查**: `npx tsc --noEmit`（仅 `.ts`/`.tsx` 文件）
3. **Lint**: `npx eslint {file}`
4. **检查残留**: 确认没有 `console.log` 残留在生产代码中
