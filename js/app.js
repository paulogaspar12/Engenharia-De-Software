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
    const page = item.dataset.page;
    document.querySelectorAll('.nav-item').forEach(link => link.classList.remove('active'));
    item.classList.add('active');
    if (window.innerWidth <= 900) sidebar.classList.remove('open');
    if (page === 'Dashboard') {
      event.preventDefault();
      document.getElementById('profilesPage').hidden = true;
      document.getElementById('dashboard').hidden = false;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'Perfis e Acessos') {
      event.preventDefault();
      document.getElementById('dashboard').hidden = true;
      document.getElementById('profilesPage').hidden = false;
      renderProfiles();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
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


/* VERSÃO 2 — gestão demonstrativa de perfis e permissões.
   Os dados ficam no localStorage deste navegador; isto não substitui autorização no backend. */
const profileStorageKey = 'sge-v2-profiles';
const modules = ['Dashboard', 'Alunos', 'Matrículas', 'Turmas', 'Encarregados', 'Contactos de emergência', 'Ocorrências', 'Relatórios', 'Utilizadores', 'Configurações'];
const operations = ['consultar', 'criar', 'editar', 'eliminar'];
const operationLabels = { consultar: 'Consultar', criar: 'Criar', editar: 'Editar', eliminar: 'Eliminar' };
const roleIcons = { 'Administrador': '⚙', 'Direção': '▦', 'Secretaria': '▤', 'Professor': '♟', 'Responsável disciplinar': '✚', 'Consulta': '⌕' };
function makePermissions(levels) {
  const result = {};
  modules.forEach((module, index) => {
    const level = levels[index] || 0;
    result[module] = operations.map((_, operationIndex) => operationIndex < level);
  });
  return result;
}
const defaultProfiles = [
  { id: 'admin', name: 'Administrador', description: 'Administração técnica do sistema e gestão de acessos.', status: 'active', builtIn: true, permissions: makePermissions([4,4,4,4,4,4,4,4,4,4]) },
  { id: 'direction', name: 'Direção', description: 'Acompanhamento da escola e consulta de indicadores autorizados.', status: 'active', builtIn: true, permissions: makePermissions([1,1,1,1,1,1,1,1,0,1]) },
  { id: 'secretary', name: 'Secretaria', description: 'Gestão de matrículas, alunos e contactos institucionais.', status: 'active', builtIn: true, permissions: makePermissions([1,4,4,2,4,4,2,2,0,0]) },
  { id: 'teacher', name: 'Professor', description: 'Acompanhamento das turmas atribuídas e registos pedagógicos.', status: 'active', builtIn: true, permissions: makePermissions([1,1,0,1,0,1,2,1,0,0]) },
  { id: 'discipline', name: 'Responsável disciplinar', description: 'Registo e acompanhamento de ocorrências autorizadas.', status: 'active', builtIn: true, permissions: makePermissions([1,1,0,0,0,1,3,2,0,0]) },
  { id: 'viewer', name: 'Consulta', description: 'Consulta de módulos seleccionados sem alteração de dados.', status: 'active', builtIn: true, permissions: makePermissions([1,1,0,1,0,0,1,1,0,0]) }
];
let profiles = loadProfiles();
let selectedProfileId = profiles[0]?.id || 'admin';
let editingProfileId = null;
let permissionEditingProfileId = null;
function loadProfiles() {
  try {
    const saved = JSON.parse(localStorage.getItem(profileStorageKey));
    return Array.isArray(saved) ? saved : structuredClone(defaultProfiles);
  } catch (_) { return JSON.parse(JSON.stringify(defaultProfiles)); }
}
function saveProfiles() { localStorage.setItem(profileStorageKey, JSON.stringify(profiles)); }
function escapeHTML(value) { return String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char])); }
function permissionCount(profile) { return Object.values(profile.permissions || {}).reduce((sum, list) => sum + list.filter(Boolean).length, 0); }
function renderProfiles() {
  const query = (document.getElementById('profileSearch')?.value || '').trim().toLocaleLowerCase('pt');
  const tbody = document.getElementById('profilesTableBody');
  if (!tbody) return;
  const visibleProfiles = profiles.filter(profile => `${profile.name} ${profile.description}`.toLocaleLowerCase('pt').includes(query));
  tbody.innerHTML = visibleProfiles.map(profile => `
    <tr>
      <td><div class="role-cell"><span class="role-icon">${roleIcons[profile.name] || '♙'}</span><span><strong>${escapeHTML(profile.name)}</strong><small>${profile.builtIn ? 'Perfil base' : 'Perfil personalizado'}</small></span></div></td>
      <td class="role-description">${escapeHTML(profile.description || 'Sem descrição.')}</td>
      <td><span class="count-pill">${permissionCount(profile)} permissões</span></td>
      <td><span class="status-pill ${profile.status === 'active' ? '' : 'inactive'}">${profile.status === 'active' ? 'Activo' : 'Inactivo'}</span></td>
      <td><div class="row-actions"><button class="table-action" data-edit-profile="${escapeHTML(profile.id)}">Editar</button><button class="table-action" data-edit-permissions="${escapeHTML(profile.id)}">Permissões</button>${profile.builtIn ? '' : `<button class="table-action danger" data-delete-profile="${escapeHTML(profile.id)}" aria-label="Eliminar ${escapeHTML(profile.name)}">Eliminar</button>`}</div></td>
    </tr>`).join('');
  document.getElementById('profilesEmptyState').hidden = visibleProfiles.length > 0;
  document.getElementById('profileCount').textContent = profiles.length;
  document.getElementById('activeProfileCount').textContent = profiles.filter(profile => profile.status === 'active').length;
  renderPermissionMatrix(profiles.find(profile => profile.id === selectedProfileId) || profiles[0]);
}
function renderPermissionMatrix(profile) {
  const tbody = document.getElementById('permissionsTableBody');
  if (!tbody) return;
  if (!profile) { tbody.innerHTML = ''; document.getElementById('selectedProfileLabel').textContent = 'Sem perfil'; return; }
  selectedProfileId = profile.id;
  document.getElementById('selectedProfileLabel').textContent = profile.name;
  tbody.innerHTML = modules.map(module => {
    const list = profile.permissions?.[module] || [false,false,false,false];
    return `<tr><td>${escapeHTML(module)}</td>${operations.map((_, index) => `<td><span class="permission-check ${list[index] ? '' : 'no'}">${list[index] ? '✓' : '—'}</span></td>`).join('')}</tr>`;
  }).join('');
}
const profileModal = document.getElementById('profileModal');
const permissionsModal = document.getElementById('permissionsModal');
function openProfileForm(profile = null) {
  editingProfileId = profile?.id || null;
  document.getElementById('profileModalTitle').textContent = profile ? 'Editar perfil' : 'Novo perfil';
  document.getElementById('profileName').value = profile?.name || '';
  document.getElementById('profileDescription').value = profile?.description || '';
  document.getElementById('profileStatus').value = profile?.status || 'active';
  if (typeof profileModal.showModal === 'function') profileModal.showModal();
}
function openPermissionForm(profile) {
  if (!profile) return;
  permissionEditingProfileId = profile.id;
  document.getElementById('permissionsModalTitle').textContent = `Permissões — ${profile.name}`;
  const host = document.getElementById('permissionCheckboxes');
  host.innerHTML = modules.map(module => {
    const list = profile.permissions?.[module] || [false,false,false,false];
    return `<div class="permission-editor-row"><strong>${escapeHTML(module)}</strong>${operations.map((operation, index) => `<label>${operationLabels[operation]}<input type="checkbox" data-module="${escapeHTML(module)}" data-operation="${index}" ${list[index] ? 'checked' : ''}></label>`).join('')}</div>`;
  }).join('');
  if (typeof permissionsModal.showModal === 'function') permissionsModal.showModal();
}
document.getElementById('addProfileButton').addEventListener('click', () => openProfileForm());
document.getElementById('closeProfileModal').addEventListener('click', () => profileModal.close());
document.getElementById('cancelProfileButton').addEventListener('click', () => profileModal.close());
document.getElementById('closePermissionsModal').addEventListener('click', () => permissionsModal.close());
document.getElementById('cancelPermissionsButton').addEventListener('click', () => permissionsModal.close());
document.getElementById('profileSearch').addEventListener('input', renderProfiles);
document.getElementById('profilesTableBody').addEventListener('click', event => {
  const editButton = event.target.closest('[data-edit-profile]');
  const permissionsButton = event.target.closest('[data-edit-permissions]');
  const deleteButton = event.target.closest('[data-delete-profile]');
  if (editButton) openProfileForm(profiles.find(profile => profile.id === editButton.dataset.editProfile));
  if (permissionsButton) {
    const profile = profiles.find(item => item.id === permissionsButton.dataset.editPermissions);
    renderPermissionMatrix(profile);
    openPermissionForm(profile);
  }
  if (deleteButton) {
    const profile = profiles.find(item => item.id === deleteButton.dataset.deleteProfile);
    if (profile && confirm(`Eliminar o perfil “${profile.name}”?`)) {
      profiles = profiles.filter(item => item.id !== profile.id);
      if (selectedProfileId === profile.id) selectedProfileId = profiles[0]?.id;
      saveProfiles(); renderProfiles(); showToast('Perfil eliminado neste navegador.');
    }
  }
});
document.getElementById('profileForm').addEventListener('submit', event => {
  event.preventDefault();
  const name = document.getElementById('profileName').value.trim();
  const description = document.getElementById('profileDescription').value.trim();
  const status = document.getElementById('profileStatus').value;
  if (!name) return;
  const duplicate = profiles.some(profile => profile.name.toLocaleLowerCase('pt') === name.toLocaleLowerCase('pt') && profile.id !== editingProfileId);
  if (duplicate) { showToast('Já existe um perfil com esse nome.'); return; }
  if (editingProfileId) {
    const profile = profiles.find(item => item.id === editingProfileId);
    if (profile) { profile.name = name; profile.description = description; profile.status = status; selectedProfileId = profile.id; }
  } else {
    const profile = { id: `custom-${Date.now()}`, name, description, status, builtIn: false, permissions: Object.fromEntries(modules.map(module => [module, [false,false,false,false]])) };
    profiles.push(profile); selectedProfileId = profile.id;
  }
  saveProfiles(); profileModal.close(); renderProfiles(); showToast('Perfil guardado neste navegador.');
});
document.getElementById('permissionsForm').addEventListener('submit', event => {
  event.preventDefault();
  const profile = profiles.find(item => item.id === permissionEditingProfileId);
  if (!profile) return;
  profile.permissions = Object.fromEntries(modules.map(module => [module, operations.map((_, index) => {
    const checkbox = document.querySelector(`#permissionCheckboxes input[data-module="${CSS.escape(module)}"][data-operation="${index}"]`);
    return Boolean(checkbox?.checked);
  })]));
  selectedProfileId = profile.id; saveProfiles(); permissionsModal.close(); renderProfiles(); showToast('Permissões actualizadas neste navegador.');
});
document.getElementById('editSelectedPermissions').addEventListener('click', () => openPermissionForm(profiles.find(profile => profile.id === selectedProfileId)));
renderProfiles();
