# gcode-tupi-core

`gcode-tupi-core` é um framework em TypeScript focado em manipulação DOM e gerenciamento de estado.

## Estrutura do Projeto

```plaintext
gcode-tupi-core/
│
├── __tests__/
├── .docker/
│   ├── .env
│   ├── docker-compose.yml
│   ├── Dockerfile
├── src/
│   ├── dom/
│   │   ├── virtual-dom/
│   │   │   ├── ElementFactory.ts
│   │   │   ├── ElementNode.ts
│   │   │   ├── Node.ts
│   │   │   ├── Renderer.ts
│   │   │   ├── TextNode.ts
│   │   ├── diffing/
│   │   │   ├── DiffingAlgorithm.ts
│   │   │   ├── DOMDiffResult.ts
│   │   │   ├── DOMOperation.ts
│   │   │   ├── NodeComparator.ts
│   ├── state/
│   ├── utilities/
│   ├── constants.ts
│   ├── types.ts
│   ├── index.ts
│   └── ...
├── docs/
│   └── ...
├── examples/
│   └── ...
├── package.json
├── tsconfig.json
├── Makefile
├── README.md
└── LICENSE
```

## Virtual DOM

O Virtual DOM é uma representação abstrata da estrutura DOM, que permite uma manipulação mais eficiente e controlada do DOM real. Dentro da pasta `virtual-dom`, você encontrará classes que representam diferentes tipos de nós, uma fábrica para criar elementos, e um renderizador para aplicar as mudanças no DOM real.

### ElementNode e TextNode

`ElementNode` e `TextNode` são representações de nós elementares e de texto, respectivamente, no Virtual DOM. `ElementNode` possui propriedades e pode ter filhos, enquanto `TextNode` representa texto puro.

### Renderizador

O `Renderer` é responsável por aplicar as mudanças do Virtual DOM no DOM real, permitindo uma atualização eficiente da interface do usuário.

## Diffing

O processo de 'diffing' compara duas árvores de nós do Virtual DOM para determinar as operações necessárias para atualizar o DOM real. As classes dentro da pasta `diffing` fornecem a lógica para esse processo.

### DiffingAlgorithm

`DiffingAlgorithm` é a classe que implementa o algoritmo de comparação entre as árvores do Virtual DOM.

### DOMDiffResult, DOMOperation e NodeComparator

`DOMDiffResult` representa o resultado do processo de diffing, `DOMOperation` representa uma operação individual necessária para atualizar o DOM real, e `NodeComparator` fornece a lógica para comparar nós individuais.

## Testes

Os testes podem ser encontrados na pasta `__tests__`, e são organizados de maneira semelhante à estrutura dentro de `src/`. Cada módulo tem seus próprios arquivos de teste correspondentes, facilitando a manutenção e a compreensão do código.

## Execução do Projeto via Makefile

O `Makefile` facilita a execução de diversas tarefas comuns durante o desenvolvimento do projeto `gcode-tupi-core`. Abaixo estão descritos os comandos disponíveis no `Makefile`:

### Comandos Docker

Esses comandos ajudam a gerenciar o ambiente Docker do projeto:

- **Construir Imagem Docker**:

  ```bash
  make build
  ```

  Este comando constrói a imagem Docker do projeto conforme definido no `Dockerfile`.

- **Iniciar Serviços**:

  ```bash
  make up
  ```

  Este comando inicia os serviços do projeto via Docker em modo detached.

- **Parar Serviços**:

  ```bash
  make down
  ```

  Este comando para todos os serviços que estão sendo executados via Docker.

- **Ver Logs**:

  ```bash
  make logs
  ```

  Este comando exibe os logs de todos os serviços Docker.

- **Ver Logs do gcode-tupi-core**:
  ```bash
  make logs
  ```
  Este comando exibe os últimos 100 logs do serviço `gcode-tupi-core`.

### Comandos de Teste

Esses comandos ajudam a executar os testes do projeto dentro do contêiner Docker:

- **Executar Todos os Testes**:

  ```bash
  make test
  ```

  Este comando executa todos os testes do projeto usando o Jest.

- **Executar Arquivo de Teste Específico**:

  ```bash
  make test-file FILE=path/do/arquivo.test.ts
  ```

  Este comando executa um arquivo de teste específico. Substitua `path/do/arquivo.test.ts` pelo caminho do arquivo de teste que você deseja executar.

- **Executar Cobertura de Código**:
  ```bash
  make coverage
  ```
  Este comando executa todos os testes e gera um relatório de cobertura de código.

Esses comandos encapsulam a complexidade de gerenciar o ambiente Docker e executar testes, tornando o processo de desenvolvimento mais eficiente e menos propenso a erros.
