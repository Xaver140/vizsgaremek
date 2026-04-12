-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Ápr 12. 14:24
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `mozi_adat`
--
CREATE DATABASE IF NOT EXISTS `mozi_adat` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `mozi_adat`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `filmek`
--

CREATE TABLE `filmek` (
  `film_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `duration_minutes` int(11) NOT NULL,
  `release_year` year(4) DEFAULT NULL,
  `genre` varchar(100) DEFAULT NULL,
  `film_img` longtext NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `director` varchar(255) DEFAULT NULL,
  `actors` text DEFAULT NULL,
  `producer` varchar(255) DEFAULT NULL,
  `age_limit` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `filmek`
--

INSERT INTO `filmek` (`film_id`, `title`, `description`, `duration_minutes`, `release_year`, `genre`, `film_img`, `is_active`, `director`, `actors`, `producer`, `age_limit`) VALUES
(1, 'A Gyűrűk Ura: A Gyűrű Szövetsége', 'Egy hobbit vállalja a végzetes küldetést, hogy megsemmisítsen egy varázsgyűrűt.', 178, '2001', 'Fantasy', 'lotr.jpg', 1, 'Peter Jackson', 'Elijah Wood, Ian McKellen, Orlando Bloom', 'New Line Cinema', 12),
(2, 'Forrest Gump', 'Egy jó szívű alabamai férfi lenyűgöző utazása a 20. századi amerikai történelemben.', 142, '1994', 'Dráma', 'ForrestGump.jpg', 1, 'Robert Zemeckis', 'Tom Hanks, Robin Wright, Gary Sinise', 'Paramount Pictures', 12),
(3, 'Inception', 'Egy tolvaj, aki behatol az álmokba, kap egy lehetetlen feladatot: egy ötlet elültetését.', 148, '2010', 'Sci-Fi', 'Inception.jpg', 1, 'Christopher Nolan', 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page', 'Warner Bros.', 12),
(4, 'Admin Teszt Film', 'Admin felvétel', 100, '2025', 'Dráma', '', 0, NULL, NULL, NULL, NULL),
(5, 'Interstellar', 'Űrutazás az emberiség megmentéséért.', 169, '2014', 'Sci-Fi', 'Interstellar.jpg', 1, 'Christopher Nolan', 'Matthew McConaughey, Anne Hathaway, Jessica Chastain', 'Paramount Pictures', 12),
(6, 'Mátrix', 'A valóság nem az, aminek látszik.', 136, '1999', 'Sci-Fi', 'Matrix.jpg', 1, 'Lana Wachowski, Lilly Wachowski', 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss', 'Warner Bros.', 16),
(7, 'Titanic', 'Szerelmi történet a Titanic fedélzetén.', 195, '1997', 'Romantikus', 'Titanic.jpg', 1, 'James Cameron', 'Leonardo DiCaprio, Kate Winslet', '20th Century Fox', 12),
(8, 'Joker', 'Egy ember lassú lecsúszása az őrületbe.', 122, '2019', 'Dráma', 'Joker.jpg', 1, 'Todd Phillips', 'Joaquin Phoenix, Robert De Niro', 'Warner Bros.', 16),
(9, 'The Dark Knight', 'Batman szembeszáll a káoszt hozó Jokerrel Gotham városában.', 152, '2008', 'Akció', 'darkknight.jpg', 1, 'Christopher Nolan', 'Christian Bale, Heath Ledger, Aaron Eckhart', 'Warner Bros.', 16),
(10, 'Avatar', 'Egy katona egy idegen bolygón új világot és új identitást talál.', 162, '2009', 'Sci-Fi', 'avatar.jpg', 1, 'James Cameron', 'Sam Worthington, Zoe Saldana, Sigourney Weaver', '20th Century Fox', 12),
(11, 'Gladiátor', 'Egy római hadvezér bosszút esküszik, miután családját meggyilkolják.', 155, '2000', 'Történelmi', 'gladiator.jpg', 1, 'Ridley Scott', 'Russell Crowe, Joaquin Phoenix', 'DreamWorks Pictures', 16);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `fizetes`
--

CREATE TABLE `fizetes` (
  `fizetes_id` int(11) NOT NULL,
  `konyveles_id` int(11) DEFAULT NULL,
  `amount` decimal(8,2) NOT NULL,
  `method` enum('credit_card','debit_card','cash','online_bank') NOT NULL,
  `status` enum('pending','completed','failed','refunded') DEFAULT 'pending',
  `transaction_id` varchar(255) DEFAULT NULL,
  `paid_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `fizetes`
--

INSERT INTO `fizetes` (`fizetes_id`, `konyveles_id`, `amount`, `method`, `status`, `transaction_id`, `paid_at`) VALUES
(13, 24, 11000.00, 'credit_card', 'completed', NULL, NULL),
(14, 25, 11000.00, 'credit_card', 'completed', NULL, NULL),
(15, 26, 11000.00, 'credit_card', 'completed', NULL, NULL),
(16, 27, 11000.00, 'credit_card', 'completed', NULL, NULL),
(17, 28, 11000.00, 'credit_card', 'completed', NULL, NULL),
(18, 67, 6600.00, 'credit_card', 'completed', NULL, NULL),
(19, 68, 6600.00, 'credit_card', 'completed', NULL, NULL),
(20, 69, 6600.00, 'credit_card', 'completed', NULL, NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `konyveles`
--

CREATE TABLE `konyveles` (
  `konyveles_id` int(11) NOT NULL,
  `vetites_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `ules_id` int(11) DEFAULT NULL,
  `booking_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `final_price` decimal(8,2) NOT NULL,
  `status` enum('reserved','confirmed','cancelled') DEFAULT 'reserved',
  `payment_reference` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `konyveles`
--

INSERT INTO `konyveles` (`konyveles_id`, `vetites_id`, `user_id`, `ules_id`, `booking_time`, `final_price`, `status`, `payment_reference`) VALUES
(24, 117, 11, 158, '2026-04-06 13:47:46', 11000.00, 'confirmed', NULL),
(25, 117, 11, 157, '2026-04-06 13:47:46', 11000.00, 'confirmed', NULL),
(26, 117, 11, 156, '2026-04-06 13:47:46', 11000.00, 'confirmed', NULL),
(27, 117, 11, 164, '2026-04-06 13:47:46', 11000.00, 'confirmed', NULL),
(28, 117, 11, 165, '2026-04-06 13:47:46', 11000.00, 'confirmed', NULL),
(62, 117, 11, 153, '2026-04-06 16:45:46', 4400.00, 'reserved', NULL),
(63, 117, 11, 185, '2026-04-06 16:45:46', 4400.00, 'reserved', NULL),
(64, 117, 11, 152, '2026-04-06 16:46:53', 6600.00, 'reserved', NULL),
(65, 117, 11, 151, '2026-04-06 16:46:53', 6600.00, 'reserved', NULL),
(66, 117, 11, 150, '2026-04-06 16:46:53', 6600.00, 'reserved', NULL),
(67, 116, 11, 157, '2026-04-06 16:48:48', 6600.00, 'confirmed', NULL),
(68, 116, 11, 156, '2026-04-06 16:48:48', 6600.00, 'confirmed', NULL),
(69, 116, 11, 155, '2026-04-06 16:48:48', 6600.00, 'confirmed', NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `terem`
--

CREATE TABLE `terem` (
  `terem_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `total_rows` int(11) NOT NULL,
  `seats_per_row` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `terem`
--

INSERT INTO `terem` (`terem_id`, `name`, `total_rows`, `seats_per_row`) VALUES
(1, '1-es terem (Standard)', 5, 8),
(2, '2-es terem (IMAX)', 6, 10),
(3, '3-es terem (VIP)', 3, 4);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ules`
--

CREATE TABLE `ules` (
  `ules_id` int(11) NOT NULL,
  `terem_id` int(11) DEFAULT NULL,
  `row_number` char(2) NOT NULL,
  `seat_number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `ules`
--

INSERT INTO `ules` (`ules_id`, `terem_id`, `row_number`, `seat_number`) VALUES
(146, 1, 'A', 1),
(147, 1, 'A', 2),
(148, 1, 'A', 3),
(149, 1, 'A', 4),
(150, 1, 'A', 5),
(151, 1, 'A', 6),
(152, 1, 'A', 7),
(153, 1, 'A', 8),
(154, 1, 'B', 1),
(155, 1, 'B', 2),
(156, 1, 'B', 3),
(157, 1, 'B', 4),
(158, 1, 'B', 5),
(159, 1, 'B', 6),
(160, 1, 'B', 7),
(161, 1, 'B', 8),
(162, 1, 'C', 1),
(163, 1, 'C', 2),
(164, 1, 'C', 3),
(165, 1, 'C', 4),
(166, 1, 'C', 5),
(167, 1, 'C', 6),
(168, 1, 'C', 7),
(169, 1, 'C', 8),
(170, 1, 'D', 1),
(171, 1, 'D', 2),
(172, 1, 'D', 3),
(173, 1, 'D', 4),
(174, 1, 'D', 5),
(175, 1, 'D', 6),
(176, 1, 'D', 7),
(177, 1, 'D', 8),
(178, 1, 'E', 1),
(179, 1, 'E', 2),
(180, 1, 'E', 3),
(181, 1, 'E', 4),
(182, 1, 'E', 5),
(183, 1, 'E', 6),
(184, 1, 'E', 7),
(185, 1, 'E', 8),
(186, 2, 'A', 1),
(187, 2, 'A', 2),
(188, 2, 'A', 3),
(189, 2, 'A', 4),
(190, 2, 'A', 5),
(191, 2, 'A', 6),
(192, 2, 'A', 7),
(193, 2, 'A', 8),
(194, 2, 'A', 9),
(195, 2, 'A', 10),
(196, 2, 'B', 1),
(197, 2, 'B', 2),
(198, 2, 'B', 3),
(199, 2, 'B', 4),
(200, 2, 'B', 5),
(201, 2, 'B', 6),
(202, 2, 'B', 7),
(203, 2, 'B', 8),
(204, 2, 'B', 9),
(205, 2, 'B', 10),
(206, 2, 'C', 1),
(207, 2, 'C', 2),
(208, 2, 'C', 3),
(209, 2, 'C', 4),
(210, 2, 'C', 5),
(211, 2, 'C', 6),
(212, 2, 'C', 7),
(213, 2, 'C', 8),
(214, 2, 'C', 9),
(215, 2, 'C', 10),
(216, 2, 'D', 1),
(217, 2, 'D', 2),
(218, 2, 'D', 3),
(219, 2, 'D', 4),
(220, 2, 'D', 5),
(221, 2, 'D', 6),
(222, 2, 'D', 7),
(223, 2, 'D', 8),
(224, 2, 'D', 9),
(225, 2, 'D', 10),
(226, 2, 'E', 1),
(227, 2, 'E', 2),
(228, 2, 'E', 3),
(229, 2, 'E', 4),
(230, 2, 'E', 5),
(231, 2, 'E', 6),
(232, 2, 'E', 7),
(233, 2, 'E', 8),
(234, 2, 'E', 9),
(235, 2, 'E', 10),
(236, 2, 'F', 1),
(237, 2, 'F', 2),
(238, 2, 'F', 3),
(239, 2, 'F', 4),
(240, 2, 'F', 5),
(241, 2, 'F', 6),
(242, 2, 'F', 7),
(243, 2, 'F', 8),
(244, 2, 'F', 9),
(245, 2, 'F', 10),
(246, 3, 'A', 1),
(247, 3, 'A', 2),
(248, 3, 'A', 3),
(249, 3, 'A', 4),
(250, 3, 'B', 1),
(251, 3, 'B', 2),
(252, 3, 'B', 3),
(253, 3, 'B', 4),
(254, 3, 'C', 1),
(255, 3, 'C', 2),
(256, 3, 'C', 3),
(257, 3, 'C', 4);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`user_id`, `email`, `password_hash`, `full_name`, `phone_number`, `is_admin`) VALUES
(1, 'teszt.felhasznalo@example.com', '$2b$10$YourHashedPasswordHerePlaceholder', 'Teszt Elek', '+36123456789', 0),
(2, 'admin@mozi.hu', '$2b$10$AdminHashedPasswordPlaceholder', 'Admin Péter', '+36201234567', 1),
(3, 'kovacs.anna@example.com', '$2b$10$KovacsHashedPasswordPlaceholder', 'Kovács Anna', '+36301234567', 0),
(4, 'nagy.janos@example.com', '$2b$10$NagyHashedPasswordPlaceholder', 'Nagy János', '+36701234567', 0),
(5, 'szabo.maria@example.com', '$2b$10$SzaboHashedPasswordPlaceholder', 'Szabó Mária', '+36201234568', 0),
(6, 'teszt2@example.com', '$2b$10$hSNyk8F5j/ucEkHn1CWwlO8XQJcveUWSO9a.AVelxh9j.RVJArhLK', 'Teszt Kettő', NULL, 1),
(7, 'user1@mozi.hu', '$2b$10$hSNyk8F5j/ucEkHn1CWwlO8XQJcveUWSO9a.AVelxh9j.RVJArhLK', 'Kiss Péter', '+3611111111', 0),
(8, 'user2@mozi.hu', '$2b$10$hSNyk8F5j/ucEkHn1CWwlO8XQJcveUWSO9a.AVelxh9j.RVJArhLK', 'Tóth Anna', '+3622222222', 0),
(9, 'user3@mozi.hu', '$2b$10$hSNyk8F5j/ucEkHn1CWwlO8XQJcveUWSO9a.AVelxh9j.RVJArhLK', 'Németh Gábor', '+3633333333', 0),
(10, 'user4@mozi.hu', '$2b$10$hSNyk8F5j/ucEkHn1CWwlO8XQJcveUWSO9a.AVelxh9j.RVJArhLK', 'Szűcs Dóra', '+3644444444', 0),
(11, 'admin@test.hu', '$2b$10$4k2BZ4B9R18Jo2gTeVvq.uuWqfKdWvlQpQrl.7Usyo26xq.K7zkGW', 'Admin User', '0612345678', 1),
(12, 'simafel@test.hu', '$2b$10$b0p1iAiwBkSL9HUokVQ3We2aBlbyXZrDddApHeUc0jFxZqvry/wpe', 'felhasz teszt', NULL, 0),
(13, 'agyverzes@gmail.hu', '$2b$10$OYTfSdNNtTBK3ds7I6JbA.6hahrgSVIpN8YEZx4Y35fjvaHmh.QAq', 'felkötöm magam', NULL, 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `vetites`
--

CREATE TABLE `vetites` (
  `vetites_id` int(11) NOT NULL,
  `film_id` int(11) DEFAULT NULL,
  `terem_id` int(11) DEFAULT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime DEFAULT NULL,
  `base_price` decimal(8,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `vetites`
--

INSERT INTO `vetites` (`vetites_id`, `film_id`, `terem_id`, `start_time`, `end_time`, `base_price`) VALUES
(96, 1, 1, '2026-04-01 14:00:00', '2026-04-01 16:58:00', 2200.00),
(97, 2, 2, '2026-04-01 17:00:00', '2026-04-01 19:22:00', 2500.00),
(98, 3, 3, '2026-04-01 20:00:00', '2026-04-01 22:28:00', 3500.00),
(99, 5, 1, '2026-04-01 18:30:00', '2026-04-01 21:19:00', 3000.00),
(100, 6, 2, '2026-04-02 15:00:00', '2026-04-02 17:16:00', 2800.00),
(101, 7, 1, '2026-04-02 16:00:00', '2026-04-02 19:15:00', 2200.00),
(102, 8, 3, '2026-04-02 19:00:00', '2026-04-02 21:02:00', 3200.00),
(103, 1, 1, '2026-04-02 20:30:00', '2026-04-02 23:28:00', 2200.00),
(104, 2, 2, '2026-04-03 14:00:00', '2026-04-03 16:22:00', 2500.00),
(105, 3, 3, '2026-04-03 17:00:00', '2026-04-03 19:28:00', 3500.00),
(106, 5, 1, '2026-04-03 18:30:00', '2026-04-03 21:19:00', 3000.00),
(107, 6, 2, '2026-04-03 20:30:00', '2026-04-03 22:46:00', 2800.00),
(108, 7, 1, '2026-04-04 14:00:00', '2026-04-04 17:15:00', 2200.00),
(109, 8, 2, '2026-04-04 16:30:00', '2026-04-04 18:32:00', 3200.00),
(110, 1, 1, '2026-04-04 18:30:00', '2026-04-04 21:28:00', 2200.00),
(111, 3, 3, '2026-04-04 20:00:00', '2026-04-04 22:28:00', 3500.00),
(112, 2, 2, '2026-04-05 14:00:00', '2026-04-05 16:22:00', 2500.00),
(113, 5, 1, '2026-04-05 17:00:00', '2026-04-05 19:49:00', 3000.00),
(114, 6, 2, '2026-04-05 18:30:00', '2026-04-05 20:46:00', 2800.00),
(115, 8, 3, '2026-04-05 20:00:00', '2026-04-05 22:02:00', 3200.00),
(116, 2, 1, '2026-04-06 14:00:00', '2026-04-06 16:22:00', 2200.00),
(117, 1, 1, '2026-04-06 17:00:00', '2026-04-06 19:58:00', 2200.00),
(118, 3, 1, '2026-04-06 20:30:00', '2026-04-06 22:58:00', 2500.00),
(119, 5, 2, '2026-04-06 15:00:00', '2026-04-06 17:49:00', 3000.00),
(120, 6, 2, '2026-04-06 18:30:00', '2026-04-06 20:46:00', 2800.00),
(121, 7, 2, '2026-04-06 21:15:00', '2026-04-07 00:30:00', 2600.00),
(122, 8, 3, '2026-04-06 16:00:00', '2026-04-06 18:02:00', 3200.00),
(123, 3, 3, '2026-04-06 19:00:00', '2026-04-06 21:28:00', 3500.00),
(124, 1, 1, '2026-04-07 14:00:00', '2026-04-07 16:58:00', 2200.00),
(125, 2, 1, '2026-04-07 17:30:00', '2026-04-07 19:52:00', 2200.00),
(126, 6, 1, '2026-04-07 20:30:00', '2026-04-07 22:46:00', 2400.00),
(127, 3, 2, '2026-04-07 15:00:00', '2026-04-07 17:28:00', 3000.00),
(128, 5, 2, '2026-04-07 18:00:00', '2026-04-07 20:49:00', 3000.00),
(129, 8, 2, '2026-04-07 21:15:00', '2026-04-07 23:17:00', 3200.00),
(130, 7, 1, '2026-04-08 14:00:00', '2026-04-08 17:15:00', 2200.00),
(131, 2, 1, '2026-04-08 18:00:00', '2026-04-08 20:22:00', 2200.00),
(132, 1, 2, '2026-04-08 15:00:00', '2026-04-08 17:58:00', 2800.00),
(133, 3, 2, '2026-04-08 18:30:00', '2026-04-08 20:58:00', 3500.00),
(134, 5, 3, '2026-04-08 19:00:00', '2026-04-08 21:49:00', 3500.00),
(135, 2, 1, '2026-04-09 14:00:00', '2026-04-09 16:22:00', 2200.00),
(136, 8, 1, '2026-04-09 17:00:00', '2026-04-09 19:02:00', 2300.00),
(137, 6, 1, '2026-04-09 20:00:00', '2026-04-09 22:16:00', 2400.00),
(138, 5, 2, '2026-04-09 15:00:00', '2026-04-09 17:49:00', 3000.00),
(139, 3, 2, '2026-04-09 18:30:00', '2026-04-09 20:58:00', 3500.00),
(140, 1, 1, '2026-04-10 13:00:00', '2026-04-10 15:58:00', 2200.00),
(141, 7, 1, '2026-04-10 16:30:00', '2026-04-10 19:45:00', 2200.00),
(142, 2, 2, '2026-04-10 15:00:00', '2026-04-10 17:22:00', 2500.00),
(143, 8, 2, '2026-04-10 18:00:00', '2026-04-10 20:02:00', 3200.00),
(144, 3, 3, '2026-04-10 19:00:00', '2026-04-10 21:28:00', 3500.00),
(145, 9, 1, '2026-04-10 14:00:00', '2026-04-10 16:32:00', 2500.00),
(146, 1, 1, '2026-04-10 17:00:00', '2026-04-10 19:58:00', 2200.00),
(147, 3, 1, '2026-04-10 20:30:00', '2026-04-10 22:58:00', 2500.00),
(148, 10, 2, '2026-04-10 15:00:00', '2026-04-10 17:42:00', 3200.00),
(149, 5, 2, '2026-04-10 18:30:00', '2026-04-10 21:19:00', 3000.00),
(150, 11, 3, '2026-04-10 19:00:00', '2026-04-10 21:35:00', 3500.00),
(151, 2, 1, '2026-04-11 14:00:00', '2026-04-11 16:22:00', 2200.00),
(152, 9, 1, '2026-04-11 17:00:00', '2026-04-11 19:32:00', 2500.00),
(153, 6, 1, '2026-04-11 20:30:00', '2026-04-11 22:46:00', 2400.00),
(154, 10, 2, '2026-04-11 15:00:00', '2026-04-11 17:42:00', 3200.00),
(155, 3, 2, '2026-04-11 18:30:00', '2026-04-11 20:58:00', 3500.00),
(156, 8, 3, '2026-04-11 19:00:00', '2026-04-11 21:02:00', 3200.00),
(157, 7, 1, '2026-04-12 14:00:00', '2026-04-12 17:15:00', 2200.00),
(158, 1, 1, '2026-04-12 18:00:00', '2026-04-12 20:58:00', 2200.00),
(159, 9, 2, '2026-04-12 15:00:00', '2026-04-12 17:32:00', 2800.00),
(160, 10, 2, '2026-04-12 18:30:00', '2026-04-12 21:12:00', 3200.00),
(161, 11, 3, '2026-04-12 19:00:00', '2026-04-12 21:35:00', 3500.00),
(162, 3, 1, '2026-04-13 14:00:00', '2026-04-13 16:28:00', 2500.00),
(163, 2, 1, '2026-04-13 17:00:00', '2026-04-13 19:22:00', 2200.00),
(164, 6, 1, '2026-04-13 20:00:00', '2026-04-13 22:16:00', 2400.00),
(165, 5, 2, '2026-04-13 15:00:00', '2026-04-13 17:49:00', 3000.00),
(166, 9, 2, '2026-04-13 18:30:00', '2026-04-13 21:02:00', 3000.00),
(167, 8, 3, '2026-04-13 19:00:00', '2026-04-13 21:02:00', 3200.00),
(168, 1, 1, '2026-04-14 14:00:00', '2026-04-14 16:58:00', 2200.00),
(169, 7, 1, '2026-04-14 17:30:00', '2026-04-14 20:45:00', 2200.00),
(170, 10, 2, '2026-04-14 15:00:00', '2026-04-14 17:42:00', 3200.00),
(171, 3, 2, '2026-04-14 18:30:00', '2026-04-14 20:58:00', 3500.00),
(172, 11, 3, '2026-04-14 19:00:00', '2026-04-14 21:35:00', 3500.00);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `filmek`
--
ALTER TABLE `filmek`
  ADD PRIMARY KEY (`film_id`);

--
-- A tábla indexei `fizetes`
--
ALTER TABLE `fizetes`
  ADD PRIMARY KEY (`fizetes_id`),
  ADD KEY `booking_id` (`konyveles_id`);

--
-- A tábla indexei `konyveles`
--
ALTER TABLE `konyveles`
  ADD PRIMARY KEY (`konyveles_id`),
  ADD UNIQUE KEY `unique_seat_per_screening` (`vetites_id`,`ules_id`),
  ADD KEY `seat_id` (`ules_id`),
  ADD KEY `idx_user_bookings` (`user_id`,`booking_time`);

--
-- A tábla indexei `terem`
--
ALTER TABLE `terem`
  ADD PRIMARY KEY (`terem_id`),
  ADD UNIQUE KEY `unique_name` (`name`);

--
-- A tábla indexei `ules`
--
ALTER TABLE `ules`
  ADD PRIMARY KEY (`ules_id`),
  ADD UNIQUE KEY `unique_seat_in_auditorium` (`terem_id`,`row_number`,`seat_number`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- A tábla indexei `vetites`
--
ALTER TABLE `vetites`
  ADD PRIMARY KEY (`vetites_id`),
  ADD KEY `auditorium_id` (`terem_id`),
  ADD KEY `idx_start_time` (`start_time`),
  ADD KEY `idx_movie_time` (`film_id`,`start_time`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `filmek`
--
ALTER TABLE `filmek`
  MODIFY `film_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT a táblához `fizetes`
--
ALTER TABLE `fizetes`
  MODIFY `fizetes_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT a táblához `konyveles`
--
ALTER TABLE `konyveles`
  MODIFY `konyveles_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT a táblához `terem`
--
ALTER TABLE `terem`
  MODIFY `terem_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `ules`
--
ALTER TABLE `ules`
  MODIFY `ules_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=258;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT a táblához `vetites`
--
ALTER TABLE `vetites`
  MODIFY `vetites_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=173;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `fizetes`
--
ALTER TABLE `fizetes`
  ADD CONSTRAINT `fizetes_ibfk_1` FOREIGN KEY (`konyveles_id`) REFERENCES `konyveles` (`konyveles_id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `konyveles`
--
ALTER TABLE `konyveles`
  ADD CONSTRAINT `konyveles_ibfk_1` FOREIGN KEY (`vetites_id`) REFERENCES `vetites` (`vetites_id`),
  ADD CONSTRAINT `konyveles_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `konyveles_ibfk_3` FOREIGN KEY (`ules_id`) REFERENCES `ules` (`ules_id`);

--
-- Megkötések a táblához `ules`
--
ALTER TABLE `ules`
  ADD CONSTRAINT `ules_ibfk_1` FOREIGN KEY (`terem_id`) REFERENCES `terem` (`terem_id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `vetites`
--
ALTER TABLE `vetites`
  ADD CONSTRAINT `vetites_ibfk_1` FOREIGN KEY (`film_id`) REFERENCES `filmek` (`film_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `vetites_ibfk_2` FOREIGN KEY (`terem_id`) REFERENCES `terem` (`terem_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
