import React from 'react';
import {
  Deck,
  Slide,
  Heading,
  Text,
  FlexBox,
  Box,
  Notes,
} from 'spectacle';
import { theme } from './theme';

// --- 通用布局组件 ---

const SlideContent = ({ children, padding = '40px 60px' }) => (
  <div
    style={{
      backgroundColor: '#0d1117',
      backgroundImage: 'radial-gradient(ellipse at top right, #1a2332 0%, #0d1117 60%)',
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding,
    }}
  >
    {children}
  </div>
);

const Card = ({ children, style = {} }) => (
  <div
    style={{
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '12px',
      padding: '24px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      ...style,
    }}
  >
    {children}
  </div>
);

const StatCard = ({ number, label, color = '#0078d4' }) => (
  <div
    style={{
      textAlign: 'center',
      padding: '20px 16px',
      backgroundColor: 'rgba(255, 255, 255, 0.04)',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      flex: 1,
    }}
  >
    <div style={{ fontSize: '48px', fontWeight: 700, color, marginBottom: '8px' }}>
      {number}
    </div>
    <div style={{ fontSize: '16px', color: '#8b949e' }}>{label}</div>
  </div>
);

const Bullet = ({ icon = '→', color = '#0078d4', children }) => (
  <div style={{ display: 'flex', gap: '12px', marginBottom: '14px', alignItems: 'flex-start' }}>
    <span style={{ color, fontSize: '20px', flexShrink: 0, marginTop: '2px' }}>{icon}</span>
    <span style={{ color: '#c9d1d9', fontSize: '22px', lineHeight: 1.5 }}>{children}</span>
  </div>
);

const SectionTitle = ({ children, sub }) => (
  <div style={{ marginBottom: '32px' }}>
    <Heading fontSize="52px" fontWeight={700} color="#ffffff" margin="0 0 8px 0">
      {children}
    </Heading>
    {sub && (
      <Text fontSize="24px" color="#0078d4" margin="0">
        {sub}
      </Text>
    )}
  </div>
);

const TwoCol = ({ left, right, ratio = '1fr 1fr', gap = '48px' }) => (
  <div style={{ display: 'grid', gridTemplateColumns: ratio, gap, flex: 1 }}>
    {left}
    {right}
  </div>
);

