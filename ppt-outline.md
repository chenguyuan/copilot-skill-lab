# PPT Outline — Copilot Skills for Troubleshooting

> 16:9 widescreen，每页精简，配合 hands-on-lab.md 使用

---

## Slide 1: Title

**GitHub Copilot Skills: AI-Powered Troubleshooting**

- Lightning Lab
- Date / Presenter

---

## Slide 2: Agenda

| # | Section |
|---|---------|
| 1 | Setup & Agent Mode |
| 2 | What Are Skills — 本质与设计 |
| 3 | Live Demo: Troubleshooting Chain |
| 4 | Create Your Own Skill |
| 5 | Q&A |

---

## Slide 3: Setup — 4 Things You Need

1. **GitHub 账号** — EMU 账号 (`xxx_microsoft`) 或已绑定的个人账号
2. **VS Code** — https://code.visualstudio.com/
3. **Extensions** — `Ctrl+Shift+X` → install `GitHub.copilot` + `GitHub.copilot-chat`
4. **Sign in** — 右下角 Sign in to GitHub → Copilot 图标亮起 ✅

> 个人账号绑定：https://copilot.github.microsoft.com/

> 如已提前安装 → 快速验证即可

---

## Slide 4: Agent Mode — Skills 的前提

`Ctrl+Shift+I` → Chat panel 切换 **Agent** mode

| | Ask Mode | Agent Mode |
|---|---|---|
| 对话回答 | ✅ | ✅ |
| 读写文件 | ❌ | ✅ |
| 运行终端命令 | ❌ | ✅ |
| **触发 Skills** | ❌ | ✅ |

验证: 输入 `What is the current date?` → 能回复 = OK

---

## Slide 5: What is a Skill?

**Skill = 一个 SKILL.md 文件**

```
~/.copilot/skills/my-skill/
  └── SKILL.md  ← Copilot 自动读取
```

它告诉 Copilot 三件事:
- **When** — 什么条件下触发 (`description` 字段)
- **What** — 执行什么步骤 (`Procedure` 章节)
- **How** — 用什么工具、什么格式输出

---

## Slide 6: Skill 的本质 — Structured Prompt

> Skill 不是代码插件，不是 API，不是 extension。
> **Skill = 给 AI 的结构化指令**，用自然语言写成。

**vs. 传统脚本/工具**:

| | PowerShell 脚本 | Copilot Skill |
|---|---|---|
| 执行方式 | 固定逻辑 | AI 理解后灵活执行 |
| 输入方式 | 参数 | 自然语言 |
| 容错性 | 严格匹配 | 模糊理解 + 自适应 |
| 可组合性 | 需要编排脚本 | 自然语言串联 |
| 上手门槛 | 需会编程 | 能写 Markdown 即可 |

**核心洞察**: 你在教 AI "像你一样思考"，而不是让 AI 替你写代码。

---

## Slide 7: Skills 如何工作 — 两阶段注入

```
┌─────────────────────────────────────────────────────┐
│  用户输入: "解码媒体日志 C:\path\mediastack"          │
└─────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│  Stage 1: Description 匹配                          │
│  ────────────────────────                           │
│  所有 skills 的 description 字段                     │
│  → 随 system prompt 一起发送给模型                    │
│  → 模型判断: 哪个 skill 与用户意图匹配？               │
└─────────────────────────────────────────────────────┘
                        │
            模型决定需要 decode-media-log
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│  Stage 2: 读取完整 SKILL.md                          │
│  ────────────────────────                           │
│  模型调用 read_file 读取 SKILL.md 全文               │
│  → 按 Procedure 步骤执行                             │
│  → 引用的 references/scripts 按需读取                │
└─────────────────────────────────────────────────────┘
```

**设计启示**:
- `description` 要写好触发词 — 它是 **匹配入口**
- `Procedure` 要写具体 — 它是 **执行指南**

---

## Slide 8: SKILL.md 核心要素

| 字段 | 作用 |
|---|---|
| `description` | 触发器 — Copilot 靠这个判断何时激活 |
| `Procedure` | 核心执行步骤 — 越具体越准确 |

**记住这两个就够了**，其他都是辅助

---

## Slide 9: Team Skills 一览

来自团队共享 repo 的 4 个 skills:

