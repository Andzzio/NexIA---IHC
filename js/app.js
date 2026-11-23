const views = document.querySelectorAll('.app-view');
const sidebarButtons = document.querySelectorAll('.sidebar-nav__btn');
const bottomNavButtons = document.querySelectorAll('.bottom-nav__btn');
const breadcrumbCurrent = document.getElementById('breadcrumbCurrent');
const appSidebar = document.getElementById('appSidebar');
const appSidebarToggle = document.getElementById('appSidebarToggle');
const desktopSidebarToggle = document.getElementById('desktopSidebarToggle');

function navigateToView(targetViewId) {
  let activeView = null;

  views.forEach((view) => {
    if (view.dataset.view === targetViewId) {
      view.classList.add('is-active');
      activeView = view;
    } else {
      view.classList.remove('is-active');
    }
  });

  if (!activeView) return;

  const activeGroup = activeView.dataset.group || 'inicio';
  const activeTitle = activeView.dataset.title || 'Inicio';

  if (breadcrumbCurrent) {
    breadcrumbCurrent.textContent = activeTitle;
  }

  sidebarButtons.forEach((btn) => {
    const isActive = btn.dataset.navGroup === activeGroup;
    btn.classList.toggle('is-active', isActive);
    if (isActive) {
      btn.setAttribute('aria-current', 'page');
    } else {
      btn.removeAttribute('aria-current');
    }
  });

  bottomNavButtons.forEach((btn) => {
    const isActive = btn.dataset.navGroup === activeGroup;
    btn.classList.toggle('is-active', isActive);
    if (isActive) {
      btn.setAttribute('aria-current', 'page');
    } else {
      btn.removeAttribute('aria-current');
    }
  });

  if (appSidebar) {
    appSidebar.classList.remove('is-open');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-nav-target]');
  if (!trigger) return;

  const targetViewId = trigger.dataset.navTarget;
  if (targetViewId) {
    navigateToView(targetViewId);
  }
});

if (appSidebarToggle && appSidebar) {
  appSidebarToggle.addEventListener('click', () => {
    appSidebar.classList.toggle('is-open');
  });
}

if (desktopSidebarToggle && appSidebar) {
  desktopSidebarToggle.addEventListener('click', () => {
    appSidebar.classList.toggle('is-collapsed');
  });
}

const selectFileBtn = document.getElementById('selectFileBtn');
const fileUploadInput = document.getElementById('fileUploadInput');
const selectedFileHint = document.getElementById('selectedFileHint');
const docBannerTitle = document.getElementById('docBannerTitle');

if (selectFileBtn && fileUploadInput) {
  selectFileBtn.addEventListener('click', () => {
    fileUploadInput.click();
  });

  fileUploadInput.addEventListener('change', () => {
    if (fileUploadInput.files && fileUploadInput.files.length > 0) {
      const fileName = fileUploadInput.files[0].name;
      if (selectedFileHint) {
        selectedFileHint.textContent = `Documento seleccionado: ${fileName}`;
      }
      if (docBannerTitle) {
        docBannerTitle.textContent = fileName;
      }
      navigateToView('documento-listo');
    }
  });
}

const librarySearch = document.getElementById('librarySearch');
const filterChips = document.querySelectorAll('.filter-chip');
const materialCards = document.querySelectorAll('.material-card');
const materialEmpty = document.getElementById('materialEmpty');
let currentFilter = 'todos';

function applyLibraryFilters() {
  const query = librarySearch ? librarySearch.value.trim().toLowerCase() : '';
  let visibleCount = 0;

  materialCards.forEach((card) => {
    const status = card.dataset.status || '';
    const searchable = card.dataset.search || '';
    const matchesStatus = currentFilter === 'todos' || status === currentFilter;
    const matchesQuery = !query || searchable.includes(query);
    const shouldShow = matchesStatus && matchesQuery;
    card.hidden = !shouldShow;
    if (shouldShow) visibleCount += 1;
  });

  if (materialEmpty) {
    materialEmpty.hidden = visibleCount > 0;
  }
}

filterChips.forEach((chip) => {
  chip.addEventListener('click', () => {
    filterChips.forEach((c) => c.classList.remove('is-active'));
    chip.classList.add('is-active');
    currentFilter = chip.dataset.filter || 'todos';
    applyLibraryFilters();
  });
});

if (librarySearch) {
  librarySearch.addEventListener('input', applyLibraryFilters);
}

