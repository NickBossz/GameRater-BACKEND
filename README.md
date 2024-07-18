# Gamerater Backend

## Descrição
Este projeto é o backend de um site chamado Gamerater, desenvolvido utilizando a tecnologia Spring Boot. O Gamerater permite que usuários avaliem jogos, escrevam reviews e descubram novos títulos.

## Tecnologias Utilizadas
* **Spring Boot:** Framework Java para desenvolvimento de aplicações web.
* **[Outras tecnologias, como bancos de dados, ferramentas de build, etc.]:** Liste todas as tecnologias relevantes para o projeto.

## Pré-requisitos
* **Java:** Instale o JDK (Java Development Kit) na versão 17.
* **[Outras ferramentas, como um gerenciador de dependências, etc.]:** Liste todas as ferramentas necessárias para executar o projeto.

# GameRater - Backend

O GameRater é um projeto de backend desenvolvido em Spring Boot para um site de avaliação de jogos.

## Funcionalidades

- **Avaliações de Jogos**: CRUD completo para gerenciar avaliações de jogos.
- **Usuários**: Gerenciamento de usuários, incluindo criação, listagem e autenticação básica.
- **Denúncias**: Sistema para reportar conteúdo inapropriado.

## Pré-requisitos

- Java JDK 8 ou superior
- Apache Maven 3.x
- MySQL Server 5.x

## Configuração

1. **Clonar o repositório:**

   ```bash
   git clone [https://github.com/NickBossz/AvaliacaoJogos-BACKEND.git](https://github.com/NickBossz/AvaliacaoJogos-BACKEND.git)
   cd gamerater-backend
   ```

2. **Configurar o banco de dados:**

  Criar um banco de dados MySQL chamado "gamerater_api".

  Configure as credenciais do banco de dados em src/main/resources/application.properties.

  ```properties
  spring.datasource.url=jdbc:mysql://localhost:3306/gamerater_api
  spring.datasource.username=seu-usuario
  spring.datasource.password=sua-senha
  ```
