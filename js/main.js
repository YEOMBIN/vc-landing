/* ============================================================
   설정 — 여기만 바꾸면 페이지 전체에 반영됩니다
   ============================================================ */
const KAKAO_URL = 'http://pf.kakao.com/_YVGfX'; // VC성형외과 카톡 채널 (홈페이지 기준) [확인필요: 광고용 채널 동일 여부]

// 중요한 날까지 남은 날에 따른 안내 문구 [확인필요: 원장 기준으로 교체]
function ddayMessage(d, label) {
  if (d < 0) return '이미 지난 날짜예요. 날짜를 다시 확인해 주세요.';
  if (d > 45) return `${label}까지 D-${d}. 여유 있어요. D-30 전후로 시작하시면 됩니다.`;
  if (d >= 21) return `${label}까지 D-${d}. 지금 시작하기 딱 좋은 시기예요.`;
  if (d >= 8) return `${label}까지 D-${d}. 이번 주 안에 상담을 권해드려요.`;
  return `${label}까지 D-${d}. 가능 여부는 상담으로 먼저 확인해 주세요.`;
}

// 30초 진단 결과 문구
const COURSE_TEXT = {
  line: { name: '라인 정리 코스', devices: '파인웨이브 + 파셀라', why: '턱선·부피감 정리에 초점을 둔 조합입니다.' },
  firm: { name: '탄력·결 코스', devices: '포트라 + 파셀라', why: '탄력과 피부결을 함께 보는 조합입니다.' },
};

/* ---------- 카톡 버튼 연결 ---------- */
document.querySelectorAll('.js-kakao').forEach(a => { a.href = KAKAO_URL; a.target = '_blank'; a.rel = 'noopener'; });

/* ---------- 빠른 스크롤 (기본 smooth보다 짧고 빠르게) ---------- */
function fastScrollTo(el, duration = 350) {
  const startY = window.scrollY;
  const targetY = startY + el.getBoundingClientRect().top;
  const distance = targetY - startY;
  const startTime = performance.now();
  function step(now) {
    const t = Math.min((now - startTime) / duration, 1);
    const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    window.scrollTo({ top: startY + distance * eased, behavior: 'instant' });
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ---------- 코스 선택 (첫 화면 탭 · 진단 결과 공용) ---------- */
function selectCourse(course) {
  document.querySelectorAll('.tabs__btn').forEach(b => b.classList.toggle('is-on', b.dataset.course === course));
  document.querySelectorAll('.price').forEach(el => el.classList.toggle('is-on', el.dataset.course === course));
}
document.querySelectorAll('.tabs__btn').forEach(btn => btn.addEventListener('click', () => {
  selectCourse(btn.dataset.course);
  document.querySelectorAll('.tabs__btn').forEach(b => b.classList.toggle('was-clicked', b === btn));
  fastScrollTo(document.getElementById('price'));
}));
document.querySelectorAll('.tabs__btn').forEach(btn => {
  const preview = document.querySelector(`.tabs__preview[data-preview="${btn.dataset.course}"]`);
  if (!preview) return;
  btn.addEventListener('mouseenter', () => preview.classList.add('is-open'));
  btn.addEventListener('mouseleave', () => preview.classList.remove('is-open'));
});

/* ---------- 사례 탭 (3타입) ---------- */
function selectCat(cat) {
  document.querySelectorAll('.cat-tabs button').forEach(b => b.classList.toggle('is-on', b.dataset.cat === cat));
  document.querySelectorAll('.case').forEach(f => { f.hidden = f.dataset.cat !== cat; });
}
document.querySelectorAll('.cat-tabs button').forEach(b => b.addEventListener('click', () => selectCat(b.dataset.cat)));
document.querySelectorAll('.persona__go').forEach(a => a.addEventListener('click', () => selectCat(a.dataset.cat)));

/* ---------- 30초 진단 ---------- */
const quiz = document.getElementById('quizForm');
quiz.addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(quiz);
  const course = f.get('q1');
  const c = COURSE_TEXT[course];
  const soon = f.get('q2') === 'soon' ? ' 일정이 한 달 안이라면 이번 주 상담을 권해드려요.' : '';
  const box = document.getElementById('quizResult');
  box.innerHTML = `<button type="button" class="quiz__reset" aria-label="다시 진단하기">↻</button><b>${c.name}</b><p>${c.devices} · ${c.why}${soon}</p><a class="btn btn--kakao quiz__result-cta" href="${KAKAO_URL}" target="_blank" rel="noopener">이 결과로 카톡 상담</a>`;
  box.querySelector('.quiz__reset').addEventListener('click', () => {
    quiz.reset();
    box.hidden = true;
    box.innerHTML = '';
    setCta('카톡으로 무료 상담');
  });
  box.hidden = false;
  selectCourse(course);
  setCta(`${c.name} 카톡 상담`);
});

/* ---------- D-데이 ---------- */
let eventLabel = '결혼식';
const input = document.getElementById('weddingDate');
const result = document.getElementById('ddayResult');
const steps = document.querySelectorAll('.timeline li');
function renderDday() {
  if (!input.value) return;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const d = Math.round((new Date(input.value + 'T00:00:00') - today) / 86400000);
  result.textContent = ddayMessage(d, eventLabel);
  const now = d >= 21 ? 0 : d >= 8 ? 1 : 2;
  steps.forEach((li, i) => li.classList.toggle('is-now', d >= 0 && i === now));
  if (d >= 0) setCta(`D-${d} 일정 카톡으로 받기`);
}
document.querySelectorAll('.chips button').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('.chips button').forEach(x => x.classList.toggle('is-on', x === b));
  eventLabel = b.textContent;
  document.getElementById('eventLabel').textContent = eventLabel;
  renderDday();
}));
input.addEventListener('change', renderDday);

/* ---------- 하단 고정 버튼: 문구가 행동에 따라 바뀜 ---------- */
const stickyCta = document.getElementById('stickyCta');
function setCta(text) { stickyCta.querySelector('.btn__label').textContent = text; }
const sticky = document.querySelector('.sticky');
new IntersectionObserver(([e]) => sticky.classList.toggle('is-show', !e.isIntersecting)).observe(document.querySelector('.hero'));

/* ---------- 스크롤 등장 ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
}, { threshold: 0.2 });
document.querySelectorAll('.sec h2, .persona, .tech, .split__media, .timeline, .prices, .skin').forEach(el => {
  if (!el.classList.contains('skin')) el.classList.add('reveal');
  io.observe(el);
});

/* ---------- 우측 사이드바 · 모바일 TOP 버튼 ---------- */
document.querySelectorAll('#sideTop, #mobileTop').forEach(btn => btn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}));
