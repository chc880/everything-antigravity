---
trigger: glob
globs: "**/*.py, **/*.pyi"
---

# Python Coding Style

> Extends common coding-style with Python specific content.

## Standards

- Follow **PEP 8** conventions
- Use **type annotations** on all function signatures

## Immutability

Prefer immutable data structures:

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class User:
    name: str
    email: str

from typing import NamedTuple

class Point(NamedTuple):
    x: float
    y: float
```

## Formatting

- **black** for code formatting
- **isort** for import sorting
- **ruff** for linting

## 编辑后操作（替代 Hooks）

编辑 Python 文件后，应主动执行以下检查：

1. **格式化**: `black {file}`
2. **Lint**: `ruff check {file} --fix`
3. **Import 排序**: `isort {file}`
4. **类型检查**: `mypy {file}`（如果项目使用 mypy）
5. **检查残留**: 确认没有 `print()` 残留（应使用 `logging` 模块）

## Reference

See skill: `python-patterns` for comprehensive Python idioms and patterns.
