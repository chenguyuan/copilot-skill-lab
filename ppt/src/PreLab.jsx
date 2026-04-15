import './PreLab.css';

export default function PreLab() {
  return (
    <div className="prelab">
      <div className="prelab-container">
        <header className="prelab-header">
          <h1>Lab 会前准备</h1>
          <p className="subtitle">Copilot Skills Session</p>
          <div className="meta">
            <span>⏱️ 预计耗时：10-15 分钟</span>
            <span>📅 请在 session 前完成以下步骤</span>
          </div>
        </header>

        {/* Step 1 */}
        <section className="step">
          <h2><span className="step-num">1</span>确认 GitHub 账号</h2>
          <p>你有 <strong>两种方式</strong> 使用 GitHub Copilot，任选其一：</p>

          <div className="option-card">
            <h3>方式 A：使用 EMU 账号（推荐）</h3>
            <p>如果你的公司已为你分配了 <strong>Enterprise Managed User (EMU)</strong> 账号（格式如 <code>yourname_microsoft</code>），可直接使用该账号登录，无需额外绑定。</p>
            <div className="tip">💡 如何确认：检查你的 GitHub 账号是否显示 "GitHub Copilot enabled for your xxx_microsoft Enterprise Managed User (EMU) account"</div>
          </div>

          <div className="option-card">
            <h3>方式 B：绑定个人 GitHub 账号</h3>
            <ol>
              <li>访问 <a href="https://copilot.github.microsoft.com/" target="_blank" rel="noopener noreferrer">https://copilot.github.microsoft.com/</a></li>
              <li>将你的个人 GitHub 账号与公司账号关联</li>
              <li>后续登录时使用该个人 GitHub 账号</li>
            </ol>
          </div>
        </section>

        {/* Step 2 */}
        <section className="step">
          <h2><span className="step-num">2</span>安装 VS Code</h2>
          <p>下载并安装：<a href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer">https://code.visualstudio.com/</a></p>
          <p>安装时 <strong>勾选</strong> "Add to PATH"。</p>
        </section>

        {/* Step 3 */}
        <section className="step">
          <h2><span className="step-num">3</span>安装 Copilot Extensions</h2>
          <ol>
            <li>打开 VS Code</li>
            <li>按 <kbd>Ctrl+Shift+X</kbd> 打开 Extensions 面板</li>
            <li>搜索并安装以下两个扩展：</li>
          </ol>
          <table>
            <thead>
              <tr><th>Extension</th><th>Extension ID</th></tr>
            </thead>
            <tbody>
              <tr><td>GitHub Copilot</td><td><code>GitHub.copilot</code></td></tr>
              <tr><td>GitHub Copilot Chat</td><td><code>GitHub.copilot-chat</code></td></tr>
            </tbody>
          </table>
        </section>

        {/* Step 4 */}
        <section className="step">
          <h2><span className="step-num">4</span>登录 GitHub</h2>
          <p>安装扩展后，VS Code 右下角会提示 <strong>Sign in to GitHub</strong>。</p>
          <p>点击登录，使用 <strong>Step 1 中选择的账号</strong>（EMU 账号或已绑定的个人账号）。</p>
        </section>

        {/* Step 5 */}
        <section className="step">
          <h2><span className="step-num">5</span>验证 Agent Mode</h2>
          <ol>
            <li>按 <kbd>Ctrl+Shift+I</kbd> 打开 Copilot Chat 面板</li>
            <li>在面板顶部下拉菜单中切换到 <strong>Agent</strong> mode</li>
            <li>输入：<code>What is the current date?</code></li>
            <li>确认能收到回复 → ✅ 环境准备完成！</li>
          </ol>
        </section>

        {/* Step 6 */}
        <section className="step">
          <h2><span className="step-num">6</span>获取团队 Skills（可选）</h2>

          <h3>1. Clone 团队 repo</h3>
          <pre><code>{`git clone https://dev.azure.com/GCR-AIFirst/AIFirst/_git/skills-common $env:USERPROFILE\\.copilot\\Teamskillrepo`}</code></pre>

          <h3>2. 创建你的 skills 目录（如果不存在）</h3>
          <pre><code>{`New-Item -Path "$env:USERPROFILE\\.copilot\\skills" -ItemType Directory -Force`}</code></pre>

          <h3>3. 用 Junction 链接团队 skills</h3>
          <pre><code>{`cd $env:USERPROFILE\\.copilot\\skills

# 为每个 skill 创建 junction
New-Item -ItemType Junction -Name "decode-media-log" -Target "..\\Teamskillrepo\\decode-media-log"
New-Item -ItemType Junction -Name "media-log-analysis" -Target "..\\Teamskillrepo\\media-log-analysis"
New-Item -ItemType Junction -Name "cqd-quality-analyzer" -Target "..\\Teamskillrepo\\cqd-quality-analyzer"
New-Item -ItemType Junction -Name "email-writer" -Target "..\\Teamskillrepo\\email-writer"`}</code></pre>

          <div className="tip">💡 Junction 的好处：团队 repo 独立 <code>git pull</code> 更新，你的 skills 目录里个人 + 团队共存</div>
        </section>

        {/* FAQ */}
        <section className="step">
          <h2>常见问题</h2>
          <table>
            <thead>
              <tr><th>问题</th><th>解决方案</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>Copilot 图标有红色警告</td>
                <td>EMU 用户：确认账号已启用 Copilot；个人账号用户：检查是否已在 copilot.github.microsoft.com 绑定</td>
              </tr>
              <tr>
                <td>找不到 Agent Mode</td>
                <td>确认 Copilot Chat 扩展版本 ≥ 0.22，尝试更新扩展</td>
              </tr>
              <tr>
                <td>登录后无法使用</td>
                <td>检查 Copilot license（需要 Copilot Individual / Business / Enterprise）</td>
              </tr>
            </tbody>
          </table>
        </section>

        <footer className="prelab-footer">
          <p>✅ 以上步骤全部完成后，你就可以参加 session 了！</p>
        </footer>
      </div>
    </div>
  );
}
