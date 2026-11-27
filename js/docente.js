/* Panel docente NexIA — HU01–HU16 */

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
    const active = view.dataset.view === targetViewId;
    view.classList.toggle('is-active', active);
    if (active) activeView = view;
  });
  if (!activeView) return;

  const activeGroup = activeView.dataset.group || 'preclase';
  const activeTitle = activeView.dataset.title || 'Preclase';
  if (breadcrumbCurrent) breadcrumbCurrent.textContent = activeTitle;

  sidebarButtons.forEach((btn) => {
    const isActive = btn.dataset.navGroup === activeGroup;
    btn.classList.toggle('is-active', isActive);
    if (isActive) btn.setAttribute('aria-current', 'page');
    else btn.removeAttribute('aria-current');
  });

  bottomNavButtons.forEach((btn) => {
    const isActive = btn.dataset.navGroup === activeGroup;
    btn.classList.toggle('is-active', isActive);
    if (isActive) btn.setAttribute('aria-current', 'page');
    else btn.removeAttribute('aria-current');
  });

  if (appSidebar) appSidebar.classList.remove('is-open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-nav-target]');
  if (!trigger) return;
  const targetViewId = trigger.dataset.navTarget;
  if (targetViewId) navigateToView(targetViewId);
});

if (appSidebarToggle && appSidebar) {
  appSidebarToggle.addEventListener('click', () => appSidebar.classList.toggle('is-open'));
}
if (desktopSidebarToggle && appSidebar) {
  desktopSidebarToggle.addEventListener('click', () => appSidebar.classList.toggle('is-collapsed'));
}

function showToast(message) {
  const toast = document.getElementById('docToast');
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => { toast.hidden = true; }, 2800);
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeModals() {
  document.querySelectorAll('.doc-modal').forEach((m) => { m.hidden = true; });
  document.body.style.overflow = '';
}

document.addEventListener('click', (event) => {
  if (event.target.closest('[data-close-modal]')) closeModals();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModals();
});

/* ——— Datos demo ——— */
const students = [
  { id: 1, name: 'Ana Quispe', status: 'completado', score: 92, time: '18 min', correct: 9, incorrect: 1, hints: 1, fails: ['Ninguna crítica'] },
  { id: 2, name: 'Luis Mendoza', status: 'completado', score: 55, time: '24 min', correct: 5, incorrect: 5, hints: 3, fails: ['Polimorfismo Q4', 'Sobreescritura Q7'] },
  { id: 3, name: 'María Torres', status: 'en-proceso', score: 40, time: '11 min', correct: 2, incorrect: 3, hints: 2, fails: ['Clases abstractas'] },
  { id: 4, name: 'Carlos Ruiz', status: 'sin-iniciar', score: null, time: '—', correct: 0, incorrect: 0, hints: 0, fails: [] },
  { id: 5, name: 'Elena Vargas', status: 'sin-iniciar', score: null, time: '—', correct: 0, incorrect: 0, hints: 0, fails: [] },
  { id: 6, name: 'Diego Paredes', status: 'completado', score: 78, time: '16 min', correct: 8, incorrect: 2, hints: 1, fails: ['Polimorfismo Q4'] },
  { id: 7, name: 'Sofía León', status: 'sin-iniciar', score: null, time: '—', correct: 0, incorrect: 0, hints: 0, fails: [] },
  { id: 8, name: 'Pedro Salas', status: 'completado', score: 61, time: '21 min', correct: 6, incorrect: 4, hints: 2, fails: ['Sobreescritura Q9'] }
];

