# VC성형외과 웨딩 리프팅 랜딩: 수정 가이드

> 담당 퍼블리싱: 염은빈 매니저 · 1차 뼈대: Claude (2026-09-14)
> 빌드 과정 없는 순수 HTML이라, 파일을 고치고 저장하면 끝입니다.

## 폴더 구조

```
vc-wedding-landing/
├─ index.html      ← 글자·섹션 순서 (S1~S9 주석으로 구분)
├─ css/style.css   ← 디자인. 맨 위 「디자인 값」에서 색·여백
├─ js/main.js      ← 카톡 주소, D-데이 문구, 탭 동작
├─ images/         ← 사진 (같은 이름으로 덮어쓰면 교체)
├─ fonts/          ← Pretendard (건드리지 않음)
└─ README.md
```

## 자주 하는 수정

| 하고 싶은 것 | 파일 | 방법 |
|---|---|---|
| 문구 바꾸기 | index.html | `S1`~`S11` 주석을 찾아 글자만 수정 |
| 노란 [확인필요] 없애기 | index.html | 내용을 넣고 `class="todo"` 를 지운다 |
| 카톡 채널 연결 | js/main.js | 맨 위 `KAKAO_URL` 한 줄 (지금은 홈페이지 채널 연결됨) |
| 진단 결과 문구 | js/main.js | `COURSE_TEXT` |
| 사례 추가 | index.html S7 | `<figure class="case" data-cat="line">` 한 덩어리 복사 (line/day/firm) |
| D-데이 안내 문구 | js/main.js | `ddayMessage` 안의 문장 |
| 가격 | index.html | S9 `000,000원` |
| 색 | css/style.css | 맨 위 `:root` 값 |
| 사진 교체 | images/ | 같은 파일명으로 덮어쓰기 |

## 섹션 순서 (index.html 주석 번호)

S1 첫 화면 → S2 이런 분께(3타입) → S3 30초 진단 → S4 장비 원리 → S5 원장 → S6 공간·에스테틱 → S7 사례(3타입×3) → S8 중요한 날 D-데이 → S9 가격 → S10 FAQ → S11 마지막 버튼

## 사진: 전부 AI 예시입니다

- `class="ai-sample"` 이 붙은 사진은 오른쪽 위에 「AI 예시」 표시가 뜹니다. 실제 사진으로 바꾸면 class 를 지웁니다.
- 사례(c-line-*, c-day-*, c-firm-*)는 **반드시 병원 동의 사진으로 교체**합니다. AI 전후사진으로 오픈 금지(의료법).
- 공간(s6-*)도 병원 실제 사진으로 교체합니다. AI 공간을 「우리 병원」으로 쓰면 안 됩니다.
- 원장 사진은 S5 `photo-wait` 칸을 `<img src="images/doctor.jpg" alt="최민석 원장">` 으로 바꿉니다.

## 오픈 전 반드시 지울 것

1. `<meta name="robots" content="noindex,nofollow">` 한 줄
2. `<div class="draft-bar">` 빨간 안내 띠
3. 노란 `todo` 칸 전부

## 쓰면 안 되는 표현 (광고·의료법)

다운타임 없음 · 즉각 효과 · 온다/티타늄 업그레이드 · 근막리프팅 · 완벽 · 100% · 부작용 없음

## 탭 원리 (구조 바꿀 때만)

- 코스: 첫 화면 탭 `data-course="line|firm"` ↔ S9 가격 카드 같은 값에 테두리. 진단 결과도 같은 값을 선택
- 사례: S7 탭 `data-cat="line|day|firm"` ↔ `figure.case` 같은 값만 보임. S2 「사례 보기」 링크도 같은 값

## 작업 방법 (GitHub Desktop 기준)

1. 처음 한 번: GitHub Desktop 설치 → 로그인 → `File > Clone repository` → `timeofpassion/vc-landing`
2. VS Code로 폴더 열기 → 수정 → 크롬으로 `index.html` 열어 확인 (PC + 개발자도구 모바일 390px)
3. GitHub Desktop 왼쪽 아래 Summary에 **무엇을 고쳤는지 한 줄** (예: 「원장 사진 교체」) → `Commit to main` → `Push origin`
4. 1분 뒤 https://vc-wedding-landing.vercel.app 새로고침으로 반영 확인
5. **완료 = PC·모바일 캡처 2장**을 인트라넷 업무 댓글 또는 슬랙에 첨부

- 잘못 올렸으면 GitHub Desktop `History` 에서 그 커밋 우클릭 → `Revert` (지우지 말고 되돌리기)
- 막히면 캡처 찍어서 대표 또는 Claude에게

## 확인·배포

- 확인: `index.html` 을 크롬으로 열기 → PC 폭 + 개발자도구 모바일(390px) 둘 다 보기
- 배포: 따로 할 것 없음. main 에 Push 하면 자동 배포
- 완료 기준 = 수정 후 **PC·모바일 캡처 2장**을 슬랙에 첨부
