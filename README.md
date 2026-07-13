# SaaS Portfolio

개발자를 SaaS 제품처럼 소개하는 개인 포트폴리오입니다.  
희망 연봉을 구독 플랜으로 표현하고, RAG 기반 AI 챗봇으로 방문자와 대화할 수 있습니다.

## Stack

- **Next.js** (App Router) · React · TypeScript · Tailwind CSS
- **AI SDK** + OpenAI (채팅 / 임베딩)
- **PostgreSQL** + pgvector (지식베이스)
- **Redis** (레이트 리밋)

## Getting Started

```bash
npm install
cp .env.example .env.local
```

`.env.local`에 API 키·DB·Redis URL을 채운 뒤:

```bash
npm run db:schema   # documents 테이블 + pgvector
npm run kb:reindex  # KB 청킹 & 인덱싱
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 확인합니다.

## Scripts

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 |
| `npm run build` / `start` | 프로덕션 빌드·실행 |
| `npm run db:schema` | DB 스키마 적용 |
| `npm run kb:reindex` | 지식베이스 재인덱싱 |
| `npm run kb:verify` | 검색 동작 검증 |

## Docs

- [PRD](docs/prd.md)
- [Tasks](docs/tasks.md)
- [OpenAPI](docs/openapi.yaml)
