-- MySQL dump 10.13  Distrib 5.5.32, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: canteen
-- ------------------------------------------------------
-- Server version	5.5.32-0ubuntu7

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Items`
--

DROP TABLE IF EXISTS `Items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Items` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(200) DEFAULT NULL,
  `Category` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Items`
--

LOCK TABLES `Items` WRITE;
/*!40000 ALTER TABLE `Items` DISABLE KEYS */;
INSERT INTO `Items` VALUES (1,'Coffee','Beverage'),(2,'Cocoa','Beverage'),(3,'Hot Tea','Beverage'),(4,'Cold Drinks','Beverage'),(5,'Water','Beverage'),(6,'Donuts','Food'),(7,'Cookies','Food'),(8,'Sandwiches','Food'),(9,'Hot Dogs','Food'),(10,'Gloves','Clothing'),(11,'Blankets','Clothing'),(12,'Snacks','Food'),(13,'Misc','Clothing'),(14,'Hand Warmers','Clothing');
/*!40000 ALTER TABLE `Items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LinkReportItem`
--

DROP TABLE IF EXISTS `LinkReportItem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LinkReportItem` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ReportID` int(11) NOT NULL,
  `ItemID` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ReportID` (`ReportID`),
  KEY `ItemID` (`ItemID`),
  CONSTRAINT `LinkReportItem_ibfk_1` FOREIGN KEY (`ReportID`) REFERENCES `Reports` (`ID`),
  CONSTRAINT `LinkReportItem_ibfk_2` FOREIGN KEY (`ItemID`) REFERENCES `Items` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LinkReportItem`
--

LOCK TABLES `LinkReportItem` WRITE;
/*!40000 ALTER TABLE `LinkReportItem` DISABLE KEYS */;
INSERT INTO `LinkReportItem` VALUES (1,1,1,100),(2,1,2,100),(3,3,2,42);
/*!40000 ALTER TABLE `LinkReportItem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reports`
--

DROP TABLE IF EXISTS `Reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Reports` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Unit` varchar(100) DEFAULT NULL,
  `Start` datetime DEFAULT NULL,
  `Location` varchar(1000) DEFAULT NULL,
  `incident_start` datetime DEFAULT NULL,
  `incident_location` varchar(500) DEFAULT NULL,
  `incident_route` varchar(500) DEFAULT NULL,
  `team_driver` varchar(500) DEFAULT NULL,
  `team_member_1` varchar(500) DEFAULT NULL,
  `team_member_2` varchar(500) DEFAULT NULL,
  `team_member_3` varchar(500) DEFAULT NULL,
  `team_refferal_name` varchar(500) DEFAULT NULL,
  `team_refferal_title` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reports`
--

LOCK TABLES `Reports` WRITE;
/*!40000 ALTER TABLE `Reports` DISABLE KEYS */;
INSERT INTO `Reports` VALUES (1,'001','0000-00-00 00:00:00','AE Office','2014-02-23 00:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'EAM','0000-00-00 00:00:00','Anybar, Pittsburgh, PA','2014-01-10 00:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,'JJP','2014-02-23 01:00:00','Unova','2014-01-10 00:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,NULL,NULL,NULL,'2014-01-10 00:00:00','South Side','','Joshua Petry','Prince','Wyatt','','',''),(5,NULL,NULL,NULL,'2014-02-22 15:35:00','South Side','','Joshua Petry','Prince','Wyatt','','',''),(6,NULL,NULL,NULL,'2014-02-22 15:35:00','South Side','','Joshua Petry','Prince','Wyatt','','',''),(7,NULL,NULL,NULL,'2014-02-22 15:35:00','South Side','','Joshua Petry','Prince','Wyatt','','',''),(8,NULL,NULL,NULL,'2014-02-22 15:35:00','South Side','','Joshua Petry','Prince','Wyatt','','',''),(9,NULL,NULL,NULL,'2014-02-22 15:35:00','South Side','','Joshua Petry','Prince','Wyatt','','',''),(10,NULL,NULL,NULL,'2014-02-22 15:35:00','South Side','','Joshua Petry','Prince','Wyatt','','',''),(11,NULL,NULL,NULL,'2014-02-22 15:35:00','South Side','','Joshua Petry','Prince','Wyatt','','',''),(12,NULL,NULL,NULL,'2014-02-22 15:35:00','South Side','','Joshua Petry','Prince','Wyatt','','',''),(13,NULL,NULL,NULL,'2014-02-22 15:35:00','South Side','','Joshua Petry','Prince','Wyatt','','','');
/*!40000 ALTER TABLE `Reports` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-02-22 23:09:19
