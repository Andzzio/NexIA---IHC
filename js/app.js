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

  if (targetViewId === 'autoevaluacion' && typeof quizStartTime !== 'undefined') {
    quizStartTime = Date.now();
    quizClickTimestamps = [];
  }

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
const quizHintBtn = document.getElementById('quizHintBtn');
const quizHintBox = document.getElementById('quizHintBox');
const reflectionTitle = document.getElementById('reflectionTitle');
const reflectionBadge = document.getElementById('reflectionBadge');
const reflectionDetail = document.getElementById('reflectionDetail');

let selectedOption = null;
let quizEvaluated = false;
let quizStartTime = Date.now();
let quizClickTimestamps = [];
let quizUsedHint = false;
let quizAttemptCount = 0;

if (quizHintBtn && quizHintBox) {
  quizHintBtn.addEventListener('click', () => {
    quizUsedHint = true;
    quizHintBox.hidden = false;
    quizHintBtn.disabled = true;
    quizHintBtn.textContent = 'Pista activada';
  });
}

function resetQuizState() {
  selectedOption = null;
  quizEvaluated = false;
  quizStartTime = Date.now();
  quizClickTimestamps = [];
  quizAttemptCount += 1;

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
    const now = Date.now();
    quizClickTimestamps = quizClickTimestamps.filter((ts) => now - ts < 5000);
    quizClickTimestamps.push(now);

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

    const elapsedSec = (Date.now() - quizStartTime) / 1000;
    const rapidGuessing = quizClickTimestamps.length >= 3 || elapsedSec < 3;
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
        quizFeedbackText.textContent = rapidGuessing
          ? 'Respondiste muy rápido. Te recomendamos leer con más calma: la herencia permite reutilizar atributos y métodos de otra clase.'
          : 'La herencia no elimina objetos. Permite reutilizar los atributos y métodos de otra clase.';
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
      if (rapidGuessing) {
        quizFeedbackTitle.textContent = '✓ Acierto con puntaje mínimo (+5 pts)';
        quizFeedbackText.textContent = 'Detectamos selecciones en pocos segundos. Te recomendamos leer con más calma antes de marcar.';
        if (reflectionTitle) reflectionTitle.textContent = 'Lectura acelerada';
        if (reflectionBadge) reflectionBadge.textContent = 'Puntaje mínimo · +5 pts';
        if (reflectionDetail) reflectionDetail.textContent = 'Se penalizó la selección rápida (< 3 s o múltiples cambios en < 5 s).';
      } else if (quizAttemptCount === 0 && quizUsedHint) {
        quizFeedbackTitle.textContent = '✓ Reflexión activa (+25 pts)';
        quizFeedbackText.textContent = 'Excelente: usaste la pista de IA y respondiste con calma al primer intento.';
        if (reflectionTitle) reflectionTitle.textContent = 'Lectura reflexiva';
        if (reflectionBadge) reflectionBadge.textContent = 'Reflexión activa · +25 pts';
        if (reflectionDetail) reflectionDetail.textContent = 'Bonificación otorgada por usar pista de IA y acertar en el primer intento.';
      } else if (quizAttemptCount === 0) {
        quizFeedbackTitle.textContent = '✓ Respuesta reflexiva (+20 pts)';
        quizFeedbackText.textContent = 'Exacto. La herencia permite que una clase hija reutilice atributos y métodos de su clase base.';
        if (reflectionTitle) reflectionTitle.textContent = 'Lectura reflexiva';
        if (reflectionBadge) reflectionBadge.textContent = 'Primer intento · +20 pts';
        if (reflectionDetail) reflectionDetail.textContent = 'Respondiste con calma y precisión en tu primer intento.';
      } else {
        quizFeedbackTitle.textContent = '✓ Respuesta correcta por descarte (+10 pts)';
        quizFeedbackText.textContent = 'Acertaste tras reintentar. Usar una pista de IA en el primer intento otorga mayor bonificación.';
        if (reflectionTitle) reflectionTitle.textContent = 'Acierto por reintento';
        if (reflectionBadge) reflectionBadge.textContent = 'Descarte · +10 pts';
        if (reflectionDetail) reflectionDetail.textContent = 'Usar la pista de IA en el primer intento otorga más puntos que responder por descarte.';
      }
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

const spaceSelectFileBtn = document.getElementById('spaceSelectFileBtn');
const spaceFileInput = document.getElementById('spaceFileInput');
if (spaceSelectFileBtn && spaceFileInput) {
  spaceSelectFileBtn.addEventListener('click', () => {
    spaceFileInput.click();
  });
}

const spaceQtyRadios = document.querySelectorAll('input[name="spaceQty"]');
spaceQtyRadios.forEach((radio) => {
  radio.addEventListener('change', () => {
    document.querySelectorAll('.space-qty-card').forEach((card) => {
      card.classList.remove('is-selected');
    });
    const parent = radio.closest('.space-qty-card');
    if (parent) parent.classList.add('is-selected');
  });
});

const generateSpaceBtn = document.getElementById('generateSpaceBtn');
const spaceTopicInput = document.getElementById('spaceTopicInput');
const createdSpaceTitle = document.getElementById('createdSpaceTitle');
const createdSpaceQty = document.getElementById('createdSpaceQty');

if (generateSpaceBtn) {
  generateSpaceBtn.addEventListener('click', () => {
    const topic = spaceTopicInput ? spaceTopicInput.value.trim() : '';
    if (topic && createdSpaceTitle) {
      createdSpaceTitle.textContent = topic;
    }
    const checkedQty = document.querySelector('input[name="spaceQty"]:checked');
    if (checkedQty && createdSpaceQty) {
      createdSpaceQty.textContent = `${checkedQty.value} preguntas`;
    }
  });
}

const copySpaceCodeBtn = document.getElementById('copySpaceCodeBtn');
const shareSpaceCodeBtn = document.getElementById('shareSpaceCodeBtn');
const copyCodeFeedback = document.getElementById('copyCodeFeedback');

function handleCopySpaceCode() {
  if (navigator.clipboard) {
    navigator.clipboard.writeText('NX4821').catch(() => {});
  }
  if (copyCodeFeedback) {
    copyCodeFeedback.textContent = 'Código NX4821 copiado al portapapeles. Compártelo con tu grupo.';
  }
}

if (copySpaceCodeBtn) copySpaceCodeBtn.addEventListener('click', handleCopySpaceCode);
if (shareSpaceCodeBtn) shareSpaceCodeBtn.addEventListener('click', handleCopySpaceCode);

const spaceExerciseOptions = document.querySelectorAll('#spaceExerciseOptions .quiz-option');
spaceExerciseOptions.forEach((opt) => {
  opt.addEventListener('click', () => {
    spaceExerciseOptions.forEach((item) => {
      item.classList.remove('is-selected');
      item.setAttribute('aria-checked', 'false');
    });
    opt.classList.add('is-selected');
    opt.setAttribute('aria-checked', 'true');
  });
});

const mindmapDefs = {
  poo: {
    title: 'Programación Orientada a Objetos',
    desc: 'Paradigma que organiza el software en clases y objetos que encapsulan estado y comportamiento.'
  },
  herencia: {
    title: 'Herencia',
    desc: 'Permite crear una clase hija que reutiliza atributos y métodos de una clase base sin duplicar código.'
  },
  polimorfismo: {
    title: 'Polimorfismo',
    desc: 'Capacidad de que un mismo método adopte comportamientos distintos según la subclase que lo ejecute.'
  },
  encapsulamiento: {
    title: 'Encapsulamiento',
    desc: 'Protege el estado interno de un objeto exponiendo únicamente interfaces controladas.'
  },
  abstraccion: {
    title: 'Abstracción',
    desc: 'Modela solo las características esenciales de una entidad ocultando los detalles de implementación.'
  }
};

const mindmapViewport = document.getElementById('mindmapViewport');
const mindmapCanvas = document.getElementById('mindmapCanvas');
const mmZoomIn = document.getElementById('mmZoomIn');
const mmZoomOut = document.getElementById('mmZoomOut');
const mmZoomReset = document.getElementById('mmZoomReset');
const mindmapPopover = document.getElementById('mindmapPopover');
const mindmapPopTitle = document.getElementById('mindmapPopTitle');
const mindmapPopDesc = document.getElementById('mindmapPopDesc');
const mindmapPopClose = document.getElementById('mindmapPopClose');
const mmNodes = document.querySelectorAll('.mm-node');
const mmEdges = document.querySelectorAll('.mm-edge');

let mmScale = 1;
let mmX = 0;
let mmY = 0;
let mmDragging = false;
let mmStartX = 0;
let mmStartY = 0;

function updateMindmapTransform() {
  if (mindmapCanvas) {
    mindmapCanvas.setAttribute('transform', `translate(${mmX} ${mmY}) scale(${mmScale})`);
  }
  if (mmZoomReset) {
    mmZoomReset.textContent = `${Math.round(mmScale * 100)}%`;
  }
}

if (mmZoomIn) {
  mmZoomIn.addEventListener('click', () => {
    mmScale = Math.min(1.8, Number((mmScale + 0.2).toFixed(2)));
    updateMindmapTransform();
  });
}

if (mmZoomOut) {
  mmZoomOut.addEventListener('click', () => {
    mmScale = Math.max(0.6, Number((mmScale - 0.2).toFixed(2)));
    updateMindmapTransform();
  });
}

if (mmZoomReset) {
  mmZoomReset.addEventListener('click', () => {
    mmScale = 1;
    mmX = 0;
    mmY = 0;
    updateMindmapTransform();
  });
}

if (mindmapViewport) {
  mindmapViewport.addEventListener('pointerdown', (event) => {
    if (event.target.closest('.mm-node') || event.target.closest('.mindmap-popover')) return;
    mmDragging = true;
    mmStartX = event.clientX - mmX;
    mmStartY = event.clientY - mmY;
  });

  window.addEventListener('pointermove', (event) => {
    if (!mmDragging) return;
    mmX = event.clientX - mmStartX;
    mmY = event.clientY - mmStartY;
    updateMindmapTransform();
  });

  window.addEventListener('pointerup', () => {
    mmDragging = false;
  });
}

function clearMindmapSelection() {
  mmNodes.forEach((n) => n.classList.remove('is-active', 'is-dimmed'));
  mmEdges.forEach((e) => e.classList.remove('is-dimmed'));
  if (mindmapPopover) mindmapPopover.hidden = true;
}

mmNodes.forEach((node) => {
  const selectNode = () => {
    const key = node.dataset.mmNode;
    const info = key ? mindmapDefs[key] : null;
    if (!info) return;

    mmNodes.forEach((n) => {
      const keep = n.dataset.mmNode === key || n.dataset.mmNode === 'poo';
      n.classList.toggle('is-active', n.dataset.mmNode === key);
      n.classList.toggle('is-dimmed', !keep);
    });
    mmEdges.forEach((e) => {
      e.classList.toggle('is-dimmed', key !== 'poo' && e.dataset.mmEdge !== key);
    });

    if (mindmapPopTitle) mindmapPopTitle.textContent = info.title;
    if (mindmapPopDesc) mindmapPopDesc.textContent = info.desc;
    if (mindmapPopover) mindmapPopover.hidden = false;
  };

  node.addEventListener('click', selectNode);
  node.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectNode();
    }
  });
});