const lessonTabs = document.querySelectorAll('[data-lesson-tab]');
const lessonPanels = document.querySelectorAll('[data-lesson-panel]');

lessonTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.lessonTab;
    document.querySelectorAll('.segmented-tab').forEach((btn) => {
      const active = btn.dataset.lessonTab === target;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-selected', String(active));
    });
    lessonPanels.forEach((panel) => {
      panel.classList.toggle('is-active', panel.dataset.lessonPanel === target);
    });
  });
});

const audioWaveform = document.getElementById('audioWaveform');
if (audioWaveform) {
  const heights = [28, 62, 40, 80, 50, 35, 70, 88, 45, 30, 66, 95, 72, 48, 82, 55, 40, 74, 92, 60, 44, 78, 52, 34, 68, 86, 42, 36, 72, 58, 46, 84, 62, 38, 70, 50, 32, 66, 80, 48, 36, 60, 76, 44, 30, 58, 72, 40, 34, 52, 64, 38, 48, 32];
  heights.forEach((h, index) => {
    const bar = document.createElement('span');
    bar.className = index < 21 ? 'wave-bar wave-bar--played' : 'wave-bar';
    bar.style.height = `${h}%`;
    audioWaveform.appendChild(bar);
  });
}

document.querySelectorAll('[data-play-toggle]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const paused = btn.classList.toggle('is-paused');
    btn.setAttribute('aria-label', paused ? 'Reproducir' : 'Pausar');
  });
});

document.querySelectorAll('.toggle-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const next = btn.getAttribute('aria-pressed') !== 'true';
    btn.setAttribute('aria-pressed', String(next));
  });
});

const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatLog = document.getElementById('chatLog');

if (chatForm && chatInput && chatLog) {
  chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = chatInput.value.trim();
    if (!message) return;

    const userBubble = document.createElement('p');
    userBubble.className = 'chat-bubble chat-bubble--user';
    userBubble.textContent = message;
    chatLog.appendChild(userBubble);

    chatInput.value = '';

    const replyBubble = document.createElement('p');
    replyBubble.className = 'chat-bubble chat-bubble--ai chat-bubble--mint';
    replyBubble.textContent = 'Buena pregunta. En POO, la clase hija hereda los métodos de la clase base y además puede sobrescribirlos para especializar su comportamiento.';
    chatLog.appendChild(replyBubble);

    chatLog.scrollTop = chatLog.scrollHeight;
  });
}

const quizOptions = document.querySelectorAll('.quiz-option');
const quizCheckBtn = document.getElementById('quizCheckBtn');
const quizResetBtn = document.getElementById('quizResetBtn');
const quizNextBtn = document.getElementById('quizNextBtn');
const quizFeedback = document.getElementById('quizFeedback');
const quizFeedbackTitle = document.getElementById('quizFeedbackTitle');
const quizFeedbackText = document.getElementById('quizFeedbackText');
const quizSubtitle = document.getElementById('quizSubtitle');
const quizNote = document.getElementById('quizNote');
const quizSideTitle = document.getElementById('quizSideTitle');
const quizSideDesc = document.getElementById('quizSideDesc');
const quizSideList = document.getElementById('quizSideList');
let selectedOption = null;
let quizEvaluated = false;

function resetQuizState() {
  selectedOption = null;
  quizEvaluated = false;

  quizOptions.forEach((opt) => {
    opt.classList.remove('is-selected', 'is-correct', 'is-wrong');
    opt.setAttribute('aria-checked', 'false');
    const mark = opt.querySelector('.quiz-option__mark');
    if (mark) mark.textContent = '';
  });

  if (quizFeedback) {
    quizFeedback.hidden = true;
    quizFeedback.classList.remove('quiz-feedback--error', 'quiz-feedback--success');
  }
  if (quizCheckBtn) {
    quizCheckBtn.hidden = false;
    quizCheckBtn.disabled = true;
  }
  if (quizResetBtn) quizResetBtn.hidden = true;
  if (quizNextBtn) quizNextBtn.hidden = true;
  if (quizSubtitle) quizSubtitle.textContent = 'Herencia y polimorfismo · Pon a prueba lo que sabes.';
  if (quizNote) quizNote.textContent = 'Tu respuesta te ayudará a encontrar qué conceptos reforzar.';
  if (quizSideTitle) quizSideTitle.textContent = 'Demuéstrate lo que sabes';
  if (quizSideDesc) quizSideDesc.textContent = 'Piensa en cómo se relacionan una clase base y sus clases hijas.';
  if (quizSideList) {
    quizSideList.innerHTML = '<li><span class="check-circle" aria-hidden="true">✓</span><span>Lee cada alternativa con atención</span></li><li><span class="check-circle" aria-hidden="true">✓</span><span>Conecta con lo que acabas de estudiar</span></li><li><span class="check-circle" aria-hidden="true">✓</span><span>No hay límite de tiempo</span></li>';
  }
}

