// 完整版 PPT - 所有 16 页
import {
  Deck,
  Slide,
  Heading,
  Text,
  FlexBox,
  Box,
} from 'spectacle';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

// 自定义深色代码块组件
const DarkCodeBlock = ({ children, language = 'text' }) => (
  <SyntaxHighlighter
    language={language}
    style={dracula}
    customStyle={{
      margin: 0,
      padding: '1.5rem',
      borderRadius: '16px',
      fontSize: '22px',
      lineHeight: 1.5,
    }}
    showLineNumbers={false}
  >
    {children}
  </SyntaxHighlighter>
);

const theme = {
  colors: {
    primary: '#818cf8',
    secondary: '#a78bfa',
    tertiary: '#ffffff',
    quaternary: '#12122a',
  },
  fonts: {
    header: '"Inter", "Noto Sans SC", "Microsoft YaHei", sans-serif',
    text: '"Segoe UI", "Noto Sans SC", "Microsoft YaHei", sans-serif',
    monospace: '"Cascadia Code", "Consolas", monospace',
  },
  fontSizes: {
    h1: '96px',
    h2: '72px',
    h3: '56px',
    text: '32px',
    monospace: '24px',
  },
};

const cardStyle = {
  background: 'rgba(18, 18, 42, 0.8)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(129, 140, 248, 0.2)',
  borderRadius: '16px',
  padding: '2rem',
};

// 代码块深色样式
const codeBlockStyle = {
  background: '#1e1e2e',  // Catppuccin Mocha 风格深色背景
  borderRadius: '16px',
  overflow: 'hidden',
  border: '1px solid rgba(129, 140, 248, 0.2)',
};

// 居中布局包装组件
const SlideContent = ({ children, width = '80%' }) => (
  <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
    <Box width={width}>
      {children}
    </Box>
  </FlexBox>
);

