#!/usr/bin/env bash

cd .. && yarn install

export SKIP_PREFLIGHT_CHECK=true
rm -fr build
yarn run build