const moduleData = {
  todos: {
    label: 'Todos los módulos',
    participacion: '78%',
    participacionFoot: '19 de 24 completaron',
    comprension: '64%',
    criticos: '3',
    bars: [
      { name: 'Polimorfismo', error: 68, key: 'polimorfismo' },
      { name: 'Sobreescritura', error: 52, key: 'sobreescritura' },
      { name: 'Clases abstractas', error: 41, key: 'abstractas' },
      { name: 'Herencia', error: 22, key: 'herencia' }
    ],
    executive: [
      '<strong>Polimorfismo vs sobrecarga:</strong> el 58% confunde ambos conceptos.',
      '<strong>Sobreescritura de métodos:</strong> errores al identificar qué método se ejecuta.',
      '<strong>Clases abstractas:</strong> duda sobre cuándo declarar un método abstracto.'
    ]
  },
  m1: {
    label: 'M1 · Herencia',
    participacion: '85%',
    participacionFoot: '20 de 24 en esta lectura',
    comprension: '78%',
    criticos: '1',
    bars: [
      { name: 'Jerarquía de clases', error: 28, key: 'herencia' },
      { name: 'super()', error: 34, key: 'herencia' },
      { name: 'Herencia múltiple', error: 22, key: 'herencia' }
    ],
    executive: [
      '<strong>Uso de super():</strong> confusión al invocar el constructor padre.',
      '<strong>Visibilidad protected:</strong> cuándo usarla frente a private.'
    ]
  },
  m2: {
    label: 'M2 · Polimorfismo',
    participacion: '72%',
    participacionFoot: '17 de 24 en esta lectura',
    comprension: '42%',
    criticos: '2',
    bars: [
      { name: 'Polimorfismo dinámico', error: 71, key: 'polimorfismo' },
      { name: 'Vs sobrecarga', error: 64, key: 'polimorfismo' },
      { name: 'Interfaces', error: 48, key: 'polimorfismo' }
    ],
    executive: [
      '<strong>Polimorfismo dinámico:</strong> el grupo no identifica el método resuelto en runtime.',
      '<strong>Sobrecarga vs sobreescritura:</strong> términos intercambiados con frecuencia.'
    ]
  },
  m3: {
    label: 'M3 · Sobreescritura',
    participacion: '70%',
    participacionFoot: '17 de 24 en esta lectura',
    comprension: '51%',
    criticos: '1',
    bars: [
      { name: '@Override', error: 55, key: 'sobreescritura' },
      { name: 'Firma del método', error: 49, key: 'sobreescritura' }
    ],
    executive: [
      '<strong>Firma del método:</strong> errores al cambiar parámetros creyendo sobreescribir.'
    ]
  },
  m4: {
    label: 'M4 · Clases abstractas',
    participacion: '66%',
    participacionFoot: '16 de 24 en esta lectura',
    comprension: '58%',
    criticos: '1',
    bars: [
      { name: 'Métodos abstractos', error: 44, key: 'abstractas' },
      { name: 'Vs interfaces', error: 39, key: 'abstractas' }
    ],
    executive: [
      '<strong>Abstract vs interface:</strong> cuándo elegir cada una en el diseño.'
    ]
  }
};

const conceptDetails = {
  polimorfismo: [
    'Confusión entre polimorfismo y sobrecarga (14 estudiantes)',
    'No identifican el binding dinámico en un ejemplo con Animal.hablar()',
    'Creen que el polimorfismo requiere herencia múltiple'
  ],
  sobreescritura: [
    'Cambian el tipo de retorno y creen que sigue siendo override',
    'Olvidan @Override y no detectan error de firma',
    'Confunden override con overload'
  ],
  abstractas: [
    'Intentan instanciar una clase abstracta',
    'No saben cuándo un método debe ser abstracto',
    'Mezclan reglas de interfaces con clases abstractas'
  ],
  herencia: [
    'Dudas menores sobre protected',
    'Uso incorrecto ocasional de super()'
  ]
};

const activities = [
  {
    id: 'a1',
    title: 'Mapa de polimorfismo en vivo',
    duration: '20-30',
    concept: 'polimorfismo',
    recommended: true,
    objective: 'Diferenciar polimorfismo de sobrecarga con ejemplos del grupo.',
    steps: ['Proyectar 2 snippets ambiguos', 'Votación rápida A/B', 'Debatir por qué el binding es dinámico', 'Cierre con regla mnemotécnica'],
    resources: ['Pizarra', 'Proyector', 'Snippets NX-POO-04']
  },
  {
    id: 'a2',
    title: 'Detective de @Override',
    duration: '20-30',
    concept: 'sobreescritura',
    recommended: true,
    objective: 'Detectar firmas incorrectas que rompen la sobreescritura.',
    steps: ['Entregar 4 métodos rotos', 'Parejas corrigen la firma', 'Comparten 1 error típico', 'Checklist de override'],
    resources: ['Hojas impresas', 'Temporizador 5 min']
  },
  {
    id: 'a3',
    title: 'Árbol de herencia colaborativo',
    duration: '20-30',
    concept: 'herencia',
    recommended: false,
    objective: 'Construir una jerarquía coherente a partir de un dominio cotidiano.',
    steps: ['Elegir dominio (vehículos/animales)', 'Pegar clases en mural', 'Validar relaciones is-a', 'Reflexión 3 min'],
    resources: ['Post-its', 'Marcadores']
  },
  {
    id: 'a4',
    title: 'Caso: ¿abstract o interface?',
    duration: '20-30',
    concept: 'abstractas',
    recommended: true,
    objective: 'Decidir el artefacto correcto según el diseño.',
    steps: ['Presentar 3 escenarios', 'Voto individual', 'Confrontar con rúbrica', 'Síntesis docente'],
    resources: ['Rúbrica de diseño', 'Slides 2–3']
  }
];

