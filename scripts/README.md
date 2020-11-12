## Scripts 

### Summary :books:

The purpose of this folder is to expose the scripts related to infrastructure automation using in this project

- The container running this application will have a binnary called `scripts` to execute some automated tasks

### Usage :scroll:

- ***First of all*** you'll need to be inside it running container:
  - with kubernetes API `kubectl exec -ti pod-name sh`
  - with docker `docker exec -ti container-name sh`
  - and some these environment variables, assume that you are locally:
    - export POSTGRES_URL=postgres://postgres:admin@localhost:5432/grades-api?sslmode=disable
    - export APP_PATH=${pwd}/

- Running migrations: **`scripts -migration`**
- Running seeds : **`scripts -seed`**

### Compiling :computer:

> You'll need the go binary to execute this step but I promise that i'll try to keep [script binnary](./scripts) up to date. At scripts folder, just run:

```
 CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o ../api-scripts .
```

