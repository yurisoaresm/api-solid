# App
GymPass Style App

## Requisitos Funcionais
O que o usuário vai fazer na aplicação (usuário poderá logar, usuário poderá cadastrar, etc);
Não pensar em como o usuário vai fazer, mas sim o que ele vai fazer (tecnicamente).

- [x] Deve ser possível cadastrar um usuário;
- [x] Deve ser possível autenticar um usuário;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de checkIns realizados por um usuário logado;
- [x] Deve ser possível o usuário obter o seu histórico de checkIns;
- [x] Deve ser possível o usuário buscar por academias próximas (até 10km);
- [x] Deve ser possível o usuário buscar por academias pelo nome;
- [x] Deve ser possível o usuário realizar chekIn em uma academia;
- [x] Deve ser possível validar o checkIn de um usuário; 
- [x] Deve ser possível cadastrar uma academia.

## Regras de Negócio
Condicionais para o funcionamento da aplicação; quando o usuário faz isso, acontece aquilo... (usuário só pode logar se estiver cadastrado, usuário só pode cadastrar se não estiver logado, etc)

- [x] Não deve ser possível cadastrar um usuário com e-mail já existente;
- [x] Não deve ser possível fazer 2 checkIns no mesmo dia;
- [x] Não deve ser possível fazer checkIn se não estiver perto (100m) da academia;
- [x] O checkIn só pode ser validado em até 20 minutos após ser criado;
- [ ] O checkIn só pode ser validado por um administrador;
- [ ] A academia só pode ser cadastrada por um administrador;

## Requisitos Não Funcionais
O que a aplicação precisa ter para funcionar (banco de dados, linguagem de programação, etc);
Não dependem do usuário.

- [x] A senha do usuário deve estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas as listas de dados precisam estar paginadas em 20 itens por página;
- [ ] O usuário deve ser identificado em toda a aplicação por um JWT (JSON Web Token);

## Observações

A pasta vitest-environment-prisma contém uma suite para executar os testes e2e isoladamente, isto é, sem interferir entre si e no banco de dados de desenvolvimento. Note que nela nós criamos um schema diferente para cada um dos testes, e criamos as tabelas com o comando `npx prisma deploy` (e não com o comando `npx prisma migrate dev`, porque não queremos comparar as migrations anteriores). A função setup() é executada antes dos testes, enquanto teardown(), depois.
