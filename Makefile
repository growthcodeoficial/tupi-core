# Makefile para gcode-tupi-core
# Este Makefile facilita a construção, execução e teste do projeto usando Docker.

# Variáveis
DC_FILE_PATH := ./.docker/docker-compose.yml
SERVICE_NAME := gcode-tupi-core

# Definições de Comandos Docker
DC := docker-compose -f $(DC_FILE_PATH)

# .PHONY é usado para especificar comandos que não são associados a arquivos
.PHONY: build up down logs test test-file coverage

# Comando para construir a imagem Docker
build:
	$(DC) build

# Comando para subir os serviços via Docker
up:
	$(DC) up --build -d

# Comando para derrubar os serviços via Docker
down:
	$(DC) down

# Comando para visualizar os logs do serviço
logs:
	$(DC) logs -f --tail=100 $(SERVICE_NAME)

# Comandos de Teste
test:  # Comando para rodar todos os testes com Jest dentro do container
	$(DC) exec $(SERVICE_NAME) yarn test

test-file:  # Comando para rodar um arquivo de teste específico com Jest dentro do container
	$(DC) exec $(SERVICE_NAME) yarn test -- $(FILE)

coverage:  # Comando para rodar a cobertura de código com Jest dentro do container
	$(DC) exec $(SERVICE_NAME) yarn test --coverage