if (mindmapPopClose) {
  mindmapPopClose.addEventListener('click', clearMindmapSelection);
}

const pollOptions = document.querySelectorAll('.poll-option');
const pollVoteBtn = document.getElementById('pollVoteBtn');
const pollResults = document.getElementById('pollResults');
const pollOptionsWrap = document.getElementById('pollOptions');
const pollFooter = document.getElementById('pollFooter');
const pollData = [
  { label: 'Herencia y clases base', votes: 8 },
  { label: 'Polimorfismo en casos reales', votes: 14 },
  { label: 'Diseño de clases abstractas', votes: 5 }
];
let selectedPollIndex = null;

pollOptions.forEach((opt) => {
  opt.addEventListener('click', () => {
    pollOptions.forEach((item) => {
      item.classList.remove('is-selected');
      item.setAttribute('aria-checked', 'false');
    });
    opt.classList.add('is-selected');
    opt.setAttribute('aria-checked', 'true');
    selectedPollIndex = Number(opt.dataset.pollOpt);
    if (pollVoteBtn) pollVoteBtn.disabled = false;
  });
});

if (pollVoteBtn) {
  pollVoteBtn.addEventListener('click', () => {
    if (selectedPollIndex === null) return;
    pollData[selectedPollIndex].votes += 1;
    const total = pollData.reduce((acc, item) => acc + item.votes, 0);

    if (pollResults) {
      pollResults.innerHTML = pollData
        .map((item, idx) => {
          const pct = Math.round((item.votes / total) * 100);
          const cls = idx === selectedPollIndex ? 'poll-bar-row poll-bar-row--mine' : 'poll-bar-row';
          return `<div class="${cls}"><div class="poll-bar-row__head"><span>${item.label}</span><span>${pct}%</span></div><div class="progress-track"><span class="progress-fill" style="width:${pct}%"></span></div></div>`;
        })
        .join('');
      pollResults.hidden = false;
    }
    if (pollOptionsWrap) pollOptionsWrap.hidden = true;
    if (pollFooter) pollFooter.hidden = true;
  });
}

