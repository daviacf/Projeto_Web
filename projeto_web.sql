-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 26/06/2025 às 19:46
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `projeto_web`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `baralhos`
--

CREATE TABLE `baralhos` (
  `id` char(36) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descricao` text DEFAULT NULL,
  `usuario_id` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `baralhos`
--

INSERT INTO `baralhos` (`id`, `titulo`, `descricao`, `usuario_id`) VALUES
('12345678-90ab-cdef-0123-456789abcdef', 'Verbos em Inglês', 'Verbos irregulares comuns.', 'a1b2c3d4-e5f6-7890-1234-567890abcdef'),
('c3d4e5f6-a7b8-9012-3456-7890abcdef12', 'Fórmulas de Física', 'Fórmulas importantes de física básica.', 'a1b2c3d4-e5f6-7890-1234-567890abcdef'),
('d4e5f6a7-b8c9-0123-4567-890abcdef123', 'Elementos da Tabela Periódica', 'Símbolos e nomes de elementos químicos.', 'a1b2c3d4-e5f6-7890-1234-567890abcdef'),
('f0e9d8c7-b6a5-4321-fedc-ba9876543210', 'Capitais do Mundo', 'Um baralho para aprender capitais.', 'a1b2c3d4-e5f6-7890-1234-567890abcdef');

-- --------------------------------------------------------

--
-- Estrutura para tabela `cartoes`
--

CREATE TABLE `cartoes` (
  `id` char(36) NOT NULL,
  `frente` text NOT NULL,
  `verso` text NOT NULL,
  `baralho_id` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `cartoes`
--

INSERT INTO `cartoes` (`id`, `frente`, `verso`, `baralho_id`) VALUES
('0a1b2c3d-e4f5-a6b7-c8d9-e0f1a2b3c4d5', 'to eat', 'ate / eaten', '12345678-90ab-cdef-0123-456789abcdef'),
('1a2b3c4d-e5f6-a7b8-c9d0-e1f2a3b4c5d6', 'to drink', 'drank / drunk', '12345678-90ab-cdef-0123-456789abcdef'),
('2a3b4c5d-e6f7-a8b9-c0d1-e2f3a4b5c6d7', 'Argentina', 'Buenos Aires', 'f0e9d8c7-b6a5-4321-fedc-ba9876543210'),
('3a4b5c6d-e7f8-a9b0-c1d2-e3f4a5b6c7d8', 'Chile', 'Santiago', 'f0e9d8c7-b6a5-4321-fedc-ba9876543210'),
('4a5b6c7d-e8f9-a0b1-c2d3-e4f5a6b7c8d9', 'Colômbia', 'Bogotá', 'f0e9d8c7-b6a5-4321-fedc-ba9876543210'),
('5a6b7c8d-e9f0-a1b2-c3d4-e5f6a7b8c9d0', 'Peru', 'Lima', 'f0e9d8c7-b6a5-4321-fedc-ba9876543210'),
('6a7b8c9d-e0f1-a2b3-c4d5-e6f7a8b9c0d1', 'Segunda Lei de Newton', 'F = ma', 'c3d4e5f6-a7b8-9012-3456-7890abcdef12'),
('7a8b9c0d-e1f2-a3b4-c5d6-e7f8a9b0c1d2', 'Energia Cinética', 'Ec = (mv^2)/2', 'c3d4e5f6-a7b8-9012-3456-7890abcdef12'),
('8a9b0c1d-e2f3-a4b5-c6d7-e8f9a0b1c2d3', 'Densidade', 'd = m/V', 'c3d4e5f6-a7b8-9012-3456-7890abcdef12'),
('9f8e7d6c-b5a4-3210-fedc-ba9876543210', 'H', 'Hidrogênio', 'd4e5f6a7-b8c9-0123-4567-890abcdef123'),
('a0b1c2d3-e4f5-a6b7-c8d9-e0f1a2b3c4d5', 'He', 'Hélio', 'd4e5f6a7-b8c9-0123-4567-890abcdef123'),
('b1a2c3d4-e5f6-7890-1234-567890abcdef', 'Japão', 'Tóquio', 'f0e9d8c7-b6a5-4321-fedc-ba9876543210'),
('b2c3d4e5-f6a7-b8c9-d0e1-f2a3b4c5d6e7', 'O', 'Oxigênio', 'd4e5f6a7-b8c9-0123-4567-890abcdef123'),
('b8da23cc-6421-4a7b-a4e8-3f81e1f86847', 'to write', 'wrote / written', '12345678-90ab-cdef-0123-456789abcdef'),
('c1d2e3f4-a5b6-c7d8-e9f0-a1b2c3d4e5f6', 'Brasil', 'Brasília', 'f0e9d8c7-b6a5-4321-fedc-ba9876543210'),
('c3d4e5f6-a7b8-c9d0-e1f2-a3b4c5d6e7f8', 'C', 'Carbono', 'd4e5f6a7-b8c9-0123-4567-890abcdef123'),
('c9a8b7c6-d5e4-f3a2-b1c0-d9e8f7a6b5c4', 'Itália', 'Roma', 'f0e9d8c7-b6a5-4321-fedc-ba9876543210'),
('d1c2b3a4-9876-5432-fedc-ba9876543210', 'to go', 'went / gone', '12345678-90ab-cdef-0123-456789abcdef'),
('d4e5f6a7-b8c9-d0e1-f2a3-b4c5d6e7f8a9', 'N', 'Nitrogênio', 'd4e5f6a7-b8c9-0123-4567-890abcdef123'),
('d6c5b4a3-f2e1-d0c9-b8a7-f6e5d4c3b2a1', 'França', 'Paris', 'f0e9d8c7-b6a5-4321-fedc-ba9876543210'),
('e1f2a3b4-c5d6-e7f8-a9b0-c1d2e3f4a5b6', 'to see', 'saw / seen', '12345678-90ab-cdef-0123-456789abcdef'),
('e3f2a1b0-c9d8-e7f6-a5b4-c3d2e1f0a9b8', 'Espanha', 'Madrid', 'f0e9d8c7-b6a5-4321-fedc-ba9876543210'),
('e5f6a7b8-c9d0-e1f2-a3b4-c5d6e7f8a9b0', 'Fe', 'Ferro', 'd4e5f6a7-b8c9-0123-4567-890abcdef123'),
('ea61d6be-154a-4340-9b43-268e3170e176', 'to speak', 'spoke / spoken', '12345678-90ab-cdef-0123-456789abcdef'),
('eb078e9f-706f-4c57-a38b-8bc667a4a9f3', 'to take', 'took / taken', '12345678-90ab-cdef-0123-456789abcdef'),
('f0cacc1a-a7a8-4cf6-8f3f-917b1207e6e5', 'to give', 'gave / given', '12345678-90ab-cdef-0123-456789abcdef'),
('f4a3b2c1-e0d9-c8b7-a6f5-e4d3c2b1a0f9', 'Canadá', 'Ottawa', 'f0e9d8c7-b6a5-4321-fedc-ba9876543210'),
('f6a7b8c9-d0e1-f2a3-b4c5-d6e7f8a9b0c1', 'Au', 'Ouro', 'd4e5f6a7-b8c9-0123-4567-890abcdef123'),
('f8e7d6c5-b4a3-f2e1-d0c9-b8a7f6e5d4c3', 'Alemanha', 'Berlim', 'f0e9d8c7-b6a5-4321-fedc-ba9876543210'),
('fa98cb76-54d3-c2b1-a0ef-98cd76ba54d3', 'Ag', 'Prata', 'd4e5f6a7-b8c9-0123-4567-890abcdef123'),
('fb87ac65-43d2-b1a0-9fec-87ba65cb43d2', 'Na', 'Sódio', 'd4e5f6a7-b8c9-0123-4567-890abcdef123'),
('fc76ba54-32d1-a09f-e8dc-76ab54dc32d1', 'K', 'Potássio', 'd4e5f6a7-b8c9-0123-4567-890abcdef123');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` char(36) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `email`, `senha`) VALUES
('a1b2c3d4-e5f6-7890-1234-567890abcdef', 'Desenvolvedor', 'dev@email.com', '$pbkdf2-sha256$29000$n2.Z7KKjJ8qI.EGrJgMAbA$bJz2gEpm2Vf2gXDEjGqgTxyqP.AF4d2vYy/b4cOfhU0'),
('c6c83014-3bed-449b-ade0-4e06451b67b9', 'Usuário de Teste', 'teste@email.com', '$pbkdf2-sha256$29000$rVWKkXKu9d57b.39f./dOw$bNOcmlag75yGQcIIu2vfoXSZN/MsudBpqqjp27i0tpw');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `baralhos`
--
ALTER TABLE `baralhos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Índices de tabela `cartoes`
--
ALTER TABLE `cartoes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `baralho_id` (`baralho_id`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `baralhos`
--
ALTER TABLE `baralhos`
  ADD CONSTRAINT `baralhos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `cartoes`
--
ALTER TABLE `cartoes`
  ADD CONSTRAINT `cartoes_ibfk_1` FOREIGN KEY (`baralho_id`) REFERENCES `baralhos` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
