import Hero from './components/Hero';
import ContentBlock from './components/ContentBlock';
import ParallaxSection from './components/ParallaxSection';
import Footer from './components/Footer';
import FeatureCard from './components/FeatureCard';
import RevealOnScroll from './components/RevealOnScroll';
import ScrollProgressNav from './components/ScrollProgressNav';
import {
  EverydayAccessibilityVisual,
  ConnectedContextVisual,
  SharedResponsibilityVisual,
} from './components/EditorialVisuals';
import type { CardGraphicVariant } from './components/CardMotionGraphic';
import conceptLogo from './assets/concept_nobg.png';

const CONTEXT_FEATURES: Array<{
  label: string;
  title: string;
  desc: string;
  graphic: CardGraphicVariant;
}> = [
  {
    label: '기능적 필요',
    title: '기능적 필요',
    desc: '시각·청각·인지·모터 등 필요를 기준으로 요구사항을 정의합니다. 사용자 집단이 아니라 필요 중심으로 설계와 검증을 시작합니다.',
    graphic: 'needs',
  },
  {
    label: '성과·검증',
    title: '성과와 검증',
    desc: '성과(Outcome)를 세우고 테스트·사용자 근거(Methods)로 적합성을 입증합니다. 숫자 점수보다 실제 사용성을 우선합니다.',
    graphic: 'outcome',
  },
  {
    label: '생활',
    title: '생활접근성',
    desc: '교통·결제·공공서비스까지 온라인·오프라인 흐름을 하나로 설계합니다. 키오스크·앱·콜센터가 끊기지 않아야 합니다.',
    graphic: 'life-bridge',
  },
  {
    label: '멀티모달',
    title: '멀티모달 적응',
    desc: '음성·제스처·자막·햅틱·스크린리더·실시간 번역 등 다양한 입출력 채널을 동시에 제공합니다.',
    graphic: 'multimodal',
  },
  {
    label: '연속 평가',
    title: '연속적 적합성',
    desc: '배터리·네트워크·조도·소음·기기 상태에 따라 UI를 자동 조정하고 정기적으로 재평가합니다.',
    graphic: 'continuous',
  },
];

const DAILY_FEATURES: Array<{
  label: string;
  title: string;
  desc: string;
  graphic: CardGraphicVariant;
}> = [
  {
    label: '고령',
    title: '고령 사용자',
    desc: '시력·청력·인지·운동 기능 저하를 전제로, 동일한 내비/안내/대체 수단을 앱·키오스크·콜센터·음성비서에 일관 적용합니다.',
    graphic: 'senior',
  },
  {
    label: '밝은 환경',
    title: '야외·저대비 상황',
    desc: '강한 빛/반사에서도 보이도록 고대비 모드, 굵은 폰트, 여백을 확보합니다. 터치 영역을 44px 이상으로 유지합니다.',
    graphic: 'sunlight',
  },
  {
    label: '소음·무음',
    title: '자막·진동 우선',
    desc: '소음 많은 곳·무음 모드에서도 자막/텍스트 알림·진동으로 안내하고, 음성 의존 흐름을 피합니다.',
    graphic: 'caption-haptic',
  },
  {
    label: '느린 네트워크',
    title: '저속·불안정 대응',
    desc: '저용량 모드, 지연 허용 UX, 저장·재전송, 단계별 저장으로 연결이 끊겨도 진행 상황을 보전합니다.',
    graphic: 'network-resilient',
  },
  {
    label: '단말 제약',
    title: '저사양·배터리 세이프',
    desc: '애니메이션/영상 최소화, 오프라인 캐시, 텍스트 우선 레이아웃으로 단말 제약에도 사용성을 유지합니다.',
    graphic: 'device-save',
  },
  {
    label: '일시적 제약',
    title: '한 손·부상·장갑',
    desc: '한 손 조작, 큰 버튼, 제스처/음성 대체, 입력 자동 저장으로 일시적 제약에도 끊기지 않게 합니다.',
    graphic: 'one-hand',
  },
];

