-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1:3307
-- Létrehozás ideje: 2026. Jan 21. 11:21
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12
CREATE DATABASE IF NOT EXISTS mozi_adat
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;
USE mozi_adat;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `cinema_booking`
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
  `poster_url` varchar(500) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `filmek`
--

INSERT INTO `filmek` (`film_id`, `title`, `description`, `duration_minutes`, `release_year`, `genre`, `poster_url`, `is_active`) VALUES
(1, 'A Gyűrűk Ura: A Gyűrű Szövetsége', 'Egy hobbit vállalja a végzetes küldetést, hogy megsemmisítsen egy varázsgyűrűt.', 178, '2001', 'Fantasy', NULL, 1),
(2, 'Forrest Gump', 'Egy jó szívű alabamai férfi lenyűgöző utazása a 20. századi amerikai történelemben.', 142, '1994', 'Dráma', NULL, 1),
(3, 'Inception', 'Egy tolvaj, aki behatol az álmokba, kap egy lehetetlen feladatot: egy ötlet elültetését.', 148, '2010', 'Sci-Fi', NULL, 1);

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

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `terem`
--

CREATE TABLE `terem` (
  `terem_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `total_rows` int(11) NOT NULL,
  `seats_per_row` int(11) NOT NULL,
  `has_3d` tinyint(1) DEFAULT 0,
  `has_dolby_atmos` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `terem`
--

INSERT INTO `terem` (`terem_id`, `name`, `total_rows`, `seats_per_row`, `has_3d`, `has_dolby_atmos`) VALUES
(1, '1-es terem (Standard)', 10, 15, 0, 0),
(2, '2-es terem (IMAX)', 12, 20, 1, 1),
(3, '3-es terem (VIP)', 6, 8, 1, 1);

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
  `date_of_birth` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_admin` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`user_id`, `email`, `password_hash`, `full_name`, `phone_number`, `date_of_birth`, `created_at`, `is_admin`) VALUES
(1, 'teszt.felhasznalo@example.com', '$2b$10$YourHashedPasswordHerePlaceholder', 'Teszt Elek', '+36123456789', NULL, '2026-01-09 06:47:28', 0);

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
  `base_price` decimal(8,2) NOT NULL,
  `is_full` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `vetites`
--

INSERT INTO `vetites` (`vetites_id`, `film_id`, `terem_id`, `start_time`, `end_time`, `base_price`, `is_full`) VALUES
(1, 1, 1, '2026-01-12 01:47:28', NULL, 2200.00, 0),
(2, 2, 2, '2026-01-12 04:17:28', NULL, 2500.00, 0),
(3, 3, 3, '2026-01-13 04:47:28', NULL, 3500.00, 0);

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
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
