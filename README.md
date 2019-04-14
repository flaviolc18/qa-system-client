# Projeto Engenharia de Software

Implementacao de um sistema web de perguntas e respostas baseando na metodologia de desenvolvimento de software Extreme Programming

# Tecnologias

A serem definidas

# Workflow

Basicamente:

- Escolha uma funcionalidade, alteração, correção de bug para implementar (as stories estarão no Trello)

- Crie um novo branch à partir do master com o comando:

      git checkout -b <NOME_DO_BRANCH>

- Codifique a nova funcionalidade / alteração no branch criado com os comandos:

      git add <CAMINHO_ARQUIVO>
      git commit -m <MENSAGEM_COMMIT>
      git push

- Ao desenvolver certifique-se de testar todas as funcionalidades adicionadas

- Crie um Pull Request para review e aprovação do seu código, este deverá ser revisado por TODOS os membros do grupo antes de ser integrado ao master, portanto legibilidade e manutenibilidade são focos super importantes a se considerar

- Depois de aprovado por todos os membros do grupo, o criador do PR é quem deve integrá-lo ao branch master, <b>OBS:</b> marque a opção "<b>Squash and merge</b>" e use o nome do PR como o nome do commit, além disso não se esqueça de apagar o branch uma vez que este estiver integrado ao master

# Convenção de Mensagens de Commit

      < tipo >[ escopo opcional ]: < descrição >

Os <b>tipos</b> se resumem em <b> feat, fix, refactor, style, chore, doc e test </b>

- <b> feat</b> são quaisquer adições ao código. Enquanto elas podem alterar parte do código já existente, o foco dela é a implementação de features novas ao ecossistema.

- <b> fix</b> refere-se às correções de bugs.

- <b> refactor</b> refere-se a quaisquer mudanças que atinjam o código, porém não alterem sua funcionalidade. Alterou o formato de como é processamento em determinada parte da sua tela, mas manteve a mesma funcionalidade? Declare como refactor.

- Alterações referentes a formatações de código, semicolons, trailing spaces e lint em geral são em <b>style</b>.

- <b>chore</b> serve para qalquer tarefa que não gera alterações do código em produção

- Com <b>doc</b>, temos conteúdo relativo à documentação.

- Commits com tipo <b>test</b> estão relacionados às modificações e adições aos testes.

<b> Escopos </b> podem ser quaisquer partes do projeto; é importante que eles sejam compreendidos de uma maneira quase automática para alguém que não conhece o projeto. Em geral, a utilização do escopo é bem genérica, especificando apenas o primeiro contexto (login, middleware, profile).

As <b>descrições</b> devem ser suficientemente claras, utilizando seu espaço até o máximo permitido da linha (70 caracteres).

<b>Exemplos: </b>

- feat(routes/settings): adjust settings to be called in any screen.

# Trello do projeto:

https://trello.com/b/wHcYpqUq

# Integrantes

- Flavio Lucio Correa Junior
- Marcos Vinicius Moreira Santos
- Antônio Côrtes Rodrigues
- Tomás Tamantini
