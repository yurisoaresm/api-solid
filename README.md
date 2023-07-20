# App
GymPass Style App

## Requisitos Funcionais
O que o usuário vai fazer na aplicação (usuário poderá logar, usuário poderá cadastrar, etc);
Não pensar em como o usuário vai fazer, mas sim o que ele vai fazer (tecnicamente).

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de checkIns realizados por um usuário logado;
- [ ] Deve ser possível o usuário obter o seu histórico de checkIns;
- [ ] Deve ser possível o usuário buscar por academias próximas;
- [ ] Deve ser possível o usuário buscar por academias pelo nome;
- [ ] Deve ser possível o usuário realizar chekIn em uma academia;
- [ ] Deve ser possível validar o checkIn de um usuário; 
- [ ] Deve ser possível cadastrar uma academia.

## Regras de Negócio
Condicionais para o funcionamento da aplicação; quando o usuário faz isso, acontece aquilo... (usuário só pode logar se estiver cadastrado, usuário só pode cadastrar se não estiver logado, etc)

- [ ] Não deve ser possível cadastrar um usuário com e-mail já existente;
- [ ] Não deve ser possível fazer 2 checkIns no mesmo dia;
- [ ] Não deve ser possível fazer checkIn se não estiver perto (100m) da academia;
- [ ] O checkIn só pode ser validado em até 20 minutos após ser criado;
- [ ] O checkIn só pode ser validado por um administrador;
- [ ] A academia só pode ser cadastrada por um administrador;

## Requisitos Não Funcionais
O que a aplicação precisa ter para funcionar (banco de dados, linguagem de programação, etc);
Não dependem do usuário.

- [ ] A senha do usuário deve estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas as listas de dados precisam estar paginadas em 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);
