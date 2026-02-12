/**
 * Everything Antigravity 安装器逻辑
 * 零依赖 — 仅使用 Node.js 标准库
 */

const fs = require('fs');
const path = require('path');

// ── 颜色 ─────────────────────────────────────────────
const C = {
    red: (s) => `\x1b[0;31m${s}\x1b[0m`,
    green: (s) => `\x1b[0;32m${s}\x1b[0m`,
    yellow: (s) => `\x1b[1;33m${s}\x1b[0m`,
    blue: (s) => `\x1b[0;34m${s}\x1b[0m`,
    cyan: (s) => `\x1b[0;36m${s}\x1b[0m`,
};

// ── 配置 ─────────────────────────────────────────────
const PKG = require('../package.json');
const ASSETS_DIR = path.join(__dirname, '..', 'assets');
const PROJECT_DIR = process.cwd();
const AGENT_DIR = path.join(PROJECT_DIR, '.agent');

// ── 工具函数 ─────────────────────────────────────────
function banner() {
    const ver = PKG.version;
    console.log(C.cyan(`
╔══════════════════════════════════════════════════╗
║   Everything Antigravity v${ver.padEnd(24)}║
╚══════════════════════════════════════════════════╝
`));
    console.log(`ℹ 目标项目: ${C.blue(PROJECT_DIR)}`);
    console.log('');
}

function copyDirRecursive(src, dest) {
    fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyDirRecursive(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

function countFiles(dir, ext) {
    if (!fs.existsSync(dir)) return 0;
    let count = 0;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        if (entry.isDirectory()) {
            count += countFiles(path.join(dir, entry.name), ext);
        } else if (!ext || entry.name.endsWith(ext)) {
            count++;
        }
    }
    return count;
}

function listDirs(dir) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir, { withFileTypes: true })
        .filter((e) => e.isDirectory())
        .map((e) => e.name);
}

function listFiles(dir, ext) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir)
        .filter((f) => !ext || f.endsWith(ext));
}

function checkClaudeRefs(dir) {
    let count = 0;
    if (!fs.existsSync(dir)) return 0;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            count += checkClaudeRefs(fullPath);
        } else {
            try {
                const content = fs.readFileSync(fullPath, 'utf-8');
                const matches = content.match(/~\/.claude\//g);
                if (matches) count += matches.length;
            } catch (_) {
                // skip binary files
            }
        }
    }
    return count;
}

