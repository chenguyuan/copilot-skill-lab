# GitHub Copilot + VS Code Skills — 30-min Lightning Lab

> **Duration**: 30 min  
> **Audience**: Support engineers new to VS Code / GitHub Copilot  
> **Goal**: 理解 Skills 概念，看到 troubleshooting 全链路 demo，学会写自己的 Skill

---

## Agenda

| # | Section | Time | Format |
|---|---------|------|--------|
| 1 | What & Why | 5 min | 讲解 |
| 2 | Live Demo: Troubleshooting Chain | 15 min | 演示 |
| 3 | Create Your First Skill | 8 min | 动手 |
| 4 | Wrap-up & Q&A | 2 min | 讨论 |

---

## Prerequisites (会前完成)

请在 session 之前完成以下步骤，**不占 session 时间**：

1. **GitHub 账号** — 二选一：
   - **EMU 账号**（`yourname_microsoft`）— 直接使用，无需绑定
   - **个人 GitHub 账号** — 需先在 https://copilot.github.microsoft.com/ 绑定
2. **Install VS Code** — https://code.visualstudio.com/ （勾选 "Add to PATH"）
3. **Install extensions** — `Ctrl+Shift+X` 搜索安装：
   - `GitHub.copilot`
   - `GitHub.copilot-chat`
4. **Sign in** — 右下角 Sign in to GitHub（用 EMU 或已绑定的个人账号）
5. **Verify** — `Ctrl+Shift+I` 打开 Chat → 切换 **Agent** mode → 输入 `What is the current date?` → 能收到回复即 OK

> **💡 Agent Mode 是 Skills 工作的前提。** Chat Mode 无法触发 Skills。

---

## Part 1: What & Why (5 min)

### Skill = 一个 SKILL.md 文件

告诉 Copilot **when** to activate、**what** to do、**how** to do it。

```
~/.copilot/skills/
  └── my-skill/
      └── SKILL.md  ← Copilot reads this automatically
```

### Why Skills?

**Before**: 手动解码日志 → 肉眼分析 → 手写邮件 → **1-2 hours**

**After**: 一句话触发 → 自动解码 → 结构化诊断 → HTML 邮件 → **10 min**

### 现有 Skills 一览

来自团队共享 repo 的 skills：

| Skill | 用途 |
|---|---|
| `decode-media-log` | Teams `.blog` → 可读文本 |
| `media-log-analysis` | 通话质量诊断（丢包/抖动/ICE） |
| `cqd-quality-analyzer` | CQD 遥测数据脱敏 + 多维度分析 |
| `email-writer` | 生成 HTML 客户邮件 |

### 获取团队 Skills

**1. Clone 团队 repo**
```powershell
git clone <团队repo地址> $env:USERPROFILE\.copilot\Teamskillrepo
```

**2. 用 Junction 链接到你的 skills 文件夹**
```powershell
cd $env:USERPROFILE\.copilot\skills

New-Item -ItemType Junction -Name "decode-media-log" -Target "..\Teamskillrepo\decode-media-log"
New-Item -ItemType Junction -Name "media-log-analysis" -Target "..\Teamskillrepo\media-log-analysis"
New-Item -ItemType Junction -Name "cqd-quality-analyzer" -Target "..\Teamskillrepo\cqd-quality-analyzer"
New-Item -ItemType Junction -Name "email-writer" -Target "..\Teamskillrepo\email-writer"
```

> 💡 Junction 好处：团队 repo 独立 `git pull` 更新，你的 skills 目录里个人 + 团队共存

---

## Part 2: Live Demo — Troubleshooting Chain (15 min)

**场景**: 客户报告 Teams 通话机器人声 + 单向无声，你收到了 support logs。

### Demo 1: Decode (3 min)

```
解码媒体日志 C:\LabData\sample-case\sc-tfw\mediastack
```

**看什么**: Copilot 读取 SKILL.md → 调用 PowerShell 脚本 → 输出 `CombinedMediaLogs.txt`

### Demo 2: Analyze (7 min)

```
分析媒体日志，web log 路径是 C:\LabData\sample-case\sc-tfw
```

**看什么**: 提取 callId + 时间窗口 → evidence checklist → 结构化报告（症状 → 证据 → 根因 → 置信度）

### Demo 3: Email (3 min)

```
根据分析结果写一封客户邮件
```

**看什么**: 验证 Learn 文档链接 → 生成 HTML → 浏览器打开 → 直接 paste 到 Outlook

### Demo 4: HAR (2 min)

```
解析 HAR C:\LabData\sample.har freebusy
```

**看什么**: Python 优先 → 关键词过滤 → 紧凑输出

### 关键 Takeaway

```
┌──────────┐     ┌───────────────┐     ┌──────────┐
│  Decode   │────▶│    Analyze     │────▶│  Email   │
│ .blog→txt │     │ Evidence+RCA  │     │  HTML    │
└──────────┘     └───────────────┘     └──────────┘
```

每个 Skill 独立 → 自然语言串联 → **Composable Workflows**

---

## Part 3: Create Your First Skill (8 min)

### SKILL.md 最小模板

```markdown
---
description: >-
  一句话描述 + 触发词。
  触发词：关键词1、keyword2。
---

# Skill Name

## When To Use
- 触发场景

## Inputs
- Required: xxx

## Procedure
1. 具体步骤（指定工具名）
2. ...

## Output
- 输出格式
```

> **⚠️ `description` 最重要** — Copilot 靠它判断何时触发。Procedure 越具体，执行越准确。

### Exercise: 创建 `log-timestamp-extract`

**1. 创建文件夹:**

```powershell
New-Item -Path "$env:USERPROFILE\.copilot\skills\log-timestamp-extract" -ItemType Directory -Force
```

**2. 创建 SKILL.md** (在 VS Code 中新建):

```markdown
---
description: >-
  Extract first and last timestamps from a log file to determine time window.
  触发词：时间范围、日志时间、log time range。
---

# Log Timestamp Extract

## Procedure
1. Validate file exists
2. Read first 5 lines and last 5 lines
3. Extract timestamps (ISO 8601 / bracket / space-separated)
4. Report: Start, End, Duration
```

**3. 测试:**

```
这个日志文件的时间范围是什么？ C:\LabData\sample.log
```

### 编写 Tips

| ❌ 模糊 | ✅ 具体 |
|---|---|
| "分析日志" | "用 `grep_search` 搜索 `packet loss`" |
| "输出结果" | "用 [template.md](./assets/template.md) 格式输出" |

---

## Wrap-up & Q&A (2 min)

### 3 Key Points

1. **Agent Mode** 是前提 — Skills only work in Agent Mode
2. **description** 决定触发，**Procedure** 决定执行质量
3. **从一个文件开始** — 想想你重复做的步骤 → 写成 Skill!

### Resources

- VS Code Docs: `code.visualstudio.com/docs/copilot/copilot-customization`

| 常见问题 | 解决 |
|---|---|
| Skill 没触发 | 检查 `description` 关键词 + 确认 Agent Mode |
| 执行不对 | Procedure 写得更具体（指定工具名） |
| Agent Mode 不可用 | Copilot Chat extension 版本 ≥ 0.22 |

---

## Appendix: Lab Data Prep (讲师用)

```
C:\LabData\
  ├── sample-case/sc-tfw/
  │   ├── mediastack/*.blog
  │   └── weblogs/
  ├── sample.har
  └── sample.log
```

> 提前准备脱敏 sample 数据 + 确保 `MediaDecode.exe` 已部署
