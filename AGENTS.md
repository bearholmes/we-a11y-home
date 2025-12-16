# Repository Guidelines

## Project Structure & Module Organization
- Vite + React + TypeScript 기반 단일 페이지로, 진입점은 `src/main.tsx`이며 전역 스타일은 `src/index.css`에 정의됩니다.
- 핵심 UI는 `src/components`의 함수형 컴포넌트(Hero, ContentBlock, ParallaxSection, Footer)로 나뉘며, 페이지 조합은 `src/App.tsx`에서 관리합니다.
- 정적 자산과 아이콘은 `public`에 위치하며 빌드 산출물은 `dist`로 생성됩니다.

## Build, Test, and Development Commands
- 의존성 설치: `npm install` (노드 18+ 권장).
- 로컬 개발 서버: `npm run dev` (Vite HMR, 기본 5173 포트).
- 정적 빌드: `npm run build` (TypeScript 프로젝트 리빌드 후 Vite 번들).
- 빌드 미리보기: `npm run preview`.
- 정적 분석: `npm run lint` (ESLint flat config, React + TS 추천 규칙).

## Coding Style & Naming Conventions
- TypeScript strict 옵션이 활성화되어 있으니 모든 컴포넌트/props에 명시적 타입을 선언합니다.
- 함수형 컴포넌트와 훅을 기본으로 하며, 접근성 관련 속성(`alt`, `aria-*`, `:focus-visible`)을 유지하거나 추가합니다.
- 들여쓰기는 2칸을 선호하되, 기존 파일 스타일을 존중해 파일 내 일관성을 우선합니다.
- 스타일은 가능한 CSS 변수(`src/index.css`)와 공용 유틸리티 클래스(`.container`, `.sr-only`, `.snap-section`)를 재사용합니다.
- 파일/컴포넌트는 PascalCase, 유틸 함수는 camelCase, 에셋은 kebab-case를 권장합니다.

## Testing Guidelines
- 현재 자동화 테스트는 구성되어 있지 않습니다. 새 테스트를 추가한다면 Vitest + React Testing Library 조합을 사용하고, 파일은 `src/__tests__/` 혹은 해당 컴포넌트와 같은 위치의 `*.test.tsx`로 배치하세요.
- 렌더, 상호작용, 접근성(e.g., landmark/heading, 키보드 포커스) 시나리오를 최소 단위로 커버하고, 빠르게 실행되는 단위 테스트를 우선합니다.

## Commit & Pull Request Guidelines
- Git 히스토리가 없어 특정 규약이 고정되지 않았습니다. 명령형 한 줄 요약(예: “Add parallax section focus styles”)과 간결한 본문을 사용하거나 Conventional Commits(`feat`, `fix`, `chore`)를 권장합니다.
- PR에는 변경 의도, 주요 스크린샷/동작 GIF, 테스트/린트 실행 결과, 관련 이슈 링크를 포함하세요.
- 접근성 관련 수정 시, 배경/문자 대비와 키보드 내비게이션이 개선되었는지 간단히 서술하면 리뷰가 수월합니다.

## Security & Configuration Tips
- 환경 변수는 Vite 규약에 따라 `VITE_` 프리픽스를 사용하며, 비밀키는 `.env.local`에 두고 커밋하지 마세요.
- 대용량/외부 이미지 대신 `public` 내 정적 자산을 활용하고, 이미지에는 대체 텍스트를 제공합니다.
- 불필요한 패키지는 추가하지 말고, 새 의존성은 `npm audit` 결과를 확인한 뒤 최소화해 반영합니다.
