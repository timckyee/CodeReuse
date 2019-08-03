-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 02, 2019 at 12:58 AM
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

-- --------------------------------------------------------

--
-- Table structure for table `tableGridGetPost2`
--

CREATE TABLE `tableGridGetPost2` (
  `fieldPrimaryKey` int(11) NOT NULL,
  `field1` int(11) NOT NULL,
  `field2` int(11) NOT NULL,
  `field3` int(11) NOT NULL,
  `field4` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tableGridGetPost2`
--

INSERT INTO `tableGridGetPost2` (`fieldPrimaryKey`, `field1`, `field2`, `field3`, `field4`) VALUES
(1, 2, 3, 4, 5),
(2, 2, 3, 4, 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tableGridGetPost2`
--
ALTER TABLE `tableGridGetPost2`
  ADD PRIMARY KEY (`fieldPrimaryKey`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tableGridGetPost2`
--
ALTER TABLE `tableGridGetPost2`
  MODIFY `fieldPrimaryKey` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