const difficultyBtns = document.querySelectorAll('.difficulty-btn');
const difficultyCommentWrap = document.getElementById('difficultyCommentWrap');
const difficultyComment = document.getElementById('difficultyComment');
const difficultySubmitBtn = document.getElementById('difficultySubmitBtn');
const difficultySkipBtn = document.getElementById('difficultySkipBtn');
const difficultyStatus = document.getElementById('difficultyStatus');
const difficultyScale = document.getElementById('difficultyScale');
let chosenDifficulty = '';

difficultyBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    difficultyBtns.forEach((b) => {
      b.classList.remove('is-selected');
      b.setAttribute('aria-checked', 'false');
    });
    btn.classList.add('is-selected');
    btn.setAttribute('aria-checked', 'true');
    chosenDifficulty = btn.dataset.difficulty || '';
    if (difficultyCommentWrap) difficultyCommentWrap.hidden = false;
  });
});

if (difficultySubmitBtn) {
  difficultySubmitBtn.addEventListener('click', () => {
    if (!chosenDifficulty) return;
    if (difficultyScale) difficultyScale.hidden = true;
    if (difficultyCommentWrap) difficultyCommentWrap.hidden = true;
    if (difficultySkipBtn) difficultySkipBtn.hidden = true;
    if (difficultyStatus) {
      difficultyStatus.textContent = `Valoración «${chosenDifficulty}» registrada. Se actualizó el indicador de dificultad del módulo.`;
      difficultyStatus.hidden = false;
    }
  });
}

