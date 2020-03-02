#! /usr/bin/env ruby

require 'octokit'

client = Octokit::Client.new(:access_token => ENV["GITHUB_TOKEN"])
p client.user
