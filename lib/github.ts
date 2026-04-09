import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const owner = process.env.GITHUB_OWNER || 'matias78';
const repo = process.env.GITHUB_REPO || 'diario-evasion';
const branch = 'main';

export async function createOrUpdateFileInGitHub(
  path: string,
  content: string,
  message: string
): Promise<boolean> {
  try {
    // Check if file exists to get SHA
    let sha: string | undefined;
    try {
      const { data } = await octokit.repos.getContent({
        owner,
        repo,
        path,
        ref: branch,
      });

      if ('sha' in data) {
        sha = data.sha;
      }
    } catch (error: any) {
      // File doesn't exist, that's ok
      if (error.status !== 404) {
        throw error;
      }
    }

    // Create or update file
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message,
      content: Buffer.from(content).toString('base64'),
      branch,
      sha,
    });

    return true;
  } catch (error) {
    console.error('Error creating/updating file in GitHub:', error);
    return false;
  }
}

export async function deleteFileInGitHub(
  path: string,
  message: string
): Promise<boolean> {
  try {
    // Get file SHA
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path,
      ref: branch,
    });

    if (!('sha' in data)) {
      return false;
    }

    // Delete file
    await octokit.repos.deleteFile({
      owner,
      repo,
      path,
      message,
      sha: data.sha,
      branch,
    });

    return true;
  } catch (error) {
    console.error('Error deleting file in GitHub:', error);
    return false;
  }
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production' && !!process.env.GITHUB_TOKEN;
}
