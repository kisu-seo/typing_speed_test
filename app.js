// --- State & Constants ---
let passagesData = null;
let currentPassage = '';
let currentPassageId = '';

let testState = {
  difficulty: 'hard', // 기본값 시안에 맞춰 hard로 변경
  mode: 'timed', // 'timed' | 'passage'
  isActive: false,
  isFinished: false,
  startTime: null,
  timerInterval: null,
  timeLeft: 60,
  elapsedTime: 0,
  currentIndex: 0,
  typedCharacters: [], // 각 인덱스마다 입력된 글자의 정오 상태 기록: { typed: string, correct: boolean }
  totalErrors: 0,
  correctCharsCount: 0
};

// 로컬 스토리지 키
const LOCAL_STORAGE_PB_KEY = 'typeDash_pb';

// DOM 요소 참조
const pbWpmEl = document.getElementById('pb-wpm');
const liveWpmEl = document.getElementById('live-wpm');
const liveAccuracyEl = document.getElementById('live-accuracy');
const liveTimeEl = document.getElementById('live-time');
const passageContainer = document.getElementById('passage-container');
const hiddenInput = document.getElementById('hidden-input');
const restartBtn = document.getElementById('restart-btn');

// 시작 오버레이 관련 요소
const passageOuterContainer = document.getElementById('passage-outer-container');
const startTestBtn = document.getElementById('start-test-btn');
const passageOverlay = document.getElementById('passage-overlay');

// 결과 화면 요소
const resultsScreen = document.getElementById('results-screen');
const typingArena = document.getElementById('typing-arena');
const resultWpmEl = document.getElementById('result-wpm');
const resultAccuracyEl = document.getElementById('result-accuracy');
const resultCorrectCharsEl = document.getElementById('result-correct-chars');
const resultIncorrectCharsEl = document.getElementById('result-incorrect-chars');
const resultsMessageEl = document.getElementById('results-message');
const resultsTitleEl = document.getElementById('results-title');
const goAgainBtn = document.getElementById('go-again-btn');

// 드롭다운 셀렉트 박스 (커스텀 listbox)
const difficultyTrigger = document.getElementById('difficulty-trigger');
const difficultyListbox = document.getElementById('difficulty-listbox');
const modeTrigger = document.getElementById('mode-trigger');
const modeListbox = document.getElementById('mode-listbox');

// --- Initialize Application ---
async function init() {
  try {
    const response = await fetch('./data.json');
    if (!response.ok) throw new Error('지문 데이터를 로드할 수 없습니다.');
    passagesData = await response.json();
    
    setupEventListeners();
    loadPersonalBest();
    resetTest();
  } catch (error) {
    console.error('초기화 에러:', error);
    passageContainer.innerHTML = `<span class="text-red">데이터 로드에 실패했습니다. 서버 상태를 확인해 주세요.</span>`;
  }
}

// --- LocalStorage Logic ---
function loadPersonalBest() {
  const pb = localStorage.getItem(LOCAL_STORAGE_PB_KEY);
  if (pb !== null) {
    pbWpmEl.textContent = `${pb} WPM`;
  } else {
    pbWpmEl.textContent = '0 WPM';
  }
}

function getPersonalBest() {
  const pb = localStorage.getItem(LOCAL_STORAGE_PB_KEY);
  return pb !== null ? parseInt(pb, 10) : 0;
}

function savePersonalBest(newWpm) {
  localStorage.setItem(LOCAL_STORAGE_PB_KEY, newWpm.toString());
  pbWpmEl.textContent = `${newWpm} WPM`;
}

// --- Core Helper Functions ---
function getRandomPassage(difficulty) {
  if (!passagesData || !passagesData[difficulty]) return '';
  const list = passagesData[difficulty];
  const randomIndex = Math.floor(Math.random() * list.length);
  currentPassageId = list[randomIndex].id;
  return list[randomIndex].text;
}

