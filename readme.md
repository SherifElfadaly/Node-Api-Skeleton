<!-- <p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Project logo"></a>
</p> -->

<h1>
<b>Node-Api-skeleton</b></h1>

<div display=none>

[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/SherifElfadaly/Node-Api-Skeleton/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/SherifElfadaly/Node-Api-Skeleton/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/SherifElfadaly/Node-Api-Skeleton/badges/build.png?b=master)](https://scrutinizer-ci.com/g/SherifElfadaly/Node-Api-Skeleton/build-status/master)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---


## 📝 Table of Contents

<!-- - [About](#about) -->
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)
<!-- - [TODO](../TODO.md) -->
<!-- - [Contributing](../CONTRIBUTING.md) -->

<!-- ## 🧐 About <a name = "about"></a>

... -->
## 🏁 Getting Started <a name = "getting_started"></a>



### Prerequisites

What things you need to install the software and how to install them.


- [Docker](https://www.docker.com/) for running app containers
- [Nodemon](https://nodemon.io/) nodemon for npm run watch command

<h> <b>  Outside Containers</b></h>
- [redis](https://redis.io/) - caching server
- [Mysql](https://www.mysql.com/) - Database
- [NodeJs](https://nodejs.org/en/) - Server Environment



### Installing Env
Development env must contains 
- [redis](https://redis.io/) - caching server
- [Mysql](https://www.mysql.com/) - Database
- [NodeJs](https://nodejs.org/en/) - Server Environment


### Start up

```
 - clone project
 - make .env file and copy .env-dev into it 
 - create db schema
 - modify .env file
 - install node_modules "npm install"
 - run "npm generate-key"
 - execute Database migration "npm run knex-migrate"
 - execute Database seed "npm run knex-seed"
 - start server "npm start"
```


## 🔧 Running the tests <a name = "tests"></a>

Test if server working
```
  - Run  curl localhost:3000/api/users"
  - Response should be >> {"errors":["Please login before any action"]}

```

## 🎈 Usage <a name="usage"></a>
 ### Create new module
```
  - npm run generate-module {moduleName} {tableName}
```
 ### Migrate database
```
  - npm run knex-migrate
```
 ### Seed database
```
  - npm run knex-seed
```
 ### Refresh database
```
  - npm run knex-refresh
```
 ### Rollback database
```
  - npm run knex-rollback
```
 ### Lint fix
```
  - npm run lint-fix
```

## 🚀 Deployment <a name = "deployment"></a>
```
  - Register gitlab runner and connect it with project repo
  - To deploy staging push to dev branch 
  - To deploy production push to master branch 
```
## ⛏️ Built Using <a name = "built_using"></a>

- [Mysql](https://www.mysql.com/) - Database
- [Knex](http://knexjs.org/) - Database Query Builder
- [Objection](https://vincit.github.io/objection.js/) - Database ORM
- [Express](https://expressjs.com/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

- [@Auther](https://github.com/AutherProfile) - role

See also the list of [contributors](https://github.com/kylelobo/The-Documentation-Compendium/contributors) who participated in this project.

## 🎉 Acknowledgements <a name = "acknowledgement"></a>
 ...
