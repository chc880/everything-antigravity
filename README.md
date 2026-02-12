# Everything Antigravity

> 从 [Everything Claude Code](https://github.com/affaan-m/everything-claude-code) 提取核心价值，为 Antigravity 原生重写的最佳实践合集。

## 快速开始

```bash
# 1. 全局安装
npm install -g @neochen/everything-antigravity

# 2. 进入你的项目，初始化
cd your-project
ea init
```

就这么简单。26 个 Skills + 11 个 Workflows + 18 条 Rules 一步到位。

## 命令

```bash
ea init                 # 安装全部到当前项目
ea init --lang ts       # 仅 TypeScript 规则
ea init --lang python   # 仅 Python 规则
ea init --lang golang   # 仅 Go 规则
ea status               # 查看安装状态
ea uninstall            # 卸载（自动备份）
ea help                 # 帮助
```

## 与 ECC 的区别

| | ECC (Claude Code) | EA (Antigravity) |
|---|---|---|
| 安装 | 克隆仓库 + bash | **`npm i -g` + `ea init`** |
| 路径 | `~/.claude/` | `.agent/` |
| Hooks | JS hooks 脚本 | **编辑后操作提醒** |
| Rules | 无 frontmatter | `trigger: glob/model_decision` |
| 持久记忆 | 无 | **Knowledge Items** |
| 安全 | 手动 | **Strict/Sandbox Mode** |

## 安装了什么

### Skills (26)
TDD · 安全审查 · 编码标准 · 前后端模式 · Python/Django · Go · Spring Boot/JPA · PostgreSQL/ClickHouse · Agent Guides · ⭐ Knowledge Management · ⭐ Security Hardening

### Workflows (11)
`/plan` ⭐ · `/verify` ⭐ · `/tdd` · `/code-review` · `/e2e` · `/build-fix` · `/go-build` · `/go-review` · `/go-test` · `/python-review` · `/setup-pm`

### Rules (18)
6 通用 (`model_decision`) + 4 TypeScript + 4 Python + 4 Go (`glob` 按需激活)

## 许可

MIT
