export const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: 'home' },
  { key: 'delay', label: 'Delay Prediction', icon: 'clock' },
  { key: 'workload', label: 'Workload Scoring', icon: 'scale' },
  { key: 'sprint', label: 'Sprint Risk', icon: 'target' },
];

export const PAGE_TITLES = {
  dashboard: { title: 'Dashboard', subtitle: 'Live overview of the TaskPulse AI microservice' },
  delay: { title: 'Task Delay Prediction', subtitle: 'Estimate the delay risk of an in-progress task' },
  workload: { title: 'Workload Scoring', subtitle: 'Check an employee’s current capacity utilisation' },
  sprint: { title: 'Sprint Risk Prediction', subtitle: 'Assess whether a sprint is on track to complete' },
  profile: { title: 'Profile', subtitle: 'Your account, access level and team' },
};
