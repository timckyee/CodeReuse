-- phpMyAdmin SQL Dump
-- version 4.4.15.10
-- https://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 25, 2021 at 02:47 AM
-- Server version: 5.5.68-MariaDB
-- PHP Version: 7.0.33

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

CREATE TABLE IF NOT EXISTS `tableGridGetPost2` (
  `fieldPrimaryKey` int(11) NOT NULL,
  `field1` date NOT NULL,
  `field2` date NOT NULL,
  `field3` int(11) NOT NULL,
  `field4` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

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
(7, '2019-08-01', '2019-08-04', 2, 3),
(8, '2019-08-04', '2019-08-01', 2, 4);

-- --------------------------------------------------------

--
-- Table structure for table `tableGridGetPostBuilding`
--

CREATE TABLE IF NOT EXISTS `tableGridGetPostBuilding` (
  `buildingId` int(11) NOT NULL,
  `buildingName` varchar(14) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tableGridGetPostBuilding`
--

INSERT INTO `tableGridGetPostBuilding` (`buildingId`, `buildingName`) VALUES
(1, 'building'),
(2, 'building2');

-- --------------------------------------------------------

--
-- Table structure for table `tableGridGetPostLock`
--

CREATE TABLE IF NOT EXISTS `tableGridGetPostLock` (
  `TableName` varchar(40) NOT NULL,
  `PrimaryKey` int(11) NOT NULL,
  `UserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tableGridGetPostSession`
--

CREATE TABLE IF NOT EXISTS `tableGridGetPostSession` (
  `UserId` int(11) NOT NULL,
  `SessionId` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tableGridGetPostSuite`
--

CREATE TABLE IF NOT EXISTS `tableGridGetPostSuite` (
  `suiteId` int(11) NOT NULL,
  `suiteNumber` varchar(10) NOT NULL,
  `buildingId` int(11) NOT NULL,
  `location` varchar(25) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

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

CREATE TABLE IF NOT EXISTS `tableGridGetPostTenant` (
  `tenantId` int(11) NOT NULL,
  `suiteId` int(11) NOT NULL,
  `firstname` varchar(40) NOT NULL,
  `lastname` varchar(40) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

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

CREATE TABLE IF NOT EXISTS `tableGridGetPostUsers` (
  `userId` int(11) NOT NULL,
  `firstname` varchar(40) NOT NULL,
  `lastname` varchar(40) NOT NULL,
  `username` varchar(40) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tableGridGetPostUsers`
--

INSERT INTO `tableGridGetPostUsers` (`userId`, `firstname`, `lastname`, `username`, `email`, `password`) VALUES
(1, 'Firstname', 'Lastname', 'TestUser', 'testuser@testing.com', 'b32682bb956b384e91d411087d6e934df5586dce7083abf5a535c9571950786fe27418557a74ea8b36f5d446130be5563f56a75357ebe36036fc17d51f2e4e7259c6a7743dcb7089cb52c4dabd7d871e7cad23c0147bdd2a67a437104484c7dbdcf650e096bd512c113b3c748ee2e53a7e49beff43b1c2cc8ea96cf2c07f23a01ac5257aff693ab4077ca329a77b61412ea7a73abe8c8a81880d2a0dba3498b84c396bc57707690c3f0b2462617dc59bd801d9209ac513061f3f51d7b637da8d34bb60120207255ec3cdb77021ca973ec1ca7d3ec6e82a1a74a648104b1978c222e6eb5964984666e609f06e1cc966e8518889471fa08702e3f3862279b11881c4d7bc82a0610baad0e74ee7abdfecfabDBFZ2xMaE84UmZ4YndteEFjaXBuQT09'),
(2, 'Firstname', 'Lastname', 'TestUser4', 'testuser4@testing.com', '3c19f528dd9bc57ad7da3d76a92bdecc7ba5ad8974930af3bb9e219c1c9020234b3b9364f39a7670e18082c6135e8a54e3cd82bd0bfdfc28afa3ded64e102ee70047e27b05e5e308f736f1d06254979a7460980d87a2c29a4291a06e53735c9b5fd31d3f40c10ceb1f0a9c1a9bc057fc7fd7d18fc013ea9b436b764c3d4c8476a4fbd3cc88fbd3ba0dc3cc46d3e5d6c403239dba37625ffdb9f34213ff292e7b94f9eba44c06c3d345c0a48a703e5f86544826f9890fec7dfe1bcec7c460b9dc9fdfc1965862e80765f96b2b1aee2a15155af41ac3730e27e642e87ea3165f939f36a8edf408541211585aad5deec1e68dc4cc714f9e757574e182312608e243b6bd69d5c42cd4ac989fa7d22113bbf1dC94b2t6ZWp6SGJtSDV0N1lLSXZyUT09');

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
-- Indexes for table `tableGridGetPostLock`
--
ALTER TABLE `tableGridGetPostLock`
  ADD PRIMARY KEY (`TableName`,`PrimaryKey`);

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
  MODIFY `fieldPrimaryKey` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `tableGridGetPostBuilding`
--
ALTER TABLE `tableGridGetPostBuilding`
  MODIFY `buildingId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `tableGridGetPostSuite`
--
ALTER TABLE `tableGridGetPostSuite`
  MODIFY `suiteId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `tableGridGetPostTenant`
--
ALTER TABLE `tableGridGetPostTenant`
  MODIFY `tenantId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `tableGridGetPostUsers`
--
ALTER TABLE `tableGridGetPostUsers`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
