import React, { useEffect, useRef, useState } from 'react';
import {
  Sun,
  Hand,
  UserCheck,
  Volume2,
  Code2,
  Palette,
  Route,
  ShieldCheck,
  ArrowRight,
  SlidersHorizontal,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import { useMotionPreference } from '../hooks/useMotionPreference';

function useStickySteps(stepCount: number, reducedMotion: boolean) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [manualStep, setManualStep] = useState<number>(0);

  useEffect(() => {
    if (reducedMotion) return;

    let rafId = 0;

    const update = () => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const scrollable = track.offsetHeight - window.innerHeight;
      if (scrollable <= 0) {
        setScrollProgress(0);
        return;
      }
      const raw = -rect.top / scrollable;
      const clamped = Math.max(0, Math.min(1, raw));
      setScrollProgress(clamped);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [reducedMotion]);

  const activeIndex = reducedMotion
    ? manualStep
    : Math.min(stepCount - 1, Math.floor(scrollProgress * stepCount));

  const getStepFill = (idx: number): number => {
    if (reducedMotion) {
      return idx === manualStep ? 1 : 0;
    }
    const start = idx / stepCount;
    const end = (idx + 1) / stepCount;
    if (scrollProgress <= start) return 0;
    if (scrollProgress >= end) return 1;
    return (scrollProgress - start) / (end - start);
  };

  const jumpToStep = (idx: number) => {
    if (reducedMotion) {
      setManualStep(idx);
      return;
    }
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const trackTop = window.scrollY + rect.top;
    const scrollable = track.offsetHeight - window.innerHeight;
    if (scrollable <= 0) {
      setManualStep(idx);
      return;
    }
    const targetProgress = (idx + 0.15) / stepCount;
    window.scrollTo({
      top: trackTop + scrollable * targetProgress,
      behavior: 'smooth',
    });
  };

  return {
    trackRef,
    activeIndex,
    scrollProgress,
    getStepFill,
    jumpToStep,
  };
}

type ScenarioId = 'sunlight' | 'aging' | 'injury' | 'sensory';

interface EverydayScenario {
  id: ScenarioId;
  stepNum: string;
  shortLabel: string;
  title: string;
  tag: string;
  description: string;
  highlights: string[];
  icon: React.ComponentType<{ size?: number }>;
}

const EVERYDAY_SCENARIOS: EverydayScenario[] = [
  {
    id: 'sunlight',
    stepNum: '01',
    shortLabel: '밝은 햇빛 아래',
    title: '밝은 햇빛 아래에서의 화면 보기',
    tag: '야외 시인성 · 고대비',
    description:
      '강한 햇빛과 화면 반사 속에서도 글자와 버튼 경계가 흐려지지 않도록 충분한 명도 대비와 또렷한 굵기를 제공합니다.',
    highlights: ['명도 대비 7:1 수준 확보', '반사광에도 선명한 타이포그래피', '명확한 버튼 경계와 여백'],
    icon: Sun,
  },
  {
    id: 'aging',
    stepNum: '02',
    shortLabel: '나이 듦에 따른 변화',
    title: '나이 듦에 따른 자연스러운 변화',
    tag: '편안한 가독성 · 직관적 안내',
    description:
      '작은 글씨가 침침해지거나 복잡한 화면이 부담스러울 때도, 여유 있는 크기와 일관된 안내 흐름으로 누구나 쉽게 이용합니다.',
    highlights: ['여유 있는 본문 크기와 행간', '복잡함을 덜어낸 단계별 안내', '음성·화면 확대 호환'],
    icon: UserCheck,
  },
  {
    id: 'injury',
    stepNum: '03',
    shortLabel: '일시적인 부상 · 한 손',
    title: '일시적인 부상이나 짐을 든 한 손 조작',
    tag: '엄지 도달 영역 · 넉넉한 터치',
    description:
      '팔을 다쳤거나 장바구니를 들어 한 손만 쓸 수 있는 순간에도, 넉넉한 터치 영역과 도달하기 쉬운 배치로 끊김 없이 조작합니다.',
    highlights: ['44px 이상 넉넉한 터치 영역', '한 손으로 닿는 핵심 동작 배치', '오터치를 줄이는 버튼 간격'],
    icon: Hand,
  },
  {
    id: 'sensory',
    stepNum: '04',
    shortLabel: '시각·자막 소통',
    title: '소음 환경·무음 모드에서의 정보 전달',
    tag: '실시간 자막 · 시각·진동 피드백',
    description:
      '시끄러운 대중교통 안이나 소리를 켤 수 없는 공간에서도 자막, 텍스트 알림, 진동 피드백이 음성 정보를 온전히 대신합니다.',
    highlights: ['음성 의존 없는 자막·텍스트 안내', '시각 알림과 햅틱 진동 병행', '어느 환경에서나 동등한 정보 이해'],
    icon: Volume2,
  },
];

const ScenarioMotionCanvas: React.FC<{ scenarioId: ScenarioId }> = ({ scenarioId }) => {
  switch (scenarioId) {
    case 'sunlight':
      return (
        <svg viewBox="0 0 420 300" className="mg-canvas-svg" aria-hidden="true">
          <defs>
            <linearGradient id="sunGlareGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f0cb7a" stopOpacity="0.55" />
              <stop offset="50%" stopColor="#fffaf3" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#d08a4e" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Rotating Sun & Rays */}
          <g className="mg-sun-group">
            <circle cx="82" cy="68" r="24" fill="#f0cb7a" stroke="#d08a4e" strokeWidth="2.5" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <line
                key={deg}
                x1="82"
                y1="30"
                x2="82"
                y2="38"
                stroke="#d08a4e"
                strokeWidth="3"
                strokeLinecap="round"
                transform={`rotate(${deg} 82 68)`}
              />
            ))}
          </g>

          {/* Device Screen Frame */}
          <rect x="132" y="38" width="184" height="224" rx="22" className="mg-device-shell" />
          <rect x="144" y="54" width="160" height="192" rx="14" className="mg-sun-screen" />

          {/* High-Contrast Adaptive Content */}
          <rect x="160" y="74" width="68" height="18" rx="9" className="mg-sun-pill" />
          <text x="194" y="86.5" textAnchor="middle" className="mg-sun-pill-text">
            AAA 7.4:1
          </text>

          <rect x="160" y="106" width="126" height="12" rx="6" className="mg-sun-title-bar" />
          <rect x="160" y="126" width="102" height="10" rx="5" className="mg-sun-sub-bar" />

          {/* Clear High-Contrast CTA Button */}
          <g className="mg-sun-cta-pulse">
            <rect x="160" y="160" width="128" height="42" rx="12" className="mg-sun-cta" />
            <text x="224" y="185.5" textAnchor="middle" className="mg-sun-cta-label">
              선명한 안내 확인
            </text>
          </g>

          {/* Sweeping Sunlight Glare Beam */}
          <rect
            x="90"
            y="20"
            width="90"
            height="260"
            fill="url(#sunGlareGrad)"
            className="mg-glare-sweep"
          />

          {/* Contrast Meter Card */}
          <g className="mg-float-card">
            <rect x="278" y="206" width="114" height="54" rx="12" fill="#2b2f33" />
            <text x="292" y="227" fill="#f0cb7a" fontSize="11" fontWeight="700">
              야외 고대비 활성
            </text>
            <rect x="292" y="237" width="86" height="7" rx="3.5" fill="rgba(255,250,243,0.2)" />
            <rect x="292" y="237" width="82" height="7" rx="3.5" fill="#f0cb7a" className="mg-meter-fill" />
          </g>
        </svg>
      );

    case 'aging':
      return (
        <svg viewBox="0 0 420 300" className="mg-canvas-svg" aria-hidden="true">
          {/* Tablet / Reader Card */}
          <rect x="64" y="38" width="292" height="224" rx="22" className="mg-device-shell" />
          <rect x="80" y="54" width="260" height="192" rx="14" fill="#fffaf3" stroke="rgba(208,138,78,0.24)" />

          {/* Font Scale Slider Header */}
          <rect x="98" y="70" width="224" height="32" rx="10" fill="#f5ece1" />
          <text x="114" y="90.5" fill="#8f5122" fontSize="12" fontWeight="700">
            가
          </text>
          <line x1="136" y1="86" x2="268" y2="86" stroke="rgba(143,81,34,0.25)" strokeWidth="4" strokeLinecap="round" />
          <circle cx="170" cy="86" r="7" fill="#8f5122" className="mg-aging-slider-knob" />
          <text x="284" y="92" fill="#8f5122" fontSize="17" fontWeight="800">
            가+
          </text>

          {/* Expanding Typography Group */}
          <g className="mg-aging-text-group">
            <text x="102" y="136" fill="#2b2f33" fontSize="19" fontWeight="800">
              진료 예약이 완료되었습니다
            </text>
            <text x="102" y="164" fill="#4d5863" fontSize="13.5" fontWeight="600">
              오후 2시 30분 · 2층 내과 창구
            </text>
          </g>

          {/* Large Step-by-Step Button */}
          <g className="mg-aging-btn-focus">
            <rect x="98" y="186" width="224" height="44" rx="12" fill="#8f5122" />
            <text x="210" y="213" textAnchor="middle" fill="#fffaf3" fontSize="14.5" fontWeight="700">
              큰 글씨로 위치 안내 보기
            </text>
          </g>

          {/* Floating Magnification Badge */}
          <g className="mg-aging-badge">
            <circle cx="342" cy="72" r="26" fill="#d08a4e" />
            <text x="342" y="77" textAnchor="middle" fill="#fffaf3" fontSize="13" fontWeight="800">
              135%
            </text>
          </g>
        </svg>
      );

    case 'injury':
      return (
        <svg viewBox="0 0 420 300" className="mg-canvas-svg" aria-hidden="true">
          {/* Mobile Phone Frame */}
          <rect x="126" y="24" width="168" height="252" rx="26" className="mg-device-shell" />
          <rect x="138" y="38" width="144" height="224" rx="18" fill="#fffaf3" />

          {/* Unreachable Top Area (Dimmed) */}
          <rect x="152" y="54" width="116" height="36" rx="9" fill="#f3e7d8" opacity="0.65" />
          <text x="210" y="76" textAnchor="middle" fill="#8f5122" fontSize="10.5" fontWeight="600" opacity="0.75">
            한 손 도달 보조 모드
          </text>

          {/* Sweeping Thumb Reach Zone Arc */}
          <path
            d="M138 256 A 128 128 0 0 1 282 146 L 282 262 Z"
            fill="rgba(240, 203, 122, 0.34)"
            className="mg-thumb-arc-pulse"
          />
          <path
            d="M142 252 A 120 120 0 0 1 278 152"
            fill="none"
            stroke="#d08a4e"
            strokeWidth="2.5"
            strokeDasharray="6 5"
            className="mg-thumb-arc-dash"
          />

          {/* Reachable Bottom Action Cards (48px+ targets) */}
          <g className="mg-onehand-sheet">
            <rect x="150" y="158" width="120" height="40" rx="11" fill="#ffffff" stroke="#d08a4e" strokeWidth="1.8" />
            <text x="210" y="182" textAnchor="middle" fill="#2b2f33" fontSize="12" fontWeight="700">
              결제 수단 선택
            </text>

            <rect x="150" y="206" width="120" height="44" rx="12" fill="#8f5122" />
            <text x="210" y="232.5" textAnchor="middle" fill="#fffaf3" fontSize="13" fontWeight="800">
              한 손으로 바로 확인
            </text>
          </g>

          {/* Tap Ripple Indicator */}
          <circle cx="236" cy="228" r="10" className="mg-onehand-tap-dot" />
          <circle cx="236" cy="228" r="22" className="mg-onehand-tap-ring" />

          {/* 48px Target Dimension Callout */}
          <g className="mg-float-card">
            <rect x="298" y="198" width="94" height="48" rx="12" fill="#2b2f33" />
            <text x="345" y="219" textAnchor="middle" fill="#f0cb7a" fontSize="11" fontWeight="800">
              48px+ 터치
            </text>
            <text x="345" y="235" textAnchor="middle" fill="#fffaf3" fontSize="10" fontWeight="600">
              엄지 영역 배치
            </text>
          </g>
        </svg>
      );

    case 'sensory':
      return (
        <svg viewBox="0 0 420 300" className="mg-canvas-svg" aria-hidden="true">
          {/* Left & Right Haptic Vibration Waves */}
          <path d="M62 112 Q42 150 62 188" className="mg-haptic-wave mg-hw-1" />
          <path d="M46 96 Q20 150 46 204" className="mg-haptic-wave mg-hw-2" />
          <path d="M358 112 Q378 150 358 188" className="mg-haptic-wave mg-hw-1" />
          <path d="M374 96 Q400 150 374 204" className="mg-haptic-wave mg-hw-2" />

          {/* Main Notification & Live Caption Card */}
          <rect x="82" y="52" width="256" height="196" rx="22" className="mg-device-shell" />
          <rect x="96" y="66" width="228" height="168" rx="15" fill="#2b2f33" />

          {/* Visual Alert Pulse Bar */}
          <rect x="114" y="84" width="96" height="22" rx="11" fill="rgba(240,203,122,0.2)" />
          <circle cx="128" cy="95" r="4.5" fill="#f0cb7a" className="mg-live-dot" />
          <text x="140" y="99" fill="#f0cb7a" fontSize="10.5" fontWeight="800">
            실시간 자막 · 진동
          </text>

          {/* Animated Audio Equalizer Bars */}
          <g transform="translate(264, 83)">
            <rect x="0" y="6" width="4" height="12" rx="2" fill="#f0cb7a" className="cmg-wb-1" />
            <rect x="8" y="2" width="4" height="20" rx="2" fill="#d08a4e" className="cmg-wb-2" />
            <rect x="16" y="5" width="4" height="14" rx="2" fill="#f0cb7a" className="cmg-wb-3" />
            <rect x="24" y="1" width="4" height="22" rx="2" fill="#d08a4e" className="cmg-wb-4" />
          </g>

          {/* Live Caption Lines Reveal */}
          <rect x="114" y="122" width="192" height="56" rx="12" fill="rgba(255,250,243,0.1)" />
          <g className="mg-caption-line-1">
            <text x="128" y="145" fill="#fffaf3" fontSize="13" fontWeight="700">
              “이번 역은 시청, 시청역입니다.”
            </text>
          </g>
          <g className="mg-caption-line-2">
            <text x="128" y="166" fill="#f0cb7a" fontSize="12" fontWeight="600">
              내리실 문은 오른쪽입니다 · 진동 알림
            </text>
          </g>

          {/* Haptic Feedback Pill */}
          <rect x="114" y="192" width="192" height="26" rx="8" fill="#d08a4e" className="mg-haptic-pill" />
          <text x="210" y="209" textAnchor="middle" fill="#fffaf3" fontSize="11.5" fontWeight="700">
            시각 배너 + 햅틱 피드백 동시 전달
          </text>
        </svg>
      );
  }
};

