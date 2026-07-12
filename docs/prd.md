# PRD — SaaS 스타일 개인 포트폴리오 사이트

**문서 버전** 1.1.0  
**작성일** 2026-07-11  
**최종 수정** 2026-07-12  
**상태** 초안 (Draft)

---

## 1. 개요

### 1.1 제품 목표

개발자 개인을 SaaS 제품처럼 포지셔닝하는 포트폴리오 사이트를 제작한다. 채용 담당자·팀장이 방문했을 때 이력서 PDF 대신 인터랙티브하게 역량을 탐색하고, AI 챗봇을 통해 직접 질문할 수 있는 경험을 제공한다.

### 1.2 핵심 포지셔닝

> "Full-Stack Engineer as a Service — 디자인 시스템부터 CI/CD까지"

- 올라운더(All-rounder) 엔지니어를 SaaS 제품 구독 모델로 표현
- 희망 연봉 = 구독 요금제로 프레이밍
- "나" 페르소나 AI 챗봇으로 방문자와 실시간 인터랙션

### 1.3 타깃 사용자

| 사용자 유형         | 목적                                | 주요 관심 섹션               |
| ------------------- | ----------------------------------- | ---------------------------- |
| 채용 담당자 (HR)    | 기본 스펙 확인, 연봉 협의 범위 파악 | Hero, Pricing, 경력          |
| 개발팀 리드·CTO     | 기술 깊이 검증, 협업 가능성 판단    | 스킬 지표, AI 챗봇, 프로젝트 |
| 프리랜서 클라이언트 | 프로젝트 가능 여부, 단가 확인       | Pricing, 링크, AI 챗봇       |

---

## 2. 페이지 구조 및 섹션 정의

### 섹션 맵

```
[Navbar]
  ↓
[Section 1] Hero — 포지셔닝 + CTA
  ↓
[Section 2] Pricing — 희망 연봉 구독 플랜
  ↓
[Section 3] Features — 스킬 지표
  ↓
[Section 4] AI 챗봇 — "나" 페르소나
  ↓
[Section 5] Social Proof — 경력 & 자격증
  ↓
[Section 6] Links & CTA — 외부 채널
  ↓
[Footer]
```

---

### Section 1 — Hero

**목적** 방문자가 5초 안에 "이 사람이 누구고 왜 채용해야 하는지" 파악하게 한다.

**구성 요소**

- 대형 헤드라인 카피 (포지셔닝 한 줄)
- 서브 카피 (올라운더 역량 요약, 2–3줄)
- CTA 버튼 2개: "플랜 보기 →" / "챗봇에게 물어보기 →"
- 상단 배지: `Available for hire` 또는 `Open to work` 상태 표시
- 스킬 키워드 태그 롤링 애니메이션 (FE · BE · DevOps · Design)

**요구사항**

- 스크롤 없이 전체 콘텐츠가 뷰포트에 들어와야 한다 (Above the fold)
- 모바일에서 헤드라인 폰트 사이즈 최소 32px
- 상태 배지는 실제 구직 활동 여부에 따라 쉽게 토글 가능하도록 환경 변수(`NEXT_PUBLIC_HIRE_STATUS`)로 관리

---

### Section 2 — Pricing (희망 연봉)

**목적** 연봉 협의를 SaaS 요금제처럼 투명하게 제시해 채용 담당자의 정보 비대칭을 해소한다.

**플랜 구성**

| 플랜         | 형태                    | 금액 (예시)     | 포함 내용                             |
| ------------ | ----------------------- | --------------- | ------------------------------------- |
| Starter      | 프리랜서 / 단기 계약    | 프로젝트별 협의 | 특정 도메인 개발, 코드 리뷰           |
| Professional | 정규직        | 월 XXX만원      | FE·BE·DevOps 전 영역, 온보딩 2주 포함 |
| Enterprise   | 정규직 + α | 협의     | 무한한 잠재력      |

**요구사항**

- 월간/연간 토글 스위치 (연간 선택 시 "X% 절약" 배지 표시)
- Professional 플랜을 `Most Popular`로 강조
- 각 플랜 카드 하단 CTA: "문의하기" → 이메일 또는 오픈채팅 연결
- 금액은 실제 공개 여부를 선택할 수 있도록 `NEXT_PUBLIC_SHOW_SALARY` 플래그로 제어 (비공개 시 "협의"로 대체)

---

### Section 3 — Features (스킬 지표)

**목적** 올라운더 역량을 정량적·시각적으로 표현한다.

**4개 역량 카테고리**