if (difficultySkipBtn) {
  difficultySkipBtn.addEventListener('click', () => {
    if (difficultyScale) difficultyScale.hidden = true;
    if (difficultyCommentWrap) difficultyCommentWrap.hidden = true;
    difficultySkipBtn.hidden = true;
    if (difficultyStatus) {
      difficultyStatus.textContent = 'Progreso de lectura guardado al 100 % sin registrar percepción.';
      difficultyStatus.hidden = false;
    }
  });
}

const mobilityToggleBtn = document.getElementById('mobilityToggleBtn');
const mobilityAudioBar = document.getElementById('mobilityAudioBar');
const mobilityPlayBtn = document.getElementById('mobilityPlayBtn');
const mobilityExitBtn = document.getElementById('mobilityExitBtn');
let mobilityAudioPlaying = true;

function setMobilityMode(enabled) {
  document.body.classList.toggle('mobility-mode', enabled);
  if (mobilityToggleBtn) {
    mobilityToggleBtn.setAttribute('aria-pressed', String(enabled));
  }
  if (mobilityAudioBar) {
    mobilityAudioBar.hidden = !enabled;
  }
}

if (mobilityToggleBtn) {
  mobilityToggleBtn.addEventListener('click', () => {
    const next = !document.body.classList.contains('mobility-mode');
    setMobilityMode(next);
  });
}

if (mobilityExitBtn) {
  mobilityExitBtn.addEventListener('click', () => setMobilityMode(false));
}

if (mobilityPlayBtn) {
  mobilityPlayBtn.addEventListener('click', () => {
    mobilityAudioPlaying = !mobilityAudioPlaying;
    mobilityPlayBtn.textContent = mobilityAudioPlaying ? 'Pausar audio' : 'Reproducir audio';
  });
}

const seniorsToggleBtn = document.getElementById('seniorsToggleBtn');
const seniorsPanel = document.getElementById('seniorsPanel');
const seniorsList = document.getElementById('seniorsList');

