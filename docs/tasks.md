# 개발 태스크 — SaaS 스타일 개인 포트폴리오 사이트

**기준 문서:** [prd.md](./prd.md)  
**작성일:** 2026-07-11  
**총 태스크:** 61개

---

## 개요

| Phase   | 기간  | 태스크 수 | 목표                   |
| ------- | ----- | --------- | ---------------------- |
| Phase 1 | 1–2주 | 29개      | 정적 뼈대 구축 및 배포 |
| Phase 2 | 2–3주 | 21개      | AI 챗봇 (RAG) 구현     |
| Phase 3 | 1–2주 | 11개      | 완성도 & 최적화        |

---

## Phase 1 — 정적 뼈대 (29개)

### 프로젝트 셋업 (5개)

- [x] **`p1-setup-1`** Next.js 14+ 프로젝트 생성 (App Router, TypeScript)
- [x] **`p1-setup-2`** Tailwind CSS + shadcn/ui 설치 및 초기 설정
- [x] **`p1-setup-3`** Framer Motion, Zustand 의존성 설치
- [x] **`p1-setup-4`** ESLint / Prettier 설정 + 폴더 구조 설계 (`app/`, `components/`, `data/`, `lib/`)
- [x] **`p1-setup-5`** 환경 변수 정의 (`.env.local`, `.env.example`) — `NEXT_PUBLIC_HIRE_STATUS`, `NEXT_PUBLIC_SHOW_SALARY`

### 디자인 토큰 (2개)

- [x] **`p1-design-1`** 컬러 팔레트 / 타이포그래피 스케일 정의 (Tailwind config 확장)
- [x] **`p1-design-2`** 다크 모드 CSS 변수 구조 준비 (Phase 3 선행 작업)

### Navbar (2개)

- [x] **`p1-navbar-1`** 로고, 섹션 스크롤 링크, 스크롤 시 배경 전환 효과
- [x] **`p1-navbar-2`** 모바일 햄버거 메뉴 (Sheet 또는 Drawer)

### Hero 섹션 (3개)

- [ ] **`p1-hero-1`** 상태 배지 컴포넌트 (`NEXT_PUBLIC_HIRE_STATUS` 연동)
- [ ] **`p1-hero-2`** 헤드라인, 서브 카피, CTA 버튼 2개 레이아웃
- [ ] **`p1-hero-3`** 스킬 키워드 태그 롤링 애니메이션 (Framer Motion)

### Pricing 섹션 (3개)

- [ ] **`p1-pricing-1`** 플랜 카드 컴포넌트 3종 (Starter / Professional / Enterprise)
- [ ] **`p1-pricing-2`** 월간/연간 토글 스위치 + 절약 배지
- [ ] **`p1-pricing-3`** Most Popular 배지 + `NEXT_PUBLIC_SHOW_SALARY` 플래그 연동

### Skills 섹션 (4개)

- [ ] **`p1-skills-1`** `/data/skills.json` 스키마 설계 및 더미 데이터 작성
- [ ] **`p1-skills-2`** 5개 카테고리 탭 UI (Frontend / Backend / DevOps / Design / PM)
- [ ] **`p1-skills-3`** 숙련도 바 컴포넌트 + 스크롤 진입 시 0→N% 애니메이션
- [ ] **`p1-skills-4`** 기술 태그 hover 툴팁 (사용 기간, 컨텍스트)

### Career 섹션 (4개)

- [ ] **`p1-career-1`** `/data/career.json` 스키마 설계 및 더미 데이터 작성
- [ ] **`p1-career-2`** 경력 타임라인 컴포넌트 (최신순, 성과 수치 포함)
- [ ] **`p1-career-3`** 자격증 배지 그리드 (클릭 시 인증 링크 이동)
- [ ] **`p1-career-4`** 학력 / 영어 능력 / 오픈소스 기여 영역

### Links & CTA / Footer (3개)

- [ ] **`p1-links-1`** 외부 링크 카드 그리드 (GitHub, 블로그, 노션, LinkedIn 등)
- [ ] **`p1-links-2`** Primary CTA (연락하기) + Secondary CTA (이력서 PDF 다운로드)
- [ ] **`p1-footer-1`** 저작권 표시, 소셜 아이콘 링크

### 반응형 & 배포 (3개)

- [ ] **`p1-responsive-1`** 반응형 전체 검증 (360px / 768px / 1280px), 모바일 헤드라인 32px 확인
- [ ] **`p1-deploy-1`** GitHub 레포지토리 생성 + Vercel 프로젝트 연결
- [ ] **`p1-deploy-2`** Vercel 환경 변수 설정 + 커스텀 도메인 연결

---

## Phase 2 — AI 챗봇 (21개)

### 지식 베이스 문서 수집 (4개)

- [ ] **`p2-kb-1`** 이력서 PDF → 텍스트 추출 및 Markdown 변환
- [ ] **`p2-kb-2`** 프로젝트별 상세 설명 Markdown 파일 작성 (최소 5개)
- [ ] **`p2-kb-3`** 기술 블로그 포스트 / 노션 포트폴리오 Markdown 정리
- [ ] **`p2-kb-4`** 자격증·교육 이력 + 개인 소개 문서 작성 (강점, 협업 스타일)

### 인프라 셋업 (3개)

- [ ] **`p2-infra-1`** Supabase 프로젝트 생성 + pgvector 확장 활성화
- [ ] **`p2-infra-2`** `documents` 테이블 스키마 생성 (id, content, embedding, metadata)
- [ ] **`p2-infra-3`** Upstash Redis 계정 생성 + 환경 변수 설정

### 인덱싱 스크립트 (3개)

