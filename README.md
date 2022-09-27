# Controllers

A collection of platform-agnostic modules for creating secure data models for cryptocurrency wallets.

## Modules

Please refer to the READMEs for the following packages for installation and usage instructions:

- [`@metamask/base-controller`](packages/base-controller)
- [`@metamask/controller-utils`](packages/controller-utils)
- [`@metamask/ens-controller`](packages/ens-controller)

## Usage

(TODO: Fill this out. Maybe keep the big picture stuff here and more details in the READMEs for packages?)

## Contributing

### Setup

- Install [Node.js](https://nodejs.org) version 14.
  - If you are using [nvm](https://github.com/creationix/nvm#installation) (recommended) running `nvm use` will automatically choose the right node version for you.
- Install [Yarn v3](https://yarnpkg.com/getting-started/install).
- Run `yarn install` to install dependencies and run any required post-install scripts.
- Run `yarn simple-git-hooks` to add a [Git hook](https://github.com/toplenboren/simple-git-hooks#what-is-a-git-hook) which will ensure that all files pass the linter before you push a branch.

### Testing and Linting

Run `yarn test` to run the tests once. To run tests on file changes, run `yarn test:watch`.

To enable debugger [via Chrome DevTools](https://jestjs.io/docs/troubleshooting#tests-are-failing-and-you-dont-know-why):

1.  run `yarn test:debug`
2.  navigate to `chrome://inspect`
3.  click "Open Dedicated DevTools for Node". Keep the DevTools window open
4.  stop/rerun the tests as needed

Run `yarn lint` to run the linter, or run `yarn lint:fix` to run the linter and fix any automatically fixable issues.

### Release & Publishing

The project, being a monorepo, follows a specific release process. This section will be updated appropriately once that process is crystallized.