function dateStr() {
    const d = new Date();
    return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}-${String(d.getHours()).padStart(2, '0')}${String(d.getMinutes()).padStart(2, '0')}${String(d.getSeconds()).padStart(2, '0')}`;
}

// ── 安装 ─────────────────────────────────────────────
function install(lang) {
    banner();
    console.log(`ℹ 语言选择: ${C.yellow(lang)}`);
    console.log('');

    // 备份已有配置
    if (fs.existsSync(AGENT_DIR)) {
        const backupDir = path.join(PROJECT_DIR, `.agent-backup-${dateStr()}`);
        console.log(`${C.blue('↗')} 备份已有 .agent/ → ${backupDir}`);
        copyDirRecursive(AGENT_DIR, backupDir);
        console.log('');
    }

    // Step 1: Skills
    console.log(C.cyan('── Step 1/3: 安装 Skills → .agent/skills/ ──'));
    const skillsSrc = path.join(ASSETS_DIR, 'skills');
    let skillCount = 0;
    for (const skillName of listDirs(skillsSrc)) {
        const skillDir = path.join(skillsSrc, skillName);
        if (fs.existsSync(path.join(skillDir, 'SKILL.md'))) {
            copyDirRecursive(skillDir, path.join(AGENT_DIR, 'skills', skillName));
            skillCount++;
        }
    }
    console.log(C.green(`✓ 安装了 ${skillCount} 个 Skills`));

    // Step 2: Workflows
    console.log('');
    console.log(C.cyan('── Step 2/3: 安装 Workflows → .agent/workflows/ ──'));
    const wfSrc = path.join(ASSETS_DIR, 'workflows');
    const wfDest = path.join(AGENT_DIR, 'workflows');
    fs.mkdirSync(wfDest, { recursive: true });
    let wfCount = 0;
    for (const wf of listFiles(wfSrc, '.md')) {
        fs.copyFileSync(path.join(wfSrc, wf), path.join(wfDest, wf));
        wfCount++;
    }
    console.log(C.green(`✓ 安装了 ${wfCount} 个 Workflows`));

    // Step 3: Rules
    console.log('');
    console.log(C.cyan('── Step 3/3: 安装 Rules → .agent/rules/ ──'));
    const rulesDest = path.join(AGENT_DIR, 'rules');
    fs.mkdirSync(rulesDest, { recursive: true });
    let ruleCount = 0;

    // 通用规则（始终安装）
    const commonSrc = path.join(ASSETS_DIR, 'rules', 'common');
    for (const rule of listFiles(commonSrc, '.md')) {
        fs.copyFileSync(path.join(commonSrc, rule), path.join(rulesDest, rule));
        ruleCount++;
    }

    // 语言规则
    const installLangRules = (langName) => {
        const langSrc = path.join(ASSETS_DIR, 'rules', langName);
        if (!fs.existsSync(langSrc)) return;
        for (const rule of listFiles(langSrc, '.md')) {
            fs.copyFileSync(
                path.join(langSrc, rule),
                path.join(rulesDest, `${langName}-${rule}`)
            );
            ruleCount++;
        }
    };

    const VALID_LANGS = ['typescript', 'python', 'golang'];
    if (lang === 'all') {
        VALID_LANGS.forEach(installLangRules);
    } else if (VALID_LANGS.includes(lang)) {
        installLangRules(lang);
    } else {
        console.log(C.red(`✗ 未知语言: ${lang}`));
        console.log(`  支持: all, ${VALID_LANGS.join(', ')}`);
        process.exit(1);
    }
    console.log(C.green(`✓ 安装了 ${ruleCount} 条 Rules`));

    // 验证
    console.log('');
    console.log(C.cyan('── 验证安装 ──'));
    const refs = checkClaudeRefs(AGENT_DIR);
    if (refs > 0) {
        console.log(C.red(`✗ 发现 ${refs} 处 ~/.claude/ 残留引用！`));
    } else {
        console.log(C.green('✓ 无 Claude Code 路径残留'));
    }

    // 统计
    console.log('');
    console.log(C.green('╔══════════════════════════════════════════════════╗'));
    console.log(C.green('║   安装完成！                                     ║'));
    console.log(C.green('╚══════════════════════════════════════════════════╝'));
    console.log('');
    console.log(`  Skills:    ${C.cyan(skillCount)} 个`);
    console.log(`  Workflows: ${C.cyan(wfCount)} 个`);
    console.log(`  Rules:     ${C.cyan(ruleCount)} 条`);
    console.log('');
    console.log(`  ${C.blue('提示:')}`);
    console.log('  - 使用 /plan 开始规划工作流');
    console.log('  - 使用 /verify 验证实现');
    console.log('  - ea status   查看安装状态');
    console.log('  - ea uninstall 卸载');
}

// ── 卸载 ─────────────────────────────────────────────
function uninstall() {
    banner();
    console.log(C.yellow('⚠ 即将卸载 Everything Antigravity 组件'));
    console.log('');

    if (!fs.existsSync(AGENT_DIR)) {
        console.log(C.yellow('✗ 未安装（.agent 目录不存在）'));
        return;
    }

    // 统计
    const skillCount = listDirs(path.join(AGENT_DIR, 'skills')).length;
    const wfCount = listFiles(path.join(AGENT_DIR, 'workflows'), '.md').length;
    const ruleCount = listFiles(path.join(AGENT_DIR, 'rules'), '.md').length;
    console.log(`  将删除: ${skillCount} Skills, ${wfCount} Workflows, ${ruleCount} Rules`);
    console.log('');

    // 备份
    const backupDir = path.join(PROJECT_DIR, `.agent-backup-${dateStr()}`);
    console.log(`${C.blue('↗')} 备份到: ${backupDir}`);
    copyDirRecursive(AGENT_DIR, backupDir);

    // 删除
    fs.rmSync(path.join(AGENT_DIR, 'skills'), { recursive: true, force: true });
    fs.rmSync(path.join(AGENT_DIR, 'workflows'), { recursive: true, force: true });
    fs.rmSync(path.join(AGENT_DIR, 'rules'), { recursive: true, force: true });

    console.log(C.green('✓ 卸载完成'));
    console.log(`  备份位置: ${C.yellow(backupDir)}`);
}

// ── 状态 ─────────────────────────────────────────────
function status() {
    banner();
    console.log(C.cyan('── 安装状态 ──'));

    if (!fs.existsSync(AGENT_DIR)) {
        console.log(C.yellow('✗ 未安装（.agent 目录不存在）'));
        return;
    }

    // Skills
    const skills = listDirs(path.join(AGENT_DIR, 'skills'));
    console.log(C.green(`✓ Skills: ${skills.length}`));
    skills.forEach((s) => console.log(`    ${s}`));

    // Workflows
    console.log('');
    const wfs = listFiles(path.join(AGENT_DIR, 'workflows'), '.md');
    console.log(C.green(`✓ Workflows: ${wfs.length}`));
    wfs.forEach((w) => console.log(`    ${w.replace('.md', '')}`));

    // Rules
    console.log('');
    const rules = listFiles(path.join(AGENT_DIR, 'rules'), '.md');
    console.log(C.green(`✓ Rules: ${rules.length}`));
    rules.forEach((r) => console.log(`    ${r.replace('.md', '')}`));

    // Claude 残留
    console.log('');
    const refs = checkClaudeRefs(AGENT_DIR);
    if (refs > 0) {
        console.log(C.red(`⚠ 发现 ${refs} 处 ~/.claude/ 残留引用`));
    } else {
        console.log(C.green('✓ 无 Claude Code 路径残留'));
    }
}

// ── 帮助 ─────────────────────────────────────────────
function showHelp() {
    banner();
    console.log('用法: ea <命令> [选项]');
    console.log('');
    console.log('命令:');
    console.log('  init [--lang <lang>]  安装到当前项目（默认全部语言）');
    console.log('  status               查看安装状态');
    console.log('  uninstall            卸载（自动备份）');
    console.log('  help                 显示帮助');
    console.log('');
    console.log('语言选项:');
    console.log('  --lang all           全部语言（默认）');
    console.log('  --lang typescript    TypeScript/JavaScript');
    console.log('  --lang python        Python');
    console.log('  --lang golang        Go');
    console.log('');
    console.log('示例:');
    console.log(`  npm install -g ${PKG.name}`);
    console.log('  ea init              # 安装全部');
    console.log('  ea init --lang ts    # 仅 TypeScript');
    console.log('  ea status');
    console.log('  ea uninstall');
}

module.exports = { install, uninstall, status, showHelp };
