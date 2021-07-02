all:proto
PRODADDR=altethical-ogaheemccq-uc.a.run.app
PORT=443
INCLUDE=-I/go/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis
.PHONY: proto proto-docker

proto:              ## Remake the proto generation
	docker run --rm -v $$(pwd):/altethical:rw joshcarp/protoc $(INCLUDE) -I./altethical/proto/ --go_out=paths=source_relative:/altethical/backend/pkg/proto/altethical api.proto
	docker run --rm -v $$(pwd):/altethical:rw joshcarp/protoc $(INCLUDE) -I././altethical/proto/ --go-grpc_out=paths=source_relative:/altethical/backend/pkg/proto/altethical api.proto
	docker run --rm -v $$(pwd):/altethical:rw joshcarp/protoc $(INCLUDE) -I././altethical/proto/ --js_out=import_style=commonjs:/altethical/frontend/src/proto api.proto
	docker run --rm -v $$(pwd):/altethical:rw joshcarp/protoc $(INCLUDE) -I././altethical/proto/ --grpc-web_out=import_style=commonjs,,mode=grpcwebtext:/altethical/frontend/src/proto api.proto
	printf '%s\n%s\n' "/* eslint-disable */" "$$(cat ./frontend/src/proto/api_pb.js)" > ./frontend/src/proto/api_pb.js

docker:             ## Build the authentication service
	docker build .  --build-arg SERVICE=$(SERVICE) -t joshcarp/altethical

run:                ## Run docker
	docker run --rm -p 443:443 joshcarp/altethical

ping:               ## Ping the authentication service
	docker run --rm joshcarp/grpcurl -d '{"email": "Hello", "password": "123", "userid": "123" }' --plaintext host.docker.internal:$(PORT) altethical.authenticate/Register

client:             ## Make the demo client
	docker build . -f build/client.Dockerfile -t joshcarp/altethical-client

client.run:         ## Run the demo client in docker
	docker run --rm -e ADDR=host.docker.internal:443 joshcarp/altethical-client

secret:             ## Remake a jwt secret
	openssl rand -hex 64  | pbcopy

help:               ## Show this help.
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

.PHONY: fontend
fontend:
	cd frontend && npm install && npm start

website:
	rm -rf docs/* && echo "docs.epicportfol.io" > docs/CNAME && cd hugo && hugo -t reveal-hugo && mv  public/* ../docs && cd .. && make docs -B