const trendWeeks = [
  { week: 'S1', value: 92, topic: 'Introducción a OOP' },
  { week: 'S2', value: 88, topic: 'Clases y objetos' },
  { week: 'S3', value: 84, topic: 'Encapsulamiento' },
  { week: 'S4', value: 79, topic: 'Constructores' },
  { week: 'S5', value: 81, topic: 'Relaciones' },
  { week: 'S6', value: 74, topic: 'Herencia I' },
  { week: 'S7', value: 71, topic: 'Herencia II' },
  { week: 'S8', value: 78, topic: 'Polimorfismo' }
];

const wordClusters = [
  { word: 'polimorfismo', count: 18, examples: ['“No sé si es lo mismo que overload…”', '“En el ejemplo del animal me perdí.”'] },
  { word: 'confuso', count: 12, examples: ['“La lectura estuvo densa en la parte media.”', '“Necesito un ejemplo más simple.”'] },
  { word: 'ejemplo', count: 11, examples: ['“El snippet del perro/gato ayudó.”', '“Quiero más casos prácticos.”'] },
  { word: 'override', count: 9, examples: ['“¿Siempre hay que poner la anotación?”'] },
  { word: 'abstracto', count: 8, examples: ['“¿Se puede crear un objeto abstracto?”'] },
  { word: 'claro', count: 7, examples: ['“La intro de herencia sí se entendió.”'] }
];

/* ——— Estudiantes (HU03, HU04) ——— */
let currentStudentFilter = 'todos';
const studentTableBody = document.getElementById('studentTableBody');
const sendReminderBtn = document.getElementById('sendReminderBtn');
const selectAllLagging = document.getElementById('selectAllLagging');

function statusLabel(status) {
  if (status === 'completado') return 'Completado';
  if (status === 'en-proceso') return 'En proceso';
  return 'Sin iniciar';
}

function statusClass(status) {
  if (status === 'completado') return 'status-chip--mint';
  if (status === 'en-proceso') return 'status-chip--amber';
  return 'status-chip--gray';
}

function renderStudents() {
  if (!studentTableBody) return;
  const filtered = students.filter((s) => currentStudentFilter === 'todos' || s.status === currentStudentFilter);
  const showCheck = currentStudentFilter === 'sin-iniciar';

  if (selectAllLagging) selectAllLagging.hidden = !showCheck;
  if (sendReminderBtn) sendReminderBtn.hidden = !showCheck;

  studentTableBody.innerHTML = filtered.map((s) => `
    <tr data-student-id="${s.id}">
      <td>${showCheck ? `<input type="checkbox" class="lagging-check" value="${s.id}" aria-label="Seleccionar ${s.name}">` : ''}</td>
      <td><button type="button" class="student-name-btn" data-open-student="${s.id}">${s.name}</button></td>
      <td><span class="status-chip ${statusClass(s.status)}">${statusLabel(s.status)}</span></td>
      <td>${s.score == null ? '—' : s.score + '%'}</td>
      <td>${s.time}</td>
    </tr>
  `).join('');
}

document.querySelectorAll('[data-student-filter]').forEach((chip) => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('[data-student-filter]').forEach((c) => c.classList.remove('is-active'));
    chip.classList.add('is-active');
    currentStudentFilter = chip.dataset.studentFilter;
    renderStudents();
  });
});

if (selectAllLagging) {
  selectAllLagging.addEventListener('change', () => {
    document.querySelectorAll('.lagging-check').forEach((cb) => {
      cb.checked = selectAllLagging.checked;
    });
  });
}

