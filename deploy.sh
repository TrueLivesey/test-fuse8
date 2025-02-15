#!/usr/bin/env sh

set -e

npm run build

cd dist

git init
git add -A
git commit -m 'deploy'
git branch -M main

git push -f git@github.com:truelivesey/test-fuse8.git main:gh-pages

cd -