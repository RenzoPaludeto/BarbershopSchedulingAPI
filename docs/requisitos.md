# Requisitos do MVP

### Admin

- Fazer login
- Cadastrar barbeiro
- Ativar ou desativar barbeiro (coluna `ativo`)
- Cadastrar os horários de trabalho de cada barbeiro (dia da semana, início e fim, com a pausa)
- Cadastrar serviço
- Editar serviço (nome, preço, duração)
- Ativar ou desativar serviço
- Encerrar agendamento (muda o status para `concluido`)

### Cliente

- Criar conta
- Fazer login
- Listar barbeiros e serviços ativos
- Consultar os horários disponíveis de um barbeiro em uma data
- Criar agendamento
- Ver seus agendamentos
- Cancelar agendamento (com 24h de antecedência)

## 2. Regras de negócio

### Funcionamento e grade de horários

- A barbearia funciona de terça a domingo, das 09h às 18h. Esse é o limite máximo: o horário de cada barbeiro fica sempre dentro dele.
- A grade é fixa, em blocos de 30 minutos, e cada serviço dura 30 minutos.
- Cada barbeiro escolhe a sua pausa, de 1h. O expediente dele fica em dois blocos na tabela `horarios`: um antes e outro depois da pausa.
- Os horários de trabalho são guardados no horário local da barbearia (`America/Sao_Paulo`). A aplicação converte de/para UTC ao validar.

### Agendamento

- Cada agendamento tem 1 serviço.
- O preço e a duração são copiados do serviço no momento da marcação.
- Não é possível agendar no passado, nem com barbeiro ou serviço inativo.
- O mesmo barbeiro não pode ter 2 agendamentos no mesmo horário. A regra é garantida por um módulo na aplicação que verifica a disponibilidade e pela restrição `UNIQUE` no banco.
- O horário de um agendamento cancelado volta a ficar disponível.
- O cliente altera o horário cancelando o agendamento e criando outro.

### Status

- O status do agendamento é `agendado`, `cancelado` ou `concluido`.
- O cliente só cancela agendamentos `agendado`, com pelo menos 24h de antecedência do horário marcado.
- O admin só encerra agendamentos `agendado`, e somente depois do horário marcado.
- Nenhum agendamento é apagado: cancelar e encerrar mudam o status.

### Barbeiros e serviços

- Barbeiros que saíram da barbearia ficam como inativos (`ativo = false`): somem das listagens e não aceitam novos agendamentos, mas a linha é mantida.
- A mesma regra vale para serviços.
