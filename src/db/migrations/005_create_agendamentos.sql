CREATE TABLE IF NOT EXISTS agendamentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_barbeiro INT NOT NULL,
  id_cliente INT NOT NULL,
  id_servico INT NOT NULL,
  preco DECIMAL(10, 2) NOT NULL,
  duracao_minutos INT NOT NULL,
  status VARCHAR(255) NOT NULL DEFAULT 'agendado' CHECK (status IN ('agendado', 'concluido', 'cancelado')),
  data_hora_inicio DATETIME NOT NULL,
  inicio_ativo DATETIME GENERATED ALWAYS AS (CASE WHEN status = 'agendado' THEN data_hora_inicio END) STORED,
  data_hora_fim DATETIME GENERATED ALWAYS AS (DATE_ADD(data_hora_inicio, INTERVAL duracao_minutos MINUTE)) STORED,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_agendamentos_barbeiro FOREIGN KEY (id_barbeiro) REFERENCES barbeiros (id),
  CONSTRAINT fk_agendamentos_cliente FOREIGN KEY (id_cliente) REFERENCES usuarios (id),
  CONSTRAINT fk_agendamentos_servico FOREIGN KEY (id_servico) REFERENCES servicos (id),
  CONSTRAINT uq_barbeiro_inicio_ativo UNIQUE (id_barbeiro, inicio_ativo),
  INDEX idx_barbeiro_data_hora_inicio (id_barbeiro, data_hora_inicio)
);
