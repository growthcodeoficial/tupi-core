# Makefile para gcode-tupi-core

# Definindo o caminho do docker-compose
DC_FILE_PATH=./.docker/docker-compose.yml

# Comando para construir a imagem Docker
build:
	docker-compose -f $(DC_FILE_PATH) build

# Comando para subir os serviços via Docker
up:
	docker-compose -f $(DC_FILE_PATH) up --build -d

# Comando para derrubar os serviços via Docker
down:
	docker-compose -f $(DC_FILE_PATH) down

logs:
	docker-compose -f $(DC_FILE_PATH) logs
# Comando para acessar o shell do container gcode-tupi-core
logs:
	docker-compose -f $(DC_FILE_PATH) logs -f --tail=100 gcode-tupi-core

test:
# Comando para rodar todos os testes com Jest dentro do container
	docker-compose -f $(DC_FILE_PATH) exec gcode-tupi-core yarn test

# Comando para rodar um arquivo de teste específico com Jest dentro do container
test-file:
	docker-compose -f $(DC_FILE_PATH) exec gcode-tupi-core yarn test -- $(FILE)

# Comando para rodar a cobertura de código com Jest dentro do container
coverage:
	docker-compose -f $(DC_FILE_PATH) exec gcode-tupi-core yarn test --coverage
