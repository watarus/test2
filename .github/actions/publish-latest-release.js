const eventPayload = require(process.env.GITHUB_EVENT_PATH);
const tag = process.env.TAG.replace('refs/tags/', '');
const { Octokit } = require("@octokit/action");

run();

async function run() {
  const octokit = new Octokit();

  // See https://developer.github.com/v3/issues/comments/#create-a-comment
  const { data } = await octokit.request(
    "GET /repos/:repository/releases/latest",
    {
      repository: process.env.GITHUB_REPOSITORY
    }
  );

  console.log("Data:", data);
  console.log("Payload:", eventPayload);
}