quizOptions.forEach((opt) => {
  opt.addEventListener('click', () => {
    if (quizEvaluated) return;
    quizOptions.forEach((item) => {
      item.classList.remove('is-selected');
      item.setAttribute('aria-checked', 'false');
    });
    opt.classList.add('is-selected');
    opt.setAttribute('aria-checked', 'true');
    selectedOption = opt;
    if (quizCheckBtn) quizCheckBtn.disabled = false;
  });
});

if (quizCheckBtn) {
  quizCheckBtn.addEventListener('click', () => {
    if (!selectedOption || quizEvaluated) return;
    quizEvaluated = true;

    const isCorrect = selectedOption.dataset.correct === 'true';

    quizOptions.forEach((opt) => {
      opt.classList.remove('is-selected');
      const mark = opt.querySelector('.quiz-option__mark');
      if (opt.dataset.correct === 'true') {
        opt.classList.add('is-correct');
        if (mark) mark.textContent = '✓';
      }
    });

    if (!isCorrect) {
      selectedOption.classList.add('is-wrong');
      const wrongMark = selectedOption.querySelector('.quiz-option__mark');
      if (wrongMark) wrongMark.textContent = '·';

      if (quizFeedback && quizFeedbackTitle && quizFeedbackText) {
        quizFeedback.hidden = false;
        quizFeedback.classList.add('quiz-feedback--error');
        quizFeedbackTitle.textContent = 'ⓘ Respuesta incorrecta';
        quizFeedbackText.textContent = 'La herencia no elimina objetos. Permite reutilizar los atributos y métodos de otra clase.';
      }
      if (quizSubtitle) quizSubtitle.textContent = 'Herencia y polimorfismo · Cada intento es una oportunidad para aprender.';
      if (quizNote) quizNote.textContent = 'Concepto a reforzar: Herencia';
      if (quizSideTitle) quizSideTitle.textContent = 'Equivocarse también es aprender';
      if (quizSideDesc) quizSideDesc.textContent = 'Revisa la explicación, conecta la idea con un ejemplo y vuelve a intentarlo.';
      if (quizSideList) {
        quizSideList.innerHTML = '<li><span class="check-circle" aria-hidden="true">✓</span><span>Comprende el porqué de tu respuesta</span></li><li><span class="check-circle" aria-hidden="true">✓</span><span>Identifica el concepto por reforzar</span></li><li><span class="check-circle" aria-hidden="true">✓</span><span>Continúa con tu siguiente pregunta</span></li>';
      }
    } else if (quizFeedback && quizFeedbackTitle && quizFeedbackText) {
      quizFeedback.hidden = false;
      quizFeedback.classList.add('quiz-feedback--success');
      quizFeedbackTitle.textContent = '✓ Respuesta correcta';
      quizFeedbackText.textContent = 'Exacto. La herencia permite que una clase hija reutilice atributos y métodos de su clase base.';
    }

    quizCheckBtn.hidden = true;
    if (quizResetBtn) quizResetBtn.hidden = false;
    if (quizNextBtn) quizNextBtn.hidden = false;
  });
}

if (quizResetBtn) {
  quizResetBtn.addEventListener('click', resetQuizState);
}

const practiceOptions = document.querySelectorAll('#practiceOptions .quiz-option');
practiceOptions.forEach((opt) => {
  opt.addEventListener('click', () => {
    practiceOptions.forEach((item) => {
      item.classList.remove('is-selected');
      item.setAttribute('aria-checked', 'false');
    });
    opt.classList.add('is-selected');
    opt.setAttribute('aria-checked', 'true');
  });
});

