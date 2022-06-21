# Next.js Open Jira App

## DB connection
Run local database
```
docker-compose up -d
```
* -d means __detached__

MongoDB local connection url:
```
mongodb://localhost:27017/entriesdb
```

## Set environment variables
Rename __.env.template__ to __.env__

## Fill DB with mocked data
Send a GET request to the seed endpoint
```
http://localhost:3000/api/seed
```