import * as core from '@actions/core'
import * as github from '@actions/github'

async function run(): Promise<void> {
  try {
    if (github.context.eventName !== 'pull_request') {
      core.info('This function Can only run on pull requests!')
      return
    }
    const githubToken = core.getInput('token')
    const context = github.context
    const repo = context.repo
    const pullRequestNumber = context.payload.pull_request?.number
    const octokit = github.getOctokit(githubToken)

    await octokit.rest.issues.createComment({
      ...repo,
      issue_number: pullRequestNumber ?? 1,
      body: 'Mensagem de teste!'
    })
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
