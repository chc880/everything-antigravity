#!/usr/bin/env node

/**
 * Everything Antigravity CLI
 *
 * 用法:
 *   ea init                    # 安装全部到当前项目
 *   ea init --lang typescript  # 仅安装 TypeScript 规则
 *   ea update                  # 更新包并重新安装
 *   ea status                  # 查看安装状态
 *   ea uninstall               # 卸载（自动备份）
 *   ea help                    # 帮助
 */

const { install, uninstall, update, status, showHelp } = require('../lib/installer');

const args = process.argv.slice(2);
const command = args[0] || 'help';
const restArgs = args.slice(1);

// 解析子参数
function parseFlags(arr) {
  const flags = {};
  let lang = 'all';
  for (let i = 0; i < arr.length; i++) {
    const a = arr[i];
    if (a === '--lang' || a === '-l') {
      lang = arr[++i] || 'all';
    } else if (!a.startsWith('-')) {
      lang = a;
    }
  }
  // 语言别名
  const LANG_ALIASES = { ts: 'typescript', js: 'typescript', py: 'python', go: 'golang' };
  lang = LANG_ALIASES[lang] || lang;
  return { lang };
}

// 路由命令
switch (command) {
  case 'init':
  case 'install':
  case 'i': {
    const { lang } = parseFlags(restArgs);
    install(lang);
    break;
  }

  case 'status':
  case 's':
    status();
    break;

  case 'uninstall':
  case 'remove':
  case 'rm':
    uninstall();
    break;

  case 'update':
  case 'upgrade':
  case 'u': {
    const { lang } = parseFlags(restArgs);
    update(lang);
    break;
  }

  case 'help':
  case '-h':
  case '--help':
    showHelp();
    break;

  default:
    console.log(`未知命令: ${command}\n`);
    showHelp();
    process.exit(1);
}