| 카테고리 | 주요 기술 스택                                                   | 지표 표현 방식                 |
| -------- | ---------------------------------------------------------------- | ------------------------------ |
| Frontend | React, Next.js, TypeScript, 디자인 시스템, Storybook             | 숙련도 바 + 대표 프로젝트 링크 |
| Backend  | Node.js, Python, REST/GraphQL API, PostgreSQL, Redis             | 숙련도 바 + 대표 프로젝트 링크 |
| DevOps   | Docker, Kubernetes, CI/CD (GitHub Actions), AWS/GCP              | 숙련도 바 + 자격증 배지        |
| Design   | Figma, 디자인 시스템 구축, UI/UX 프로세스                        | 숙련도 바 + 작업물 썸네일      |

**요구사항**

- 탭 또는 아코디언 UI로 카테고리 전환
- 숙련도 바는 스크롤 진입 시 0 → N% 애니메이션
- 각 기술 태그 hover 시 "몇 년 경험", "주요 경험 컨텍스트" 툴팁 표시
- 지표 수치는 `src/data/skills.json`으로 외부화하여 코드 수정 없이 업데이트 가능

---

### Section 4 — AI 챗봇 ("나" 페르소나)

**목적** 방문자가 이력서를 읽는 대신 직접 질문하고 즉답을 받을 수 있도록 한다. 포트폴리오 사이트의 핵심 킬러 피처.

#### 4.1 아키텍처

Vercel AI SDK를 중심으로 스트리밍 챗·임베딩·UI 상태를 통합한다.

```
방문자 질문 (useChat → POST /api/chat)
    ↓
[Next.js Route Handler /api/chat]
    ↓
입력 검증 + Rate Limiting
    ↓
질문 임베딩 생성 (AI SDK embed + text-embedding-3-small)
    ↓
벡터 DB 유사도 검색 (pgvector)
    ↓
관련 문서 청크 추출 (상위 5개)
    ↓
streamText (AI SDK)
  - Provider: @ai-sdk/openai (gpt-5.4)
  - System prompt: "나" 페르소나 + RAG context
  - messages: convertToModelMessages(UIMessage[])
    ↓
createUIMessageStreamResponse / toUIMessageStream
    ↓
클라이언트 useChat이 토큰 단위로 렌더
```

#### 4.2 RAG 지식 베이스 구성

인덱싱할 문서 목록:

- 이력서 (PDF → 텍스트 추출)
- 프로젝트별 상세 설명 (Markdown)
- 기술 블로그 포스트 (Markdown)
- 노션 포트폴리오 내용 (Markdown 변환)
- 자격증 및 교육 이력
- 개인 소개 문서 (강점, 협업 스타일, 관심 도메인)

청크 전략:

- 청크 크기: 512 토큰, 오버랩 64 토큰
- 메타데이터: `source`, `category`, `date` 태그 부착
- 업데이트 주기: 새 프로젝트·블로그 글 발행 시 수동 재인덱싱 (추후 자동화)

#### 4.3 페르소나 System Prompt 방향

```
당신은 [이름]입니다. 채용 담당자나 팀 리드가 질문할 때
1인칭으로 자연스럽게 답변합니다.
- 모르는 것은 모른다고 솔직하게 답합니다
- 과장하지 않고, 실제 경험 기반으로만 답합니다
- 기술적 질문에는 구체적인 예시와 수치를 포함합니다
- 연봉·조건 관련 질문은 "직접 연락 주시면 상세히 논의하겠습니다"로 안내합니다
```

#### 4.4 UI 요구사항

- 섹션 내 임베디드 채팅 UI (별도 페이지 이동 없음)
- `@ai-sdk/react`의 `useChat`으로 메시지 상태·전송·스트리밍·에러를 관리 (별도 Zustand 챗 스토어 불필요)
- 추천 질문 버튼 3–4개 제공 (예: "K8s 경험이 있나요?", "리액트 프로젝트 규모는?", "협업 스타일이 어때요?") — `sendMessage`로 전송
- 스트리밍 응답 지원 (AI SDK UI Message Stream 프로토콜)
- 대화 기록은 세션 단위로 유지, 새로고침 시 초기화
- 응답 하단 "이 내용이 도움이 됐나요?" 피드백 버튼 (👍 / 👎)
- API 키 노출 방지: 모든 모델/임베딩 호출은 서버사이드 Route Handler에서만 실행

#### 4.5 안전 장치

- 욕설·부적절한 입력에 대한 기본 필터링
- 분당 요청 수 제한 (Rate limiting): IP당 20 req/min
- 응답 최대 토큰: 800 tokens (`streamText`의 `maxOutputTokens`로 제어)
- 월 비용 알림: OpenAI 사용량 모니터링 설정

