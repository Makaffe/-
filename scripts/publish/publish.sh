#!/bin/bash

# set -u -e -o pipefail

readonly thisDir=$(cd $(dirname $0); pwd)

cd $(dirname $0)/../..

DIST="$(pwd)/dist"

NEXT=false
for ARG in "$@"; do
  case "$ARG" in
    -next)
      NEXT=true
      ;;
  esac
done

VERSION=$(node -p "require('./package.json').version")
echo "DIST: ${DIST}"
echo "NEXT?= ${NEXT}, Version ${VERSION}"

publishToMaster() {
  for p in `ls ${DIST}/@mt-rectify-framework`
  do
    cd ${DIST}/@mt-rectify-framework/${p}
    yarn publish -f --new-version ${VERSION} --registry http://192.168.1.19:9876/repository/npm-local/ < ../../../scripts/publish/npm_password
  done
}

publishToNext() {
  for p in `ls ${DIST}/@mt-rectify-framework`
  do
    cd ${DIST}/@mt-rectify-framework/${p}
    yarn publish -f --new-version ${VERSION} --tag next --registry http://192.168.1.19:9876/repository/npm-local/ < ../../../scripts/publish/npm_password
  done
}

yarn config set username deployment
yarn config set email deployment@matech.com

if [[ ${NEXT} == true ]]; then
  publishToNext
else
  publishToMaster
fi
