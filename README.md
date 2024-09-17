<h2>WORK IN PROGRESS</h2>
## Description <br>
Welcome to my first Back End repository built with NestJS and associated with an SQL (MySQL) server using TypeORM. This project is intended to be used in conjunction with my Adventure's Journal Front End. This repository will manage the back end of that project, handling all RESTful API calls and the back end server logic. 
Please note: To use this repository, you will need to create your own relational database (MySQL) locally or connect it to one that you own. Finally (for both way, remember to create the right table, see entity, or use "<i>synchronize : true</i>" in the connection params). Finally remember to update the database connection settings in <b>app.module.ts</b>.

Sanification and control of input are done and include: DTO control, HTML sanification, ID positive number etc...


## EndPoint Documentation:
Remember the part `http://localhost:8080` is local address, if you use different mode for local address please switch this with you mode.
All endpoint have 6 response: 200(with type of output),400,401,403,404 and 500.

If you clone this repository can use, after npm install, swagger UI for all API documentation. The endpoint for swagger is : <b>`/api`</b>. For more detailed specifications of the API, please refer to the documentation.

Default / app (without Guard)

Default path(Say Hello) `(/)`: <br>

GET `http://localhost:8080/` 

Health status `(/health)`: <br>

GET `http://localhost:8080/health` 

Attention: guard are deploy! Now you can navigate without the JWT only in <b>`(/user/auth/login)`</b> for authentication and in <b>`(/user/create)`</b> for SignUp new User. Other route are protected by LocalAuthGuard and request JWT in the req header!

After authentication, all queries requiring a user ID (such as fetching user details by ID) retrieve the ID directly from the JWT. This approach enhances security by preventing the ID from being exposed as a URL parameter or query, reducing the risk of unauthorized access or manipulation.


Please for <b>`Auth`</b> use the following EndPoint:

Login `(user/auth/login)`: <br>

GET `http://localhost:8080/user/auth/login` //Free port, JWT not necessary.

<hr>

Please for <b>`User`</b> use the following EndPoint:

Find all Users `(/user)`: <br>

GET `http://localhost:8080/user` 

Find User by Id `(/user/:id)`:<br>

GET `http://localhost:8080/user/`

Find User by Email `(/user/findby-email)`: <br>

GET `http://localhost:8080/user/findby-email`  <--- need query "email"

Create new User `(/user/create)`:<br>

POST `http://localhost:8080/user/create` //Free port, JWT not necessary.

Update User by Id `(/user/update/)`:<br>

PUT `http://localhost:8080/user/update/`

Update User password By Id `(/user/update/password/)`:<br>

PUT `http://localhost:8080/user/update/password/`

Delete User by Id `(/user/delete/:id)`:<br>

DELETE `http://localhost:8080/user/delete/:id`

<hr>

Please for <b>`UserProfile`</b> use the following EndPoint:

Get UserProfile by UserId `(/user/profile/)`: <br>

GET `http://localhost:8080/user/profile/` 

Update UserProfile by UserId `(/user/profile/update/)`: <br>

PUT `http://localhost:8080/user/profile/update/`

<hr>

Please for <b>`Journal`</b> use the following EndPoint:

Find all User's Journal `(/user/journal)`: <br>

GET `http://localhost:8080/user/journal/all` 

Find Journal by Journal ID `(/user/journal/:journalId)`: <br>

GET `http://localhost:8080/user/journal/:journalId` 

Create new Journal for the auth user `(/user/journal/add-journal)`: <br>

POST `http://localhost:8080/user/journal/add-journal`

Update Journal by Journal ID `(/user/journal/update/:journalId)`: <br>

PUT `http://localhost:8080/user/journal/update/:journalId` 

Delete Journal by Journal ID `(/user/journal/remove/:journalId)`: <br>

DELETE `http://localhost:8080/user/journal/remove/:journalId` 

<hr>

Please for <b>`Journal Pages`</b> use the following EndPoint:

Find all User's Journal Pages`(/user/journal/page)`: <br>

GET `http://localhost:8080/user/journal/page/all` 

Find the Journal Page by Page ID`(/user/journal/page/:id)`: <br>

GET `http://localhost:8080/user/journal/page/:id` 

Creat new Page for Journal`(/user/journal/page/add-page)`: <br>

POST `http://localhost:8080/user/journal/page/add-page` 

UPDATE the Journal Page by Page ID`(/user/journal/page/update/:id)`: <br>

PUT `http://localhost:8080/user/journal/page/update/:id` 

Delete the Journal Page by Page ID`(/user/journal/page/remove/:id)`: <br>

DELETE `http://localhost:8080/user/journal/page/remove/:id` 








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