---

### Section 5 — Social Proof (경력 & 자격증)

**목적** 신뢰를 구축하는 객관적 지표를 제시한다.

**구성 요소**

- 경력 타임라인: 회사명, 직책, 기간, 주요 성과 (수치 포함)
- 자격증 배지 그리드: 취득 연도, 발급 기관 표시
- 학력 사항
- 영어 능력: 시험 점수 또는 사용 컨텍스트 (업무 영어, 기술 문서 독해 등)
- 오픈소스 기여 이력 (GitHub 링크 연동)

**요구사항**

- 타임라인은 최신순 정렬
- 자격증 배지 클릭 시 공식 인증 링크로 이동
- 경력 데이터는 `src/data/career.json`으로 외부화

---

### Section 6 — Links & CTA

**목적** 방문자를 구체적인 행동(연락, 추가 탐색)으로 전환한다.

**외부 링크 (카드 그리드, 2×2)**

| 채널            | 용도                       |
| --------------- | -------------------------- |
| GitHub          | 코드 품질, 기여 빈도 확인  |
| 기술 블로그     | 사고방식, 글쓰기 능력 확인 |
| 노션 포트폴리오 | 프로젝트 상세 문서         |
| Mealio          | 사이드 프로젝트            |

연락 채널(이메일)은 링크 카드에 넣지 않고 CTA로만 분리한다.

**CTA 버튼 계층**

1. Primary: "지금 연락하기" (이메일)
2. Secondary: "이력서 다운로드" (PDF)

---

## 3. 기술 스택

### 3.1 프론트엔드

| 항목       | 선택                          | 선택 이유                                              |
| ---------- | ----------------------------- | ------------------------------------------------------ |
| 프레임워크 | Next.js 14+ (App Router)      | SSR/SSG 혼합, API Route 내장, Vercel 최적화            |
| 언어       | TypeScript                    | 타입 안정성, 유지보수성                                |
| 스타일링   | Tailwind CSS + shadcn/ui      | SaaS UI 컴포넌트 즉시 활용 가능                        |
| 애니메이션 | Framer Motion                 | 스킬 바, 스크롤 트리거, 페이지 전환                    |
| 챗봇 UI 상태 | `@ai-sdk/react` (`useChat`) | 스트리밍·메시지 히스토리·전송 상태를 SDK가 일괄 관리 |

### 3.2 백엔드 / AI

| 항목              | 선택                                      | 선택 이유                                                        |
| ----------------- | ----------------------------------------- | ---------------------------------------------------------------- |
| AI 프레임워크     | Vercel AI SDK (`ai`)                      | `streamText` / `embed` 통합, Next.js 스트리밍 프로토콜 네이티브 |
| React 바인딩      | `@ai-sdk/react`                           | `useChat`으로 챗 UI 상태·스트리밍 렌더                           |
| 모델 Provider     | `@ai-sdk/openai` (gpt-5.4)                | OpenAI 연동을 SDK Provider로 추상화, 응답 품질·스트리밍 지원     |
| 임베딩            | AI SDK `embed` + text-embedding-3-small   | 비용 효율, 한국어 품질, 인덱싱·질의 경로 통일                    |
| 벡터 DB           | PostgreSQL + pgvector                     | RAG 임베딩 저장·유사도 검색, 기존 RDB 스택과 통합 운영           |
| API Rate Limiting | Redis                                     | 서버리스 환경에서 IP 기반 제한                                   |

### 3.3 인프라

| 항목       | 선택                                                    |
| ---------- | ------------------------------------------------------- |
| 호스팅     | Vercel (프리 티어 → Pro)                                |
| 도메인     | 커스텀 도메인 (.dev 또는 .io)                           |
| 애널리틱스 | Vercel Analytics + Umami (자체 호스팅, 개인정보 친화적) |
| 모니터링   | Sentry (에러), OpenAI Dashboard (API 비용)              |

---

## 4. 개발 로드맵

### Phase 1 — 정적 뼈대 (1–2주)

- [ ] Next.js 프로젝트 셋업 (TypeScript, Tailwind, shadcn/ui)
- [ ] Navbar 컴포넌트
- [ ] Hero 섹션 (카피, CTA, 상태 배지)
- [ ] Pricing 섹션 (플랜 카드, 월간/연간 토글)
- [ ] Skills 섹션 (탭, 숙련도 바 애니메이션)
- [ ] Career 타임라인
- [ ] Links & CTA 섹션
- [ ] Footer
- [ ] 반응형 레이아웃 (모바일 우선)
- [ ] Vercel 배포 + 커스텀 도메인 연결