document.addEventListener('click', (event) => {
  const btn = event.target.closest('[data-open-student]');
  if (!btn) return;
  const student = students.find((s) => String(s.id) === btn.dataset.openStudent);
  if (!student) return;

  document.getElementById('studentModalTitle').textContent = student.name;
  const body = document.getElementById('studentModalBody');
  body.innerHTML = `
    <div class="modal-stats">
      <div><p class="modal-stats__label">Correctas</p><p class="modal-stats__value">${student.correct}</p></div>
      <div><p class="modal-stats__label">Incorrectas</p><p class="modal-stats__value">${student.incorrect}</p></div>
      <div><p class="modal-stats__label">Pistas usadas</p><p class="modal-stats__value">${student.hints}</p></div>
      <div><p class="modal-stats__label">Tiempo total</p><p class="modal-stats__value">${student.time}</p></div>
    </div>
    <h3 class="concept-breakdown__title">Temas / preguntas falladas</h3>
    <ul class="concept-breakdown__list">
      ${(student.fails.length ? student.fails : ['Sin intentos registrados aún']).map((f) => `<li>${f}</li>`).join('')}
    </ul>
    <p class="inline-hint">Tiempo invertido en lectura + evaluación: <strong>${student.time}</strong></p>
  `;
  openModal('studentModal');
});

if (sendReminderBtn) {
  sendReminderBtn.addEventListener('click', () => {
    const selected = [...document.querySelectorAll('.lagging-check:checked')];
    const ids = selected.length
      ? selected.map((c) => Number(c.value))
      : students.filter((s) => s.status === 'sin-iniciar').map((s) => s.id);
    const names = students.filter((s) => ids.includes(s.id)).map((s) => s.name);
    document.getElementById('reminderRecipients').textContent =
      `Destinatarios en CCO (${names.length}): ${names.join(', ')}`;
    openModal('reminderModal');
  });
}

document.getElementById('confirmReminderBtn')?.addEventListener('click', () => {
  closeModals();
  showToast('Recordatorio enviado en copia oculta (CCO).');
});

/* ——— Filtro módulo HU06 + errores HU01/HU14 ——— */
function renderModule(key) {
  const data = moduleData[key] || moduleData.todos;
  document.getElementById('kpiParticipacion').textContent = data.participacion;
  document.getElementById('kpiParticipacionFoot').textContent = data.participacionFoot;
  document.getElementById('kpiComprension').textContent = data.comprension;
  document.getElementById('kpiCriticos').textContent = data.criticos;
  document.getElementById('chartModuleLabel').textContent = data.label;

  const bars = document.getElementById('errorBars');
  bars.innerHTML = data.bars.map((b) => {
    const cls = b.error >= 60 ? 'progress-fill--danger' : b.error >= 40 ? 'progress-fill--warn' : '';
    return `
      <button type="button" class="topic-bar-item topic-bar-item--clickable" data-concept="${b.key}">
        <div class="topic-bar-item__head"><span>${b.name}</span><span class="space-code-text">${b.error}% error</span></div>
        <div class="progress-track"><span class="progress-fill ${cls}" style="width:${b.error}%"></span></div>
      </button>`;
  }).join('');

  document.getElementById('executivePoints').innerHTML =
    data.executive.map((item) => `<li>${item}</li>`).join('');

  document.getElementById('conceptBreakdown').hidden = true;
}

document.getElementById('moduleFilter')?.addEventListener('change', (e) => {
  renderModule(e.target.value);
});

document.getElementById('errorBars')?.addEventListener('click', (event) => {
  const item = event.target.closest('[data-concept]');
  if (!item) return;
  const key = item.dataset.concept;
  const details = conceptDetails[key] || [];
  const box = document.getElementById('conceptBreakdown');
  document.getElementById('conceptBreakdownTitle').textContent = `Desglose: ${item.querySelector('span')?.textContent || key}`;
  document.getElementById('conceptBreakdownList').innerHTML = details.map((d) => `<li>${d}</li>`).join('');
  box.hidden = false;
});

/* ——— Export HU05 ——— */
document.getElementById('exportReportBtn')?.addEventListener('click', () => {
  document.getElementById('exportFeedback').hidden = true;
  openModal('exportModal');
});

