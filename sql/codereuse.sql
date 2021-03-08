-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Mar 06, 2021 at 05:17 PM
-- Server version: 5.7.32
-- PHP Version: 7.4.12

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
-- Table structure for table `tableGridGetPost2`
--

CREATE TABLE `tableGridGetPost2` (
  `fieldPrimaryKey` int(11) NOT NULL,
  `field1` date NOT NULL,
  `field2` date NOT NULL,
  `field3` int(11) NOT NULL,
  `field4` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tableGridGetPost2`
--

INSERT INTO `tableGridGetPost2` (`fieldPrimaryKey`, `field1`, `field2`, `field3`, `field4`) VALUES
(1, '2019-08-01', '2019-08-04', 1, 1),
(2, '2019-08-04', '2019-08-01', 1, 2),
(3, '2019-08-01', '2019-08-04', 1, 1),
(4, '2019-08-04', '2019-08-01', 1, 2),
(5, '2019-08-01', '2019-08-04', 2, 3),
(6, '2019-08-04', '2019-08-01', 2, 4),
(7, '2019-08-04', '2019-08-01', 2, 3),
(8, '2019-08-01', '2019-08-04', 2, 4),
(9, '2019-08-04', '2019-08-01', 2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `tableGridGetPostBuilding`
--

CREATE TABLE `tableGridGetPostBuilding` (
  `buildingId` int(11) NOT NULL,
  `buildingName` varchar(14) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tableGridGetPostBuilding`
--

INSERT INTO `tableGridGetPostBuilding` (`buildingId`, `buildingName`) VALUES
(1, 'building'),
(2, 'building2');

-- --------------------------------------------------------

--
-- Table structure for table `tableGridGetPostSuite`
--

CREATE TABLE `tableGridGetPostSuite` (
  `suiteId` int(11) NOT NULL,
  `suiteNumber` varchar(10) NOT NULL,
  `buildingId` int(11) NOT NULL,
  `location` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tableGridGetPostSuite`
--

INSERT INTO `tableGridGetPostSuite` (`suiteId`, `suiteNumber`, `buildingId`, `location`) VALUES
(1, '101', 1, ''),
(2, '102', 1, 'test'),
(3, '101', 2, ''),
(4, '102', 2, '');

-- --------------------------------------------------------

--
-- Table structure for table `tableGridGetPostTenant`
--

CREATE TABLE `tableGridGetPostTenant` (
  `tenantId` int(11) NOT NULL,
  `suiteId` int(11) NOT NULL,
  `firstname` varchar(40) NOT NULL,
  `lastname` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tableGridGetPostTenant`
--

INSERT INTO `tableGridGetPostTenant` (`tenantId`, `suiteId`, `firstname`, `lastname`) VALUES
(1, 1, 'firstname1', 'lastname'),
(2, 2, 'firstname2', 'lastname'),
(3, 3, 'firstname3', 'lastname'),
(4, 4, 'firstname4', 'lastname');

-- --------------------------------------------------------

--
-- Table structure for table `tableGridGetPostUsers`
--

CREATE TABLE `tableGridGetPostUsers` (
  `userId` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tableGridGetPost2`
--
ALTER TABLE `tableGridGetPost2`
  ADD PRIMARY KEY (`fieldPrimaryKey`);

--
-- Indexes for table `tableGridGetPostBuilding`
--
ALTER TABLE `tableGridGetPostBuilding`
  ADD PRIMARY KEY (`buildingId`);

--
-- Indexes for table `tableGridGetPostSuite`
--
ALTER TABLE `tableGridGetPostSuite`
  ADD PRIMARY KEY (`suiteId`);

--
-- Indexes for table `tableGridGetPostTenant`
--
ALTER TABLE `tableGridGetPostTenant`
  ADD PRIMARY KEY (`tenantId`);

--
-- Indexes for table `tableGridGetPostUsers`
--
ALTER TABLE `tableGridGetPostUsers`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tableGridGetPost2`
--
ALTER TABLE `tableGridGetPost2`
  MODIFY `fieldPrimaryKey` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tableGridGetPostBuilding`
--
ALTER TABLE `tableGridGetPostBuilding`
  MODIFY `buildingId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tableGridGetPostSuite`
--
ALTER TABLE `tableGridGetPostSuite`
  MODIFY `suiteId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tableGridGetPostTenant`
--
ALTER TABLE `tableGridGetPostTenant`
  MODIFY `tenantId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tableGridGetPostUsers`
--
ALTER TABLE `tableGridGetPostUsers`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