function renderPassageText() {
  passageContainer.innerHTML = '';
  const text = currentPassage;
  
  for (let i = 0; i < text.length; i++) {
    const span = document.createElement('span');
    span.textContent = text[i];
    span.className = 'char';
    if (i === 0) {
      span.classList.add('current-cursor');
    }
    passageContainer.appendChild(span);
  }
  
  // 스크롤 초기화
  passageContainer.scrollTop = 0;
}

// 시간 포맷팅 헬퍼 함수
function formatTime(seconds, isTimedMode) {
  if (isTimedMode) {
    // 60초 타이머인 경우 시안에 맞추어 0:60, 0:59, 0:58 형태로 노출
    return `0:${seconds.toString().padStart(2, '0')}`;
  } else {
    // passage 모드는 분:초 포맷으로 누적 카운트업
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  }
}

// --- State Modifiers / Game Flow ---
function resetTest() {
  // 타이머 중지 및 초기화
  clearInterval(testState.timerInterval);
  
  testState.isActive = false;
  testState.isFinished = false;
  testState.startTime = null;
  testState.currentIndex = 0;
  testState.typedCharacters = [];
  testState.totalErrors = 0;
  testState.correctCharsCount = 0;
  
  // 지문 설정
  currentPassage = getRandomPassage(testState.difficulty);
  renderPassageText();
  
  // 인풋 초기화
  hiddenInput.value = '';
  
  // 실시간 수치 초기화
  liveWpmEl.textContent = '0';
  liveAccuracyEl.textContent = '100%';
  
  if (testState.mode === 'timed') {
    testState.timeLeft = 60;
    liveTimeEl.textContent = '0:60';
  } else {
    testState.elapsedTime = 0;
    liveTimeEl.textContent = '0:00';
  }
  
  // 오버레이 및 인터페이스 복원
  passageOuterContainer.classList.add('not-started');
  typingArena.classList.remove('hidden');
  resultsScreen.classList.add('hidden');
}

function startTest() {
  testState.isActive = true;
  testState.startTime = new Date();
  
  if (testState.mode === 'timed') {
    testState.timerInterval = setInterval(updateTimedMode, 1000);
  } else {
    testState.timerInterval = setInterval(updatePassageMode, 1000);
  }
}

function updateTimedMode() {
  testState.timeLeft--;
  liveTimeEl.textContent = formatTime(testState.timeLeft, true);
  
  // 매초 실시간 통계 업데이트
  updateLiveStats();
  
  if (testState.timeLeft <= 0) {
    endTest();
  }
}

function updatePassageMode() {
  testState.elapsedTime++;
  liveTimeEl.textContent = formatTime(testState.elapsedTime, false);
  
  // 매초 실시간 통계 업데이트
  updateLiveStats();
}

function updateLiveStats() {
  if (!testState.startTime) return;
  
  const elapsedMinutes = (new Date() - testState.startTime) / 60000;
  if (elapsedMinutes <= 0) return;
  
  // WPM 계산: (올바른 문자수 / 5) / 경과 시간(분)
  const wpm = Math.round((testState.correctCharsCount / 5) / elapsedMinutes);
  liveWpmEl.textContent = wpm.toString();
  
  // 정확도 계산: (올바른 문자수 / 총 입력 시도) * 100
  const totalTypedAttempts = testState.correctCharsCount + testState.totalErrors;
  const accuracy = totalTypedAttempts > 0 
    ? Math.round((testState.correctCharsCount / totalTypedAttempts) * 100) 
    : 100;
    
  liveAccuracyEl.textContent = `${accuracy}%`;
}

