all:
	make verify
	go build ./...

verify:
	go fmt ./...
	go vet ./...
	go test ./...