document.querySelectorAll('[data-export]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const format = btn.dataset.export;
    const feedback = document.getElementById('exportFeedback');
    const course = 'Programación Orientada a Objetos';
    const date = '26/11/2026';
    const assimilation = document.getElementById('kpiComprension')?.textContent || '64%';
    feedback.hidden = false;
    feedback.textContent = format === 'pdf'
      ? `PDF generado: ${course} · ${date} · Asimilación ${assimilation} · detalle por alumno.`
      : `Excel generado: ${course} · ${date} · Asimilación ${assimilation} · filas por alumno.`;
    showToast(`Reporte ${format.toUpperCase()} listo para descarga (demo).`);
  });
});

/* ——— Tiempo real HU01 CA03 ——— */
let liveExtra = 2;
setInterval(() => {
  liveExtra += 1;
  const kpi = document.getElementById('kpiLive');
  const pill = document.getElementById('liveUpdatePill');
  if (kpi) kpi.textContent = `+${liveExtra}`;
  if (pill) {
    pill.classList.add('is-pulse');
    setTimeout(() => pill.classList.remove('is-pulse'), 600);
  }
  const foot = document.getElementById('kpiParticipacionFoot');
  if (foot && liveExtra % 3 === 0) {
    const done = Math.min(24, 19 + Math.floor(liveExtra / 3));
    foot.textContent = `${done} de 24 completaron`;
    document.getElementById('kpiParticipacion').textContent = `${Math.round((done / 24) * 100)}%`;
  }
}, 8000);

/* ——— Actividades HU02 ——— */
function renderActivities() {
  const duration = document.getElementById('activityDuration')?.value || '20-30';
  const concept = document.getElementById('activityConcept')?.value || 'todos';
  const grid = document.getElementById('activityGrid');
  if (!grid) return;

  const list = activities.filter((a) => {
    const okDuration = a.duration === duration || duration === '20-30';
    const okConcept = concept === 'todos' || a.concept === concept;
    return okDuration && okConcept;
  });

  grid.innerHTML = list.map((a) => `
    <article class="activity-card ${a.recommended ? 'activity-card--recommended' : ''}">
      ${a.recommended ? '<span class="pill-badge pill-badge--purple">Recomendada</span>' : ''}
      <h3 class="activity-card__title">${a.title}</h3>
      <p class="activity-card__meta">${a.duration.replace('-', '–')} min · ${a.concept}</p>
      <p class="activity-card__obj"><strong>Objetivo:</strong> ${a.objective}</p>
      <ol class="activity-card__steps">
        ${a.steps.map((s) => `<li>${s}</li>`).join('')}
      </ol>
      <p class="activity-card__res"><strong>Recursos:</strong> ${a.resources.join(' · ')}</p>
    </article>
  `).join('') || '<p class="inline-hint">No hay dinámicas para ese filtro.</p>';
}

document.getElementById('activityDuration')?.addEventListener('change', renderActivities);
document.getElementById('activityConcept')?.addEventListener('change', renderActivities);

/* ——— Tendencia HU07 ——— */
function renderTrendChart() {
  const svg = document.getElementById('trendChart');
  if (!svg) return;
  const w = 640;
  const h = 280;
  const pad = { t: 24, r: 24, b: 40, l: 48 };
  const innerW = w - pad.l - pad.r;
  const innerH = h - pad.t - pad.b;
  const maxY = 100;
  const points = trendWeeks.map((d, i) => {
    const x = pad.l + (i / (trendWeeks.length - 1)) * innerW;
    const y = pad.t + innerH - (d.value / maxY) * innerH;
    return { ...d, x, y };
  });

  const grid = [0, 25, 50, 75, 100].map((v) => {
    const y = pad.t + innerH - (v / maxY) * innerH;
    return `<line x1="${pad.l}" y1="${y}" x2="${w - pad.r}" y2="${y}" stroke="#E4E7EF" /><text x="${pad.l - 10}" y="${y + 4}" text-anchor="end" class="trend-axis">${v}%</text>`;
  }).join('');

  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const dots = points.map((p, i) => `
    <circle class="trend-dot" data-week-index="${i}" cx="${p.x}" cy="${p.y}" r="7" fill="#5558F5" stroke="#fff" stroke-width="2" />
  `).join('');
  const labels = points.map((p) => `<text x="${p.x}" y="${h - 12}" text-anchor="middle" class="trend-axis">${p.week}</text>`).join('');

  svg.innerHTML = `
    ${grid}
    <path d="${line}" fill="none" stroke="#5558F5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    ${dots}
    ${labels}
  `;

  const tooltip = document.getElementById('trendTooltip');
  svg.querySelectorAll('.trend-dot').forEach((dot) => {
    dot.addEventListener('mouseenter', (e) => {
      const d = points[Number(dot.dataset.weekIndex)];
      tooltip.hidden = false;
      tooltip.innerHTML = `<strong>${d.week}: ${d.value}%</strong><br>${d.topic}`;
      const rect = svg.getBoundingClientRect();
      tooltip.style.left = `${e.clientX - rect.left + 12}px`;
      tooltip.style.top = `${e.clientY - rect.top - 12}px`;
    });
    dot.addEventListener('mouseleave', () => { tooltip.hidden = true; });
  });
}

