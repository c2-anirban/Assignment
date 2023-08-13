-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 13, 2023 at 08:34 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `assignment_weboconnect`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(250) DEFAULT NULL,
  `phone` varchar(250) DEFAULT NULL,
  `raw_password` varchar(250) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(10) DEFAULT NULL,
  `deleted` tinyint(4) NOT NULL DEFAULT 0,
  `gender` varchar(10) NOT NULL,
  `profileImage` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `raw_password`, `created_at`, `status`, `deleted`, `gender`, `profileImage`) VALUES
(1, 'Admin', 'admin@test.com', '$2b$08$c7u2rGOIK7q3KzOYKgl5juFPGy/lxE3te8Id94R9EHwQ1vuSwq872', '9876543210', 'admin123', '2023-08-09 18:00:29', 'pending', 0, 'Female', NULL),
(3, 'citu pan', 'c2@test.com', '$2b$08$3YSC7yoYqepbEZZ3aHmdRuutKgFkQeXSlIDGAAPdN3W5wktXZWqUy', '8001941942', 'Citu@123', '2023-08-12 10:22:51', 'pending', 0, 'Male', NULL),
(4, 'Test assign', 'test1@test.com', '$2b$08$W/VXMCxAUSotMMGmRhWHo.bYgrveNOjS5RxTkYMWQnKL7nU/rDSiy', '8984254570', 'Citu@123', '2023-08-12 11:10:19', 'pending', 0, 'Female', NULL),
(5, 'Anirban', 'anirban1@test.com', '$2b$08$9iLScOY74ykrD2QcAiL/m.6YdpnkLFKgqZtk25bN5gvJcTmUw4eJ.', '8001978154', 'Citu@123', '2023-08-13 09:53:23', 'pending', 0, 'Male', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
