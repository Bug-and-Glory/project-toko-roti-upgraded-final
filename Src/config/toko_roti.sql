-- MySQL dump 10.13  Distrib 8.0.45, for macos15 (arm64)
--
-- Host: 127.0.0.1    Database: toko_roti
-- ------------------------------------------------------
-- Server version	9.6.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '44044b24-37e6-11f1-bade-ea9c50bcc08d:1-302';

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'Muhadist','muhadist.as','12345678','2026-06-30 08:49:10','2026-06-30 08:49:10');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  KEY `fk_comments_user` (`user_id`),
  CONSTRAINT `fk_comments_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,1,'Doni Saputra','doni1971@gmail.com','mantap3','2026-06-30 17:26:32','2026-06-30 17:26:32'),(2,1,'Doni Saputra','doni1971@gmail.com','enak kali','2026-06-30 17:32:18','2026-06-30 17:32:18');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_categories`
--

DROP TABLE IF EXISTS `master_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `master_categories` (
  `id` tinyint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_categories`
--

LOCK TABLES `master_categories` WRITE;
/*!40000 ALTER TABLE `master_categories` DISABLE KEYS */;
INSERT INTO `master_categories` VALUES (1,'Makanan'),(2,'Minuman');
/*!40000 ALTER TABLE `master_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_details` (
  `detail_id` bigint NOT NULL AUTO_INCREMENT,
  `order_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) GENERATED ALWAYS AS ((`price` * `quantity`)) STORED,
  PRIMARY KEY (`detail_id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `fk_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `order_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `customer_name` varchar(100) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `fk_orders_user` (`user_id`),
  CONSTRAINT `fk_orders_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_details`
--

DROP TABLE IF EXISTS `product_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_details` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `product_id` bigint NOT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_details_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_details`
--

LOCK TABLES `product_details` WRITE;
/*!40000 ALTER TABLE `product_details` DISABLE KEYS */;
INSERT INTO `product_details` VALUES (1,1,'Croissant renyah dengan lapisan buttery khas Prancis'),(2,2,'Danish pastry lembut dengan topping manis'),(3,3,'Puff pastry ringan dan crispy'),(4,4,'Roti coklat premium khas Prancis'),(5,5,'Kue ulang tahun custom dengan berbagai varian rasa'),(6,6,'Potongan cake lembut berbagai rasa'),(7,7,'Cheesecake creamy dengan rasa keju kuat'),(8,8,'Brownies coklat pekat dan moist'),(9,9,'Cupcake mini dengan topping lucu'),(10,10,'Cookies renyah berbagai varian'),(11,11,'Biscotti kering cocok untuk kopi'),(12,12,'Macaron manis warna-warni'),(13,13,'Donat empuk dengan topping'),(14,14,'Sandwich isi daging & sayur segar'),(15,15,'Burger mini praktis dan lezat'),(16,16,'Espresso kopi hitam pekat'),(17,17,'Americano kopi hitam ringan'),(18,18,'Cappuccino dengan foam lembut'),(19,19,'Latte creamy dengan susu'),(20,20,'Mocha perpaduan kopi & coklat'),(21,21,'Caramel macchiato manis karamel'),(22,22,'Teh tarik khas dengan rasa creamy'),(23,23,'Lemon tea segar'),(24,24,'Thai tea manis khas Thailand'),(25,25,'Susu coklat creamy'),(26,26,'Matcha latte premium'),(27,27,'Susu stroberi segar'),(28,28,'Jus jeruk segar'),(29,29,'Jus mangga manis'),(30,30,'Jus campuran buah segar');
/*!40000 ALTER TABLE `product_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `sub_category_id` tinyint NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sub_category_id` (`sub_category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`sub_category_id`) REFERENCES `sub_categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,1,'Croissant',15000.00,'https://iili.io/BPyxfp9.th.jpg'),(2,1,'Strawberry Danish',16000.00,'https://iili.io/BPyxAYB.th.jpg'),(3,1,'Puff pastry',14000.00,'https://iili.io/BPyxzEx.th.jpg'),(4,1,'Pain au chocolat',18000.00,'https://iili.io/BPyxxBj.th.jpg'),(5,2,'Birthday cake',120000.00,'https://iili.io/BPyxJ14.th.jpg'),(6,2,'Slice cake',20000.00,'https://iili.io/BPyxIrQ.th.jpg'),(7,2,'Cheesecake',25000.00,'https://iili.io/BPyxF7S.th.jpg'),(8,2,'Brownies',22000.00,'https://iili.io/BPyoyLG.th.jpg'),(9,2,'Cupcake',15000.00,'https://iili.io/BPyxBIe.th.jpg'),(10,3,'Cookies',12000.00,'https://iili.io/BPyxKk7.th.jpg'),(11,3,'Biscotti',15000.00,'https://iili.io/BPyxdrl.th.jpg'),(12,3,'Macaron',18000.00,'https://iili.io/BPyxnLb.th.jpg'),(13,3,'Donat',10000.00,'https://iili.io/BPyxChu.th.jpg'),(14,4,'Sandwich',20000.00,'https://iili.io/BPyxu2V.th.jpg'),(15,4,'Burger mini',18000.00,'https://iili.io/BPyopXs.th.jpg'),(16,5,'Espresso',15000.00,'https://iili.io/BPy9DMX.th.jpg'),(17,5,'Americano',18000.00,'https://iili.io/BPy9QtI.th.jpg'),(18,5,'Cappuccino',22000.00,'https://iili.io/BPy9LwN.th.jpg'),(19,5,'Latte',23000.00,'https://iili.io/BPyH9Sf.th.jpg'),(20,5,'Mocha',25000.00,'https://iili.io/BPyHKo7.th.jpg'),(21,5,'Caramel Macchiato',27000.00,'https://iili.io/BPy9i9R.th.jpg'),(22,6,'Teh tarik',15000.00,'https://iili.io/BPyH7iF.th.jpg'),(23,6,'Lemon tea',14000.00,'https://iili.io/BPyHJ94.th.jpg'),(24,6,'Thai tea',18000.00,'https://iili.io/BPyHaKg.th.jpg'),(25,6,'Chocolate milk',20000.00,'https://iili.io/BPy968v.th.jpg'),(26,6,'Matcha latte',25000.00,'https://iili.io/BPyHqPe.th.jpg'),(27,6,'Strawberry milk',22000.00,'https://iili.io/BPyH1Hv.th.jpg'),(28,6,'Orange juice',20000.00,'https://iili.io/BPyHfV9.th.jpg'),(29,6,'Mango juice',22000.00,'https://iili.io/BPy9bPn.th.jpg'),(30,6,'Mix fruit',25000.00,'https://iili.io/BPyHncb.th.jpg');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_categories`
--

DROP TABLE IF EXISTS `sub_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_categories` (
  `id` tinyint NOT NULL AUTO_INCREMENT,
  `master_category_id` tinyint NOT NULL,
  `name` varchar(100) NOT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `master_category_id` (`master_category_id`),
  CONSTRAINT `sub_categories_ibfk_1` FOREIGN KEY (`master_category_id`) REFERENCES `master_categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_categories`
--

LOCK TABLES `sub_categories` WRITE;
/*!40000 ALTER TABLE `sub_categories` DISABLE KEYS */;
INSERT INTO `sub_categories` VALUES (1,1,'Roti & Pastry','https://iili.io/BPyxfp9.th.jpg'),(2,1,'Cake & Dessert','https://iili.io/BPyxJ14.th.jpg'),(3,1,'Cookies & Snack','https://iili.io/BPyxKk7.th.jpg'),(4,1,'Savory','https://iili.io/BPyxu2V.th.jpg'),(5,2,'Coffee','https://iili.io/BPy9DMX.th.jpg'),(6,2,'Non-Coffee','https://iili.io/BPyH7iF.th.jpg');
/*!40000 ALTER TABLE `sub_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Doni Saputra','doniii','doni1971@gmail.com','1234567','2026-06-30 08:47:35','2026-06-30 08:47:35');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-02 12:39:19
