const isGithubActions = process.env.GITHUB_ACTIONS || false;
let repo = '';

if (isGithubActions) {
  const repoName = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : '';
  if (repoName && !repoName.endsWith('.github.io')) {
    repo = `/${repoName}`;
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: repo,
  assetPrefix: repo ? `${repo}/` : undefined,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: repo,
  },
};

export default nextConfig;
