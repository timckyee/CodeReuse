-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 03, 2019 at 05:53 AM
-- Server version: 5.6.38
-- PHP Version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `codereuse`
--
CREATE DATABASE IF NOT EXISTS `codereuse` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `codereuse`;

-- --------------------------------------------------------

--
-- Table structure for table `tableGridGetPost`
--

CREATE TABLE `tableGridGetPost` (
  `fieldPrimaryKey` int(11) NOT NULL,
  `field2` int(11) NOT NULL,
  `field3` int(11) NOT NULL,
  `field4` int(11) NOT NULL,
  `field5` int(11) NOT NULL,
  `selectField` int(11) NOT NULL,
  `selectField2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tableGridGetPost`
--

INSERT INTO `tableGridGetPost` (`fieldPrimaryKey`, `field2`, `field3`, `field4`, `field5`, `selectField`, `selectField2`) VALUES
(1, 2, 3, 4, 5, 6, 7),
(2, 2, 3, 4, 5, 1, 1),
(3, 2, 3, 4, 5, 1, 1),
(4, 2, 3, 4, 0, 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tableGridGetPost`
--
ALTER TABLE `tableGridGetPost`
  ADD PRIMARY KEY (`fieldPrimaryKey`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tableGridGetPost`
--
ALTER TABLE `tableGridGetPost`
  MODIFY `fieldPrimaryKey` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