/* ——— Crear contenido HU10, HU12, HU13 ——— */
let previousNotes = '';
document.getElementById('rewriteLevelBtn')?.addEventListener('click', () => {
  const notes = document.getElementById('moduleNotes');
  const level = document.getElementById('complexityLevel').value;
  previousNotes = notes.value;
  const rewrites = {
    basico: 'Piensa en el polimorfismo como un control remoto universal: el mismo botón “hablar” hace que el perro ladre y el gato maúlle. No es lo mismo que tener varios botones distintos (eso sería sobrecarga).',
    intermedio: 'El polimorfismo permite que un mismo mensaje produzca comportamientos distintos según la clase receptora. No confundir con la sobrecarga de métodos, que ocurre en tiempo de compilación.',
    tecnico: 'El polimorfismo de subtipo se resuelve mediante late binding / dispatch dinámico sobre la vtable. La sobrecarga (overloading) es ad-hoc y se resuelve en compile-time; no debe confundirse con el override.'
  };
  notes.value = rewrites[level];
  document.getElementById('undoRewriteBtn').disabled = false;
  const hint = document.getElementById('rewriteHint');
  hint.hidden = false;
  hint.textContent = `Material reescrito a nivel ${level}.`;
});

document.getElementById('undoRewriteBtn')?.addEventListener('click', () => {
  if (!previousNotes) return;
  document.getElementById('moduleNotes').value = previousNotes;
  document.getElementById('undoRewriteBtn').disabled = true;
  document.getElementById('rewriteHint').textContent = 'Cambio deshecho.';
});

document.getElementById('previewMediaBtn')?.addEventListener('click', () => {
  const url = document.getElementById('mediaUrlInput').value.trim();
  const preview = document.getElementById('mediaPreview');
  const frame = document.getElementById('mediaPreviewFrame');
  if (!url) {
    showToast('Pega una URL de YouTube, Spotify o Vimeo.');
    return;
  }

  let embed = '';
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const idMatch = url.match(/(?:v=|youtu\.be\/)([\w-]{6,})/);
    const id = idMatch ? idMatch[1] : 'dQw4w9WgXcQ';
    embed = `<iframe src="https://www.youtube.com/embed/${id}" title="Vista previa YouTube" allowfullscreen loading="lazy" data-track-play="youtube"></iframe>`;
  } else if (url.includes('spotify.com')) {
    embed = `<div class="media-fallback"><strong>Spotify</strong><p>${url}</p><button type="button" class="app-btn app-btn--sm app-btn--primary" data-track-click="spotify">Registrar inicio de reproducción</button></div>`;
  } else if (url.includes('vimeo.com')) {
    const id = url.split('/').pop();
    embed = `<iframe src="https://player.vimeo.com/video/${id}" title="Vista previa Vimeo" allowfullscreen loading="lazy" data-track-play="vimeo"></iframe>`;
  } else {
    embed = `<div class="media-fallback"><strong>Recurso externo</strong><p>${url}</p></div>`;
  }

  frame.innerHTML = embed;
  preview.hidden = false;
  showToast('Vista previa lista · tracking de interacción activo.');
});

document.getElementById('mediaPreview')?.addEventListener('click', (e) => {
  if (e.target.closest('[data-track-click], [data-track-play]')) {
    showToast('Interacción registrada en el reporte de analítica.');
  }
});

