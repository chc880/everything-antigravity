---
trigger: glob
globs: "**/*.go"
---

# Go Coding Style

> Extends common coding-style with Go specific content.

## Formatting

- **gofmt** and **goimports** are mandatory — no style debates

## Design Principles

- Accept interfaces, return structs
- Keep interfaces small (1-3 methods)

## Error Handling

Always wrap errors with context:

```go
if err != nil {
    return fmt.Errorf("failed to create user: %w", err)
}
```

## 编辑后操作（替代 Hooks）

编辑 Go 文件后，应主动执行以下检查：

1. **格式化**: `gofmt -w {file}` 或 `goimports -w {file}`
2. **静态分析**: `go vet ./...`
3. **扩展检查**: `staticcheck ./...`（如已安装）
4. **检查残留**: 确认没有 `fmt.Println` 调试输出残留

## Reference

See skill: `golang-patterns` for comprehensive Go idioms and patterns.
