npm i -g typescript
mkdir cleants
cd cleants
tsc --init
code .
tsconfig.jscon => "target": "es2018"
Ctrl+Shit+B => build - tsconfig
Ctrl+Shit+P => task default => build - tsconfig
F5
"program": "${workspaceFolder}/0 - hello/hello.js",
"sourceMap": true /* Generates corresponding '.map' file. */,
yarn add --dev jest
yarn add --dev ts-jest @types/jest
yarn ts-jest config:init
 "scripts": {
    "build": "tsc 0-hello/hello.ts",
    "test": "jest"
  },