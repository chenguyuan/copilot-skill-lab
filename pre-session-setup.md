# Lab 会前准备 — Copilot Skills Session

> ⏱️ 预计耗时：10-15 分钟  
> 📅 请在 session 前完成以下步骤

---

## Step 1: 确认 GitHub 账号

你有 **两种方式** 使用 GitHub Copilot，任选其一：

### 方式 A：使用 EMU 账号（推荐）

如果你的公司已为你分配了 **Enterprise Managed User (EMU)** 账号（格式如 `yourname_microsoft`），可直接使用该账号登录，无需额外绑定。

> 💡 如何确认：检查你的 GitHub 账号是否显示 "GitHub Copilot enabled for your xxx_microsoft Enterprise Managed User (EMU) account"

### 方式 B：绑定个人 GitHub 账号

如果你想使用 **个人 GitHub 账号**，需要先绑定：

1. 访问 **https://copilot.github.microsoft.com/**
2. 将你的个人 GitHub 账号与公司账号关联
3. 后续登录时使用该个人 GitHub 账号

---

## Step 2: 安装 VS Code

下载并安装：**https://code.visualstudio.com/**

安装时 **勾选** "Add to PATH"。

---

## Step 3: 安装 Copilot Extensions

1. 打开 VS Code
2. 按 `Ctrl+Shift+X` 打开 Extensions 面板
3. 搜索并安装以下两个扩展：

| Extension | Extension ID |
|---|---|
| GitHub Copilot | `GitHub.copilot` |
| GitHub Copilot Chat | `GitHub.copilot-chat` |

---

## Step 4: 登录 GitHub

安装扩展后，VS Code 右下角会提示 **Sign in to GitHub**。

点击登录，使用 **Step 1 中选择的账号**（EMU 账号或已绑定的个人账号）。

> 💡 登录成功后，底部状态栏应显示 Copilot 图标（无红色警告）。

---

## Step 5: 验证 Agent Mode

1. 按 `Ctrl+Shift+I` 打开 Copilot Chat 面板
2. 在面板顶部下拉菜单中切换到 **Agent** mode
3. 输入：`What is the current date?`
4. 确认能收到回复 → ✅ 环境准备完成！

---

## Step 6: 获取团队 Skills（可选）

如果你想在 session 前就配置好团队共享的 skills：

**1. Clone 团队 repo**
```powershell
git clone https://dev.azure.com/GCR-AIFirst/AIFirst/_git/skills-common $env:USERPROFILE\.copilot\Teamskillrepo
```

**2. 创建你的 skills 目录（如果不存在）**
```powershell
New-Item -Path "$env:USERPROFILE\.copilot\skills" -ItemType Directory -Force
```

**3. 用 Junction 链接团队 skills**
```powershell
cd $env:USERPROFILE\.copilot\skills

# 为每个 skill 创建 junction
New-Item -ItemType Junction -Name "decode-media-log" -Target "..\Teamskillrepo\decode-media-log"
New-Item -ItemType Junction -Name "media-log-analysis" -Target "..\Teamskillrepo\media-log-analysis"
New-Item -ItemType Junction -Name "cqd-quality-analyzer" -Target "..\Teamskillrepo\cqd-quality-analyzer"
New-Item -ItemType Junction -Name "email-writer" -Target "..\Teamskillrepo\email-writer"
```

> 💡 Junction 的好处：团队 repo 独立 `git pull` 更新，你的 skills 目录里个人 + 团队共存

---

## 常见问题

| 问题 | 解决方案 |
|---|---|
| Copilot 图标有红色警告 | EMU 用户：确认账号已启用 Copilot；个人账号用户：检查是否已在 copilot.github.microsoft.com 绑定 |
| 找不到 Agent Mode | 确认 Copilot Chat 扩展版本 ≥ 0.22，尝试更新扩展 |
| 登录后无法使用 | 检查 Copilot license（需要 Copilot Individual / Business / Enterprise） |

---

## 准备完成？

✅ 以上步骤全部完成后，你就可以参加 session 了！

如有问题，请提前联系讲师。