export const EverydayAccessibilityVisual: React.FC = () => {
  const { reducedMotion } = useMotionPreference();
  const { trackRef, activeIndex, getStepFill, jumpToStep } = useStickySteps(
    EVERYDAY_SCENARIOS.length,
    reducedMotion
  );

  const current = EVERYDAY_SCENARIOS[activeIndex];
  const ActiveIcon = current.icon;

  return (
    <div
      ref={trackRef}
      className={`scrolly-track ${reducedMotion ? 'is-static-mode' : ''}`}
    >
      <div className="scrolly-sticky-viewport">
        <div className="scrolly-stage-card">
          <div className="scrolly-stage-grid">
            <figure
              className="scrolly-media-frame scrolly-motion-frame"
              role="img"
              aria-label={`${current.title} 모션 그래픽 시뮬레이션`}
            >
              <ScenarioMotionCanvas key={current.id} scenarioId={current.id} />
              <figcaption className="scrolly-media-badge">
                <span className="scrolly-live-dot" aria-hidden="true" />
                <span>{current.stepNum} / 04</span>
                <strong>{current.shortLabel}</strong>
              </figcaption>
            </figure>

            <div className="scrolly-detail-pane" key={current.id} aria-live="polite">
              <div className="scrolly-detail-eyebrow">
                <span className="scrolly-icon-circle" aria-hidden="true">
                  <ActiveIcon size={18} />
                </span>
                <span className="scrolly-tag-text">{current.tag}</span>
              </div>

              <h3 className="scrolly-detail-title">{current.title}</h3>
              <p className="scrolly-detail-desc">{current.description}</p>

              <ul className="scrolly-check-list">
                {current.highlights.map((point, idx) => (
                  <li
                    key={point}
                    style={{ animationDelay: reducedMotion ? '0ms' : `${80 + idx * 75}ms` }}
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="scrolly-step-bar" role="tablist" aria-label="일상 속 접근성 4가지 상황">
            {EVERYDAY_SCENARIOS.map((item, idx) => {
              const Icon = item.icon;
              const isActive = idx === activeIndex;
              const fill = getStepFill(idx);
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`scrolly-step-btn ${isActive ? 'is-active' : ''} ${fill >= 1 ? 'is-completed' : ''}`}
                  onClick={() => jumpToStep(idx)}
                >
                  <span className="scrolly-step-top">
                    <Icon size={15} aria-hidden="true" />
                    <span>{item.shortLabel}</span>
                  </span>
                  <span className="scrolly-step-progress-bg" aria-hidden="true">
                    <span
                      className="scrolly-step-progress-fill"
                      style={{ transform: `scaleX(${fill.toFixed(3)})` }}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const WCAG_FLOW_STEPS = [
  {
    num: '01',
    title: '기능적 필요 정의',
    sub: '시각·청각·인지·모터 필요 중심',
    detail: '장애 유형 구분을 넘어 사용자가 마주하는 실제 기능적 장벽과 필요에서 설계를 시작합니다.',
    Icon: SlidersHorizontal,
  },
  {
    num: '02',
    title: '실시간 맥락 적응',
    sub: '조명 · 소음 · 네트워크 · 기기 환경',
    detail: '야외 햇빛, 이동 중 소음, 저속 네트워크 등 변화하는 환경 맥락에 맞춰 입출력 채널을 조율합니다.',
    Icon: Sparkles,
  },
  {
    num: '03',
    title: '성과 중심 검증',
    sub: '점수가 아닌 실제 생활 사용성(Outcome)',
    detail: '웹·앱·키오스크·오프라인 창구가 끊기지 않고 실제 생활 과업을 완수할 수 있는지 검증합니다.',
    Icon: CheckCircle2,
  },
];

export const ConnectedContextVisual: React.FC = () => {
  const { reducedMotion } = useMotionPreference();
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isPausedByHover, setIsPausedByHover] = useState<boolean>(false);

  useEffect(() => {
    if (reducedMotion || isPausedByHover) return;
    const timer = window.setInterval(() => {
      setActiveStep((prev) => (prev + 1) % WCAG_FLOW_STEPS.length);
    }, 2800);
    return () => window.clearInterval(timer);
  }, [reducedMotion, isPausedByHover]);

  const currentFlow = WCAG_FLOW_STEPS[activeStep];

  return (
    <RevealOnScroll delay={100} variant="fade-scale">
      <div
        className="context-visual-wrapper"
        onMouseEnter={() => setIsPausedByHover(true)}
        onMouseLeave={() => setIsPausedByHover(false)}
      >
        {/* Animated System Flow Motion Graphic Stage */}
        <div
          className="context-motion-board"
          role="img"
          aria-label="웹과 모바일에서 시작된 접근성 기준이 WCAG 3.0 실시간 맥락 엔진을 통해 무인 키오스크, 대중교통 이동, 금융·의료, 웨어러블 안내까지 끊김 없이 이어지는 모션 그래픽"
        >
          <svg viewBox="0 0 880 280" className="context-flow-svg" aria-hidden="true">
            {/* Flowing Connection Curves: Left -> Center */}
            <path d="M210 92 C 295 92, 315 140, 382 140" className="cf-path-base" />
            <path d="M210 188 C 295 188, 315 140, 382 140" className="cf-path-base" />
            <path
              d="M210 92 C 295 92, 315 140, 382 140"
              className={`cf-path-stream ${activeStep === 0 ? 'is-strong' : ''}`}
            />
            <path
              d="M210 188 C 295 188, 315 140, 382 140"
              className={`cf-path-stream ${activeStep === 0 ? 'is-strong' : ''}`}
            />

            {/* Flowing Connection Curves: Center -> Right Life Channels */}
            <path d="M498 140 C 565 140, 585 56, 662 56" className="cf-path-base" />
            <path d="M498 140 C 565 140, 585 112, 662 112" className="cf-path-base" />
            <path d="M498 140 C 565 140, 585 168, 662 168" className="cf-path-base" />
            <path d="M498 140 C 565 140, 585 224, 662 224" className="cf-path-base" />

            <path
              d="M498 140 C 565 140, 585 56, 662 56"
              className={`cf-path-stream cf-delay-1 ${activeStep === 2 ? 'is-strong' : ''}`}
            />
            <path
              d="M498 140 C 565 140, 585 112, 662 112"
              className={`cf-path-stream cf-delay-2 ${activeStep === 2 ? 'is-strong' : ''}`}
            />
            <path
              d="M498 140 C 565 140, 585 168, 662 168"
              className={`cf-path-stream cf-delay-3 ${activeStep === 2 ? 'is-strong' : ''}`}
            />
            <path
              d="M498 140 C 565 140, 585 224, 662 224"
              className={`cf-path-stream cf-delay-4 ${activeStep === 2 ? 'is-strong' : ''}`}
            />

            {/* Left Column: Functional Needs & Digital Touchpoints */}
            <g className={`cf-node-box ${activeStep === 0 ? 'is-highlighted' : ''}`}>
              <rect x="36" y="60" width="174" height="64" rx="16" className="cf-card-rect" />
              <circle cx="66" cy="92" r="14" fill="rgba(208,138,78,0.18)" />
              <circle cx="66" cy="92" r="6" fill="#8f5122" />
              <text x="90" y="88" className="cf-card-title">
                시각 · 청각 필요
              </text>
              <text x="90" y="106" className="cf-card-sub">
                대비 · 자막 · 스크린리더
              </text>
            </g>

            <g className={`cf-node-box ${activeStep === 0 ? 'is-highlighted' : ''}`}>
              <rect x="36" y="156" width="174" height="64" rx="16" className="cf-card-rect" />
              <circle cx="66" cy="188" r="14" fill="rgba(208,138,78,0.18)" />
              <circle cx="66" cy="188" r="6" fill="#d08a4e" />
              <text x="90" y="184" className="cf-card-title">
                인지 · 모터 필요
              </text>
              <text x="90" y="202" className="cf-card-sub">
                직관적 안내 · 한 손 · 음성
              </text>
            </g>

            {/* Center Hub: WCAG 3.0 Real-Time Context Adaptation Engine */}
            <g className="cf-center-hub">
              <circle cx="440" cy="140" r="82" className="cf-hub-outer-orbit" />
              <g className="cf-hub-spin">
                <circle cx="440" cy="140" r="68" className="cf-hub-dashed-ring" />
                <circle cx="440" cy="72" r="6" fill="#d08a4e" />
                <circle cx="440" cy="208" r="6" fill="#8f5122" />
              </g>
              <circle
                cx="440"
                cy="140"
                r="52"
                className={`cf-hub-core ${activeStep === 1 ? 'is-active-core' : ''}`}
              />
              <text x="440" y="134" textAnchor="middle" fill="#fffaf3" fontSize="13.5" fontWeight="800">
                WCAG 3.0
              </text>
              <text x="440" y="153" textAnchor="middle" fill="#f0cb7a" fontSize="11.5" fontWeight="700">
                실시간 맥락 적응
              </text>
            </g>

            {/* Right Column: Connected Daily Life Outcomes */}
            {[
              { y: 34, label: '무인 키오스크 · 매장', sub: '음성·고대비·높이 조절' },
              { y: 90, label: '대중교통 · 이동 여정', sub: '실시간 자막·진동 환승 안내' },
              { y: 146, label: '금융 · 공공 · 의료', sub: '쉬운 언어·대체 인증 지원' },
              { y: 202, label: '모바일 · 웨어러블', sub: '조도·소음·네트워크 자동 대응' },
            ].map((item, i) => (
              <g
                key={item.label}
                className={`cf-node-box cf-right-node-${i + 1} ${activeStep === 2 ? 'is-highlighted' : ''}`}
              >
                <rect x="662" y={item.y} width="184" height="44" rx="12" className="cf-card-rect" />
                <circle cx="684" cy={item.y + 22} r="5.5" className="cf-outcome-dot" />
                <text x="698" y={item.y + 19} className="cf-card-title-sm">
                  {item.label}
                </text>
                <text x="698" y={item.y + 34} className="cf-card-sub-sm">
                  {item.sub}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="wcag-flow-panel">
          <div className="wcag-flow-strip" role="tablist" aria-label="WCAG 3.0 맥락 기반 평가 흐름">
            {WCAG_FLOW_STEPS.map((step, idx) => {
              const StepIcon = step.Icon;
              const isActive = idx === activeStep;
              return (
                <React.Fragment key={step.num}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`wcag-step-item ${isActive ? 'is-emphasized' : ''}`}
                    onClick={() => setActiveStep(idx)}
                  >
                    <span className="wcag-step-num">
                      <StepIcon size={15} aria-hidden="true" />
                    </span>
                    <div className="wcag-step-text">
                      <strong>
                        {step.num}. {step.title}
                      </strong>
                      <span>{step.sub}</span>
                    </div>
                  </button>
                  {idx < WCAG_FLOW_STEPS.length - 1 && (
                    <div className="wcag-flow-connector" aria-hidden="true">
                      <span
                        className={`wcag-connector-beam ${!reducedMotion && activeStep === idx ? 'is-pulsing' : ''}`}
                      />
                      <ArrowRight
                        size={18}
                        className={`wcag-step-arrow ${activeStep >= idx ? 'is-lit' : ''}`}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <div className="wcag-flow-caption" key={currentFlow.num} aria-live="polite">
            <span className="wcag-caption-badge">STAGE {currentFlow.num}</span>
            <p>{currentFlow.detail}</p>
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
};

type RoleId = 'developer' | 'designer' | 'planner' | 'security-legal';

interface TeamRoleItem {
  id: RoleId;
  stepNum: string;
  role: string;
  title: string;
  tag: string;
  description: string;
  practices: string[];
  icon: React.ComponentType<{ size?: number }>;
}

const TEAM_ROLES: TeamRoleItem[] = [
  {
    id: 'developer',
    stepNum: '01',
    role: '개발자',
    title: '코드를 작성하는 개발자',
    tag: '시맨틱 마크업 · 보조기기 호환',
    description:
      '정확한 시맨틱 태그와 키보드 포커스 흐름, 스크린리더(ARIA) 상태 전달을 구현해 어떤 보조기기로도 막힘없이 동작하는 기술 기반을 세웁니다.',
    practices: [
      '논리적인 키보드 탐색과 포커스 유지',
      '스크린리더를 위한 의미 있는 대체 텍스트·상태 제공',
      '단말·네트워크 제약에도 안전한 상태 보존',
    ],
    icon: Code2,
  },
  {
    id: 'designer',
    stepNum: '02',
    role: '디자이너',
    title: '화면을 그리는 디자이너',
    tag: '고대비 명도 · 명확한 시각 위계',
    description:
      '색상만으로 정보를 구분하지 않고 충분한 명도 대비와 넉넉한 여백, 읽기 편한 타이포그래피 위계로 시선과 인지의 부담을 줄입니다.',
    practices: [
      '야외·저시력 환경을 고려한 명도 대비 설계',
      '색각 이상을 배려한 아이콘·패턴 병행 표기',
      '누르기 편한 44px 이상 터치 타깃 설계',
    ],
    icon: Palette,
  },
  {
    id: 'planner',
    stepNum: '03',
    role: '기획자',
    title: '서비스 여정을 설계하는 기획자',
    tag: '온·오프라인 끊김 없는 여정',
    description:
      '모바일 앱에서 키오스크, 콜센터, 오프라인 창구로 이어지는 전체 서비스 흐름에서 누구도 중도에 포기하지 않도록 대체 경로를 함께 설계합니다.',
    practices: [
      '앱·키오스크·콜센터 간 일관된 안내 원칙',
      '음성·자막·터치 등 멀티모달 대체 수단 정의',
      '시간 제한 완화 및 단계별 자동 저장 설계',
    ],
    icon: Route,
  },
  {
    id: 'security-legal',
    stepNum: '04',
    role: '보안·법무팀',
    title: '리스크를 관리하는 보안·법무팀',
    tag: '접근 가능한 인증 · 표준 거버넌스',
    description:
      '보안 절차가 누군가에게 장벽이 되지 않도록 접근 가능한 인증 수단을 마련하고, 국내외 접근성 법규와 WCAG 기준을 상시 점검합니다.',
    practices: [
      '시각·청각 제약 없는 대체 본인인증 수단 제공',
      '국내외 디지털·생활 접근성 법규 리스크 예방',
      '출시 전·후 연속적 적합성 검증 체계 운영',
    ],
    icon: ShieldCheck,
  },
];

const RoleMotionCanvas: React.FC<{ roleId: RoleId }> = ({ roleId }) => {
  switch (roleId) {
    case 'developer':
      return (
        <svg viewBox="0 0 420 300" className="mg-canvas-svg" aria-hidden="true">
          <rect x="48" y="38" width="324" height="224" rx="20" fill="#2b2f33" />
          {/* Window dots */}
          <circle cx="72" cy="58" r="5" fill="#d08a4e" />
          <circle cx="88" cy="58" r="5" fill="#f0cb7a" />
          <circle cx="104" cy="58" r="5" fill="#c4a484" />
          <text x="348" y="62" textAnchor="end" fill="#f0cb7a" fontSize="11" fontWeight="700">
            Keyboard Tab ⇥
          </text>

          {/* Semantic Landmarks with Jumping Focus Ring */}
          <rect x="68" y="82" width="284" height="38" rx="10" fill="rgba(255,250,243,0.08)" />
          <text x="84" y="106" fill="#fffaf3" fontSize="13" fontFamily="monospace" fontWeight="700">
            &lt;nav aria-label=&quot;주요 메뉴&quot;&gt;
          </text>

          <rect x="68" y="132" width="284" height="38" rx="10" fill="rgba(255,250,243,0.08)" />
          <text x="84" y="156" fill="#f0cb7a" fontSize="13" fontFamily="monospace" fontWeight="700">
            &lt;main id=&quot;main-content&quot;&gt;
          </text>

          <rect x="68" y="182" width="284" height="38" rx="10" fill="rgba(255,250,243,0.08)" />
          <text x="84" y="206" fill="#fffaf3" fontSize="13" fontFamily="monospace" fontWeight="700">
            &lt;button aria-pressed=&quot;true&quot;&gt;
          </text>

          {/* Animated Focus Ring Jumping Across Semantic Elements */}
          <rect
            x="65"
            y="79"
            width="290"
            height="44"
            rx="12"
            fill="none"
            stroke="#f0cb7a"
            strokeWidth="3"
            className="mg-dev-focus-ring"
          />

          <text x="210" y="244" textAnchor="middle" fill="#c4a484" fontSize="11.5" fontWeight="600">
            스크린리더 상태 전달 · 논리적 초점 이동 검증
          </text>
        </svg>
      );

    case 'designer':
      return (
        <svg viewBox="0 0 420 300" className="mg-canvas-svg" aria-hidden="true">
          <rect x="52" y="38" width="316" height="224" rx="20" className="mg-device-shell" />
          <rect x="68" y="54" width="284" height="192" rx="14" fill="#fffaf3" />

          {/* Contrast Swatch Pair */}
          <rect x="86" y="72" width="124" height="72" rx="14" fill="#2b2f33" />
          <text x="102" y="102" fill="#fffaf3" fontSize="18" fontWeight="800">
            가나다 Aa
          </text>
          <rect x="102" y="114" width="76" height="18" rx="9" fill="#f0cb7a" />
          <text x="140" y="126.5" textAnchor="middle" fill="#2b2f33" fontSize="10.5" fontWeight="800">
            AAA 12.6:1
          </text>

          {/* 44px Touch Target Grid */}
          <g className="mg-design-target">
            <rect
              x="228"
              y="72"
              width="106"
              height="72"
              rx="14"
              fill="rgba(208,138,78,0.14)"
              stroke="#d08a4e"
              strokeWidth="2"
              strokeDasharray="5 4"
            />
            <rect x="259" y="86" width="44" height="44" rx="12" fill="#8f5122" className="mg-target-pulse" />
            <text x="281" y="112" textAnchor="middle" fill="#fffaf3" fontSize="11" fontWeight="800">
              44px
            </text>
          </g>

          {/* Color-blind Safe Shape + Icon Indicators */}
          <rect x="86" y="162" width="248" height="64" rx="14" fill="#f5ece1" />
          <circle cx="116" cy="194" r="12" fill="#8f5122" />
          <path d="M111 194 L114.5 197.5 L121.5 190.5" fill="none" stroke="#fffaf3" strokeWidth="2.4" strokeLinecap="round" />
          <text x="138" y="191" fill="#2b2f33" fontSize="12.5" fontWeight="800">
            색상 + 아이콘 + 텍스트 병행 표기
          </text>
          <text x="138" y="208" fill="#4d5863" fontSize="11" fontWeight="600">
            색각 이상·저시력 환경에서도 명확한 상태 구분
          </text>
        </svg>
      );

    case 'planner':
      return (
        <svg viewBox="0 0 420 300" className="mg-canvas-svg" aria-hidden="true">
          <rect x="44" y="42" width="332" height="216" rx="22" className="mg-device-shell" />
          <rect x="58" y="56" width="304" height="188" rx="15" fill="#fffaf3" />

          {/* Main Omnichannel Path */}
          <path d="M108 134 L312 134" stroke="rgba(143,81,34,0.2)" strokeWidth="4" strokeLinecap="round" />
          <path d="M108 134 L312 134" className="cmg-bridge-flow" />

          {/* Fallback Multimodal Path */}
          <path
            d="M108 134 C 150 202, 270 202, 312 134"
            fill="none"
            stroke="#d08a4e"
            strokeWidth="2.5"
            strokeDasharray="6 5"
            className="mg-planner-alt-route"
          />

          {/* 3 Service Touchpoint Nodes */}
          {[
            { cx: 108, label: '모바일 앱', sub: '사전 입력' },
            { cx: 210, label: '키오스크', sub: '이어하기' },
            { cx: 312, label: '콜센터·창구', sub: '즉시 연계' },
          ].map((node, i) => (
            <g key={node.label} className={`mg-journey-node mg-jn-${i + 1}`}>
              <circle cx={node.cx} cy="134" r="24" fill="#ffffff" stroke="#8f5122" strokeWidth="2.5" />
              <circle cx={node.cx} cy="134" r="8" fill="#8f5122" />
              <text x={node.cx} y="96" textAnchor="middle" fill="#2b2f33" fontSize="12.5" fontWeight="800">
                {node.label}
              </text>
              <text x={node.cx} y="175" textAnchor="middle" fill="#4d5863" fontSize="11" fontWeight="600">
                {node.sub}
              </text>
            </g>
          ))}

          <rect x="134" y="198" width="152" height="26" rx="13" fill="#8f5122" />
          <text x="210" y="215" textAnchor="middle" fill="#fffaf3" fontSize="11" fontWeight="700">
            중도 포기 없는 대체 경로 보장
          </text>
        </svg>
      );

    case 'security-legal':
      return (
        <svg viewBox="0 0 420 300" className="mg-canvas-svg" aria-hidden="true">
          <rect x="52" y="38" width="316" height="224" rx="22" className="mg-device-shell" />
          <rect x="66" y="52" width="288" height="196" rx="15" fill="#fffaf3" />

          {/* Orbiting Governance Ring */}
          <g className="mg-sec-orbit">
            <circle cx="210" cy="138" r="68" fill="none" stroke="rgba(208,138,78,0.34)" strokeWidth="2" strokeDasharray="6 5" />
            <circle cx="210" cy="70" r="5.5" fill="#d08a4e" />
            <circle cx="210" cy="206" r="5.5" fill="#8f5122" />
          </g>

          {/* Shield Core */}
          <path
            d="M210 86 L252 102 V138 C252 168 233 188 210 198 C187 188 168 168 168 138 V102 Z"
            fill="#2b2f33"
            stroke="#d08a4e"
            strokeWidth="2.5"
            className="mg-shield-pulse"
          />
          <path
            d="M196 140 L206 150 L226 128"
            fill="none"
            stroke="#f0cb7a"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="cmg-check-draw"
          />

          {/* Accessible Auth Pills */}
          <rect x="82" y="92" width="68" height="26" rx="8" fill="#f5ece1" />
          <text x="116" y="109" textAnchor="middle" fill="#8f5122" fontSize="10.5" fontWeight="700">
            생체·음성 인증
          </text>

          <rect x="270" y="92" width="68" height="26" rx="8" fill="#f5ece1" />
          <text x="304" y="109" textAnchor="middle" fill="#8f5122" fontSize="10.5" fontWeight="700">
            WCAG 검증
          </text>

          <rect x="118" y="214" width="184" height="22" rx="11" fill="rgba(143,81,34,0.12)" />
          <text x="210" y="229" textAnchor="middle" fill="#8f5122" fontSize="11" fontWeight="800">
            장벽 없는 보안 인증 · 상시 법규 준수
          </text>
        </svg>
      );
  }
};

export const SharedResponsibilityVisual: React.FC = () => {
  const { reducedMotion } = useMotionPreference();
  const { trackRef, activeIndex, getStepFill, jumpToStep } = useStickySteps(
    TEAM_ROLES.length,
    reducedMotion
  );

  const current = TEAM_ROLES[activeIndex];
  const ActiveIcon = current.icon;

  return (
    <div
      ref={trackRef}
      className={`scrolly-track ${reducedMotion ? 'is-static-mode' : ''}`}
    >
      <div className="scrolly-sticky-viewport">
        <div className="scrolly-stage-card">
          <div className="scrolly-stage-grid">
            <figure
              className="scrolly-media-frame scrolly-motion-frame"
              role="img"
              aria-label={`${current.title} 접근성 실천 모션 그래픽`}
            >
              <RoleMotionCanvas key={current.id} roleId={current.id} />
              <figcaption className="scrolly-media-badge">
                <span className="scrolly-live-dot" aria-hidden="true" />
                <span>{current.stepNum} / 04</span>
                <strong>{current.role}</strong>
              </figcaption>
            </figure>

            <div className="scrolly-detail-pane" key={current.id} aria-live="polite">
              <div className="scrolly-detail-eyebrow">
                <span className="scrolly-icon-circle" aria-hidden="true">
                  <ActiveIcon size={18} />
                </span>
                <span className="scrolly-tag-text">{current.tag}</span>
              </div>

              <h3 className="scrolly-detail-title">{current.title}</h3>
              <p className="scrolly-detail-desc">{current.description}</p>

              <ul className="scrolly-check-list">
                {current.practices.map((item, idx) => (
                  <li
                    key={item}
                    style={{ animationDelay: reducedMotion ? '0ms' : `${80 + idx * 75}ms` }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="scrolly-step-bar" role="tablist" aria-label="조직 구성원별 접근성 역할">
            {TEAM_ROLES.map((item, idx) => {
              const Icon = item.icon;
              const isActive = idx === activeIndex;
              const fill = getStepFill(idx);
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`scrolly-step-btn ${isActive ? 'is-active' : ''} ${fill >= 1 ? 'is-completed' : ''}`}
                  onClick={() => jumpToStep(idx)}
                >
                  <span className="scrolly-step-top">
                    <Icon size={15} aria-hidden="true" />
                    <span>{item.role}</span>
                  </span>
                  <span className="scrolly-step-progress-bg" aria-hidden="true">
                    <span
                      className="scrolly-step-progress-fill"
                      style={{ transform: `scaleX(${fill.toFixed(3)})` }}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
