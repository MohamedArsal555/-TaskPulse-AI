// Role-based access, modeled on the Access Matrix:
//   Role            Users            Projects            Tasks/Logs              Blockers        Dashboard
//   Admin           Full             Full                Full                    Full            View
//   Project Manager View             Full                Full                    Full            View
//   Team Lead       View             Assigned projects   Full for assigned sprint Assigned team   View
//   Employee        Own profile      View assigned proj  Update own tasks/logs   Raise blockers  Own dashboard
//   Data Analyst    View required    View                View                    View            Build reports
//   Client Viewer   No employee det. View high-level only View summary only      No edit         View limited
//
// Mapped onto this console's actual pages: "Users" -> Workload Scoring,
// "Projects"/"Blockers" -> Sprint Risk, "Tasks/Logs" -> Delay Prediction.
// Every role also gets a fixed demo username/password so login is role-based.

export const LEVELS = {
  full:    { canEdit: true,  label: 'Full access' },
  edit:    { canEdit: true,  label: 'Edit access' },
  view:    { canEdit: false, label: 'View only' },
  limited: { canEdit: false, label: 'Limited / summary view' },
  none:    { canEdit: false, label: 'No access' },
};

export const ROLES = [
  {
    id: 'admin',
    label: 'Admin',
    username: 'admin',
    password: 'admin@123',
    color: '#7c3aed',
    description: 'Full control of users, projects, tasks and blockers.',
    permissions: { dashboard: 'view', workload: 'full', sprint: 'full', delay: 'full' },
  },
  {
    id: 'manager',
    label: 'Project Manager',
    username: 'manager',
    password: 'manager@123',
    color: '#2563eb',
    description: 'Full control of projects, tasks and blockers; views workload.',
    permissions: { dashboard: 'view', workload: 'view', sprint: 'full', delay: 'full' },
  },
  {
    id: 'teamlead',
    label: 'Team Lead',
    username: 'teamlead',
    password: 'teamlead@123',
    color: '#0d9488',
    description: 'Full task control for the assigned sprint; manages team blockers.',
    permissions: { dashboard: 'view', workload: 'view', sprint: 'limited', delay: 'full' },
  },
  {
    id: 'developer',
    label: 'Developer',
    username: 'developer',
    password: 'developer@123',
    color: '#c2410c',
    description: 'Updates own tasks/logs, raises blockers, views assigned project.',
    permissions: { dashboard: 'limited', workload: 'limited', sprint: 'limited', delay: 'edit' },
  },
  {
    id: 'analyst',
    label: 'Data Analyst',
    username: 'analyst',
    password: 'analyst@123',
    color: '#a16207',
    description: 'Read-only access across the board; builds dashboard reports.',
    permissions: { dashboard: 'full', workload: 'view', sprint: 'view', delay: 'view' },
  },
  {
    id: 'client',
    label: 'Client Viewer',
    username: 'client',
    password: 'client@123',
    color: '#64748b',
    description: 'High-level, summary-only visibility. No employee details, no edits.',
    permissions: { dashboard: 'limited', workload: 'none', sprint: 'limited', delay: 'limited' },
  },
];

export function findRoleByCredentials(username, password) {
  return ROLES.find((r) => r.username === username && r.password === password) || null;
}

export function findRoleById(id) {
  return ROLES.find((r) => r.id === id) || null;
}

export function canAccessNav(role, navKey) {
  const level = role?.permissions?.[navKey];
  return !!level && level !== 'none';
}

export function canEditNav(role, navKey) {
  const level = role?.permissions?.[navKey];
  return LEVELS[level]?.canEdit ?? false;
}

export function levelLabel(role, navKey) {
  const level = role?.permissions?.[navKey];
  return LEVELS[level]?.label ?? 'No access';
}