function App() {
  return (
    <Deck 
      theme={theme} 
      template={() => <></>}
      backgroundColor="#0e0a2a"
    >
      {/* Slide 1: Title */}
      <Slide backgroundColor="#0e0a2a">
        <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '4.5rem', fontWeight: 600, color: '#ffffff', margin: 0 }}>
              GitHub Copilot <span style={{ color: '#818cf8' }}>Skills</span>
            </h1>
            <p style={{ fontSize: '2rem', color: '#e2e8f0', marginTop: '1rem' }}>
              从使用到自定义
            </p>
            <p style={{ fontSize: '1.2rem', color: '#7a84b8', marginTop: '2rem' }}>
              实战 Lab Session
            </p>
          </div>
        </FlexBox>
      </Slide>

      {/* Slide 2: Agenda */}
      <Slide backgroundColor="#0e0a2a">
        <SlideContent width="75%">
          <Heading fontSize="72px" color="primary" margin="0 0 2rem 0">Agenda</Heading>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {['环境验证', 'Agent Mode 简介', 'Skills：什么 & 为什么', 'Team Skills 实战', 'Demo：Troubleshooting Chain', '自己创建 Skill'].map((item, i) => (
              <div key={i} style={{ ...cardStyle, padding: '1.2rem 2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <span style={{ color: '#818cf8', fontSize: '1.8rem', fontWeight: 700 }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ color: '#e2e8f0', fontSize: '1.6rem' }}>{item}</span>
              </div>
            ))}
          </div>
        </SlideContent>
      </Slide>

      {/* Slide 3: Environment Check */}
      <Slide backgroundColor="#0e0a2a">
        <SlideContent width="75%">
          <Heading fontSize="72px" color="primary" margin="0 0 2rem 0">环境验证</Heading>
          <div style={cardStyle}>
            {[
              { icon: '💻', text: 'VS Code + Copilot Chat 扩展' },
              { icon: '🔑', text: 'GitHub 账号已绑定（EMU 或个人）' },
              { icon: '🤖', text: 'Agent Mode 已启用' },
              { icon: '📁', text: 'Team Skills 已 Clone + Junction' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '1.2rem' }}>
                <span style={{ fontSize: '2rem' }}>{item.icon}</span>
                <span style={{ color: '#e2e8f0', fontSize: '1.6rem' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </SlideContent>
      </Slide>

      {/* Slide 4: Agent Mode */}
      <Slide backgroundColor="#0e0a2a">
        <SlideContent width="85%">
          <Heading fontSize="72px" color="primary" margin="0 0 2rem 0">Agent Mode</Heading>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {[
              { mode: 'Ask', desc: '只回答问题', status: '不执行操作', color: '#64748b' },
              { mode: 'Plan', desc: '生成计划', status: '需确认后执行', color: '#94a3b8' },
              { mode: 'Agent', desc: '完全自主', status: '命令/文件/工具', color: '#818cf8' },
            ].map((item, i) => (
              <div key={i} style={{ ...cardStyle, textAlign: 'center', borderColor: item.color }}>
                <h3 style={{ color: item.color, fontSize: '2.2rem', margin: '0 0 0.8rem 0' }}>{item.mode}</h3>
                <p style={{ color: '#e2e8f0', fontSize: '1.3rem', margin: '0.4rem 0' }}>{item.desc}</p>
                <p style={{ color: '#94a3b8', fontSize: '1.1rem', margin: 0 }}>{item.status}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '2rem', textAlign: 'center', padding: '1.2rem', background: 'rgba(129, 140, 248, 0.1)', borderRadius: '12px' }}>
            <span style={{ color: '#818cf8', fontSize: '1.6rem' }}>💡 Agent Mode 下 Skills 能完全自主执行</span>
          </div>
        </SlideContent>
      </Slide>

      {/* Slide 5: What is Skill */}
      <Slide backgroundColor="#0e0a2a">
        <SlideContent width="80%">
          <Heading fontSize="72px" color="primary" margin="0 0 2rem 0">什么是 Skill？</Heading>
          <div style={{ ...cardStyle, textAlign: 'center', marginBottom: '2rem' }}>
            <p style={{ color: '#e2e8f0', fontSize: '1.8rem', margin: 0 }}>
              一段 <span style={{ color: '#818cf8', fontWeight: 600 }}>Markdown 指令</span>，告诉 Copilot 如何执行特定任务
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {[
              { emoji: '📊', title: '解析 Media 日志', desc: '→ 输出质量报告' },
              { emoji: '📈', title: '分析 CQD 数据', desc: '→ 自动脱敏 + 统计' },
              { emoji: '✉️', title: '写邮件', desc: '→ 生成 HTML 格式' },
            ].map((item, i) => (
              <div key={i} style={{ ...cardStyle, textAlign: 'center', padding: '2rem' }}>
                <span style={{ fontSize: '2.5rem' }}>{item.emoji}</span>
                <p style={{ color: '#e2e8f0', fontSize: '1.3rem', margin: '0.8rem 0 0.5rem 0' }}>{item.title}</p>
                <p style={{ color: '#94a3b8', fontSize: '1.1rem', margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </SlideContent>
      </Slide>

      {/* Slide 6: Skill 本质 */}
      <Slide backgroundColor="#0e0a2a">
        <SlideContent width="75%">
          <Heading fontSize="72px" color="primary" margin="0 0 2rem 0">Skill 的本质</Heading>
          <h3 style={{ background: 'linear-gradient(135deg, #818cf8, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '3rem', textAlign: 'center', margin: '0 0 1.5rem 0' }}>
            Skill = Structured Prompt
          </h3>
          <p style={{ color: '#e2e8f0', fontSize: '1.6rem', textAlign: 'center', marginBottom: '2rem' }}>
            把你脑子里 "我平时是这样做的" 写成 Copilot 能执行的步骤
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div style={{ ...cardStyle, borderColor: '#64748b' }}>
              <h4 style={{ color: '#f87171', margin: '0 0 0.8rem 0', fontSize: '1.4rem' }}>❌ 没有 Skill</h4>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '1.2rem' }}>每次都要告诉 Copilot 怎么做</p>
            </div>
            <div style={{ ...cardStyle, borderColor: '#818cf8' }}>
              <h4 style={{ color: '#4ade80', margin: '0 0 0.8rem 0', fontSize: '1.4rem' }}>✅ 有了 Skill</h4>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '1.2rem' }}>Copilot 自动按你的 SOP 执行</p>
            </div>
          </div>
        </SlideContent>
      </Slide>

      {/* Slide 7: Two-Stage Injection */}
      <Slide backgroundColor="#0e0a2a">
        <SlideContent width="85%">
          <Heading fontSize="64px" color="primary" margin="0 0 1.5rem 0">两阶段注入机制</Heading>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <div style={{ ...cardStyle, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                <span style={{ color: '#818cf8', fontSize: '2.5rem', fontWeight: 700 }}>01</span>
                <h3 style={{ color: '#818cf8', margin: 0, fontSize: '1.6rem' }}>描述匹配</h3>
              </div>
              <p style={{ color: '#e2e8f0', fontSize: '1.2rem', margin: '0.5rem 0' }}>
                读取所有 SKILL.md 的 <code style={{ color: '#818cf8' }}>description</code>
              </p>
              <p style={{ color: '#94a3b8', fontSize: '1.1rem', margin: 0 }}>→ 判断哪个 Skill 最匹配</p>
            </div>
            <span style={{ color: '#818cf8', fontSize: '2.5rem' }}>→</span>
            <div style={{ ...cardStyle, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                <span style={{ color: '#818cf8', fontSize: '2.5rem', fontWeight: 700 }}>02</span>
                <h3 style={{ color: '#818cf8', margin: 0, fontSize: '1.6rem' }}>完整注入</h3>
              </div>
              <p style={{ color: '#e2e8f0', fontSize: '1.2rem', margin: '0.5rem 0' }}>读取整个 SKILL.md 内容</p>
              <p style={{ color: '#94a3b8', fontSize: '1.1rem', margin: 0 }}>→ 按 Procedure 执行</p>
            </div>
          </div>
          <div style={{ marginTop: '1.5rem', textAlign: 'center', padding: '1.2rem', background: 'rgba(129, 140, 248, 0.1)', borderRadius: '12px' }}>
            <span style={{ color: '#e2e8f0', fontSize: '1.3rem' }}>💡 所以 <span style={{ color: '#818cf8', fontWeight: 600 }}>description</span> 要写好，不然 Skill 匹配不上！</span>
          </div>
        </SlideContent>
      </Slide>

      {/* Slide 8: SKILL.md Core Elements */}
      <Slide backgroundColor="#0e0a2a">
        <SlideContent width="90%">
          <Heading fontSize="64px" color="primary" margin="0 0 1.5rem 0">SKILL.md 核心要素</Heading>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem', alignItems: 'start' }}>
            <div style={codeBlockStyle}>
              <DarkCodeBlock language="markdown">
{`---
description: 解析 Teams mediastack .blog，
             输出 CombinedMediaLogs.txt
---

# decode-media-log

将 .blog 转为可读文本。

## Procedure

1. 定位 MediaDecode.exe 路径
2. 执行解码命令
3. 输出到指定目录`}
              </DarkCodeBlock>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ ...cardStyle, borderLeft: '4px solid #818cf8', padding: '1.5rem 2rem' }}>
                <h4 style={{ color: '#818cf8', margin: '0 0 0.5rem 0', fontSize: '1.4rem' }}>description</h4>
                <p style={{ color: '#94a3b8', margin: 0, fontSize: '1.2rem' }}>触发匹配的关键</p>
              </div>
              <div style={{ ...cardStyle, borderLeft: '4px solid #a78bfa', padding: '1.5rem 2rem' }}>
                <h4 style={{ color: '#a78bfa', margin: '0 0 0.5rem 0', fontSize: '1.4rem' }}>Procedure</h4>
                <p style={{ color: '#94a3b8', margin: 0, fontSize: '1.2rem' }}>具体执行步骤</p>
              </div>
            </div>
          </div>
        </SlideContent>
      </Slide>

      {/* Slide 9: Team Skills */}
      <Slide backgroundColor="#0e0a2a">
        <SlideContent width="85%">
          <Heading fontSize="64px" color="primary" margin="0 0 1.5rem 0">Team Skills 一览</Heading>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
            {[
              { name: 'decode-media-log', desc: '解码 .blog → CombinedMediaLogs.txt', icon: '🔓' },
              { name: 'media-log-analysis', desc: '分析媒体日志，定位质量问题', icon: '🔍' },
              { name: 'cqd-quality-analyzer', desc: 'CQD 数据脱敏 + 通话质量统计', icon: '📊' },
              { name: 'email-writer', desc: '生成 HTML 格式专业邮件', icon: '✉️' },
            ].map((skill, i) => (
              <div key={i} style={{ ...cardStyle, display: 'flex', alignItems: 'flex-start', gap: '1.2rem' }}>
                <span style={{ fontSize: '2.5rem' }}>{skill.icon}</span>
                <div>
                  <h4 style={{ color: '#818cf8', margin: '0 0 0.5rem 0', fontSize: '1.5rem' }}>{skill.name}</h4>
                  <p style={{ color: '#94a3b8', margin: 0, fontSize: '1.2rem' }}>{skill.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </SlideContent>
      </Slide>

      {/* Slide 10: Clone + Junction */}
      <Slide backgroundColor="#0e0a2a">
        <SlideContent width="85%">
          <Heading fontSize="60px" color="primary" margin="0 0 1.5rem 0">Clone + Junction 配置</Heading>
          <div style={{ ...codeBlockStyle, marginBottom: '1.5rem' }}>
            <DarkCodeBlock language="powershell">
{`# 1. Clone Team Skills Repo
git clone <your-team-repo-url> \\
  C:\\Users\\$env:USERNAME\\.copilot\\TeamSkillRepo

# 2. 为每个 Skill 创建 Junction（按需链接）
New-Item -ItemType Junction \`
  -Path "C:\\Users\\$env:USERNAME\\.copilot\\skills\\decode-media-log" \`
  -Target "C:\\Users\\$env:USERNAME\\.copilot\\TeamSkillRepo\\decode-media-log"

# 继续添加其他需要的 Skills...
New-Item -ItemType Junction \`
  -Path "...\\skills\\media-log-analysis" \`
  -Target "...\\TeamSkillRepo\\media-log-analysis"`}
            </DarkCodeBlock>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
            <div style={{ ...cardStyle, padding: '1.2rem 2rem', textAlign: 'center' }}>
              <p style={{ color: '#e2e8f0', margin: 0, fontSize: '1.2rem' }}>
                每个 Skill 单独链接到 <code style={{ color: '#818cf8' }}>~/.copilot/skills/</code>
              </p>
            </div>
            <div style={{ ...cardStyle, padding: '1.2rem 2rem', textAlign: 'center', borderColor: '#818cf8' }}>
              <p style={{ color: '#818cf8', margin: 0, fontSize: '1.2rem' }}>💡 按需选择，Git pull 更新</p>
            </div>
          </div>
        </SlideContent>
      </Slide>

      {/* Slide 11: Troubleshooting Chain */}
      <Slide backgroundColor="#0e0a2a">
        <SlideContent width="85%">
          <Heading fontSize="60px" color="primary" margin="0 0 1.5rem 0">Troubleshooting Chain</Heading>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2.5rem', marginBottom: '2rem' }}>
            <div style={{ ...cardStyle, padding: '2rem 3rem', textAlign: 'center' }}>
              <span style={{ background: 'linear-gradient(135deg, #818cf8, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '1.8rem', fontWeight: 600 }}>decode-media-log</span>
            </div>
            <span style={{ color: '#818cf8', fontSize: '3rem' }}>→</span>
            <div style={{ ...cardStyle, padding: '2rem 3rem', textAlign: 'center' }}>
              <span style={{ background: 'linear-gradient(135deg, #818cf8, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '1.8rem', fontWeight: 600 }}>media-log-analysis</span>
            </div>
          </div>
          <div style={cardStyle}>
            <h4 style={{ color: '#818cf8', margin: '0 0 1rem 0', fontSize: '1.5rem' }}>工作流：</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.2rem' }}>
              {['用户提供 .blog 文件', 'decode 解码为文本', 'analysis 分析质量', '输出结构化报告'].map((step, i) => (
                <div key={i} style={{ textAlign: 'center', padding: '1.2rem', background: 'rgba(129, 140, 248, 0.1)', borderRadius: '8px' }}>
                  <span style={{ color: '#818cf8', fontSize: '2rem', fontWeight: 700 }}>{i + 1}</span>
                  <p style={{ color: '#94a3b8', margin: '0.6rem 0 0 0', fontSize: '1.1rem' }}>{step}</p>
                </div>
              ))}
            </div>
          </div>
        </SlideContent>
      </Slide>

      {/* Slide 12: Demo */}
      <Slide backgroundColor="#0e0a2a">
        <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '5rem', margin: '0 0 1rem 0' }}>🎬</h1>
            <h2 style={{ background: 'linear-gradient(135deg, #818cf8, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '3.5rem', margin: '0 0 1.5rem 0' }}>Demo Time</h2>
            <p style={{ color: '#e2e8f0', fontSize: '1.8rem', marginBottom: '2rem' }}>Media Log → 质量报告</p>
            <div style={{ ...cardStyle, display: 'inline-block', padding: '1.5rem 3rem' }}>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '1.3rem', fontStyle: 'italic' }}>"帮我分析这个 media log，找出通话质量问题"</p>
            </div>
          </div>
        </FlexBox>
      </Slide>

      {/* Slide 13: Create Your Own */}
      <Slide backgroundColor="#0e0a2a">
        <SlideContent width="80%">
          <Heading fontSize="64px" color="primary" margin="0 0 1.5rem 0">创建自己的 Skill</Heading>
          <p style={{ color: '#818cf8', fontSize: '1.5rem', marginBottom: '1.5rem' }}>最简单的方式：</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
              <span style={{ color: '#818cf8', fontSize: '2rem', fontWeight: 700 }}>1</span>
              <span style={{ color: '#e2e8f0', fontSize: '1.5rem' }}>先让 Copilot 帮你解决一个问题</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
              <span style={{ color: '#818cf8', fontSize: '2rem', fontWeight: 700 }}>2</span>
              <div style={{ ...cardStyle, padding: '1.2rem 2rem', flex: 1 }}>
                <span style={{ color: '#e2e8f0', fontSize: '1.5rem' }}>解决后说：</span>
                <span style={{ color: '#818cf8', marginLeft: '0.5rem', fontSize: '1.5rem' }}>"把刚才的解决步骤总结成一个 Skill"</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
              <span style={{ color: '#818cf8', fontSize: '2rem', fontWeight: 700 }}>3</span>
              <span style={{ color: '#e2e8f0', fontSize: '1.5rem' }}>Copilot 自动生成 SKILL.md</span>
            </div>
          </div>
          <div style={{ ...cardStyle, marginTop: '1.5rem', padding: '1rem 2rem', borderLeft: '4px solid #22c55e', background: 'rgba(34, 197, 94, 0.1)' }}>
            <p style={{ color: '#22c55e', margin: 0, fontSize: '1.3rem' }}>
              💡 先 MVP，再迭代 — 不用一开始就追求完备，能跑起来最重要
            </p>
          </div>
          <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#64748b', fontSize: '1.2rem' }}>
            参考：<span style={{ color: '#818cf8' }}>github.com/anthropics/skills</span> (113k+ ⭐)
          </p>
        </SlideContent>
      </Slide>

      {/* Slide 14: File Structure */}
      <Slide backgroundColor="#0e0a2a">
        <SlideContent width="85%">
          <Heading fontSize="64px" color="primary" margin="0 0 1.5rem 0">文件结构</Heading>
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: '2rem' }}>
            <div style={codeBlockStyle}>
              <DarkCodeBlock language="text">
{`~/.copilot/skills/
├── my-skill/               # 个人 Skill
│   ├── SKILL.md
│   └── scripts/
├── decode-media-log -> ...  # Junction
├── media-log-analysis -> ... # Junction
└── troubleshooting-search -> ... # Junction

~/.copilot/TeamSkillRepo/     # Team Repo
├── decode-media-log/
├── media-log-analysis/
└── ...`}
              </DarkCodeBlock>
            </div>
            <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ padding: '1.5rem', background: 'rgba(129, 140, 248, 0.1)', borderRadius: '8px', textAlign: 'center' }}>
                <span style={{ fontSize: '2rem' }}>💡</span>
                <p style={{ color: '#818cf8', margin: '0.5rem 0 0 0', fontSize: '1.3rem' }}>SKILL.md 是唯一必须的文件</p>
              </div>
            </div>
          </div>
        </SlideContent>
      </Slide>

      {/* Slide 15: Exercise */}
      <Slide backgroundColor="#0e0a2a">
        <SlideContent width="80%">
          <Heading fontSize="64px" color="primary" margin="0 0 1.5rem 0">动手练习</Heading>
          <div style={{ ...cardStyle, textAlign: 'center', marginBottom: '2rem', borderColor: '#818cf8' }}>
            <h3 style={{ color: '#818cf8', margin: '0 0 0.8rem 0', fontSize: '1.8rem' }}>任务</h3>
            <p style={{ color: '#e2e8f0', margin: 0, fontSize: '1.5rem' }}>想一个你经常重复做的任务</p>
            <p style={{ color: '#94a3b8', margin: '0.5rem 0 0 0', fontSize: '1.3rem' }}>让 Copilot 帮你完成，然后总结成 Skill</p>
          </div>
          <p style={{ color: '#818cf8', fontSize: '1.4rem', marginBottom: '1rem' }}>示例场景：</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {[
              { icon: '📄', text: '格式化某类日志/数据' },
              { icon: '📝', text: '生成特定格式的报告' },
              { icon: '✅', text: '执行固定流程的检查' },
            ].map((item, i) => (
              <div key={i} style={{ ...cardStyle, textAlign: 'center', padding: '2rem' }}>
                <span style={{ fontSize: '2.5rem' }}>{item.icon}</span>
                <p style={{ color: '#94a3b8', margin: '0.8rem 0 0 0', fontSize: '1.2rem' }}>{item.text}</p>
              </div>
            ))}
          </div>
        </SlideContent>
      </Slide>

      {/* Slide 16: Takeaways */}
      <Slide backgroundColor="#0e0a2a">
        <SlideContent width="80%">
          <Heading fontSize="64px" color="primary" margin="0 0 1.5rem 0">Takeaways</Heading>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { key: 'Agent Mode', value: '是使用 Skills 的前提' },
              { key: 'description', value: '决定 Skill 能否被触发' },
              { key: 'Skills 可以串联', value: '形成工作流' },
              { key: '创建 Skill', value: '先解决问题，再让 Copilot 总结' },
              { key: '团队共享', value: 'Git + Junction' },
            ].map((item, i) => (
              <div key={i} style={{ ...cardStyle, display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.2rem 2rem' }}>
                <span style={{ color: '#818cf8', fontSize: '1.5rem', fontWeight: 600, minWidth: '12rem' }}>{item.key}</span>
                <span style={{ color: '#94a3b8', fontSize: '1.4rem' }}>{item.value}</span>
              </div>
            ))}
          </div>
          <p style={{ background: 'linear-gradient(135deg, #818cf8, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textAlign: 'center', fontSize: '2.5rem', marginTop: '2rem' }}>
            Happy Copiloting! 🚀
          </p>
        </SlideContent>
      </Slide>
    </Deck>
  );
}

export default App;
