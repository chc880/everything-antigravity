---
description: Restate requirements, assess risks, and create step-by-step implementation plan. WAIT for user CONFIRM before touching any code.
---

# Plan Command

Create a comprehensive implementation plan before writing any code. Leverages Antigravity's Planning Mode and Artifact system for structured planning.

## What This Command Does

1. **Restate Requirements** — Clarify what needs to be built
2. **Identify Risks** — Surface potential issues and blockers
3. **Create Implementation Plan** — Use `implementation_plan.md` artifact
4. **Create Task List** — Use `task.md` artifact for progress tracking
5. **Wait for Confirmation** — MUST receive user approval before proceeding

## When to Use

Use `/plan` when:
- Starting a new feature
- Making significant architectural changes
- Working on complex refactoring
- Multiple files/components will be affected
- Requirements are unclear or ambiguous

## Workflow Steps (利用 Antigravity Planning Mode)

### Step 1: 进入 Planning Mode
设置 `task_boundary` 的 Mode 为 `PLANNING`，开始结构化规划。

### Step 2: 分析需求
- 完整阅读相关代码和文档
- 查询 Knowledge Items (KI) 是否有相关历史知识
- 明确需求边界和验收标准

### Step 3: 创建 Implementation Plan Artifact
创建 `implementation_plan.md`，包含：

```markdown
# Implementation Plan: [Feature Name]

## Overview
[2-3 sentence summary]

## User Review Required
> [!WARNING]
> [Breaking changes or critical decisions]

## Proposed Changes
### [Component Name]
#### [MODIFY] [filename](file:///path/to/file)
- 具体变更描述

#### [NEW] [filename](file:///path/to/new/file)
- 新文件用途

## Verification Plan
### Automated Tests
- 具体测试命令

### Manual Verification
- 手动验证步骤
```

### Step 4: 创建 Task Artifact
创建 `task.md`，将方案拆解为可跟踪的任务项：

```markdown
# Task List
- [ ] Phase 1: ...
  - [ ] Sub-task 1.1
  - [ ] Sub-task 1.2
- [ ] Phase 2: ...
```

### Step 5: 等待审批
使用 `notify_user` 工具将方案提交用户审批。**CRITICAL**: 用户明确批准前不得开始编码。

## 审批后

用户批准后：
1. 切换到 EXECUTION mode
2. 按 `task.md` 逐项执行
3. 用 `[/]` 标记进行中、`[x]` 标记完成
4. 完成后切换到 VERIFICATION mode
5. 使用 `/verify` workflow 验证

## Integration with Other Workflows

- After planning: `/tdd` for test-driven implementation
- After implementation: `/verify` for verification
- If build fails: `/build-fix` to fix errors
- After completion: `/code-review` for review
