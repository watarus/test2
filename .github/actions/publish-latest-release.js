const eventPayload = require(process.env.GITHUB_EVENT_PATH);
const tag = process.env.TAG.replace('refs/tags/', '');
const { Octokit } = require("@octokit/action");

run();

async function run() {
    const octokit = new Octokit();

    const { data: releases } = await octokit.request(
        "GET /repos/:repository/releases",
        {
            repository: process.env.GITHUB_REPOSITORY
        }
    );

    let release_id = 0;
    for (let i = 0; i < releases.length; ++i) {
        const release = releases[i];
        if (release["draft"]) {
            release_id = release["id"];
            break;
        }
    }

    if (release_id == 0) {
        return;
    }

    const release = await octokit.request(
        "PATCH /repos/:repository/releases/:release_id",
        {
            repository: process.env.GITHUB_REPOSITORY,
            release_id: release_id,
            draft: false,
            tag_name: tag
        }
    );

    console.log(release)
}