### Phase 2 — AI 챗봇 (2–3주)

- [ ] 지식 베이스 문서 수집 및 정리 (Markdown)
- [ ] Vercel AI SDK 의존성 설치 (`ai`, `@ai-sdk/react`, `@ai-sdk/openai`)
- [ ] 문서 청킹 및 임베딩 생성 스크립트 (`embed` / `embedMany`)
- [ ] pgvector 셋업 및 인덱싱 (PostgreSQL 확장)
- [ ] `/api/chat` Route Handler — RAG + `streamText` + UI Message Stream 응답
- [ ] 페르소나 System Prompt 작성 및 튜닝
- [ ] 챗봇 UI (`useChat`, 스트리밍, 추천 질문, 피드백)
- [ ] Rate limiting (Redis)
- [ ] 챗봇 응답 품질 테스트 (20+ 예상 질문 시나리오)

### Phase 3 — 완성도 & 최적화 (1–2주)

- [ ] SEO 메타태그 (og:image, description)
- [ ] Lighthouse 점수 90+ 달성
- [ ] 애니메이션 polish (Framer Motion)
- [ ] 다크 모드 지원
- [ ] Umami 애널리틱스 연동
- [ ] Sentry 에러 모니터링 설정
- [ ] 지식 베이스 업데이트 가이드 작성 (README)

---

## 5. 비기능 요구사항

### 성능

- Lighthouse Performance 점수 90 이상
- LCP(Largest Contentful Paint) 2.5초 이하
- CLS(Cumulative Layout Shift) 0.1 이하

### 접근성

- WCAG 2.1 AA 기준 준수
- 키보드 네비게이션 지원
- 스크린 리더 호환 (`aria-label`, 시맨틱 HTML)

### 보안

- OpenAI API 키 서버사이드 전용 (`OPENAI_API_KEY` 환경 변수)
- HTTPS 강제 (Vercel 기본 제공)
- Content Security Policy 헤더 설정
- 챗봇 입력 길이 제한 (최대 500자)

### 비용 관리

| 항목            | 예상 월 비용                  |
| --------------- | ----------------------------- |
| Vercel (Hobby)  | $0 (트래픽 적을 때)           |
| PostgreSQL + pgvector | $0 (무료 티어 또는 셀프 호스팅) |
| OpenAI API      | $5–20 (방문자 수에 따라 변동) |
| 도메인          | ~$15/년                       |
| **합계**        | **$5–20/월**                  |

---

## 6. 콘텐츠 요구사항

배포 전 준비해야 할 콘텐츠 체크리스트:

- [ ] 헤드라인 카피 확정 (한국어 + 영어)
- [ ] 희망 연봉 공개 여부 결정
- [ ] 스킬별 숙련도 수치 정의 (`src/data/skills.json`)
- [ ] 경력 사항 정리 — 회사명, 기간, 성과 수치 포함 (`src/data/career.json`)
- [ ] 자격증 목록 및 인증 링크
- [ ] 프로필 사진 (정방형, 최소 400×400px, WebP)
- [ ] 이력서 PDF (다운로드용)
- [ ] RAG 지식 베이스 문서 작성 (최소 10개 Markdown 파일)
- [ ] 챗봇 추천 질문 목록 (3–5개)
- [ ] 각 외부 링크 URL 확정

---

## 7. 미결 사항 (Open Questions)

| #   | 질문                                                                | 우선순위 | 결정 필요 시점  |
| --- | ------------------------------------------------------------------- | -------- | --------------- |
| 1   | 희망 연봉을 실제 수치로 공개할 것인가, "협의"로 표시할 것인가?      | 높음     | Phase 1 완료 전 |
| 2   | 챗봇 언어를 한국어 전용으로 할 것인가, 영어도 지원할 것인가?        | 중간     | Phase 2 시작 전 |
| 3   | 도메인을 실명 기반(이름.dev)으로 할 것인가, 브랜드명으로 할 것인가? | 중간     | Phase 1 배포 전 |
| 4   | pgvector 인프라 배치 — 기존 PostgreSQL 확장 vs. 분리 DB?            | 낮음     | Phase 3 이후    |
| 5   | 다국어(한/영) 지원 범위 — 전체 페이지 vs. 챗봇만?                   | 낮음     | Phase 3         |

---

_이 문서는 개발 진행에 따라 지속적으로 업데이트됩니다._
