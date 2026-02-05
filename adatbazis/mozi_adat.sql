-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Feb 04. 22:47
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12
CREATE DATABASE IF NOT EXISTS `mozi_adat`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

USE `mozi_adat`;

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
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `filmek`
--

INSERT INTO `filmek` (`film_id`, `title`, `description`, `duration_minutes`, `release_year`, `genre`, `is_active`) VALUES
(1, 'A Gyűrűk Ura: A Gyűrű Szövetsége', 'Egy hobbit vállalja a végzetes küldetést, hogy megsemmisítsen egy varázsgyűrűt.', 178, '2001', 'Fantasy', 1),
(2, 'Forrest Gump', 'Egy jó szívű alabamai férfi lenyűgöző utazása a 20. századi amerikai történelemben.', 142, '1994', 'Dráma', 1),
(3, 'Inception', 'Egy tolvaj, aki behatol az álmokba, kap egy lehetetlen feladatot: egy ötlet elültetését.', 148, '2010', 'Sci-Fi', 1),
(4, 'Admin Teszt Film', 'Admin felvétel', 100, '2025', 'Dráma', 1),
(5, 'Interstellar', 'Űrutazás az emberiség megmentéséért.', 169, '2014', 'Sci-Fi', 1),
(6, 'Mátrix', 'A valóság nem az, aminek látszik.', 136, '1999', 'Sci-Fi', 1),
(7, 'Titanic', 'Szerelmi történet a Titanic fedélzetén.', 195, '1997', 'Romantikus', 1),
(8, 'Joker', 'Egy ember lassú lecsúszása az őrületbe.', 122, '2019', 'Dráma', 1);

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
(1, 1, 4400.00, 'credit_card', 'completed', 'TRX001', '2026-01-15 09:35:00'),
(2, 3, 5000.00, 'debit_card', 'completed', 'TRX002', '2026-01-20 13:20:00'),
(3, 5, 3500.00, 'online_bank', 'pending', 'TRX003', NULL),
(4, 6, 2800.00, 'credit_card', 'completed', 'TRX004', '2026-02-01 10:25:00'),
(5, 7, 2200.00, 'cash', 'completed', 'TRX005', '2026-02-01 14:05:00');

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
(1, 1, 1, 1, '2026-01-15 09:30:00', 2200.00, 'confirmed', 'PAY001'),
(2, 1, 1, 2, '2026-01-15 09:30:00', 2200.00, 'confirmed', 'PAY001'),
(3, 2, 3, 16, '2026-01-20 13:15:00', 2500.00, 'confirmed', 'PAY002'),
(4, 2, 3, 17, '2026-01-20 13:15:00', 2500.00, 'confirmed', 'PAY002'),
(5, 3, 4, 26, '2026-01-22 08:45:00', 3500.00, 'reserved', 'PAY003'),
(6, 4, 5, 21, '2026-02-01 10:20:00', 2800.00, 'confirmed', 'PAY004'),
(7, 5, 2, 6, '2026-02-01 14:00:00', 2200.00, 'confirmed', 'PAY005'),
(8, 1, 6, 3, '2026-02-02 13:01:49', 2200.00, 'reserved', NULL),
(10, 3, 6, 27, '2026-02-04 21:43:38', 3500.00, 'confirmed', NULL),
(11, 4, 7, 8, '2026-02-04 21:43:38', 2800.00, 'confirmed', NULL),
(12, 5, 8, 12, '2026-02-04 21:43:38', 2200.00, 'reserved', NULL),
(13, 6, 9, 30, '2026-02-04 21:43:38', 4000.00, 'confirmed', NULL);

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
(1, '1-es terem (Standard)', 10, 15),
(2, '2-es terem (IMAX)', 12, 20),
(3, '3-es terem (VIP)', 6, 8);

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
(1, 1, 'A', 1),
(2, 1, 'A', 2),
(3, 1, 'A', 3),
(4, 1, 'A', 4),
(5, 1, 'A', 5),
(6, 1, 'B', 1),
(7, 1, 'B', 2),
(8, 1, 'B', 3),
(9, 1, 'B', 4),
(10, 1, 'B', 5),
(11, 1, 'C', 1),
(12, 1, 'C', 2),
(13, 1, 'C', 3),
(14, 1, 'C', 4),
(15, 1, 'C', 5),
(16, 2, 'A', 1),
(17, 2, 'A', 2),
(18, 2, 'A', 3),
(19, 2, 'A', 4),
(20, 2, 'A', 5),
(21, 2, 'B', 1),
(22, 2, 'B', 2),
(23, 2, 'B', 3),
(24, 2, 'B', 4),
(25, 2, 'B', 5),
(26, 3, 'A', 1),
(27, 3, 'A', 2),
(28, 3, 'A', 3),
(29, 3, 'A', 4),
(30, 3, 'B', 1),
(31, 3, 'B', 2),
(32, 3, 'B', 3),
(33, 3, 'B', 4);

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
(10, 'user4@mozi.hu', '$2b$10$hSNyk8F5j/ucEkHn1CWwlO8XQJcveUWSO9a.AVelxh9j.RVJArhLK', 'Szűcs Dóra', '+3644444444', 0);

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
(1, 1, 1, '2026-01-12 01:47:28', NULL, 2200.00),
(2, 2, 2, '2026-01-12 04:17:28', NULL, 2500.00),
(3, 3, 3, '2026-01-13 04:47:28', NULL, 3500.00),
(4, 1, 2, '2026-02-05 18:00:00', '2026-02-05 20:18:00', 2800.00),
(5, 2, 1, '2026-02-05 20:00:00', '2026-02-05 22:22:00', 2200.00),
(6, 3, 3, '2026-02-06 19:00:00', '2026-02-06 21:38:00', 4000.00),
(7, 1, 1, '2026-02-07 16:00:00', '2026-02-07 18:18:00', 2200.00),
(8, 4, 1, '2026-02-10 18:00:00', '2026-02-10 19:40:00', 2300.00),
(9, 5, 2, '2026-02-11 19:00:00', '2026-02-11 21:50:00', 3000.00),
(10, 6, 3, '2026-02-12 20:00:00', '2026-02-12 22:20:00', 4200.00),
(11, 7, 1, '2026-02-13 16:00:00', '2026-02-13 18:15:00', 2200.00),
(12, 8, 2, '2026-02-14 21:00:00', '2026-02-14 23:30:00', 3500.00);

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
  MODIFY `film_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT a táblához `fizetes`
--
ALTER TABLE `fizetes`
  MODIFY `fizetes_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT a táblához `konyveles`
--
ALTER TABLE `konyveles`
  MODIFY `konyveles_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT a táblához `terem`
--
ALTER TABLE `terem`
  MODIFY `terem_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `ules`
--
ALTER TABLE `ules`
  MODIFY `ules_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `vetites`
--
ALTER TABLE `vetites`
  MODIFY `vetites_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

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