| Skill | 用途 | 触发词示例 |
|---|---|---|
| `decode-media-log` | Teams `.blog` → 可读文本 | "解码媒体日志" |
| `media-log-analysis` | 通话质量诊断（丢包/抖动/ICE） | "分析媒体日志" |
| `cqd-quality-analyzer` | CQD 遥测数据脱敏 + 多维度分析 | "分析 CQD"、"通话质量" |
| `email-writer` | 生成 HTML 格式客户邮件 | "写邮件"、"回复客户" |

---

## Slide 10: 获取 Team Skills — Clone + Junction

**Step 1: Clone 团队 repo**
```powershell
git clone <团队repo地址> C:\Users\$env:USERNAME\.copilot\Teamskillrepo
```

**Step 2: 创建 Junction 链接到你的 skills 文件夹**
```powershell
# 进入你的 skills 目录
cd $env:USERPROFILE\.copilot\skills

# 为每个 skill 创建 junction
New-Item -ItemType Junction -Name "decode-media-log" -Target "..\Teamskillrepo\decode-media-log"
New-Item -ItemType Junction -Name "media-log-analysis" -Target "..\Teamskillrepo\media-log-analysis"
New-Item -ItemType Junction -Name "cqd-quality-analyzer" -Target "..\Teamskillrepo\cqd-quality-analyzer"
New-Item -ItemType Junction -Name "email-writer" -Target "..\Teamskillrepo\email-writer"
```

**为什么用 Junction？**
- 团队 repo 独立管理 → `git pull` 即可更新
- 你的 skills 目录保持整洁 → 个人 + 团队共存

---

## Slide 11: Troubleshooting Chain

```
Customer Logs
     │
     ▼
┌──────────┐    ┌───────────────┐    ┌──────────┐
│  Decode   │───▶│    Analyze     │───▶│  Email   │
│ .blog→txt │    │ Evidence+RCA  │    │  HTML    │
└──────────┘    └───────────────┘    └──────────┘
```

每个 Skill 独立 → 自然语言串联 → **Composable Workflows**

---

## Slide 12: 🔬 Demo — Decode → Analyze → Email (7 min)

**Demo 1 (2 min)**:
```
解码媒体日志 C:\LabData\sample-case\sc-tfw\mediastack
```
→ 读取 SKILL.md → 调用脚本 → CombinedMediaLogs.txt

**Demo 2 (3 min)**:
```
分析媒体日志，web log 路径是 C:\LabData\sample-case\sc-tfw
```
→ callId + 时间窗口 → evidence → 症状 → 根因 → 置信度

**Demo 3 (2 min)**:
```
根据分析结果写一封客户邮件
```
→ HTML → 浏览器打开 → paste to Outlook

---

## Slide 13: 创建 Skill — 让 Copilot 帮你写

**不需要手写模板！** 直接告诉 Copilot 你要什么：

```
帮我创建一个 skill，功能是从日志中提取时间范围
```

**参考官方资源：**
- **anthropics/skills** (109k⭐) — Anthropic 官方 skill 库
  - https://github.com/anthropics/skills
  - 包含模板、规范、Claude.ai 生产环境用的 document skills
  - Agent Skills 标准: https://agentskills.io/

---

## Slide 14: Skill 文件结构

```
my-skill/
  ├── SKILL.md              ← 核心指令
  ├── references/           ← 知识库（checklist、thresholds）
  ├── assets/               ← 输出模板
  └── scripts/              ← 可执行脚本
```

**Procedure 中用 Markdown link 引用** → Copilot 自动读取

---

## Slide 15: 🔬 Exercise — 从问题到 Skill (8 min)

**Step 1: 先用 Copilot 解决一个实际问题**
```
帮我从这个日志文件提取时间范围 C:\LabData\sample.log
```
→ 观察 Copilot 怎么做的（读文件、提取时间戳、计算 duration）

**Step 2: 让 Copilot 把刚才的工作流总结成 Skill**
```
把刚才提取时间范围的步骤总结成一个 skill，保存到 ~/.copilot/skills/log-timestamp-extract/SKILL.md
```

**Step 3: 测试 Skill**
→ 新对话中输入: `这个日志的时间范围？ C:\LabData\another.log`
→ 验证 Copilot 触发了你的 skill

**这就是创建 skill 的最佳实践**: 先解决问题 → 再抽象成可复用的 skill

---

## Slide 16: 3 Takeaways + Q&A

1. **Agent Mode** 是 Skills 工作的前提
2. **Skill = 给 AI 的结构化 Markdown 指令**，不需要写代码
3. 想想你重复做的 troubleshooting 步骤 → **写成 Skill!**

Resources:
- Team Skills Repo
- `code.visualstudio.com/docs/copilot/copilot-customization`
