all:proto
PRODADDR=joshcarp-altethical-ogaheemccq-uc.a.run.app
PORT=443
INCLUDE=-I/go/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis
.PHONY: proto proto-docker

docs: sysl          ## Make sysl documentation
	rm -rf service-documentation/ || true
	mkdir service-documentation
	docker run --rm -v $$(pwd)/:/usr/altethical:rw -v $$(pwd)/service-documentation:/out:rw  anzbank/sysl-catalog:v1.4.148 --embed --outputFileName={{.Title}}.md --plantuml=https://plantuml.com/plantuml --templates=altethical/sysl/templates/project.tmpl,altethical/sysl/templates/package.tmpl ./altethical/sysl/index.sysl
	docker run --rm -v $$(pwd)/:/usr/altethical:rw -v $$(pwd)/docs/services:/out:rw  anzbank/sysl-catalog:v1.4.148 --type=html --embed --outputFileName=index.html --plantuml=https://plantuml.com/plantuml --templates=altethical/sysl/templates/project-html.tmpl,altethical/sysl/templates/package.tmpl ./altethical/sysl/index.sysl

docs.preview: sysl  ## Preview service documentation
	docker run --rm -v $$(pwd)/:/usr/altethical:rw -p 6900:6900 -v $$(pwd)/service-documentation:/out:rw  anzbank/sysl-catalog:v1.4.148 --serve --embed --plantuml=https://plantuml.com/plantuml ./altethical/sysl/index.sysl

proto:              ## Remake the proto generation
	docker run --rm -v $$(pwd):/altethical:rw joshcarp/protoc $(INCLUDE) -I./altethical/proto/ --go_out=paths=source_relative:/altethical/backend/pkg/proto/altethical api.proto
	docker run --rm -v $$(pwd):/altethical:rw joshcarp/protoc $(INCLUDE) -I././altethical/proto/ --go-grpc_out=paths=source_relative:/altethical/backend/pkg/proto/altethical api.proto
	docker run --rm -v $$(pwd):/altethical:rw joshcarp/protoc $(INCLUDE) -I././altethical/proto/ --js_out=import_style=commonjs:/altethical/frontend/src/proto api.proto
	docker run --rm -v $$(pwd):/altethical:rw joshcarp/protoc $(INCLUDE) -I././altethical/proto/ --grpc-web_out=import_style=commonjs,,mode=grpcwebtext:/altethical/frontend/src/proto api.proto
	docker run --rm -v $$(pwd):/altethical:rw anzbank/protoc-gen-sysl:v0.0.28 $(INCLUDE) -I./altethical/proto/ --sysl_out=/altethical/sysl/generated/ api.proto
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

docker-compose:     ## Run all the services in build/docker-compose.yaml
	docker-compose -f docker-compose.yaml up

help:               ## Show this help.
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

.PHONY: fontend
fontend:
	cd frontend && npm install && npm start

website:
	rm -rf docs/* && echo "docs.epicportfol.io" > docs/CNAME && cd hugo && hugo -t reveal-hugo && mv  public/* ../docs && cd .. && make docs -B
