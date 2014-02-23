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
-- Table structure for table `ReportMembers`
--

DROP TABLE IF EXISTS `ReportMembers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ReportMembers` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ReportID` int(11) DEFAULT NULL,
  `Name` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ReportID` (`ReportID`),
  CONSTRAINT `ReportMembers_ibfk_1` FOREIGN KEY (`ReportID`) REFERENCES `Reports` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ReportMembers`
--

LOCK TABLES `ReportMembers` WRITE;
/*!40000 ALTER TABLE `ReportMembers` DISABLE KEYS */;
/*!40000 ALTER TABLE `ReportMembers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reports`
--

DROP TABLE IF EXISTS `Reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Reports` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `incident_start` datetime DEFAULT NULL,
  `incident_location` varchar(500) DEFAULT NULL,
  `incident_route` varchar(500) DEFAULT NULL,
  `team_driver` varchar(500) DEFAULT NULL,
  `team_refferal_name` varchar(500) DEFAULT NULL,
  `team_refferal_title` varchar(500) DEFAULT NULL,
  `services_counseling_administer` varchar(1000) DEFAULT NULL,
  `services_counseling_reason` varchar(1000) DEFAULT NULL,
  `services_counseling_individual` varchar(1000) DEFAULT NULL,
  `services_counseling_phone_number` varchar(1000) DEFAULT NULL,
  `end_time` varchar(1000) DEFAULT NULL,
  `end_total_mileage` varchar(1000) DEFAULT NULL,
  `end_route_time` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reports`
--

LOCK TABLES `Reports` WRITE;
/*!40000 ALTER TABLE `Reports` DISABLE KEYS */;
INSERT INTO `Reports` VALUES (1,'2014-02-23 00:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'2014-01-10 00:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,'2014-01-10 00:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,'2014-01-10 00:00:00','South Side','','Joshua Petry','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,'2014-02-22 15:35:00','South Side','','Joshua Petry','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,'2014-02-22 15:35:00','South Side','','Joshua Petry','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(7,'2014-02-22 15:35:00','South Side','','Joshua Petry','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(8,'2014-02-22 15:35:00','South Side','','Joshua Petry','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(9,'2014-02-22 15:35:00','South Side','','Joshua Petry','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(10,'2014-02-22 15:35:00','South Side','','Joshua Petry','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(11,'2014-02-22 15:35:00','South Side','','Joshua Petry','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(12,'2014-02-22 15:35:00','South Side','','Joshua Petry','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(13,'2014-02-22 15:35:00','South Side','','Joshua Petry','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(14,'2014-02-22 15:35:00','South Side','','Joshua Petry','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(15,'2014-02-22 15:35:00','South Side','','Joshua Petry','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(16,'2014-02-22 15:35:00','South Side','','Joshua Petry','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(17,'2014-02-22 15:35:00','South Side','','Joshua Petry','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(18,'2014-02-22 15:35:00','South Side','','Joshua Petry','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(19,'2014-02-22 15:35:00','South Side','','Joshua Petry','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(20,'2014-02-22 15:35:00','South Side','','Joshua Petry','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(21,'2014-02-22 15:35:00','South Side','','Joshua Petry','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(22,'2014-02-22 15:35:00','South Side','','Joshua Petry','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(23,'2014-02-22 15:35:00','South Side','','Joshua Petry','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(24,'2014-02-22 15:35:00','South Side','','Joshua Petry','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(25,'2014-02-22 15:35:00','South Side','','Joshua Petry','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(26,'2014-02-22 15:35:00','South Side','','Joshua Petry','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(27,'2014-02-22 15:35:00','South Side','','Joshua Petry','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(28,'2014-02-22 15:35:00','South Side','','Joshua Petry','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(29,'2014-02-22 15:35:00','South Side','','Joshua Petry','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(30,'2014-02-22 15:35:00','South Side','','Joshua Petry','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(31,'2014-02-22 15:35:00','South Side','','Joshua Petry','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(32,'2014-02-22 15:35:00','South Side','','Joshua Petry','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(33,'2014-02-22 15:35:00','South Side','','Joshua Petry','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(34,'2014-02-22 15:35:00','South Side','','Joshua Petry','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(35,'2014-02-22 15:35:00','South Side','','Joshua Petry','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(36,'2014-02-22 15:35:00','South Side','','Joshua Petry','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(37,'2014-02-22 15:35:00','South Side','','Joshua Petry','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(38,'2014-02-22 15:35:00','South Side','','Joshua Petry','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(39,'2014-02-22 15:35:00','South Side','','Joshua Petry','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(40,'2014-02-22 15:35:00','South Side','','Joshua Petry','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(41,'2014-02-22 15:35:00','South Side','','Joshua Petry','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(42,'2014-02-22 15:35:00','South Side','','Joshua Petry','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(43,'2014-02-22 15:35:00','South Side','','Joshua Petry','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(44,'2014-02-22 15:35:00','South Side','','Joshua Petry','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
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

-- Dump completed on 2014-02-23  0:29:53