function App() {
  return (
    <div className="page-shell">
      <ScrollProgressNav />

      <Hero
        title="모두를 위한 접근성"
        subtitle="디지털에서 일상으로 확장되는 접근성"
        backgroundImage="
          linear-gradient(120deg, #fffaf3 0%, #f3e7d8 45%, #d3b898 100%),
          radial-gradient(circle at 18% 28%, rgba(208, 138, 78, 0.22) 0, transparent 45%),
          radial-gradient(circle at 80% 70%, rgba(240, 203, 122, 0.2) 0, transparent 42%)
        "
        logoImage={conceptLogo}
      />

      <main id="main-content">
        {/* Main Content Section 1 */}
        <section id="why-accessibility-section" aria-labelledby="why-accessibility">
          <ContentBlock backgroundColor="#fffaf3">
            <div className="section-content-center">
              <RevealOnScroll variant="fade-up">
                <span className="section-eyebrow" aria-hidden="true">
                  WHY ACCESSIBILITY
                </span>
                <h2 id="why-accessibility" className="heading-primary">
                  웹접근성은 왜 필요한가요?
                </h2>
              </RevealOnScroll>

              <RevealOnScroll delay={80} variant="fade-up">
                <p className="text-intro">
                  웹접근성은 장애를 가진 사람들뿐만 아니라,{' '}
                  <strong className="ink-highlight">모두를 위한 기술</strong>입니다.
                  <br />
                  일시적인 부상, 나이 듦에 따른 변화, 혹은 밝은 햇빛 아래에서의 화면 보기 등
                  <br />
                  다양한 상황에서 웹접근성은 우리 모두의 디지털 경험을 향상시킵니다.
                </p>
              </RevealOnScroll>
            </div>

            <EverydayAccessibilityVisual />

            <div className="section-content-center">
              <RevealOnScroll delay={120} variant="fade-up">
                <p className="text-intro text-equality-quote">
                  누구나 자유롭게 정보를 얻고 소통할 수 있는 세상,
                  <br /> 그것이 바로 우리가 지향하는 디지털 평등입니다.
                </p>
              </RevealOnScroll>
            </div>
          </ContentBlock>
        </section>

        {/* Visual Parallax Divider */}
        <section aria-label="웹 접근성 전환 질문">
          <ParallaxSection
            backgroundImage="
              linear-gradient(135deg, #fffaf3 0%, #f3e7d8 45%, #d3b898 100%),
              radial-gradient(circle at 20% 30%, rgba(208, 138, 78, 0.16) 0, transparent 42%),
              radial-gradient(circle at 78% 72%, rgba(240, 203, 122, 0.16) 0, transparent 40%)
            "
            height="42vh"
            text="웹 접근성만 준수하면 되나요?"
            textColor="var(--color-text)"
          />
        </section>

        {/* Trend Shift Section */}
        <section id="context-section" aria-labelledby="context-based-accessibility">
          <ContentBlock backgroundColor="#fff9fb">
            <div className="section-content-center-wide">
              <RevealOnScroll variant="fade-up">
                <span className="section-eyebrow" aria-hidden="true">
                  WCAG 3.0 &amp; CONTEXT
                </span>
                <h2 id="context-based-accessibility" className="heading-secondary">
                  웹에서 생활로: 맥락 기반 접근성
                </h2>
              </RevealOnScroll>

              <RevealOnScroll delay={80} variant="fade-up">
                <p className="text-body">
                  W3C WCAG 3.0 Working Draft는 기존 웹 접근성을 넘어 생활·맥락 접근성을 포괄하려 합니다.
                  <br />
                  성공기준 대신 <strong className="ink-highlight">성과 중심 평가(Outcome)</strong>와{' '}
                  <strong className="ink-highlight">기능적 필요(Functional Needs)</strong> 분류로,
                  <br />
                  조명·소음·네트워크·기기 등 상황에 맞게 연속적으로 적합성을 확인하도록 제안합니다.
                  <br />
                  온라인·오프라인을 잇는 이동, 건강, 금융, 문화 경험까지 생활 전반을 설계 기준에 포함시키는 것이 트렌드입니다.
                </p>
              </RevealOnScroll>

              <ConnectedContextVisual />

              <div className="feature-grid focus-assist-grid">
                {CONTEXT_FEATURES.map(({ label, title, desc, graphic }, idx) => (
                  <FeatureCard
                    key={title}
                    label={label}
                    title={title}
                    description={desc}
                    graphic={graphic}
                    index={idx}
                  />
                ))}
              </div>
            </div>
          </ContentBlock>
        </section>

        {/* Parallax Divider - WCAG 3.0 direction */}
        <section aria-label="생활 접근성 점검 제안">
          <ParallaxSection
            backgroundImage="
              linear-gradient(150deg, #f6f0e9 0%, #ecdfd2 55%, #e3d1c3 100%),
              radial-gradient(circle at 24% 32%, rgba(208, 138, 78, 0.18) 0, transparent 45%),
              radial-gradient(circle at 76% 70%, rgba(240, 203, 122, 0.18) 0, transparent 42%)
            "
            height="45vh"
            text="생활 접근성, WCAG 3.0 관점에서 점검하기"
            textColor="var(--color-text)"
          />
        </section>

        {/* Daily Life Accessibility Section */}
        <section id="daily-life-section" aria-labelledby="daily-life-accessibility">
          <ContentBlock backgroundColor="#f5f0e9">
            <div className="section-content-wide">
              <RevealOnScroll variant="fade-up">
                <div className="section-header-center">
                  <span className="section-eyebrow" aria-hidden="true">
                    DAILY SCENARIOS
                  </span>
                  <h2 id="daily-life-accessibility" className="heading-tertiary">
                    일상생활로 녹아드는 접근성
                  </h2>
                  <p className="section-sublead">
                    일상생활 중 상황이 바뀌어도 동일한 설계 원칙이 채널 전반에 적용돼야 합니다.
                  </p>
                </div>
              </RevealOnScroll>

              <div className="feature-grid-wide focus-assist-grid">
                {DAILY_FEATURES.map(({ label, title, desc, graphic }, idx) => (
                  <FeatureCard
                    key={title}
                    label={label}
                    title={title}
                    description={desc}
                    backgroundColor="#fff"
                    graphic={graphic}
                    index={idx}
                  />
                ))}
              </div>
            </div>
          </ContentBlock>
        </section>

        {/* Final Responsibility Section */}
        <section id="responsibility-section" aria-labelledby="everyone-responsibility">
          <ContentBlock backgroundColor="#fffaf3">
            <div className="section-content-medium">
              <RevealOnScroll variant="fade-up">
                <span className="section-eyebrow" aria-hidden="true">
                  OUR SHARED ROLE
                </span>
                <h2 id="everyone-responsibility" className="heading-quaternary">
                  생활 전반의 접근성은 모두의 역할입니다
                </h2>
              </RevealOnScroll>

              <div className="text-emphasis">
                <RevealOnScroll delay={80} variant="fade-up">
                  <p>
                    접근성은 특정 누군가에게만 맡겨진 숙제가 아닙니다.
                    <br />
                    코드를 작성하는 개발자, 화면을 그리는 디자이너, 서비스 여정을 설계하는 기획자, 리스크를 관리하는 보안·법무팀까지.
                    <br />
                    <strong className="ink-highlight">조직의 모든 구성원</strong>이 함께 고민하고 실천해야 할 핵심 가치입니다.
                  </p>
                </RevealOnScroll>
              </div>
            </div>

            <SharedResponsibilityVisual />

            <div className="section-content-medium">
              <RevealOnScroll delay={120} variant="fade-up">
                <blockquote className="manifesto-callout">
                  <p className="manifesto-quote">“접근성은 옵션이 아닙니다.”</p>
                  <p className="manifesto-desc">
                    생활 전반을 잇는 접근성으로, 누구도 소외시키지 않는 경험을 지금 바로 설계하세요.
                  </p>
                </blockquote>
              </RevealOnScroll>
            </div>
          </ContentBlock>
        </section>

        {/* Final Call to Action Parallax */}
        <section aria-label="행동 촉구">
          <ParallaxSection
            backgroundImage="
              linear-gradient(120deg, #f5e8da 0%, #e8d4c0 52%, #c4a484 100%),
              radial-gradient(circle at 18% 32%, rgba(255, 255, 255, 0.18) 0, transparent 46%),
              radial-gradient(circle at 78% 62%, rgba(255, 255, 255, 0.12) 0, transparent 38%)
            "
            height="50vh"
            text="접근성 함께 시작해요"
            textColor="var(--color-text)"
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
