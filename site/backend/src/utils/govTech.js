export function generateGostReport(repo, issues) {
  return {
    repoName: repo.name,
    issueCount: issues.length,
    timestamp: new Date().toISOString(),
    format: 'ГОСТ 34.602-2020'
  };
}