const seniorTipsData = [
  {
    id: 's1',
    author: 'Mateo R. · 8.º ciclo',
    text: 'Piensa en la herencia como un molde de galletas: Vehículo define la forma base y Auto solo agrega sus detalles sin rehacer todo.',
    votes: 14,
    voted: false
  },
  {
    id: 's2',
    author: 'Valeria C. · 7.º ciclo',
    text: 'Si dudas entre heredar o copiar código, pregúntate: ¿un Auto ES UN Vehículo? Si la respuesta es sí, usa herencia.',
    votes: 11,
    voted: false
  },
  {
    id: 's3',
    author: 'Diego M. · 9.º ciclo',
    text: 'En el parcial siempre preguntan sobreescritura: recuerda que la clase hija puede redefinir moverse() sin tocar la clase padre.',
    votes: 9,
    voted: false
  }
];

function renderSeniorTips() {
  if (!seniorsList) return;
  const sorted = [...seniorTipsData].sort((a, b) => b.votes - a.votes);
  seniorsList.innerHTML = sorted
    .map((tip) => `
      <div class="senior-note">
        <div class="senior-note__meta">
          <span class="senior-note__author">${tip.author}</span>
          <span>Validado</span>
        </div>
        <p class="senior-note__text">${tip.text}</p>
        <button type="button" class="senior-upvote-btn ${tip.voted ? 'is-voted' : ''}" data-senior-id="${tip.id}">
          Me sirvió (${tip.votes})
        </button>
      </div>
    `)
    .join('');
}

if (seniorsToggleBtn && seniorsPanel) {
  renderSeniorTips();
  seniorsToggleBtn.addEventListener('click', () => {
    const opening = seniorsPanel.hidden;
    seniorsPanel.hidden = !opening;
    seniorsToggleBtn.setAttribute('aria-expanded', String(opening));
  });
}

if (seniorsList) {
  seniorsList.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-senior-id]');
    if (!btn) return;
    const tip = seniorTipsData.find((item) => item.id === btn.dataset.seniorId);
    if (!tip) return;
    tip.voted = !tip.voted;
    tip.votes += tip.voted ? 1 : -1;
    renderSeniorTips();
  });
}

const notesFileInput = document.getElementById('notesFileInput');
const notesUploadBtn = document.getElementById('notesUploadBtn');
const notesBlurryBtn = document.getElementById('notesBlurryBtn');
const notesFileName = document.getElementById('notesFileName');
const notesTextInput = document.getElementById('notesTextInput');
const analyzeNotesBtn = document.getElementById('analyzeNotesBtn');
const notesErrorMsg = document.getElementById('notesErrorMsg');
const notesResult = document.getElementById('notesResult');
const notesCapturedList = document.getElementById('notesCapturedList');
const notesOmittedList = document.getElementById('notesOmittedList');
let notesHasFile = false;
let notesIsBlurry = false;

if (notesUploadBtn && notesFileInput) {
  notesUploadBtn.addEventListener('click', () => notesFileInput.click());
  notesFileInput.addEventListener('change', () => {
    if (notesFileInput.files && notesFileInput.files.length > 0) {
      const f = notesFileInput.files[0];
      notesHasFile = true;
      notesIsBlurry = /borros|blur/i.test(f.name);
      if (notesFileName) notesFileName.textContent = `Archivo cargado: ${f.name}`;
      if (notesErrorMsg) notesErrorMsg.hidden = true;
    }
  });
}

if (notesBlurryBtn) {
  notesBlurryBtn.addEventListener('click', () => {
    notesHasFile = true;
    notesIsBlurry = true;
    if (notesFileName) notesFileName.textContent = 'Archivo cargado: libreta_borrosa.jpg';
    if (notesResult) notesResult.hidden = true;
    if (notesErrorMsg) {
      notesErrorMsg.textContent = 'No se pudo leer la imagen con claridad, por favor intenta tomar la foto con mejor iluminación.';
      notesErrorMsg.hidden = false;
    }
  });
}

if (analyzeNotesBtn) {
  analyzeNotesBtn.addEventListener('click', () => {
    const textVal = notesTextInput ? notesTextInput.value.trim() : '';
    if (notesIsBlurry) {
      if (notesResult) notesResult.hidden = true;
      if (notesErrorMsg) {
        notesErrorMsg.textContent = 'No se pudo leer la imagen con claridad, por favor intenta tomar la foto con mejor iluminación.';
        notesErrorMsg.hidden = false;
      }
      return;
    }
    if (!notesHasFile && !textVal) {
      if (notesErrorMsg) {
        notesErrorMsg.textContent = 'Sube una fotografía (JPG/PNG) o escribe tus apuntes para analizarlos.';
        notesErrorMsg.hidden = false;
      }
      return;
    }

    if (notesErrorMsg) notesErrorMsg.hidden = true;
    if (notesCapturedList) {
      notesCapturedList.innerHTML = '<li><span class="check-circle" aria-hidden="true">✓</span><span>Herencia entre clase base y subclase</span></li><li><span class="check-circle" aria-hidden="true">✓</span><span>Reutilización del método moverse()</span></li>';
    }
    if (notesOmittedList) {
      notesOmittedList.innerHTML = '<li><span class="check-circle" aria-hidden="true">!</span><span>Sobreescritura de métodos con @override</span></li><li><span class="check-circle" aria-hidden="true">!</span><span>Diferencia entre clase abstracta e interfaz</span></li>';
    }
    if (notesResult) notesResult.hidden = false;
  });
}