document.getElementById('generateFlashcardsBtn')?.addEventListener('click', () => {
  const draft = document.getElementById('flashcardsDraft');
  const grid = document.getElementById('flashDraftGrid');
  const cards = [
    { front: 'Polimorfismo', back: 'Misma interfaz, comportamientos distintos según el tipo concreto.' },
    { front: 'Sobreescritura', back: 'Redefinir en la subclase un método heredado con la misma firma.' },
    { front: 'Clase abstracta', back: 'No se instancia; puede declarar métodos abstractos a implementar.' }
  ];
  grid.innerHTML = cards.map((c, i) => `
    <div class="flash-draft-card">
      <label class="form-label">Anverso</label>
      <input class="form-input flash-front" data-i="${i}" value="${c.front}">
      <label class="form-label">Reverso</label>
      <textarea class="form-textarea flash-back" data-i="${i}" rows="2">${c.back}</textarea>
    </div>
  `).join('');
  draft.hidden = false;
  showToast('Flashcards generadas como borrador editable.');
});

document.getElementById('publishFlashcardsBtn')?.addEventListener('click', () => {
  showToast('Flashcards publicadas en el módulo del alumno.');
});

/* ——— Borrador evaluación HU09 ——— */
const draftQuestions = [
  {
    id: 'q1',
    text: '¿Qué diferencia al polimorfismo de la sobrecarga?',
    options: ['El momento de resolución (runtime vs compile-time)', 'Ambos son exactamente iguales', 'Solo existe en interfaces', 'No requiere herencia']
  },
  {
    id: 'q2',
    text: '¿Cuándo se usa una clase abstracta?',
    options: ['Cuando hay comportamiento parcial compartido', 'Para instanciar objetos genéricos', 'Solo en lenguajes funcionales', 'Nunca junto a interfaces']
  },
  {
    id: 'q3',
    text: 'La anotación @Override sirve para…',
    options: ['Detectar errores de firma al sobreescribir', 'Marcar métodos privados', 'Habilitar sobrecarga', 'Crear clases abstractas']
  }
];

function renderDraftQuestions() {
  const list = document.getElementById('draftQuestionList');
  if (!list) return;
  list.innerHTML = draftQuestions.map((q, index) => `
    <article class="draft-card" data-qid="${q.id}">
      <div class="draft-card__head">
        <h3>Pregunta ${index + 1}</h3>
        <div class="draft-card__actions">
          <button type="button" class="app-btn app-btn--sm app-btn--outline" data-edit-text="${q.id}">Editar texto</button>
          <button type="button" class="app-btn app-btn--sm app-btn--outline" data-edit-opts="${q.id}">Editar alternativas</button>
          <button type="button" class="app-btn app-btn--sm app-btn--muted" data-delete-q="${q.id}">Eliminar pregunta</button>
        </div>
      </div>
      <p class="draft-card__text" id="text-${q.id}">${q.text}</p>
      <ul class="draft-card__opts" id="opts-${q.id}">
        ${q.options.map((o) => `<li>${o}</li>`).join('')}
      </ul>
      <p class="inline-hint">Borrador — no visible para estudiantes hasta aprobar.</p>
    </article>
  `).join('');
}

document.getElementById('generateQuizBtn')?.addEventListener('click', () => {
  renderDraftQuestions();
  document.getElementById('publishSuccess').hidden = true;
});

document.getElementById('draftQuestionList')?.addEventListener('click', (event) => {
  const del = event.target.closest('[data-delete-q]');
  if (del) {
    const id = del.dataset.deleteQ;
    const idx = draftQuestions.findIndex((q) => q.id === id);
    if (idx >= 0) draftQuestions.splice(idx, 1);
    renderDraftQuestions();
    showToast('Pregunta eliminada del borrador.');
    return;
  }

  const editText = event.target.closest('[data-edit-text]');
  if (editText) {
    const q = draftQuestions.find((item) => item.id === editText.dataset.editText);
    const next = prompt('Editar texto de la pregunta:', q.text);
    if (next && next.trim()) {
      q.text = next.trim();
      renderDraftQuestions();
    }
    return;
  }

  const editOpts = event.target.closest('[data-edit-opts]');
  if (editOpts) {
    const q = draftQuestions.find((item) => item.id === editOpts.dataset.editOpts);
    const next = prompt('Editar alternativas (separadas por |):', q.options.join(' | '));
    if (next && next.trim()) {
      q.options = next.split('|').map((s) => s.trim()).filter(Boolean);
      renderDraftQuestions();
    }
  }
});

