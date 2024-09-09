<h2>WORK IN PROGRESS</h2>
## Description <br>
Welcome to my first Back End repository built with NestJS and associated with an SQL (MySQL) server using TypeORM. This project is intended to be used in conjunction with my Adventure's Journal Front End. This repository will manage the back end of that project, handling all RESTful API calls and the back end server logic. 
Please note: To use this repository, you will need to create your own relational database (MySQL) locally or connect it to one that you own. Finally (for both way, remember to create the right table, see entity, or use "<i>synchronize : true</i>" in the connection params). Finally remember to update the database connection settings in <b>app.module.ts</b>.

## EndPoint Documentation:
Note: remember to switch the part `http://localhost:8080` with your db local address.



Please for <b>`User`</b> use the following EndPoint:


Find all Users `(/users)`: <br>

GET `http://localhost:8080/users` 

Find User by Id `(/users/:id)`:<br>

GET `http://localhost:8080/users/:id`   

Create new User `(/users/create)`:<br>

POST `http://localhost:8080/users/create`

Update User by Id `(/users/update/:id)`:<br>

PUT `http://localhost:8080/users/update/:id`

Update User password By Id `(/users/update/password/:id)`:<br>
PUT `http://localhost:8080/users/update/password/:id`

Delete User by Id `(/users/delete/:id)`:<br>
DELETE `http://localhost:8080/users/delete/:id`




[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
