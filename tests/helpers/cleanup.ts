import fs from 'fs';
import path from 'path';

/**
 * Clean up test posts created during testing
 */
export function cleanupTestPosts() {
  const postsDir = path.join(process.cwd(), 'content/posts');

  if (!fs.existsSync(postsDir)) {
    return;
  }

  const testFiles = fs.readdirSync(postsDir)
    .filter(file => file.startsWith('test-') && file.endsWith('.md'));

  testFiles.forEach(file => {
    fs.unlinkSync(path.join(postsDir, file));
  });
}

/**
 * Clean up test comments
 */
export function cleanupTestComments() {
  const commentsDir = path.join(process.cwd(), 'data/comments');

  if (!fs.existsSync(commentsDir)) {
    return;
  }

  const testFiles = fs.readdirSync(commentsDir)
    .filter(file => file.startsWith('test-'));

  testFiles.forEach(file => {
    fs.unlinkSync(path.join(commentsDir, file));
  });
}

/**
 * Reset test credentials to default
 */
export function resetTestCredentials() {
  const credentialsFile = path.join(process.cwd(), 'config/credentials.json');
  const defaultCredentials = {
    username: 'admin',
    password: 'admin123'
  };

  if (fs.existsSync(credentialsFile)) {
    fs.writeFileSync(
      credentialsFile,
      JSON.stringify(defaultCredentials, null, 2)
    );
  }
}
