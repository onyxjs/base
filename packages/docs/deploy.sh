#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn build

# navigate into the build output directory
cd .vuepress/dist

git init
git add -A
git commit -m 'deploy'

# deploy to gh-pages branch
git push -f https://github.com/onyxjs/onyx master:gh-pages

cd -
