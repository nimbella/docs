REM !/bin/bash

cd ..

set SKIP_PREFLIGHT_CHECK=true

IF EXIST build rd /S /Q build

yarn install && yarn run build