- [ ] **`p2-script-1`** 청킹 스크립트 구현 (512토큰, 64토큰 오버랩, `source/category/date` 메타데이터)
- [ ] **`p2-script-2`** OpenAI `text-embedding-3-small` 임베딩 생성 + Supabase 업로드 스크립트
- [ ] **`p2-script-3`** 인덱싱 실행 및 벡터 검색 정확도 검증

### API Route 구현 (5개)

- [ ] **`p2-api-1`** `/api/chat` Route Handler — 입력 유효성 검사 (500자 제한, 욕설 필터)
- [ ] **`p2-api-2`** RAG 파이프라인 — 질문 임베딩 → pgvector 유사도 검색 (상위 5개)
- [ ] **`p2-api-3`** 페르소나 System Prompt 작성 (1인칭, 솔직함, 수치 기반 답변 원칙)
- [ ] **`p2-api-4`** OpenAI gpt-5.4 스트리밍 호출 + ReadableStream 응답 반환 (최대 800토큰)
- [ ] **`p2-api-5`** Upstash Redis — IP 기반 Rate Limiting 미들웨어 (20 req/min)

### 챗봇 UI (4개)

- [ ] **`p2-ui-1`** Zustand 챗봇 대화 상태 스토어 설계 (세션 단위, 새로고침 시 초기화)
- [ ] **`p2-ui-2`** 채팅 레이아웃, 메시지 버블 (사용자/AI 구분)
- [ ] **`p2-ui-3`** 스트리밍 타이핑 효과 구현
- [ ] **`p2-ui-4`** 추천 질문 버튼 3–4개 + 피드백 버튼 (👍/👎) + 에러 처리 UI

### 품질 테스트 (2개)

- [ ] **`p2-test-1`** 20+ 예상 질문 시나리오 작성 및 응답 품질 평가
- [ ] **`p2-test-2`** 엣지 케이스 검증 (모르는 질문, 부적절한 입력, 연봉 질문 안내)

---

## Phase 3 — 완성도 & 최적화 (11개)

### SEO (2개)

- [ ] **`p3-seo-1`** 메타태그 설정 (title, description, og:image, Twitter Card)
- [ ] **`p3-seo-2`** `robots.txt` + `sitemap.xml` 생성

### 성능 최적화 (2개)

- [ ] **`p3-perf-1`** 이미지 최적화 — WebP 변환, `next/image`, `next/font` 적용
- [ ] **`p3-perf-2`** Lighthouse 측정 → LCP 2.5s↓ / CLS 0.1↓ / 점수 90+ 달성

### 애니메이션 / 다크 모드 (3개)

- [ ] **`p3-anim-1`** 애니메이션 Polish — 스크롤 트리거, 전환 효과 일관성, 모바일 성능 확인
- [ ] **`p3-dark-1`** 다크 모드 — Tailwind dark 설정 + 전체 컴포넌트 다크 토큰 적용
- [ ] **`p3-dark-2`** 다크 모드 — 시스템 설정 감지(`prefers-color-scheme`) + 수동 토글 버튼

### 접근성 / 보안 (2개)

- [ ] **`p3-a11y-1`** WCAG 2.1 AA 점검 — `aria-label`, 시맨틱 HTML, 색상 대비, 키보드 네비게이션
- [ ] **`p3-security-1`** Content Security Policy 헤더 설정 + 챗봇 입력 500자 제한 최종 확인

### 애널리틱스 / 모니터링 / 문서화 (3개)

- [ ] **`p3-analytics-1`** Umami 애널리틱스 연동 + Vercel Analytics 활성화
- [ ] **`p3-monitoring-1`** Sentry 에러 모니터링 설정 + OpenAI 사용량 월 알림 설정
- [ ] **`p3-docs-1`** README.md 작성 (로컬 실행, 환경 변수 가이드) + 지식 베이스 업데이트 가이드

---

## 의존성 관계

```
Phase 1 (정적 뼈대)
  ├── p1-setup-* → p1-design-* → p1-navbar-* / p1-hero-* / ...
  ├── p1-skills-1 → p1-skills-2 → p1-skills-3 → p1-skills-4
  ├── p1-career-1 → p1-career-2 → p1-career-3 → p1-career-4
  └── p1-responsive-1 → p1-deploy-*

Phase 2 (AI 챗봇) — Phase 1 완료 후 시작
  ├── p2-kb-* (병렬 가능)
  ├── p2-infra-* → p2-script-* → p2-api-*
  ├── p2-api-* → p2-ui-*
  └── p2-ui-* → p2-test-*

Phase 3 (최적화) — Phase 2 완료 후 시작
  ├── p3-seo-* / p3-perf-* (병렬 가능)
  ├── p3-dark-1 → p3-dark-2
  └── p3-a11y-* / p3-security-* / p3-analytics-* / p3-monitoring-* / p3-docs-*
```

---

## Phase 시작 전 결정 사항

| #   | 질문                                      | 결정 시점       | 관련 태스크           |
| --- | ----------------------------------------- | --------------- | --------------------- |
| 1   | 희망 연봉을 실제 수치로 공개할 것인가?    | Phase 1 완료 전 | `p1-pricing-3`        |
| 2   | 챗봇 언어 — 한국어 전용 vs 영어 지원?     | Phase 2 시작 전 | `p2-api-3`, `p2-ui-4` |
| 3   | 도메인 — 실명 기반 vs 브랜드명?           | Phase 1 배포 전 | `p1-deploy-2`         |
| 4   | Pinecone 이전 기준점                      | Phase 3 이후    | —                     |
| 5   | 다국어 지원 범위 — 전체 페이지 vs 챗봇만? | Phase 3         | `p3-seo-1`            |

---

_이 문서는 개발 진행에 따라 태스크 상태를 업데이트합니다._
