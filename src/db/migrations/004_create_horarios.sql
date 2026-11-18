CREATE TABLE IF NOT EXISTS horarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_barbeiro INT NOT NULL,
  dia_semana TINYINT NOT NULL CHECK (dia_semana BETWEEN 0 AND 6),
  horario_inicio TIME NOT NULL,
  horario_fim TIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_horarios_barbeiro FOREIGN KEY (id_barbeiro) REFERENCES barbeiros (id),
  CONSTRAINT uq_barbeiro_dia_inicio UNIQUE (id_barbeiro, dia_semana, horario_inicio),
  CONSTRAINT chk_horario_inicio_fim CHECK (horario_inicio < horario_fim)
);
