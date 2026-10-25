import Hero from './components/Hero';
import ContentBlock from './components/ContentBlock';
import ParallaxSection from './components/ParallaxSection';
import Footer from './components/Footer';
import FeatureCard from './components/FeatureCard';
import conceptLogo from './assets/concept_nobg.png';

const topics = [
  ['why-accessibility', '접근성이란'],
  ['daily-life-accessibility', '일상 속 접근성'],
  ['context-based-accessibility', '포용적 디자인'],
  ['digital-accessibility', '디지털 접근성'],
  ['everyone-responsibility', '오늘의 실천'],
  ['participate', '함께하기'],
];

function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">본문 바로가기</a>
      <Hero
        title="접근성은 모두를 위한 것입니다."
        subtitle="We ❤️A11y는 모든 사람을 위한 포괄적 접근성 캠페인입니다. 디지털에서 일상까지, 함께 장벽을 줄여갑니다."
        backgroundImage="linear-gradient(120deg, #fffaf3 0%, #f3e7d8 45%, #d3b898 100%)"
        logoImage={conceptLogo}
      />
      <nav className="topic-nav container" aria-label="접근성 캠페인 콘텐츠">
        {topics.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
      </nav>
      <main id="main-content" tabIndex={-1}>
        <section aria-labelledby="why-accessibility">
          <ContentBlock backgroundColor="#fffaf3">
            <div className="section-content-center">
              <h2 id="why-accessibility" className="heading-primary">접근성이란 무엇인가요?</h2>
              <p className="text-intro">
                접근성은 장애, 나이, 언어, 기기와 이용 환경의 차이가 정보·공간·서비스를 이용하는 장벽이 되지 않도록 하는 것입니다.
                장애가 있는 사람의 동등한 참여를 보장하는 일에서 출발해, 다양한 상황에 놓인 모두의 선택을 넓힙니다.
              </p>
              <p className="text-intro">
                We ❤️A11y는 웹과 앱뿐 아니라 이동, 소통, 일상의 경험까지 함께 살펴봅니다.
                자막, 읽기 쉬운 안내, 턱 없는 출입구처럼 작은 변화가 누군가에게는 참여를 가능하게 하는 조건입니다.
              </p>
              <a href="#daily-life-accessibility">일상 속 접근성 사례 살펴보기</a>
            </div>
          </ContentBlock>
        </section>

        <ParallaxSection
          backgroundImage="linear-gradient(135deg, #fffaf3 0%, #f3e7d8 45%, #d3b898 100%)"
          height="40vh" text="접근성, 화면 밖의 일상에서도" textColor="var(--color-text)"
        />

        <section aria-labelledby="daily-life-accessibility">
          <ContentBlock backgroundColor="#f5f0e9">
            <div className="section-content-wide">
              <h2 id="daily-life-accessibility" className="heading-tertiary">일상 속 접근성: 누구나 마주하는 장벽</h2>
              <p className="text-body section-content-center">이용자의 능력과 환경은 한 가지 모습으로 고정되지 않습니다. 필요한 지원을 직접 묻고, 이용 방법을 선택할 수 있게 해보세요.</p>
              <div className="feature-grid-wide">
                {[
                  { label: '이동', title: '턱 없는 출입구', desc: '계단 대신 이용할 수 있는 경사로와 엘리베이터, 쉬어갈 자리는 휠체어 이용자와 유아차를 미는 사람의 이동을 돕습니다.' },
                  { label: '소통', title: '자막과 문자 안내', desc: '청각장애가 있거나 소리를 듣기 어려운 환경에서도 내용을 알 수 있도록 음성 안내에 자막과 텍스트를 함께 제공합니다.' },
                  { label: '정보', title: '읽고 이해하기 쉬운 안내', desc: '익숙한 낱말과 짧은 문장, 명확한 표지로 안내합니다. 복잡한 절차는 단계별로 설명하고 필요한 언어 지원도 고려합니다.' },
                  { label: '시각', title: '밝은 곳에서도 보이는 화면', desc: '약시나 강한 햇빛 때문에 화면을 보기 어려울 수 있습니다. 충분한 명암 대비를 확보하고 글자를 확대할 수 있게 합니다.' },
                  { label: '조작', title: '한 손으로도 가능한 이용', desc: '손의 움직임에 제약이 있거나 한 팔을 다쳤을 때도 쓸 수 있도록 넉넉한 조작 영역과 복잡한 제스처의 대안을 마련합니다.' },
                  { label: '환경', title: '연결이 느려도 읽히는 정보', desc: '핵심 안내를 가벼운 텍스트로 제공하고, 연결이 끊기거나 시간이 더 걸려도 입력한 내용을 잃지 않게 설계합니다.' },
                ].map((item) => <FeatureCard key={item.title} {...item} description={item.desc} />)}
              </div>
            </div>
          </ContentBlock>
        </section>

        <section aria-labelledby="context-based-accessibility">
          <ContentBlock backgroundColor="#fff9fb">
            <div className="section-content-center-wide">
              <h2 id="context-based-accessibility" className="heading-secondary">포용적 디자인: 다양한 사람과 함께 설계하기</h2>
              <p className="text-body">포용적 디자인은 다양한 사람의 경험을 설계 과정에 반영하는 접근입니다. 하나의 방법을 모두에게 강요하기보다, 배제되는 상황을 찾고 선택지를 넓혀갑니다.</p>
              <div className="feature-grid">
                {[
                  { label: '경청', title: '당사자의 경험 듣기', desc: '추측만으로 필요를 정하지 않습니다. 장애가 있는 사람을 포함해 다양한 이용자가 어떤 장벽을 겪는지 듣습니다.' },
                  { label: '선택', title: '여러 이용 방법 제공하기', desc: '보고, 듣고, 만지고, 입력하는 방법을 다양하게 마련합니다. 온라인과 현장 서비스 사이에서도 필요한 안내가 이어지게 합니다.' },
                  { label: '검증', title: '실제 이용 과정 확인하기', desc: '설계 의도만으로 접근성을 판단하지 않습니다. 다양한 기기와 보조기술, 이용자 경험을 통해 어려운 지점을 확인하고 개선합니다.' },
                ].map((item) => <FeatureCard key={item.title} {...item} description={item.desc} />)}
              </div>
              <p><a href="#digital-accessibility">디지털 서비스에서 적용할 방법 알아보기</a></p>
            </div>
          </ContentBlock>
        </section>

        <ParallaxSection
          backgroundImage="linear-gradient(150deg, #f6f0e9 0%, #ecdfd2 55%, #e3d1c3 100%)"
          height="45vh" text="다른 방법으로도, 같은 정보에 닿을 수 있도록" textColor="var(--color-text)"
        />

        <section aria-labelledby="digital-accessibility">
          <ContentBlock backgroundColor="#fffaf3">
            <div className="section-content-wide">
              <h2 id="digital-accessibility" className="heading-tertiary">디지털 접근성: 웹과 앱의 장벽 줄이기</h2>
              <p className="text-body section-content-center">디지털 접근성은 장애가 있는 사람도 웹·앱·문서의 정보를 인식하고 이해하며 조작할 수 있게 하는 것입니다. 보조기술을 통한 이용과 키보드 조작을 함께 고려합니다.</p>
              <div className="feature-grid-wide">
                {[
                  { label: '이미지', title: '의미를 전하는 대체 텍스트', desc: '정보를 담은 이미지에는 목적에 맞는 대체 텍스트를 제공합니다. 장식 이미지는 보조기술이 불필요하게 읽지 않도록 구분합니다.' },
                  { label: '키보드', title: '마우스 없이도 이동하기', desc: '키보드로 링크와 버튼에 접근하고 실행할 수 있게 합니다. 현재 초점이 어디에 있는지 눈으로 확인할 수 있어야 합니다.' },
                  { label: '화면', title: '색상에만 의존하지 않기', desc: '오류와 상태는 색뿐 아니라 글자와 형태로도 알립니다. 글자 확대와 좁은 화면에서도 내용과 기능을 이용할 수 있게 합니다.' },
                  { label: '콘텐츠', title: '구조와 설명 제공하기', desc: '제목의 순서, 구체적인 링크 이름, 입력 항목의 설명을 갖춥니다. 영상에는 자막을 제공하고 소리로만 전달되는 정보도 글로 안내합니다.' },
                ].map((item) => <FeatureCard key={item.title} {...item} description={item.desc} />)}
              </div>
              <p className="text-body">더 알아보기: <a href="https://www.w3.org/WAI/fundamentals/accessibility-intro/">W3C WAI 웹 접근성 소개(영문)</a>. 간단한 점검만으로 모든 사람의 이용 가능성이나 표준 준수를 보장할 수는 없습니다.</p>
            </div>
          </ContentBlock>
        </section>

        <section aria-labelledby="everyone-responsibility">
          <ContentBlock backgroundColor="#f5f0e9">
            <div className="section-content-medium">
              <h2 id="everyone-responsibility" className="heading-quaternary">오늘부터 실천하는 접근성</h2>
              <p className="text-intro">전문가만 할 수 있는 일은 아닙니다. 내가 만드는 안내와 콘텐츠, 함께 쓰는 공간에서 한 가지씩 시작해보세요.</p>
              <ol className="action-list">
                <li><strong>다르게 이용해보기.</strong> 자주 쓰는 페이지를 키보드만으로 이동해보거나 글자를 확대해 읽어보세요. 이것만으로 다른 사람의 경험을 모두 알 수는 없습니다.</li>
                <li><strong>정보에 대안 더하기.</strong> 공유할 이미지에는 설명을, 영상에는 자막을 더하고 안내문은 쉬운 문장으로 다듬어보세요.</li>
                <li><strong>장벽을 발견하면 알리기.</strong> 어디에서 어떤 이용이 어려웠는지 서비스 담당자에게 구체적으로 전하고, 필요한 지원은 당사자에게 물어보세요.</li>
              </ol>
              <a className="cta-link" href="#participate">접근성 캠페인 함께하기</a>
            </div>
          </ContentBlock>
        </section>

        <ParallaxSection
          backgroundImage="linear-gradient(120deg, #f5e8da 0%, #e8d4c0 52%, #c4a484 100%)"
          height="50vh" text="접근성, 함께 시작해요" textColor="var(--color-text)"
        />
        <section aria-labelledby="participate">
          <ContentBlock backgroundColor="#fffaf3">
            <div className="section-content-center">
              <h2 id="participate" className="heading-secondary">We ❤️A11y와 함께하는 방법</h2>
              <p className="text-intro">오늘의 실천 중 한 가지를 골라 시도하고, 주변 사람과 접근성에 관한 이야기를 나눠보세요. 이 페이지의 주소를 공유하며 일상 속 장벽을 함께 찾아볼 수도 있습니다.</p>
              <p className="text-body">이 홈페이지는 접근성에 관한 정보와 실천 방법을 안내합니다. 별도의 참여 신청이나 서명 접수 기능은 제공하지 않습니다.</p>
              <div className="cta-group">
                <a className="cta-link" href="#everyone-responsibility">오늘의 실천 다시 보기</a>
                <a href="#why-accessibility">접근성 정의부터 읽기</a>
              </div>
            </div>
          </ContentBlock>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
