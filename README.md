# Projeto TCC - Backend com NestJS

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## 📌 Descrição

Este repositório contém o backend do projeto de TCC, desenvolvido utilizando o framework [NestJS](https://nestjs.com/). O objetivo principal é gerenciar atividades pendentes e realizadas para idosos, permitindo o acompanhamento eficiente por supervisores e cuidadores.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Ambiente de execução
- **NestJS** - Framework para backend
- **TypeScript** - Linguagem utilizada
- **TypeORM** - ORM para banco de dados
- **PostgreSQL** - Banco de dados
- **Jest** - Testes unitários e E2E
- **Swagger** - Documentação da API
- **Docker** - Containerização

## 📂 Estrutura do Projeto

```
📁 src/
 ├── application/       # Casos de uso e lógica de negócio
 ├── domain/            # Entidades e contratos
 ├── infrastructure/    # Banco de dados e integrações
 ├── interfaces/        # Controladores e DTOs
 ├── main.ts            # Arquivo principal
```

## 🛠 Configuração do Ambiente

Antes de iniciar o projeto, configure as variáveis de ambiente criando um arquivo `.env` com os seguintes valores:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=admin
DB_PASSWORD=admin
DB_NAME=tcc
NODE_ENV=development
DB_TYPE=postgres
PORT=3000
```

## 🐳 Configuração do Docker

Para facilitar a configuração do ambiente de banco de dados, utilize o `docker-compose.yml` fornecido:

```yaml
version: '3.8'

services:
  postgres:
    container_name: DB-TCC
    image: postgres
    ports:
      - '5432:5432'
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: admin
      POSTGRES_DB: tcc
    volumes:
      - ./data/pg:/data/postgres
```

Execute o seguinte comando para iniciar o banco de dados:

```bash
docker-compose up -d
```

## 🔧 Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/Metamorcode/tcc.git
cd tcc
npm install
```

## ▶️ Execução do Projeto

Rodando o servidor em diferentes modos:

```bash
# Desenvolvimento
npm run start

# Modo de observação
npm run start:dev

# Produção
npm run start:prod
```

## ✅ Testes

O projeto possui cobertura de testes unitários e E2E:

```bash
# Testes unitários
npm run test

# Testes de ponta a ponta (E2E)
npm run test:e2e

# Cobertura de testes
npm run test:cov
```

## 📖 Documentação da API

A documentação da API foi gerada com Swagger e pode ser acessada localmente em:

```
http://localhost:3000/api#/
```

## 📜 Licença

Este projeto é licenciado sob a licença MIT - consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Contribuição

Fique à vontade para contribuir com melhorias no projeto. Para isso:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/minha-feature`)
3. Faça commit das mudanças (`git commit -m 'Adiciona nova feature'`)
4. Envie para o repositório (`git push origin feature/minha-feature`)
5. Abra um Pull Request 🚀

## 📬 Contato

Se tiver dúvidas ou sugestões, entre em contato:

- **GitHub**: [Metamorcode](https://github.com/Metamorcode/tcc.git)
- **Email**: leonardo.almonfrey@metamorcode.com

