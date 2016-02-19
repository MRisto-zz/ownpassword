-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Erstellungszeit: 19. Feb 2016 um 18:42
-- Server-Version: 10.1.9-MariaDB
-- PHP-Version: 5.6.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `wpfmw`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `folders`
--

CREATE TABLE `folders` (
  `id` int(11) NOT NULL,
  `token_id` char(128) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `weight` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `folders`
--

INSERT INTO `folders` (`id`, `token_id`, `user_id`, `name`, `weight`) VALUES
(12, '8076a433700fb6aca2b379872702ba704de0e81236852b5c0bfefbd1d06955158de03edc2acf419fd472967aca27a67b67f7fe61282137d75635a645ef6b8c9f', 1, 'Privat', NULL);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `passwords`
--

CREATE TABLE `passwords` (
  `id` int(11) NOT NULL,
  `token_id` char(128) NOT NULL,
  `user_id` int(11) NOT NULL,
  `folder_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `website_url` varchar(255) DEFAULT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `passwords`
--

INSERT INTO `passwords` (`id`, `token_id`, `user_id`, `folder_id`, `title`, `website_url`, `username`, `password`) VALUES
(6, '2fb03c6dcced231af0112c9b9b884eb5840acdc8d85f69d52a8b6483b4f5a773bf00a5bda3956567a977250a83028cdaff69c963dc2a88dffad314b1427f5679', 1, 12, 'Amazon', 'amazon.de', 'Test', 'l5dklQ=='),
(7, 'd938f3d99285420b2a8924f63f7165ccbc2a44cb923e44c8e2b3e14ee94b773b4b6d5652d87c5330991ffb8fafde515dea4291adf6953ea894b73f009f16b2ce', 1, 12, 'Netflix', 'netflix.de', 'Test', 'l5dklQ=='),
(8, '4aece696efbe8d556e37566e7a944b8cd26cee048c8cfd4d4635bea215b59e7230069236c4f94a2810fcd6e31dca7cd4d311bafe9ab01642906b30999c1b3a0d', 1, 12, 'FIFA', '', 'test', '2sqk1Q==');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `token_id` char(128) NOT NULL,
  `username` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` char(128) NOT NULL,
  `salt` char(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`id`, `token_id`, `username`, `email`, `password`, `salt`) VALUES
(1, 'f416e7bf6c806da502d78cd97eb77b7aeb20d1ca80b553b0b6f7094f65cf433376fcfc6d30ad4f94f4960691ce3774b21610bcf9a7eb09bd7e4c4367f6480544', 'Test', 'test@test.de', '877a83cbb62509327367e0932df3aa5e3dc4a01f2f34c71c5ebe37c73e724311249b4acd8a32f7dc14df7a823728d89c9c24abbcd6273f4f3d5bd46622281af5', 'e1a00270de5a141887b2254e0f3d6c2643d14de2165420e7465f5a995eaba6472f1bcae2d503e2630dec5b9d55baf0382f120fbf0bfa02785fa40413ed06a168');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `folders`
--
ALTER TABLE `folders`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `passwords`
--
ALTER TABLE `passwords`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `folders`
--
ALTER TABLE `folders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT für Tabelle `passwords`
--
ALTER TABLE `passwords`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
