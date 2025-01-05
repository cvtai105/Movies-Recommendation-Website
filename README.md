# Movies Recommendation Website project

## Convention

1. Github:

-   Each member create their own branches (one or more branches) and develope features. <br> Once done, create pull request to main branch for CI proccess.<br> Each member is required to commit their code for every 2 days.<br>

-   Environment file: api key, secrete key, ... can be pushed to github. Their should be 2 .env template files for development and production

-   [Git commit message convention](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13)

    -   `feat` Commits, that adds or remove a new feature
    -   `fix` Commits, that fixes a bug
    -   `refactor` Commits, that rewrite/restructure your code, however does not change any API behaviour
    -   `perf` Commits are special refactor commits, that improve performance
    -   `style` Commits, that do not affect the meaning (white-space, formatting, missing semi-colons, etc)
    -   `test` Commits, that add missing tests or correcting existing tests
    -   `docs` Commits, that affect documentation only
    -   `build` Commits, that affect build components like build tool, ci pipeline, dependencies, project version, ...
    -   `ops` Commits, that affect operational components like infrastructure, deployment, backup, recovery, ...
    -   `chore` Miscellaneous commits e.g. modifying .gitignore <br>

    _example commit: `feat: add email notifications on new direct messages`_

2. Code convention:

-   UI:

    -   Use prettier to format code
    -   Folder
        -   components: Reusable React components
        -   apis: API interaction logic, such as fetch calls or Axios services.
        -   pages: Top-level views corresponding to routes
        -   layouts: Layout components that define the overall structure of the UI.
        -   consts: Constants such as API endpoints, configuration values, or reusable string literals.
        -   utils: Utility functions, such as data formatters, validators, or helper functions.

-   ASP.NET backend:

    -   Follow clean architecture
    -   Use entity framework to access database

-   Spring Boot backend:

3. Jira:

-   Each member create their own tasks and set timelines base on this file: [task assign](https://docs.google.com/spreadsheets/d/1-FGll0zG-p26ScuKfIzvkhJsJWIjO9MM/edit?gid=1078026055#gid=1078026055)

-   Jira would be reviewed every 2 days

4. Documents

-   Each member writes a description for the features they are responsible for, in [Reports/LabFinalProjectReport](./Reports/LabFinalProjectReport/README.md) folder
-   Can Use chatgpt for convinients.

## How to run app

[Instructions here](./Source/README.md)