function handleTypingInput(e) {
  if (testState.isFinished) return;
  
  const inputValue = e.target.value;
  
  // 사용자가 아직 첫 자를 치기 전이면 테스트 시작
  if (!testState.isActive) {
    startTest();
  }
  
  const spanElements = passageContainer.querySelectorAll('.char');
  const targetLength = currentPassage.length;
  
  // 백스페이스 및 키 입력 감지 처리
  if (inputValue.length < testState.currentIndex) {
    // 1) 백스페이스 처리 (입력 글자수가 줄어들었을 때)
    const diff = testState.currentIndex - inputValue.length;
    for (let i = 0; i < diff; i++) {
      testState.currentIndex--;
      const idx = testState.currentIndex;
      
      // 해당 문자의 스타일 제거
      spanElements[idx].className = 'char';
      
      // 지워지는 문자가 맞았던 글자였다면 올바른 글자수 차감
      if (testState.typedCharacters[idx] && testState.typedCharacters[idx].correct) {
        testState.correctCharsCount = Math.max(0, testState.correctCharsCount - 1);
      }
      
      testState.typedCharacters.pop();
    }
  } else {
    // 2) 일반 글자 입력 처리 (입력 글자수가 늘어났을 때)
    const addedText = inputValue.substring(testState.currentIndex);
    
    for (let i = 0; i < addedText.length; i++) {
      const idx = testState.currentIndex;
      if (idx >= targetLength) break;
      
      const typedChar = addedText[i];
      const targetChar = currentPassage[idx];
      const isCorrect = typedChar === targetChar;
      
      // 오타 판정 기록
      testState.typedCharacters[idx] = { typed: typedChar, correct: isCorrect };
      
      spanElements[idx].classList.remove('current-cursor');
      if (isCorrect) {
        spanElements[idx].classList.add('correct');
        testState.correctCharsCount++;
      } else {
        spanElements[idx].classList.add('incorrect');
        testState.totalErrors++;
      }
      
      testState.currentIndex++;
    }
  }
  
  // 커서 하이라이트 조정 및 스크롤 포커싱
  spanElements.forEach((span, i) => {
    span.classList.remove('current-cursor');
    if (i === testState.currentIndex) {
      span.classList.add('current-cursor');
      
      // 자동 스크롤 제어: 커서가 화면 영역을 벗어나는 것을 예방
      const containerHeight = passageContainer.clientHeight;
      const spanOffsetTop = span.offsetTop;
      const spanHeight = span.clientHeight;
      
      // 커서 위치가 지문 컨테이너 아래쪽에 오면 스크롤 조정
      if (spanOffsetTop + spanHeight > passageContainer.scrollTop + containerHeight - 20) {
        passageContainer.scrollTop = spanOffsetTop - containerHeight + 60;
      } else if (spanOffsetTop < passageContainer.scrollTop + 20) {
        passageContainer.scrollTop = Math.max(0, spanOffsetTop - 20);
      }
    }
  });
  
  // 실시간 수치 업데이트
  updateLiveStats();
  
  // Passage 모드인 경우 지문을 다 쳤고 오타가 하나도 안 남은 시점에서 끝내거나 전체 완료 여부 판정
  if (testState.mode === 'passage' && testState.currentIndex >= targetLength) {
    const allCorrect = testState.typedCharacters.every(item => item && item.correct);
    if (allCorrect) {
      endTest();
    }
  }
}

function endTest() {
  testState.isActive = false;
  testState.isFinished = true;
  clearInterval(testState.timerInterval);
  
  // 최종 WPM 및 정확도 산정
  let elapsedMinutes = 1;
  if (testState.startTime) {
    elapsedMinutes = (new Date() - testState.startTime) / 60000;
  }
  if (elapsedMinutes <= 0) elapsedMinutes = 0.01;
  
  const finalWpm = Math.round((testState.correctCharsCount / 5) / elapsedMinutes);
  
  const totalTypedAttempts = testState.correctCharsCount + testState.totalErrors;
  const finalAccuracy = totalTypedAttempts > 0 
    ? Math.round((testState.correctCharsCount / totalTypedAttempts) * 100) 
    : 0;
    
  // 결과 수치 주입
  resultWpmEl.textContent = finalWpm;
  resultAccuracyEl.textContent = `${finalAccuracy}%`;
  resultCorrectCharsEl.textContent = testState.correctCharsCount;
  resultIncorrectCharsEl.textContent = testState.totalErrors;
  
  // 최고 기록(Personal Best) 점검
  const currentPb = getPersonalBest();
  const isFirst = localStorage.getItem(LOCAL_STORAGE_PB_KEY) === null;
  
  if (isFirst) {
    savePersonalBest(finalWpm);
    resultsTitleEl.textContent = 'Baseline Established!';
    resultsMessageEl.textContent = `Your starting personal best is set at ${finalWpm} WPM. Keep practicing to beat it!`;
  } else if (finalWpm > currentPb) {
    savePersonalBest(finalWpm);
    resultsTitleEl.textContent = 'High Score Smashed!';
    resultsMessageEl.textContent = `Amazing! You destroyed your previous personal best of ${currentPb} WPM.`;
    triggerConfetti();
  } else {
    resultsTitleEl.textContent = 'Test Complete!';
    resultsMessageEl.textContent = `Solid run. Keep pushing to beat your personal best of ${currentPb} WPM.`;
  }
  
  // 스크린 교체
  typingArena.classList.add('hidden');
  resultsScreen.classList.remove('hidden');
}

