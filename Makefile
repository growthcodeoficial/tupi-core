# Makefile para gcode-tupi-core

# Definindo o caminho do docker-compose
DC_FILE_PATH=./.docker/docker-compose.yml

# Comando para instalar as dependências
install:
	npm install

# Comando para construir o projeto
build:
	npm run build

# Comando para rodar os testes
test:
	npm run test

# Comando para rodar o linter
lint:
	npm run lint

# Comando para rodar o projeto em modo de desenvolvimento
dev:
	npm run dev

# Comando para limpar os arquivos gerados na construção
clean:
	rm -rf dist

# Comando para publicar o pacote no npm
publish:
	npm publish

# Comando para construir a imagem Docker
docker-build:
	docker-compose -f $(DC_FILE_PATH) build

# Comando para subir os serviços via Docker
docker-up:
	docker-compose -f $(DC_FILE_PATH) up --build

# Comando para derrubar os serviços via Docker
docker-down:
	docker-compose -f $(DC_FILE_PATH) down

docker-bash:
	docker-compose -f $(DC_FILE_PATH) exec gcode-tupi-core /bin/bash

