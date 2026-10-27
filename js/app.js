/* Interações demonstrativas do SGE. A ligação à base de dados será feita numa fase posterior. */
const toast = document.getElementById('toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

const modal = document.getElementById('actionModal');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');

const actionMessages = {
  'new-student': ['Registar novo aluno', 'O formulário de aluno será ligado à base de dados na próxima fase. Aqui serão recolhidos nome, matrícula, turma e contactos necessários.'],
  'new-class': ['Criar nova turma', 'Nesta área será possível definir o nome da turma, a classe, o ano lectivo e o professor responsável.'],
  'new-incident': ['Registar ocorrência', 'O registo incluirá o aluno, a data, a categoria, a descrição e as medidas tomadas. O acesso será restrito a utilizadores autorizados.'],
  'report': ['Preparar relatório', 'Antes da impressão, será apresentada uma síntese da fase actual, das tarefas concluídas, das pendências e da próxima etapa.'],
  'all-students': ['Lista de alunos', 'Esta ligação abrirá a página completa de alunos. Os dados apresentados neste protótipo são demonstrativos.'],
  'all-incidents': ['Histórico de ocorrências', 'Aqui será possível filtrar ocorrências por aluno, período, categoria e estado.'],
  'all-notifications': ['Centro de notificações', 'Nesta área serão reunidos avisos de matrículas, ocorrências, reuniões e outras actividades escolares.'],
  'all-events': ['Calendário de eventos', 'O calendário completo permitirá consultar e organizar as actividades do ano lectivo.']
};

document.querySelectorAll('[data-action]').forEach(button => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    const details = actionMessages[action];
    if (!details) return;
    modalTitle.textContent = details[0];
    modalText.textContent = details[1];
    if (typeof modal.showModal === 'function') modal.showModal();
    else showToast(details[0] + ' — funcionalidade demonstrativa.');
  });
});

document.getElementById('modalConfirm').addEventListener('click', event => {
  event.preventDefault();
  modal.close();
  showToast('Registado. A ligação à base de dados será implementada numa próxima fase.');
});

document.getElementById('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const dark = document.body.classList.contains('dark');
  document.getElementById('themeToggle').textContent = dark ? '☀' : '☾';
  localStorage.setItem('sge-theme', dark ? 'dark' : 'light');
});
if (localStorage.getItem('sge-theme') === 'dark') {
  document.body.classList.add('dark');
  document.getElementById('themeToggle').textContent = '☀';
}

const sidebar = document.getElementById('sidebar');
document.getElementById('menuToggle').addEventListener('click', () => sidebar.classList.toggle('open'));
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', event => {
    document.querySelectorAll('.nav-item').forEach(link => link.classList.remove('active'));
    item.classList.add('active');
    if (window.innerWidth <= 900) sidebar.classList.remove('open');
    const page = item.dataset.page;
    if (page !== 'Dashboard') {
      event.preventDefault();
      showToast(`${page}: módulo previsto para uma próxima fase.`);
    }
  });
});

document.getElementById('globalSearch').addEventListener('input', event => {
  const query = event.target.value.trim().toLocaleLowerCase('pt');
  const rows = [...document.querySelectorAll('#studentsTable tbody tr')];
  let visible = 0;
  rows.forEach(row => {
    const match = row.textContent.toLocaleLowerCase('pt').includes(query);
    row.hidden = !match;
    if (match) visible++;
  });
  document.getElementById('emptyState').hidden = visible > 0;
});
document.addEventListener('keydown', event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    document.getElementById('globalSearch').focus();
  }
});
document.getElementById('startButton').addEventListener('click', () => {
  document.getElementById('alunos').scrollIntoView({ behavior: 'smooth', block: 'start' });
  showToast('Bem-vinda ao SGE. Começa pela lista de alunos recentes.');
});
document.getElementById('notificationButton').addEventListener('click', () => {
  document.getElementById('mensagens').scrollIntoView({ behavior: 'smooth', block: 'center' });
  showToast('Tens 5 notificações por consultar.');
});
document.getElementById('profileButton').addEventListener('click', () => showToast('Perfil do administrador — autenticação a implementar.'));

/* Calendário funcional, com navegação entre meses. */
const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const weekdays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
let calendarDate = new Date(2026, 9, 1);
function renderCalendar() {
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const offset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const previousMonthDays = new Date(year, month, 0).getDate();
  const grid = document.getElementById('calendarGrid');
  grid.innerHTML = '';
  weekdays.forEach(day => {
    const el = document.createElement('span');
    el.className = 'weekday';
    el.textContent = day;
    grid.appendChild(el);
  });
  for (let i = 0; i < 42; i++) {
    const dayEl = document.createElement('span');
    let dayNumber;
    if (i < offset) {
      dayNumber = previousMonthDays - offset + i + 1;
      dayEl.classList.add('muted-day');
    } else if (i >= offset + daysInMonth) {
      dayNumber = i - offset - daysInMonth + 1;
      dayEl.classList.add('muted-day');
    } else {
      dayNumber = i - offset + 1;
      if (year === 2026 && month === 9 && dayNumber === 24) dayEl.classList.add('selected-day');
    }
    dayEl.textContent = dayNumber;
    grid.appendChild(dayEl);
  }
  const label = `${monthNames[month]} ${year}`;
  document.getElementById('monthLabel').textContent = label;
  document.getElementById('calendarMonth').textContent = label;
}
document.getElementById('prevMonth').addEventListener('click', () => {
  calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1);
  renderCalendar();
});
document.getElementById('nextMonth').addEventListener('click', () => {
  calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1);
  renderCalendar();
});
renderCalendar();

document.querySelectorAll('.text-button').forEach(button => {
  button.addEventListener('click', () => {
    if (!button.dataset.action) showToast('Esta secção será detalhada numa próxima fase.');
  });
});
