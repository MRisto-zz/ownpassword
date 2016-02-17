-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 17. Feb 2016 um 12:03
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
(1, 'f416e7bf6c806da502d78cd97eb77b7aeb20d1ca80b553b0b6f7094f65cf433376fcfc6d30ad4f94f4960691ce3774b21610bcf9a7eb09bd7e4c4367f6480544', 1, 'Test #1', NULL),
(2, 'dbfec8d28c1e09f058e861c4f6a3b686f3cefc0407a08f2c3455103cad123368f3b0e7a752d46ea95eab58190285d855fc97eff76ea212c4c45870fb53a82d8b', 1, 'Test #2', NULL),
(3, '6b87b3f31d7e73fff8d634fedc461116fd00b0e7b715b4e320d002a312c58d59d212b876a27aed551954fb6209da1cbc83a06025deeab22ed68a0f4c56a16344', 1, 'Test #3', NULL);

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
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `passwords`
--

INSERT INTO `passwords` (`id`, `token_id`, `user_id`, `folder_id`, `title`, `username`, `password`) VALUES
(1, 'f416e7bf6c806da502d78cd97eb77b7aeb20d1ca80b553b0b6f7094f65cf433376fcfc6d30ad4f94f4960691ce3774b21610bcf9a7eb09bd7e4c4367f6480544', 1, 0, '', 'Amazon', 'uc6UyZWil6qAxdio2KCmpQ=='),
(2, 'dbfec8d28c1e09f058e861c4f6a3b686f3cefc0407a08f2c3455103cad123368f3b0e7a752d46ea95eab58190285d855fc97eff76ea212c4c45870fb53a82d8b', 1, 1, 'Amazon', 'Test', 'uc6UyZWil6qAxdio2KCmpQ==');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT für Tabelle `passwords`
--
ALTER TABLE `passwords`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
