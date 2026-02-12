---
name: security-hardening
description: Antigravity 安全加固指南。涵盖 Strict Mode、Sandbox Mode 配置和项目安全等级分类。当涉及安全配置、敏感操作或生产环境部署时激活。
---

# Security Hardening — Antigravity 安全加固指南

利用 Antigravity 的内建安全能力（Strict Mode + Sandbox Mode）实现项目级别的安全隔离。

## Strict Mode

Strict Mode 在 Antigravity 设置中启用，提供以下安全控制：

### 能力
- **URL 白名单**: 限制 AI 可访问的外部 URL
- **命令审批**: 所有终端命令需要用户明确批准
- **Workspace 隔离**: 限制文件访问范围

### 适用场景
| 场景 | 建议 |
|---|---|
| 开源项目 | 可选 |
| 内部项目 | 推荐 |
| 金融/医疗 | 强制 |
| 处理用户数据 | 强制 |

### 最佳实践

1. **最小权限原则**: 只白名单必需的 URL
2. **审批终端命令**: 尤其是 `rm`、`curl`、`docker` 等
3. **限制 workspace**: 绝不让 AI 访问 `~/.ssh`、`~/.aws` 等

## Sandbox Mode

Sandbox Mode 提供内核级隔离（macOS 使用 `sandbox-exec`）：

### 能力
- 文件系统访问限制（只读/只写特定目录）
- 网络访问限制
- 进程隔离

### 适用场景
- 运行不信任的代码
- 测试第三方依赖
- CI/CD 环境中的 agent 执行

## 项目安全等级分类

### Level 1: 开放（个人/学习项目）
- Strict Mode: 关闭
- Sandbox: 关闭
- 审批策略: Auto-proceed

### Level 2: 标准（团队内部项目）
- Strict Mode: 开启
- Sandbox: 可选
- 审批策略: 代码变更需审批
- URL 白名单: 内部域名 + npm/pypi 等

### Level 3: 严格（生产/金融/合规项目）
- Strict Mode: 强制
- Sandbox: 强制
- 审批策略: 所有操作需审批
- URL 白名单: 最小化
- 附加: 使用 `security-review` skill 进行安全审查

## Checklist

在项目启动时完成以下安全配置：

- [ ] 确定项目安全等级（Level 1/2/3）
- [ ] 配置 Strict Mode（如需要）
- [ ] 设置 URL 白名单（如需要）
- [ ] 确认 `.gitignore` 包含敏感文件
- [ ] 确认 `.env` 不在版本控制中
- [ ] 确认秘钥使用环境变量管理
