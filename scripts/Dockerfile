FROM golang:alpine as builder

WORKDIR /app
COPY . .
# Compiling Go Application into binary linux native.
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o api-scripts .

FROM alpine
COPY --from=builder /app/api-scripts  /usr/bin/
COPY --from=builder /app/database/*.json ./database/

ENTRYPOINT ["api-scripts"]