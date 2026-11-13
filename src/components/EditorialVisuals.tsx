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
} from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import { useMotionPreference } from '../hooks/useMotionPreference';

/**
 * Reusable hook that maps vertical scroll progress through a tall sticky track [0..1]
 * into 4 discrete steps (0..3) plus per-step fill progress [0..1].
 */
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

interface EverydayScenario {
  id: string;
  stepNum: string;
  shortLabel: string;
  title: string;
  tag: string;
  description: string;
  highlights: string[];
  cameraTransform: string;
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
    cameraTransform: 'scale(1.18) translate(5%, 4.5%)',
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
    cameraTransform: 'scale(1.18) translate(-5%, 4.5%)',
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
    cameraTransform: 'scale(1.18) translate(4.5%, -4.5%)',
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
    cameraTransform: 'scale(1.18) translate(-5%, -4.5%)',
    icon: Volume2,
  },
];

/**
 * Section 1 Scrollytelling Companion:
 * Smoothly steps through all 4 everyday accessibility scenarios as the user scrolls down.
 */
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
            {/* Left: Clean Editorial Illustration with Smooth Camera Framing */}
            <figure className="scrolly-media-frame">
              <img
                src="/images/everyday-accessibility.jpg"
                alt="밝은 햇빛 아래에서 스마트폰을 보는 사람, 태블릿을 편안하게 조작하는 고령 사용자, 장바구니를 한 팔에 안고 한 손으로 휴대폰을 쓰는 사람, 시각적 파동 알림을 확인하는 사람 등 일상 속 다양한 접근성 순간을 담은 일러스트"
                className="scrolly-illustration"
                style={{
                  transform: reducedMotion ? 'none' : current.cameraTransform,
                }}
              />
              <figcaption className="scrolly-media-badge">
                <span>{current.stepNum} / 04</span>
                <strong>{current.shortLabel}</strong>
              </figcaption>
            </figure>

            {/* Right: Smoothly Transitioning Scenario Detail */}
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
                {current.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom 4-Step Scroll-Linked Selector Bar */}
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

/**
 * Section 2 Visual Companion:
 * Clean Connected-Life Illustration + Sleek WCAG 3.0 3-Step Strip (No messy overlay lines)
 */
export const ConnectedContextVisual: React.FC = () => {
  return (
    <RevealOnScroll delay={100} variant="fade-scale">
      <div className="context-visual-wrapper">
        <figure className="clean-editorial-figure">
          <img
            src="/images/connected-life-accessibility.jpg"
            alt="노트북과 모바일 웹 화면에서 시작된 접근성 흐름이 키오스크, 대중교통 이동, 의료 서비스, 웨어러블 음성·진동 안내로 끊김 없이 이어지는 생활 맥락 접근성 일러스트"
            className="clean-editorial-img"
            loading="lazy"
          />
        </figure>

        <div className="wcag-flow-strip" aria-label="WCAG 3.0 맥락 기반 평가 흐름">
          <div className="wcag-step-item">
            <span className="wcag-step-num">01</span>
            <div className="wcag-step-text">
              <strong>기능적 필요 정의</strong>
              <span>시각·청각·인지·모터 필요 중심</span>
            </div>
          </div>

          <ArrowRight size={18} className="wcag-step-arrow" aria-hidden="true" />

          <div className="wcag-step-item is-emphasized">
            <span className="wcag-step-num">02</span>
            <div className="wcag-step-text">
              <strong>실시간 맥락 적응</strong>
              <span>조명 · 소음 · 네트워크 · 기기 환경</span>
            </div>
          </div>

          <ArrowRight size={18} className="wcag-step-arrow" aria-hidden="true" />

          <div className="wcag-step-item">
            <span className="wcag-step-num">03</span>
            <div className="wcag-step-text">
              <strong>성과 중심 검증</strong>
              <span>점수가 아닌 실제 생활 사용성(Outcome)</span>
            </div>
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
};

interface TeamRoleItem {
  id: string;
  stepNum: string;
  role: string;
  title: string;
  tag: string;
  description: string;
  practices: string[];
  cameraTransform: string;
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
    practices: ['논리적인 키보드 탐색과 포커스 유지', '스크린리더를 위한 의미 있는 대체 텍스트·상태 제공', '단말·네트워크 제약에도 안전한 상태 보존'],
    cameraTransform: 'scale(1.18) translate(5.5%, -2.5%)',
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
    practices: ['야외·저시력 환경을 고려한 명도 대비 설계', '색각 이상을 배려한 아이콘·패턴 병행 표기', '누르기 편한 44px 이상 터치 타깃 설계'],
    cameraTransform: 'scale(1.18) translate(2.5%, 4.5%)',
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
    practices: ['앱·키오스크·콜센터 간 일관된 안내 원칙', '음성·자막·터치 등 멀티모달 대체 수단 정의', '시간 제한 완화 및 단계별 자동 저장 설계'],
    cameraTransform: 'scale(1.18) translate(-2.5%, 4.5%)',
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
    practices: ['시각·청각 제약 없는 대체 본인인증 수단 제공', '국내외 디지털·생활 접근성 법규 리스크 예방', '출시 전·후 연속적 적합성 검증 체계 운영'],
    cameraTransform: 'scale(1.18) translate(-5.5%, -2.5%)',
    icon: ShieldCheck,
  },
];

/**
 * Section 4 Scrollytelling Companion:
 * Smoothly steps through all 4 organizational roles (개발자 -> 디자이너 -> 기획자 -> 보안·법무팀) as the user scrolls.
 */
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
            {/* Left: Clean Team Collaboration Illustration with Smooth Camera Framing */}
            <figure className="scrolly-media-frame">
              <img
                src="/images/team-collaboration.jpg"
                alt="접근성 마크를 중심으로 노트북 코드를 작성하는 개발자, 컬러 대비표를 검토하는 디자이너, 서비스 여정을 설계하는 기획자, 검증 방패를 든 보안·법무 담당자가 함께 협력하는 일러스트"
                className="scrolly-illustration"
                style={{
                  transform: reducedMotion ? 'none' : current.cameraTransform,
                }}
              />
              <figcaption className="scrolly-media-badge">
                <span>{current.stepNum} / 04</span>
                <strong>{current.role}</strong>
              </figcaption>
            </figure>

            {/* Right: Smoothly Transitioning Role Detail */}
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
                {current.practices.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom 4-Role Scroll-Linked Selector Bar */}
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
