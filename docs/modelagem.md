# Usuários

| Coluna     | Tipo         | Restrição                                             |
| ---------- | ------------ | ----------------------------------------------------- |
| id         | int          | pk, AUTOINCREMENT                                     |
| nome       | varchar(255) | NOT NULL                                              |
| sobrenome  | varchar(255) | NOT NULL                                              |
| email      | varchar(255) | UNIQUE, NOT NULL                                      |
| telefone   | varchar(255) | NULL                                                  |
| senha_hash | varchar(255) | NOT NULL                                              |
| role       | varchar(255) | NOT NULL, CHECK( role IN ('admin', 'cliente'))        |
| created_at | datetime     | DEFAULT CURRENT_TIMESTAMP                             |
| updated_at | datetime     | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |

# Barbeiros

| Coluna     | Tipo         | Restrição                                             |
| ---------- | ------------ | ----------------------------------------------------- |
| id         | int          | pk, AUTOINCREMENT                                     |
| nome       | varchar(255) | NOT NULL                                              |
| sobrenome  | varchar(255) | NOT NULL                                              |
| ativo      | boolean      | NOT NULL, DEFAULT, BOOLEAN NOT NULL DEFAULT TRUE      |
| created_at | datetime     | DEFAULT CURRENT_TIMESTAMP                             |
| updated_at | datetime     | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |

# Serviços

| Coluna          | Tipo          | Restrição                                             |
| --------------- | ------------- | ----------------------------------------------------- |
| id              | int           | pk, AUTOINCREMENT                                     |
| nome            | varchar(255)  | NOT NULL                                              |
| duracao_minutos | int           | NOT NULL                                              |
| preco           | decimal(10,2) | NOT NULL                                              |
| ativo           | boolean       | NOT NULL DEFAULT TRUE                                 |
| created_at      | datetime      | DEFAULT CURRENT_TIMESTAMP                             |
| updated_at      | datetime      | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |

# Horários

| Coluna         | Tipo     | Restrição                                             |
| -------------- | -------- | ----------------------------------------------------- |
| id             | int      | pk, AUTOINCREMENT                                     |
| id_barbeiro    | int      | fk(Barbeiros(id)), NOT NULL                           |
| dia_semana     | tinyint  | NOT NULL, CHECK(dia_semana BETWEEN 0 AND 6)           |
| horario_inicio | time     | NOT NULL                                              |
| horario_fim    | time     | NOT NULL                                              |
| created_at     | datetime | DEFAULT CURRENT_TIMESTAMP                             |
| updated_at     | datetime | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |
|                |          | UNIQUE (id_barbeiro, dia_semana, horario_inicio)      |
|                |          | CHECK(horario_inicio < horario_fim)                   |

# Agendamentos

| Coluna           | Tipo          | Restrição                                                                                |
| ---------------- | ------------- | ---------------------------------------------------------------------------------------- |
| id               | int           | pk, AUTOINCREMENT                                                                        |
| id_barbeiro      | int           | fk(Barbeiros(id)), NOT NULL                                                              |
| id_cliente       | int           | fk(Usuarios(id)), NOT NULL                                                               |
| id_servico       | int           | fk(Servicos(id)), NOT NULL                                                               |
| preco            | decimal(10,2) | NOT NULL                                                                                 |
| duracao_minutos  | int           | NOT NULL                                                                                 |
| status           | varchar(255)  | NOT NULL, DEFAULT('agendado'), CHECK( status IN ('agendado', 'concluido', 'cancelado'))  |
| inicio_ativo     | datetime      | GENERATED ALWAYS AS (CASE WHEN status = 'agendado' THEN data_hora_inicio END) STORED     |
| data_hora_inicio | datetime      | NOT NULL                                                                                 |
| data_hora_fim    | datetime      | GENERATED ALWAYS AS (DATE_ADD(data_hora_inicio, INTERVAL duracao_minutos MINUTE)) STORED |
| created_at       | datetime      | DEFAULT CURRENT_TIMESTAMP                                                                |
| updated_at       | datetime      | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP                                    |
|                  |               | UNIQUE (id_barbeiro, inicio_ativo)                                                       |
|                  |               | INDEX (id_barbeiro, data_hora_inicio)                                                    |
