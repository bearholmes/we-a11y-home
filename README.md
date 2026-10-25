# We A11y

모든 사람을 위한 포괄적 접근성을 알리는 단일 페이지 React(Vite) 캠페인 웹사이트입니다. 부드러운 패럴랙스와 파스텔 테마를 사용하며, Hero/콘텐츠/패럴랙스/푸터 블록으로 핵심 메시지를 전달합니다.

## 빠른 시작
- 의존성 설치: `npm install` (Node 20.19+ 또는 22.12+)
- 개발 서버: `npm run dev` → http://localhost:5173
- 정적 빌드: `npm run build` (TS 프로젝트 리빌드 후 Vite 번들)
- 빌드 미리보기: `npm run preview`
- 린트: `npm run lint` (ESLint flat config, React + TS)

## 프로젝트 구조
- `src/main.tsx`: 개발 시 클라이언트 렌더링, 빌드 결과는 hydration으로 연결
- `src/App.tsx`: 페이지 레이아웃과 섹션 구성
- `src/components/`: Hero, ContentBlock, ParallaxSection, Footer 등 UI 컴포넌트
- `src/index.css`: 전역 스타일, CSS 변수, 유틸리티 클래스
- `public/`: 정적 자산(로고, 배경) 위치; 배포 산출물은 `dist/`

## 스타일 & 접근성
- CSS 변수로 색상/간격을 관리하고 `.container`, `.snap-section`, `.sr-only` 등 유틸 클래스를 재사용합니다.
- 포커스 가시성(`:focus-visible`)이 정의되어 있으니 새로운 인터랙션에도 유지하세요.
- 이미지에는 의미 있는 `alt` 텍스트를 제공하고, 텍스트 대비와 키보드 내비게이션을 깨지 않도록 확인합니다.

## 개발 팁
- TypeScript `strict`가 활성화되어 있어 컴포넌트/props에 명시적 타입 선언이 필요합니다.
- 컴포넌트는 PascalCase, 유틸 함수는 camelCase, 에셋은 kebab-case를 권장합니다.
- 테스트가 없는 상태입니다. 추가 시 Vitest + React Testing Library를 사용하고 `src/__tests__/` 또는 컴포넌트 옆 `*.test.tsx`로 배치하세요.

## 배포/운영 참고
- Vite 환경 변수는 `VITE_` 프리픽스만 노출됩니다. 비밀값은 `.env.local`에 보관하고 커밋하지 마세요.
- 새 의존성 추가 전 `npm audit`을 확인하고, 자산은 `public/`에 정적 파일로 추가해 빌드 파이프라인을 단순화하세요.


## SEO와 콘텐츠 운영
- 홈페이지 Title: `모두를 위한 접근성 캠페인 | We ❤️A11y`
- H1: `접근성은 모두를 위한 것입니다.`
- 핵심 주제: 접근성 캠페인, 접근성의 정의, 일상 속 접근성, 포용적 디자인, 디지털 접근성, 접근성 실천.
- 기존 단일 페이지 범위를 유지합니다. 여섯 콘텐츠는 본문과 내비게이션의 앵커로 연결되며 별도의 URL 페이지가 아닙니다.
- `npm run build`는 React 본문을 `dist/index.html`에 사전 렌더링합니다. JavaScript 없이도 본문과 내부 링크를 이용할 수 있고, 로드 후에는 기존 패럴랙스가 작동합니다. 중간 서버 번들은 배포하지 않는 `dist-ssr/`에 생성됩니다.
- `index.html`의 canonical/OG URL, `public/robots.txt`, `public/sitemap.xml`은 기존 CNAME인 `wea11y.kr`을 기준으로 합니다. 도메인 변경 시 함께 수정하세요.
- 공유 이미지는 기존 로고를 그대로 사용한 `public/og-logo.png`입니다. 로고 원본 변경 시 이 파일도 함께 갱신하세요.
- sitemap에는 실제 페이지인 `/`만 기재합니다. 근거 없는 날짜, 캠페인 성과, 행사, 후기, 신청 기능을 추가하지 않습니다.
- 콘텐츠 출처: [W3C WAI 웹 접근성 소개](https://www.w3.org/WAI/fundamentals/accessibility-intro/). 생활 사례는 캠페인의 설명 예시이며 WCAG가 물리적 공간의 기준이라는 뜻이 아닙니다.

### 후속 우선순위
1. 배포 후 HTTP/HTTPS 및 www 리디렉션, canonical과 OG 이미지의 실제 응답, 검색 도구의 sitemap 수집 상태를 확인합니다.
2. 장애 당사자와 보조기술 사용자를 포함한 이용 검증을 진행합니다. 자동 점검만으로 접근성 준수를 단정하지 않습니다.
3. 주제별 콘텐츠가 충분히 쌓이면 정적 경로와 고유 Title/Description을 갖춘 개별 SEO 페이지를 검토합니다. GitHub Pages에서 직접 URL 접근이 가능하도록 실제 HTML 파일을 생성해야 합니다.
4. 참여 신청 기능과 운영 채널은 실제 운영 방식·개인정보 처리 방침이 정해진 뒤 구현합니다.