// --- Confetti Celebration Effect ---
function triggerConfetti() {
  if (typeof confetti === 'function') {
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#177DFF', '#4CA6FF', '#F4DC73', '#4DD67B']
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#177DFF', '#4CA6FF', '#F4DC73', '#4DD67B']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }
}

// 커스텀 드롭다운(listbox) 동작 설정
function setupDropdown(trigger, listbox, getValue, setValue, confirmMessage) {
  function close() {
    listbox.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
  }
  function open() {
    listbox.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
  }
  trigger.addEventListener('click', () => {
    if (listbox.hidden) open(); else close();
  });
  listbox.addEventListener('click', (e) => {
    const option = e.target.closest('li[role="option"]');
    if (!option) return;
    const newValue = option.dataset.value;
    if (newValue === getValue()) {
      close();
      return;
    }
    if (testState.isActive && !confirm(confirmMessage)) {
      close();
      return;
    }
    listbox.querySelectorAll('li').forEach((li) => {
      const selected = li === option;
      li.setAttribute('aria-selected', String(selected));
      li.tabIndex = selected ? 0 : -1;
      li.querySelector('.radio-dot').classList.toggle('filled', selected);
    });
    trigger.querySelector('.select-trigger-label').textContent = option.textContent.trim();
    setValue(newValue);
    close();
    resetTest();
  });
  document.addEventListener('click', (e) => {
    if (!trigger.contains(e.target) && !listbox.contains(e.target)) close();
  });
  trigger.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

// --- Event Handlers & Setups ---
function setupEventListeners() {
  // 난이도 드롭다운
  setupDropdown(
    difficultyTrigger,
    difficultyListbox,
    () => testState.difficulty,
    (value) => { testState.difficulty = value; },
    '현재 테스트가 진행 중입니다. 난이도를 변경하고 다시 시작하시겠습니까?'
  );

  // 모드 드롭다운
  setupDropdown(
    modeTrigger,
    modeListbox,
    () => testState.mode,
    (value) => { testState.mode = value; },
    '현재 테스트가 진행 중입니다. 모드를 변경하고 다시 시작하시겠습니까?'
  );

  // 오버레이 및 지문 클릭 시 블러 제거 및 타이핑 활성화
  const deactivateOverlay = () => {
    if (passageOuterContainer.classList.contains('not-started')) {
      passageOuterContainer.classList.remove('not-started');
    }
    hiddenInput.focus();
  };

  passageOverlay.addEventListener('click', deactivateOverlay);
  startTestBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // 오버레이 전파 방지
    deactivateOverlay();
  });

  passageContainer.addEventListener('click', deactivateOverlay);
  passageContainer.addEventListener('focus', deactivateOverlay);
  
  hiddenInput.addEventListener('input', handleTypingInput);
  
  // 재시작 버튼
  restartBtn.addEventListener('click', () => {
    resetTest();
  });
  
  // 결과 화면의 다시 하기 버튼
  goAgainBtn.addEventListener('click', () => {
    resetTest();
  });
}

// 앱 구동 시작
document.addEventListener('DOMContentLoaded', init);
