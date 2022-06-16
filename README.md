# CARTOOL backend

RESTful API based on TypeScript + TypeORM + MySql + Express API Server.


## Prerequisite

-   node js version >= 10.xx.x
-   npm version >= 6.xx.x
-   express version >= 4.xx.x
-   typescript (tsc) version >= 4.xx.x

## Run Locally

Clone the project

```bash

git clone https://github.com/SAYNACROWDSOURCING/freelance-new-cartool-backend
```

Go to the project directory

```bash

cd freelance-new-cartool-backend

```


### Other methods

Install dependencies

```bash

yarn install

```

Create Database inside mysql and add the name of the database inside `.env.development.local` <br>

Start the server

```bash

npm run dev

```
ApiDoc

http://localhost:3000/api-docs/#/
## Call the API

Header for sending form-data:

```

Content-Type:multipart/form-data

```

Header for sending json format:

```

Content-Type:application/x-www-form-urlencoded

Accept:application/json

```