const markDoubtFab = document.getElementById('markDoubtFab');
const doubtModal = document.getElementById('doubtModal');
const doubtModalClose = document.getElementById('doubtModalClose');
const doubtTimeNow = document.getElementById('doubtTimeNow');
const doubtTopicBtns = document.querySelectorAll('.doubt-topic-btn');
const confirmDoubtBtn = document.getElementById('confirmDoubtBtn');
const goPostclassBtn = document.getElementById('goPostclassBtn');
const doubtModalFeedback = document.getElementById('doubtModalFeedback');
const postclassDoubtsList = document.getElementById('postclassDoubtsList');
const doubtsEmptyHint = document.getElementById('doubtsEmptyHint');
const doubtsCountTag = document.getElementById('doubtsCountTag');
let selectedDoubtBtn = null;
const recordedDoubts = [];

function getCurrentTimeLabel() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
}

function renderRecordedDoubts() {
  if (!postclassDoubtsList) return;
  if (doubtsCountTag) {
    doubtsCountTag.textContent = recordedDoubts.length === 1 ? '1 tema marcado' : `${recordedDoubts.length} temas marcados`;
  }
  if (recordedDoubts.length === 0) return;
  if (doubtsEmptyHint) doubtsEmptyHint.hidden = true;

  postclassDoubtsList.innerHTML = recordedDoubts
    .map((item) => `
      <div class="doubt-card">
        <div class="doubt-card__head">
          <span class="doubt-card__title">${item.topic}</span>
          <span class="doubt-card__time">Marcado ${item.time}</span>
        </div>
        <p class="doubt-card__summary">${item.summary}</p>
        <button type="button" class="app-btn app-btn--primary app-btn--sm" data-nav-target="practiquemos">Practicar mini-ejercicio</button>
      </div>
    `)
    .join('');
}

if (markDoubtFab && doubtModal) {
  markDoubtFab.addEventListener('click', () => {
    if (doubtTimeNow) doubtTimeNow.textContent = getCurrentTimeLabel();
    if (doubtModalFeedback) doubtModalFeedback.hidden = true;
    doubtModal.hidden = false;
  });
}

if (doubtModalClose && doubtModal) {
  doubtModalClose.addEventListener('click', () => {
    doubtModal.hidden = true;
  });
}

doubtTopicBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    doubtTopicBtns.forEach((b) => b.classList.remove('is-selected'));
    btn.classList.add('is-selected');
    selectedDoubtBtn = btn;
    if (confirmDoubtBtn) confirmDoubtBtn.disabled = false;
  });
});

if (confirmDoubtBtn) {
  confirmDoubtBtn.addEventListener('click', () => {
    if (!selectedDoubtBtn) return;
    const topic = selectedDoubtBtn.dataset.doubtTopic || '';
    const summary = selectedDoubtBtn.dataset.doubtSummary || '';
    const time = getCurrentTimeLabel();
    if (!recordedDoubts.some((d) => d.topic === topic)) {
      recordedDoubts.push({ topic, summary, time });
      renderRecordedDoubts();
    }
    if (doubtModalFeedback) {
      doubtModalFeedback.textContent = `«${topic}» registrado a las ${time} y añadido a tu paquete Postclase.`;
      doubtModalFeedback.hidden = false;
    }
  });
}

if (goPostclassBtn && doubtModal) {
  goPostclassBtn.addEventListener('click', () => {
    doubtModal.hidden = true;
    navigateToView('repaso-home');
  });
}

const darkModeToggle = document.getElementById('darkModeToggle');
if (darkModeToggle) {
  darkModeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode', darkModeToggle.checked);
  });
}