document.getElementById('approvePublishBtn')?.addEventListener('click', () => {
  const code = `NX-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  document.getElementById('spaceJoinCode').textContent = code;
  document.getElementById('publishSuccess').hidden = false;
  showToast('Evaluación aprobada y publicada. Visible para estudiantes.');
});

document.getElementById('copySpaceCodeBtn')?.addEventListener('click', async () => {
  const code = document.getElementById('spaceJoinCode').textContent;
  try {
    await navigator.clipboard.writeText(code);
    showToast('Código copiado.');
  } catch {
    showToast(`Código: ${code}`);
  }
});

/* ——— Analítica HU11 + HU16 ——— */
function renderWordCloud() {
  const cloud = document.getElementById('wordCloud');
  if (!cloud) return;
  cloud.innerHTML = wordClusters.map((w) => `
    <button type="button" class="word-chip" data-word="${w.word}" style="font-size:${0.85 + w.count / 20}rem" role="listitem">
      ${w.word} <span>${w.count}</span>
    </button>
  `).join('');
}

document.getElementById('wordCloud')?.addEventListener('click', (event) => {
  const chip = event.target.closest('[data-word]');
  if (!chip) return;
  const cluster = wordClusters.find((w) => w.word === chip.dataset.word);
  const box = document.getElementById('clusterExamples');
  document.getElementById('clusterExamplesTitle').textContent = `Ejemplos anónimos · “${cluster.word}”`;
  document.getElementById('clusterExamplesList').innerHTML =
    cluster.examples.map((ex) => `<li>${ex}</li>`).join('');
  box.hidden = false;
});

document.getElementById('generateDebateBtn')?.addEventListener('click', () => {
  const grid = document.getElementById('debateGrid');
  grid.hidden = false;
  grid.innerHTML = `
    <article class="debate-card">
      <p class="debate-card__eyebrow">DEBATE 1 · DIVISIÓN 52% / 48%</p>
      <h3>¿El polimorfismo requiere siempre herencia?</h3>
      <div class="debate-votes"><span style="width:52%">Sí — 52%</span><span style="width:48%">No — 48%</span></div>
    </article>
    <article class="debate-card">
      <p class="debate-card__eyebrow">DEBATE 2 · DIVISIÓN 50% / 50%</p>
      <h3>¿Override y overload deberían enseñarse juntos o por separado?</h3>
      <div class="debate-votes"><span style="width:50%">Juntos — 50%</span><span style="width:50%">Separados — 50%</span></div>
    </article>
    <article class="debate-card">
      <p class="debate-card__eyebrow">DEBATE 3 · DIVISIÓN 61% / 39%</p>
      <h3>¿Preferirías interfaces o clases abstractas para modelar un “pago”?</h3>
      <div class="debate-votes"><span style="width:61%">Interfaces — 61%</span><span style="width:39%">Abstractas — 39%</span></div>
    </article>
  `;
  showToast('3 tarjetas de debate listas para proyectar.');
});

/* ——— Config HU08 + HU15 ——— */
document.getElementById('saveThresholdsBtn')?.addEventListener('click', () => {
  document.getElementById('thresholdSaved').hidden = false;
  showToast('Umbrales guardados. Sin material extra si se supera el corte.');
});

document.querySelectorAll('.tutor-style').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tutor-style').forEach((b) => {
      b.classList.remove('is-active');
      b.setAttribute('aria-checked', 'false');
    });
    btn.classList.add('is-active');
    btn.setAttribute('aria-checked', 'true');
    document.getElementById('tutorStyleHint').textContent =
      `Estilo activo: ${btn.querySelector('strong').textContent}`;
  });
});

document.getElementById('logoutDocente')?.addEventListener('click', () => {
  localStorage.removeItem('nexia_role');
  localStorage.removeItem('nexia_user');
});

/* Init */
renderStudents();
renderModule('todos');
renderActivities();
renderTrendChart();
renderWordCloud();
renderDraftQuestions();