// --- Flywheel 组件 ---
const Flywheel = () => {
  const steps = [
    { label: 'Build Stronger\nSkills', icon: '🔧', color: '#0078d4' },
    { label: 'Share & Review\nin Platform', icon: '🔄', color: '#6264a7' },
    { label: 'Learn via\nLab Session', icon: '📚', color: '#107c10' },
    { label: 'Apply to\nTroubleshooting', icon: '🎯', color: '#ffb900' },
  ];
  const size = 280;
  const cx = size / 2;
  const cy = size / 2;
  const r = 100;

  return (
    <div style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}>
      {/* 中心圆环箭头 */}
      <svg
        width={size}
        height={size}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <circle
          cx={cx}
          cy={cy}
          r={60}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="2"
        />
        {/* 顺时针箭头弧线 */}
        <path
          d={`M ${cx} ${cy - 50} A 50 50 0 1 1 ${cx - 1} ${cy - 50}`}
          fill="none"
          stroke="rgba(0,120,212,0.3)"
          strokeWidth="2"
          strokeDasharray="8 4"
        />
      </svg>
      {/* 四个节点 */}
      {steps.map((s, i) => {
        const angle = (i * Math.PI) / 2 - Math.PI / 2;
        const x = cx + r * Math.cos(angle) - 52;
        const y = cy + r * Math.sin(angle) - 36;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: 104,
              height: 72,
              backgroundColor: 'rgba(255,255,255,0.06)',
              border: `1px solid ${s.color}40`,
              borderRadius: '10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px',
            }}
          >
            <div style={{ fontSize: '20px', marginBottom: '4px' }}>{s.icon}</div>
            <div
              style={{
                fontSize: '11px',
                color: '#c9d1d9',
                textAlign: 'center',
                lineHeight: 1.3,
                whiteSpace: 'pre-line',
              }}
            >
              {s.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// =====================================================================
// PRESENTATION — 4 Slides, ~6 min (compact)
// =====================================================================

export default function Presentation() {
  return (
    <Deck
      theme={theme}
      template={() => <></>}
      backgroundColor="#0d1117"
    >
      {/* ======================== Slide 0: Before/After + SAP Example ======================== */}
      <Slide backgroundColor="#0d1117">
        <SlideContent padding="32px 50px">
          <SectionTitle>What Can Skills Do?</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', flex: 1 }}>
            {/* Top-left: Before */}
            <Card style={{ borderLeft: '3px solid #f85149', padding: '18px' }}>
              <div style={{ color: '#f85149', fontSize: '16px', fontWeight: 600, marginBottom: '10px' }}>
                ⏱️ Before — Manual Workflow
              </div>
              <Bullet icon="•" color="#f85149">Media log: manually decode → read section by section → write email</Bullet>
              <Bullet icon="•" color="#f85149">SAP: cross-reference multiple entitlement docs</Bullet>
              <Bullet icon="•" color="#f85149">CQD: manual cleanup + anonymization + statistics</Bullet>
              <div style={{ color: '#f85149', fontSize: '28px', fontWeight: 700, textAlign: 'center', marginTop: '8px' }}>
                1–2 hours per case
              </div>
            </Card>

            {/* Top-right: After */}
            <Card style={{ borderLeft: '3px solid #107c10', padding: '18px' }}>
              <div style={{ color: '#107c10', fontSize: '16px', fontWeight: 600, marginBottom: '10px' }}>
                ⚡ After — With Copilot Skills
              </div>
              <Bullet icon="✓" color="#107c10">Natural language: describe what you need</Bullet>
              <Bullet icon="✓" color="#107c10">Skill handles: decode, analyze, draft email</Bullet>
              <Bullet icon="✓" color="#107c10">SAP: one prompt → judgment + action</Bullet>
              <div style={{ color: '#107c10', fontSize: '28px', fontWeight: 700, textAlign: 'center', marginTop: '8px' }}>
                ~10 minutes
              </div>
            </Card>

            {/* Bottom-left: SAP Before */}
            <Card style={{ borderLeft: '3px solid #ffb900', padding: '18px' }}>
              <div style={{ color: '#ffb900', fontSize: '16px', fontWeight: 600, marginBottom: '10px' }}>
                📋 Example: SAP — Before
              </div>
              <Bullet icon="1." color="#8b949e">Open each case individually</Bullet>
              <Bullet icon="2." color="#8b949e">Review SAP severity level</Bullet>
              <Bullet icon="3." color="#8b949e">Read case notes / title to verify SAP correctness</Bullet>
              <Bullet icon="4." color="#8b949e">Repeat for every single case</Bullet>
            </Card>

            {/* Bottom-right: SAP After */}
            <Card style={{ borderLeft: '3px solid #0078d4', padding: '18px' }}>
              <div style={{ color: '#0078d4', fontSize: '16px', fontWeight: 600, marginBottom: '10px' }}>
                🤖 Example: SAP — With Skill
              </div>
              <div style={{
                backgroundColor: 'rgba(0,120,212,0.1)',
                borderRadius: '6px',
                padding: '10px 14px',
                fontFamily: '"Cascadia Code", monospace',
                fontSize: '15px',
                color: '#58a6ff',
                marginBottom: '12px',
                lineHeight: 1.5,
              }}>
                "Help me check and update the SAP for case #12345678"
              </div>
              <Bullet icon="✓" color="#107c10">Auto-checks SAP severity + verifies correctness</Bullet>
              <div style={{ color: '#8b949e', fontSize: '14px', textAlign: 'center', marginTop: '4px' }}>
                ⚠️ Engineer always validates the result
              </div>
            </Card>
          </div>
        </SlideContent>
        <Notes>
          Every day we do repetitive but experience-heavy work. Media log analysis takes 1-2 hours, SAP judgment requires flipping through multiple docs.
          With Skills, these become natural language requests — done in 10 minutes.
          Take SAP for example: before, you had to open each case, review SAP severity, read case notes to verify correctness — for every single case.
          Now one prompt, Skill auto-checks SAP and verifies it. Of course, the engineer always validates the result.
        </Notes>
      </Slide>

      {/* ======================== Slide 1: Platform + Results ======================== */}
      <Slide backgroundColor="#0d1117">
        <SlideContent padding="32px 50px">
          <SectionTitle>The Platform & Results</SectionTitle>
          <TwoCol
            gap="32px"
            left={
              <div>
                <Bullet icon="📦">
                  <strong style={{ color: '#ffffff' }}>Azure DevOps Repo</strong> — centralized, compliant
                </Bullet>
                <Bullet icon="🔗">
                  <strong style={{ color: '#ffffff' }}>Clone + Junction</strong> — one command to connect VS Code
                </Bullet>
                <Bullet icon="🔄">
                  <strong style={{ color: '#ffffff' }}>PR Review</strong> — co-author & improve collaboratively
                </Bullet>

                <Card style={{ marginTop: '16px', borderLeft: '3px solid #6264a7', padding: '14px' }}>
                  <div style={{ color: '#6264a7', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
                    skills-common (6 skills)
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                    {['az-devops', 'az-profile-switch', 'azure-china-docs-convert', 'd365-case-ops', 'kusto-finding', 'local-web-search'].map(s => (
                      <span key={s} style={{
                        backgroundColor: 'rgba(0,120,212,0.15)',
                        color: '#58a6ff',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '12px',
                      }}>
                        {s}
                      </span>
                    ))}
                  </div>
                  <div style={{ color: '#ffb900', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>
                    skills-teams (4 skills)
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {['cqd-quality-analyzer', 'decode-media-log', 'email-writer', 'media-log-analysis'].map(s => (
                      <span key={s} style={{
                        backgroundColor: 'rgba(255,185,0,0.15)',
                        color: '#ffb900',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '12px',
                      }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </Card>

                {/* Media pipeline */}
                <Card style={{ marginTop: '12px', padding: '14px' }}>
                  <div style={{ color: '#ffffff', fontSize: '15px', fontWeight: 600, marginBottom: '8px' }}>
                    🔄 Media Pipeline — Composable
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    {[
                      { name: 'decode', color: '#0078d4' },
                      { name: 'analysis', color: '#6264a7' },
                      { name: 'email', color: '#107c10' },
                      { name: 'cqd', color: '#ffb900' },
                    ].map((s, i) => (
                      <React.Fragment key={s.name}>
                        <span style={{
                          backgroundColor: `${s.color}20`,
                          color: s.color,
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                        }}>
                          {s.name}
                        </span>
                        {i < 3 && <span style={{ color: '#8b949e', fontSize: '12px' }}>→</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </Card>

                {/* 5 repos */}
                <Card style={{ marginTop: '12px', padding: '14px', borderLeft: '3px solid #107c10' }}>
                  <div style={{ color: '#107c10', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                    5 Repos in Platform
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {['skills-common', 'skills-teams', 'skills-exchange', 'skills-office', 'skills-sharepoint'].map(s => (
                      <span key={s} style={{
                        backgroundColor: 'rgba(16,124,16,0.12)',
                        color: '#3fb950',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                      }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </Card>
              </div>
            }
            right={
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Stats */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <StatCard number="176" label="Push Updates" color="#107c10" />
                  <StatCard number="10" label="Skills" color="#0078d4" />
                  <StatCard number="31" label="Engineers Reached" color="#6264a7" />
                </div>

                {/* Flywheel */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ color: '#ffffff', fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>
                    Skill Flywheel
                  </div>
                  <Flywheel />
                </div>

                {/* Quote */}
                <Card style={{ borderLeft: '3px solid #ffb900', padding: '14px' }}>
                  <Text fontSize="16px" color="#e6edf3" fontStyle="italic" margin="0">
                    "For the first time, I solved a media troubleshooting case in under 15 minutes."
                  </Text>
                  <Text fontSize="12px" color="#8b949e" margin="4px 0 0 0">
                    — Engineer feedback after Lab Session
                  </Text>
                </Card>
              </div>
            }
          />
        </SlideContent>
        <Notes>
          The platform is built on Azure DevOps with 5 repos: skills-common, skills-teams, skills-exchange, skills-office, skills-sharepoint.
          Currently 10 Skills (6 in skills-common + 4 in skills-teams), 176 push updates, reaching 31 engineers.
          The media analysis pipeline chains 4 Skills together with natural language.
          The Flywheel: Build → Share → Learn → Apply — a self-reinforcing cycle.
        </Notes>
      </Slide>

      {/* ======================== Slide 2: Get Started ======================== */}
      <Slide backgroundColor="#0d1117">
        <SlideContent padding="32px 50px">
          <SectionTitle>How to Get Started</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', flex: 1 }}>
            {/* Top-left: Use Skills */}
            <Card style={{ borderLeft: '3px solid #0078d4', padding: '18px' }}>
              <div style={{ color: '#0078d4', fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>
                🚀 Use Skills (2 min setup)
              </div>
              <Bullet icon="1." color="#0078d4">Clone the AIFirst repo</Bullet>
              <Bullet icon="2." color="#0078d4">Run junction script → link to VS Code</Bullet>
              <Bullet icon="3." color="#0078d4">Start using Skills in Copilot Chat</Bullet>
            </Card>

            {/* Top-right: Contribute */}
            <Card style={{ borderLeft: '3px solid #107c10', padding: '18px' }}>
              <div style={{ color: '#107c10', fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>
                🤝 Contribute Skills
              </div>
              <Bullet icon="1." color="#107c10">Write a SKILL.md (just Markdown!)</Bullet>
              <Bullet icon="2." color="#107c10">Submit a PR → team reviews → merge</Bullet>
              <div style={{
                backgroundColor: 'rgba(16,124,16,0.1)',
                borderRadius: '8px',
                padding: '10px',
                marginTop: '8px',
                textAlign: 'center',
              }}>
                <Text fontSize="16px" color="#107c10" margin="0" fontWeight={600}>
                  No coding needed — Markdown is enough.
                </Text>
              </div>
            </Card>

            {/* Bottom-left: Lightning Lab */}
            <Card style={{ borderLeft: '3px solid #6264a7', padding: '18px' }}>
              <div style={{ color: '#6264a7', fontSize: '18px', fontWeight: 600, marginBottom: '10px' }}>
                📚 30min Lightning Lab
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {[
                  { t: '5min', l: 'What & Why' },
                  { t: '15min', l: 'Live Demo' },
                  { t: '8min', l: 'Hands-on' },
                  { t: '2min', l: 'Q&A' },
                ].map(s => (
                  <div key={s.l} style={{
                    backgroundColor: 'rgba(98,100,167,0.15)',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: '16px', fontWeight: 600, color: '#a5a6e6' }}>{s.t}</div>
                    <div style={{ fontSize: '12px', color: '#8b949e' }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <Text fontSize="15px" color="#8b949e" margin="10px 0 0 0">
                Designed to get you productive quickly.
              </Text>
            </Card>

            {/* Bottom-right: Link + CTA */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center' }}>
              <div style={{
                backgroundColor: 'rgba(0,120,212,0.12)',
                borderRadius: '12px',
                padding: '24px',
                textAlign: 'center',
                border: '1px solid rgba(0,120,212,0.25)',
              }}>
                <div style={{ fontSize: '16px', color: '#8b949e', marginBottom: '12px' }}>
                  Repo & Wiki & Lab Materials
                </div>
                <div style={{
                  fontFamily: '"Cascadia Code", monospace',
                  fontSize: '16px',
                  color: '#58a6ff',
                  wordBreak: 'break-all',
                }}>
                  🔗 dev.azure.com/GCR-AIFirst/AIFirst
                </div>
              </div>
              <Card style={{ borderLeft: '3px solid #ffb900', padding: '16px' }}>
                <div style={{ color: '#ffb900', fontSize: '16px', fontWeight: 600, marginBottom: '10px' }}>
                  👥 V-Team
                </div>
                <div style={{ marginBottom: '6px' }}>
                  <span style={{ color: '#8b949e', fontSize: '13px' }}>Advisor: </span>
                  <span style={{ color: '#e6edf3', fontSize: '14px', fontWeight: 500 }}>Hongtao Zhou</span>
                </div>
                <div>
                  <span style={{ color: '#8b949e', fontSize: '13px' }}>Owners: </span>
                  <span style={{ color: '#e6edf3', fontSize: '14px', fontWeight: 500 }}>Guyuan Chen · Joie Cen · Peter Gao</span>
                </div>
              </Card>
            </div>
          </div>
        </SlideContent>
        <Notes>
          How to get started? Using Skills takes just 2 minutes: clone the repo, run the junction script, and start using Skills in Copilot Chat.
          Want to contribute? Write a SKILL.md — it's just Markdown — submit a PR, get it reviewed and merged.
          We have a 30-minute Lightning Lab to help you get up to speed quickly.
          Everything is in the DevOps repo. Questions? Reach out anytime.
        </Notes>
      </Slide>
    </Deck>
  );
}
