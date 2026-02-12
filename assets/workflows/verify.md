---
description: Verify implementation completeness. Run tests, check build, generate walkthrough report.
---

# Verify Command

Verify that implementation is correct and complete. Leverages Antigravity's Verification Mode and Walkthrough artifact.

## When to Use

Use `/verify` after completing an implementation, typically after `/plan` → `/tdd` cycle.

## Workflow Steps

### Step 1: 进入 Verification Mode
设置 `task_boundary` 的 Mode 为 `VERIFICATION`。

### Step 2: 运行测试
```bash
# TypeScript/JavaScript
npm test -- --coverage

# Python
pytest --cov=src --cov-report=term-missing

# Go
go test -race -cover ./...
```

### Step 3: 检查构建
```bash
# TypeScript
npx tsc --noEmit

# Python
python -m py_compile src/*.py

# Go
go build ./...
go vet ./...
```

### Step 4: 验证清单

- [ ] 所有测试通过
- [ ] 覆盖率 ≥ 80%
- [ ] 构建无错误
- [ ] Lint 无警告
- [ ] 无安全漏洞（hardcoded secrets, SQL injection 等）
- [ ] 无 Claude Code 残留引用（仅 Everything Antigravity）
- [ ] 无调试代码残留（console.log, print, fmt.Println）
- [ ] API 文档已更新（如有）
- [ ] README 已更新（如有）

### Step 5: 生成 Walkthrough
创建 `walkthrough.md` artifact，记录：

```markdown
# Walkthrough: [Feature Name]

## Changes Made
- 具体修改列表（使用 render_diffs）

## What Was Tested
- 测试结果和覆盖率

## Validation Results
- 构建状态
- 测试通过率
- 截图/录屏（如有 UI 变更）
```

### Step 6: 通知用户
使用 `notify_user` 将 walkthrough 提交用户查看。

## Integration with Other Workflows

- Before verify: `/plan` → `/tdd` → implement
- If issues found: go back to EXECUTION mode and fix
- If fundamental issues: go back to `/plan`
- After verify: `/code-review` for final review
