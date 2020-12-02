# Tips

## Database

To start up postgresql database locally with docker: `docker run --name grades-pg -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=grades-api -p 5432:5432 -d postgres:alpine`

docker container run -d -p 5433:5432 —name pg--volumes-from dbstorage -e POSTGRESQL_USER=docker -e POSTGRESQL_PASS=docker kamui/postgresql

To start up mongo database locally with docker: `docker run --name mongo -e MONGODB_DATABASE=grades -p 27017:27017 -d mongo`

## Backup n Restore

pg_dump grades-api -U postgres -h localhost -F c > backup_file
pg_restore -h <ip remote server> -p <port remote server> -U postgres -F backup.backup

> Or just use DBiever client !
## Modules

- To create a new module: `nest g mo college`
- Create a controller: `nest g co college`
- Create a service: `nest g s college`
