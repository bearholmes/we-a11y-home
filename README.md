# We A11y

웹 접근성 인식을 높이기 위한 단일 페이지 React(Vite) 캠페인 웹사이트입니다. 부드러운 패럴랙스와 파스텔 테마를 사용하며, Hero/콘텐츠/패럴랙스/푸터 블록으로 핵심 메시지를 전달합니다.

## 빠른 시작
- 의존성 설치: `npm install` (Node 18+ 권장)
- 개발 서버: `npm run dev` → http://localhost:5173
- 정적 빌드: `npm run build` (TS 프로젝트 리빌드 후 Vite 번들)
- 빌드 미리보기: `npm run preview`
- 린트: `npm run lint` (ESLint flat config, React + TS)

## 프로젝트 구조
- `src/main.tsx`: 앱 진입점, ParallaxProvider 설정
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
