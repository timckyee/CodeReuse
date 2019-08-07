-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 07, 2019 at 05:04 AM
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
(1, 2, 3, 4, 5, 6, 0),
(2, 2, 3, 4, 5, 1, 1),
(3, 2, 3, 4, 5, 1, 1),
(4, 2, 3, 4, 5, 2, 2);

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
(1, '2019-08-01', '2019-08-04', 1, 2),
(2, '2019-08-04', '2019-08-01', 2, 3);

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
  `buildingId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tableGridGetPostSuite`
--

INSERT INTO `tableGridGetPostSuite` (`suiteId`, `suiteNumber`, `buildingId`) VALUES
(1, '101', 1),
(2, '102', 1),
(3, '101', 2),
(4, '102', 2);

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
(1, 1, 'firstname', 'lastname'),
(2, 2, 'firstname', 'lastname'),
(3, 3, 'firstname', 'lastname'),
(4, 4, 'firstname', 'lastname');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tableGridGetPost`
--
ALTER TABLE `tableGridGetPost`
  ADD PRIMARY KEY (`fieldPrimaryKey`);

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tableGridGetPost`
--
ALTER TABLE `tableGridGetPost`
  MODIFY `fieldPrimaryKey` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tableGridGetPost2`
--
ALTER TABLE `tableGridGetPost2`
  MODIFY `fieldPrimaryKey` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
