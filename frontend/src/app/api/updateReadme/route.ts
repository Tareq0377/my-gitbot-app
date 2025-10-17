import { NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';

export async function POST(request: Request) {
  try {
    const { owner, repo } = await request.json();

    if (!owner || !repo) {
      return NextResponse.json({ error: 'owner and repo are required' }, { status: 400 });
    }

    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

    // 1️⃣ Get repository info
    const { data: repoData } = await octokit.repos.get({ owner, repo });
    const baseBranch = repoData.default_branch;

    // 2️⃣ Get latest commit SHA from default branch
    const { data: refData } = await octokit.git.getRef({
      owner,
      repo,
      ref: `heads/${baseBranch}`,
    });
    const latestCommitSha = refData.object.sha;

    const branchName = 'update-readme';
    let branchExists = false;

    // 3️⃣ Check if branch exists
    try {
      await octokit.repos.getBranch({ owner, repo, branch: branchName });
      branchExists = true;
    } catch (err: any) {
      if (err.status !== 404) throw err;
    }

    // 4️⃣ Create new branch if not exists
    if (!branchExists) {
      await octokit.git.createRef({
        owner,
        repo,
        ref: `refs/heads/${branchName}`,
        sha: latestCommitSha,
      });
    }

    // 5️⃣ Get README.md content
    const { data: readmeData } = await octokit.repos.getContent({
      owner,
      repo,
      path: 'README.md',
      ref: branchName,
    });

    const contentBuffer = Buffer.from(
      'content' in readmeData ? readmeData.content : '',
      'base64'
    );
    const currentContent = contentBuffer.toString('utf-8');

    const appendText = '\n## This is the System\nSuccessfully connected!\n';
    const newContent = currentContent.includes('## This is the System')
      ? currentContent // don't duplicate
      : currentContent + appendText;

    // 6️⃣ Update README.md
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: 'README.md',
      message: 'Update README.md: Add new section',
      content: Buffer.from(newContent).toString('base64'),
      sha: 'sha' in readmeData ? readmeData.sha : undefined,
      branch: branchName,
    });

    // 7️⃣ Check if PR already exists
    const { data: prs } = await octokit.pulls.list({
      owner,
      repo,
      head: `${owner}:${branchName}`,
      state: 'open',
    });

    let prUrl = prs.length > 0 ? prs[0].html_url : null;

    // 8️⃣ Create PR only if it doesn't exist
    if (!prUrl) {
      const pr = await octokit.pulls.create({
        owner,
        repo,
        title: 'Update README.md',
        head: branchName,
        base: baseBranch,
        body: 'Added a new section to the README',
      });
      prUrl = pr.data.html_url;
    }

    return NextResponse.json({
      success: true,
      message: 'README updated and PR created successfully',
      prUrl,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