const flashcardsData = [
  {
    question: '¿Qué es la herencia en programación orientada a objetos?',
    hint: 'Piensa en lo que una clase puede recibir de otra.',
    answer: 'Es el mecanismo que permite a una clase hija reutilizar atributos y métodos de una clase base.'
  },
  {
    question: '¿Qué ventaja aporta el polimorfismo?',
    hint: 'Piensa en cómo un mismo método puede responder distinto.',
    answer: 'Permite que distintas clases respondan al mismo método con comportamientos propios.'
  },
  {
    question: '¿Qué relación existe entre Vehículo y Auto?',
    hint: 'Identifica cuál es la clase base y cuál hereda.',
    answer: 'Vehículo es la clase base y Auto es la clase hija que hereda moverse().'
  }
];

let flashcardIndex = 0;
let flashcardFlipped = false;

const flashcardCard = document.getElementById('flashcardCard');
const flashcardText = document.getElementById('flashcardText');
const flashcardHint = document.getElementById('flashcardHint');
const flashcardFlipBtn = document.getElementById('flashcardFlipBtn');
const flashcardCaption = document.getElementById('flashcardCaption');
const flashcardCounter = document.getElementById('flashcardCounter');
const flashcardPill = document.getElementById('flashcardPill');
const flashcardBars = document.querySelectorAll('#flashcardBars span');
const flashcardPrevBtn = document.getElementById('flashcardPrevBtn');
const flashcardNextBtn = document.getElementById('flashcardNextBtn');

function renderFlashcard() {
  const item = flashcardsData[flashcardIndex];
  if (!item || !flashcardText) return;

  flashcardCard.classList.toggle('is-flipped', flashcardFlipped);
  flashcardText.textContent = flashcardFlipped ? item.answer : item.question;
  flashcardHint.textContent = flashcardFlipped ? 'Respuesta clave del concepto.' : item.hint;
  flashcardFlipBtn.textContent = flashcardFlipped ? 'Ver pregunta' : 'Ver respuesta';
  flashcardCaption.textContent = flashcardFlipped ? 'Haz clic para volver a la pregunta' : 'Haz clic para ver la respuesta';
  flashcardCounter.textContent = `0${flashcardIndex + 1} / 0${flashcardsData.length}`;
  flashcardPill.textContent = `Tarjeta ${flashcardIndex + 1} de ${flashcardsData.length}`;

  flashcardBars.forEach((bar, i) => {
    bar.classList.toggle('is-filled', i <= flashcardIndex);
  });
}

if (flashcardFlipBtn) {
  flashcardFlipBtn.addEventListener('click', () => {
    flashcardFlipped = !flashcardFlipped;
    renderFlashcard();
  });
}

if (flashcardPrevBtn) {
  flashcardPrevBtn.addEventListener('click', () => {
    if (flashcardIndex > 0) {
      flashcardIndex -= 1;
      flashcardFlipped = false;
      renderFlashcard();
    }
  });
}

if (flashcardNextBtn) {
  flashcardNextBtn.addEventListener('click', () => {
    if (flashcardIndex < flashcardsData.length - 1) {
      flashcardIndex += 1;
      flashcardFlipped = false;
      renderFlashcard();
    } else {
      navigateToView('repaso-simulacion');
    }
  });
}

const savedSearch = document.getElementById('savedSearch');
const savedFilterChips = document.querySelectorAll('.saved-filter-chip');
const savedCards = document.querySelectorAll('.saved-card');
const savedCount = document.getElementById('savedCount');
let currentSavedFilter = 'todos';

function applySavedFilters() {
  const query = savedSearch ? savedSearch.value.trim().toLowerCase() : '';
  let count = 0;

  savedCards.forEach((card) => {
    const type = card.dataset.savedType || '';
    const text = card.dataset.savedSearch || '';
    const matchType = currentSavedFilter === 'todos' || type === currentSavedFilter;
    const matchText = !query || text.includes(query);
    const visible = matchType && matchText;
    card.hidden = !visible;
    if (visible) count += 1;
  });

  if (savedCount) {
    savedCount.textContent = count === 1 ? '1 contenido' : `${count} contenidos`;
  }
}

savedFilterChips.forEach((chip) => {
  chip.addEventListener('click', () => {
    savedFilterChips.forEach((c) => c.classList.remove('is-active'));
    chip.classList.add('is-active');
    currentSavedFilter = chip.dataset.savedFilter || 'todos';
    applySavedFilters();
  });
});

if (savedSearch) {
  savedSearch.addEventListener('input', applySavedFilters);
}
