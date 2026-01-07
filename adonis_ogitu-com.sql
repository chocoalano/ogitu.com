-- MySQL dump 10.13  Distrib 8.0.27, for macos11 (arm64)
--
-- Host: 127.0.0.1    Database: adonis_ogitu-com
-- ------------------------------------------------------
-- Server version	9.5.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
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

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '33d45ff0-991d-11f0-80b8-c6b2f7a615d0:1-49706,
7743a582-9e9b-11f0-bd79-259ca256c8e7:1-30902,
9c0a0157-1769-11f0-8f80-baba02fe6cbf:1-123903';

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `addresses` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `customer_id` int unsigned DEFAULT NULL,
  `label` varchar(255) NOT NULL COMMENT 'e.g., Home, Office',
  `recipient_name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address_line1` text NOT NULL,
  `address_line2` text,
  `city_id` varchar(255) NOT NULL COMMENT 'RajaOngkir city ID',
  `city_name` varchar(255) NOT NULL,
  `province_id` varchar(255) NOT NULL COMMENT 'RajaOngkir province ID',
  `province_name` varchar(255) NOT NULL,
  `postal_code` varchar(255) NOT NULL,
  `country` varchar(255) DEFAULT 'Indonesia',
  `is_default` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `district_id` varchar(255) DEFAULT NULL COMMENT 'RajaOngkir district/kecamatan ID',
  `district_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `addresses_customer_id_foreign` (`customer_id`),
  CONSTRAINT `addresses_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES (1,1,'Rumah','Ahmad Fauzi','081234567890','Jl. Sudirman No. 123, RT 05/RW 03','Apartemen Sudirman Tower, Unit 15A','151','Jakarta Pusat','6','DKI Jakarta','10220','Indonesia',1,'2025-12-20 16:13:06','2025-12-20 16:13:06',NULL,NULL),(2,1,'Kantor','Ahmad Fauzi','081234567890','Jl. Gatot Subroto No. 88','Gedung Menara Karya Lt. 12','153','Jakarta Selatan','6','DKI Jakarta','12930','Indonesia',0,'2025-12-20 16:13:06','2025-12-20 16:13:06',NULL,NULL),(3,2,'Rumah','Siti Rahayu','081298765432','Jl. Dago No. 45, RT 02/RW 01','Perumahan Dago Indah Blok C-5','23','Bandung','9','Jawa Barat','40135','Indonesia',1,'2025-12-20 16:13:06','2025-12-20 16:13:06',NULL,NULL),(4,3,'Rumah','Budi Santoso','085612345678','Jl. Raya Darmo No. 56, RT 03/RW 02',NULL,'444','Surabaya','11','Jawa Timur','60264','Indonesia',1,'2025-12-20 16:13:06','2025-12-20 16:13:06',NULL,NULL),(5,3,'Toko','Budi Santoso','085612345678','Jl. Tunjungan No. 78','Ruko Tunjungan Plaza Blok A-12','444','Surabaya','11','Jawa Timur','60275','Indonesia',0,'2025-12-20 16:13:06','2025-12-20 16:13:06',NULL,NULL),(6,4,'Rumah','Dewi Lestari','087812345678','Jl. Malioboro No. 32, RT 01/RW 04',NULL,'501','Yogyakarta','5','DI Yogyakarta','55271','Indonesia',1,'2025-12-20 16:13:06','2025-12-20 16:13:06',NULL,NULL),(7,5,'Rumah','Rudi Hermawan','081356789012','Jl. Pandanaran No. 89, RT 06/RW 02','Perumahan Pandanaran Indah','398','Semarang','10','Jawa Tengah','50134','Indonesia',1,'2025-12-20 16:13:06','2025-12-20 16:13:06',NULL,NULL),(8,6,'Rumah','Rina Wulandari','082145678901','Jl. Sunset Road No. 100, BR Seminyak','Villa Seminyak Estate No. 15','114','Denpasar','1','Bali','80361','Indonesia',1,'2025-12-20 16:13:06','2025-12-20 16:13:06',NULL,NULL),(9,7,'Rumah','Doni Pratama','085678901234','Jl. Iskandar Muda No. 67, Kelurahan Babura',NULL,'278','Medan','34','Sumatera Utara','20154','Indonesia',1,'2025-12-20 16:13:06','2025-12-20 16:13:06',NULL,NULL),(10,8,'Rumah','Maya Sari','081567890123','Jl. AP Pettarani No. 45, Kelurahan Tidung','Komplek Puri Mas Blok D-8','263','Makassar','28','Sulawesi Selatan','90222','Indonesia',1,'2025-12-20 16:13:06','2025-12-20 16:13:06',NULL,NULL),(11,9,'Rumah','Eko Wijaya','087890123456','Jl. Ahmad Yani No. 112, RT 04/RW 08','Perumahan Harapan Indah Blok F-23','55','Bekasi','9','Jawa Barat','17131','Indonesia',1,'2025-12-20 16:13:06','2025-12-20 16:13:06',NULL,NULL),(12,10,'Rumah','Fitri Handayani','082234567890','Jl. BSD Raya No. 88, Serpong','Cluster Harmony BSD City','455','Tangerang Selatan','3','Banten','15310','Indonesia',1,'2025-12-20 16:13:06','2025-12-20 16:13:06',NULL,NULL);
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adonis_schema`
--

DROP TABLE IF EXISTS `adonis_schema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adonis_schema` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `batch` int NOT NULL,
  `migration_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adonis_schema`
--

LOCK TABLES `adonis_schema` WRITE;
/*!40000 ALTER TABLE `adonis_schema` DISABLE KEYS */;
INSERT INTO `adonis_schema` VALUES (1,'database/migrations/1765507642591_create_customers_table',1,'2025-12-20 16:12:42'),(2,'database/migrations/1765507642592_create_users_table',1,'2025-12-20 16:12:42'),(3,'database/migrations/1765507642594_create_categories_table',1,'2025-12-20 16:12:42'),(4,'database/migrations/1765507642595_create_products_table',1,'2025-12-20 16:12:43'),(5,'database/migrations/1765507642596_create_product_variants_table',1,'2025-12-20 16:12:43'),(6,'database/migrations/1765507642597_create_product_images_table',1,'2025-12-20 16:12:43'),(7,'database/migrations/1765507642598_create_addresses_table',1,'2025-12-20 16:12:43'),(8,'database/migrations/1765507642599_create_orders_table',1,'2025-12-20 16:12:44'),(9,'database/migrations/1765507642600_create_order_items_table',1,'2025-12-20 16:12:45'),(10,'database/migrations/1765507642601_create_reviews_table',1,'2025-12-20 16:12:45'),(11,'database/migrations/1765507642602_create_cart_items_table',1,'2025-12-20 16:12:47'),(12,'database/migrations/1765507642603_create_payments_table',1,'2025-12-20 16:12:48'),(13,'database/migrations/1765507642604_create_shippings_table',1,'2025-12-20 16:12:48'),(14,'database/migrations/1765549899835_create_wishlists_table',1,'2025-12-20 16:12:48'),(15,'database/migrations/1765553048956_create_remember_me_tokens_table',1,'2025-12-20 16:12:49'),(16,'database/migrations/1765555476419_create_add_checked_to_cart_items_table',1,'2025-12-20 16:12:49'),(17,'database/migrations/1765559014337_create_add_district_to_addresses_table',1,'2025-12-20 16:12:49'),(18,'database/migrations/1765600000001_create_wallets_table',1,'2025-12-20 16:12:49'),(19,'database/migrations/1765600000002_create_wallet_transactions_table',1,'2025-12-20 16:12:50'),(20,'database/migrations/1765600000003_create_affiliates_table',1,'2025-12-20 16:12:50'),(21,'database/migrations/1765600000004_create_affiliate_referrals_table',1,'2025-12-20 16:12:51'),(22,'database/migrations/1765600000005_create_affiliate_commissions_table',1,'2025-12-20 16:12:51'),(23,'database/migrations/1765600000006_create_customer_ranks_table',1,'2025-12-20 16:12:51'),(24,'database/migrations/1765600000007_add_wallet_affiliate_rank_to_customers_table',1,'2025-12-20 16:12:57'),(25,'database/migrations/1765700000001_create_otps_table',1,'2025-12-20 16:12:58'),(26,'database/migrations/1765773891137_create_create_notifications_table',1,'2025-12-20 16:12:58'),(27,'database/migrations/1765788441129_create_add_admin_reply_to_reviews_table',1,'2025-12-20 16:12:58'),(28,'database/migrations/1765800000001_create_discounts_table',1,'2025-12-20 16:12:59'),(29,'database/migrations/1765800000002_create_vouchers_table',1,'2025-12-20 16:12:59'),(30,'database/migrations/1765800000003_create_flash_sales_table',1,'2025-12-20 16:13:00'),(31,'database/migrations/1765900000001_create_bugs_table',1,'2025-12-20 16:13:01'),(32,'database/migrations/1765507642650_create_store_settings_tables',2,'2025-12-22 06:36:12'),(33,'database/migrations/1766412271693_create_rate_limits_table',3,'2025-12-22 14:48:57'),(34,'database/migrations/1766500000001_add_mlm_tree_columns_to_affiliate_referrals',4,'2025-12-23 04:13:27'),(35,'database/migrations/1766500000002_add_level_to_affiliate_commissions',4,'2025-12-23 04:13:27'),(36,'database/migrations/1766600000001_create_articles_table',5,'2026-01-07 04:04:37');
/*!40000 ALTER TABLE `adonis_schema` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adonis_schema_versions`
--

DROP TABLE IF EXISTS `adonis_schema_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adonis_schema_versions` (
  `version` int unsigned NOT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adonis_schema_versions`
--

LOCK TABLES `adonis_schema_versions` WRITE;
/*!40000 ALTER TABLE `adonis_schema_versions` DISABLE KEYS */;
INSERT INTO `adonis_schema_versions` VALUES (2);
/*!40000 ALTER TABLE `adonis_schema_versions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `affiliate_commissions`
--

DROP TABLE IF EXISTS `affiliate_commissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `affiliate_commissions` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `affiliate_id` int unsigned DEFAULT NULL,
  `order_id` int unsigned DEFAULT NULL,
  `referred_customer_id` int unsigned DEFAULT NULL,
  `order_total` decimal(15,2) NOT NULL,
  `commission_rate` decimal(5,2) NOT NULL,
  `commission_amount` decimal(15,2) NOT NULL,
  `status` varchar(30) NOT NULL DEFAULT 'pending',
  `level` int unsigned NOT NULL DEFAULT '1',
  `approved_at` timestamp NULL DEFAULT NULL,
  `paid_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `affiliate_commissions_referred_customer_id_foreign` (`referred_customer_id`),
  KEY `affiliate_commissions_affiliate_id_status_index` (`affiliate_id`,`status`),
  KEY `affiliate_commissions_order_id_index` (`order_id`),
  CONSTRAINT `affiliate_commissions_affiliate_id_foreign` FOREIGN KEY (`affiliate_id`) REFERENCES `affiliates` (`id`) ON DELETE CASCADE,
  CONSTRAINT `affiliate_commissions_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `affiliate_commissions_referred_customer_id_foreign` FOREIGN KEY (`referred_customer_id`) REFERENCES `customers` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `affiliate_commissions`
--

LOCK TABLES `affiliate_commissions` WRITE;
/*!40000 ALTER TABLE `affiliate_commissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `affiliate_commissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `affiliate_referrals`
--

DROP TABLE IF EXISTS `affiliate_referrals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `affiliate_referrals` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `affiliate_id` int unsigned DEFAULT NULL,
  `parent_affiliate_id` int unsigned DEFAULT NULL,
  `level` int unsigned NOT NULL DEFAULT '1',
  `referred_customer_id` int unsigned DEFAULT NULL,
  `status` varchar(30) NOT NULL DEFAULT 'active',
  `total_spent` decimal(15,2) NOT NULL DEFAULT '0.00',
  `total_orders` int unsigned NOT NULL DEFAULT '0',
  `registered_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `affiliate_referrals_referred_customer_id_unique` (`referred_customer_id`),
  KEY `affiliate_referrals_affiliate_id_status_index` (`affiliate_id`,`status`),
  KEY `affiliate_referrals_parent_affiliate_id_level_index` (`parent_affiliate_id`,`level`),
  CONSTRAINT `affiliate_referrals_affiliate_id_foreign` FOREIGN KEY (`affiliate_id`) REFERENCES `affiliates` (`id`) ON DELETE CASCADE,
  CONSTRAINT `affiliate_referrals_parent_affiliate_id_foreign` FOREIGN KEY (`parent_affiliate_id`) REFERENCES `affiliates` (`id`) ON DELETE SET NULL,
  CONSTRAINT `affiliate_referrals_referred_customer_id_foreign` FOREIGN KEY (`referred_customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `affiliate_referrals`
--

LOCK TABLES `affiliate_referrals` WRITE;
/*!40000 ALTER TABLE `affiliate_referrals` DISABLE KEYS */;
INSERT INTO `affiliate_referrals` VALUES (1,4,NULL,1,7,'prospect',0.00,0,'2025-12-23 07:21:59','2025-12-23 07:21:59','2025-12-23 07:21:59'),(2,4,NULL,1,6,'prospect',0.00,0,'2025-12-23 07:24:20','2025-12-23 07:24:20','2025-12-23 07:24:20');
/*!40000 ALTER TABLE `affiliate_referrals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `affiliates`
--

DROP TABLE IF EXISTS `affiliates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `affiliates` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `customer_id` int unsigned DEFAULT NULL,
  `referral_code` varchar(50) NOT NULL,
  `commission_rate` decimal(5,2) NOT NULL DEFAULT '5.00',
  `total_earnings` decimal(15,2) NOT NULL DEFAULT '0.00',
  `pending_earnings` decimal(15,2) NOT NULL DEFAULT '0.00',
  `withdrawn_earnings` decimal(15,2) NOT NULL DEFAULT '0.00',
  `total_referrals` int NOT NULL DEFAULT '0',
  `total_orders` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `affiliates_referral_code_unique` (`referral_code`),
  UNIQUE KEY `affiliates_customer_id_unique` (`customer_id`),
  CONSTRAINT `affiliates_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `affiliates`
--

LOCK TABLES `affiliates` WRITE;
/*!40000 ALTER TABLE `affiliates` DISABLE KEYS */;
INSERT INTO `affiliates` VALUES (1,1,'AHM0001PJ7',5.00,0.00,0.00,0.00,0,0,1,'2025-12-22 10:14:11','2025-12-22 10:14:11'),(2,9,'EKO000982J',5.00,0.00,0.00,0.00,0,0,1,'2025-12-22 17:13:12','2025-12-22 17:13:12'),(3,8,'OGIE67CH8',5.00,0.00,0.00,0.00,0,0,1,'2025-12-23 06:25:04','2025-12-23 06:25:04'),(4,10,'OGIOWROK2',5.00,0.00,0.00,0.00,2,0,1,'2025-12-23 07:05:46','2025-12-23 07:05:46'),(5,4,'OGIGROF2P',5.00,0.00,0.00,0.00,0,0,1,'2026-01-07 02:47:38','2026-01-07 02:47:38');
/*!40000 ALTER TABLE `affiliates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `author_id` int unsigned DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `excerpt` varchar(500) DEFAULT NULL,
  `blocks` json NOT NULL,
  `content_plain` longtext,
  `meta_title` varchar(255) DEFAULT NULL,
  `meta_description` varchar(500) DEFAULT NULL,
  `meta_keywords` varchar(500) DEFAULT NULL,
  `thumbnail` varchar(500) DEFAULT NULL,
  `banner` varchar(500) DEFAULT NULL,
  `category` varchar(100) NOT NULL DEFAULT 'tips',
  `tags` json DEFAULT NULL,
  `status` enum('draft','published','archived') DEFAULT 'draft',
  `is_featured` tinyint(1) DEFAULT '0',
  `is_pinned` tinyint(1) DEFAULT '0',
  `view_count` int unsigned DEFAULT '0',
  `like_count` int unsigned DEFAULT '0',
  `share_count` int unsigned DEFAULT '0',
  `read_time` int unsigned DEFAULT '5',
  `published_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `articles_slug_unique` (`slug`),
  KEY `articles_author_id_foreign` (`author_id`),
  KEY `articles_status_published_at_index` (`status`,`published_at`),
  KEY `articles_category_status_index` (`category`,`status`),
  KEY `articles_is_featured_status_index` (`is_featured`,`status`),
  CONSTRAINT `articles_author_id_foreign` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (1,1,'Cara Memilih Pod System yang Tepat untuk Pemula','cara-memilih-pod-system-untuk-pemula','Panduan lengkap memilih pod system pertama Anda. Dari kapasitas baterai hingga jenis coil yang cocok untuk pemula.','[{\"id\": \"block_1767758888148_vqntgb7\", \"data\": {\"text\": \"Memilih Pod System Pertama Anda\", \"level\": \"2\"}, \"type\": \"heading\"}, {\"id\": \"block_1767758888148_gd5xj1i\", \"data\": {\"text\": \"Bagi Anda yang baru memulai perjalanan vaping, memilih pod system yang tepat bisa menjadi tantangan tersendiri. Dengan begitu banyak pilihan di pasaran, artikel ini akan membantu Anda membuat keputusan yang tepat.\"}, \"type\": \"paragraph\"}, {\"id\": \"block_1767758888148_g8d7kdk\", \"data\": {\"title\": \"Daftar Isi\", \"maxDepth\": \"3\"}, \"type\": \"toc\"}, {\"id\": \"block_1767758888148_csoh28l\", \"data\": {\"alt\": \"Berbagai jenis pod system untuk pemula\", \"src\": \"/images/articles/pod-system-guide.jpg\", \"caption\": \"Pod system populer di tahun 2024\", \"alignment\": \"center\"}, \"type\": \"image\"}, {\"id\": \"block_1767758888148_7q53zqb\", \"data\": {\"text\": \"1. Kapasitas Baterai\", \"level\": \"3\", \"anchor\": \"kapasitas-baterai\"}, \"type\": \"heading\"}, {\"id\": \"block_1767758888148_607avv2\", \"data\": {\"text\": \"Untuk pemula, kami merekomendasikan pod system dengan baterai minimal <strong>500mAh</strong>. Ini akan memberikan daya tahan yang cukup untuk sehari penuh penggunaan moderate.\"}, \"type\": \"paragraph\"}, {\"id\": \"block_1767758888148_6losoc7\", \"data\": {\"text\": \"VOOPOO Drag Nano 2 (800mAh) atau Vaporesso XROS 3 (1000mAh) menawarkan kapasitas yang sangat baik untuk pemula.\", \"type\": \"tip\", \"title\": \"Rekomendasi Baterai\"}, \"type\": \"alert\"}, {\"id\": \"block_1767758888148_tcpddqr\", \"data\": {\"text\": \"2. Jenis Coil\", \"level\": \"3\", \"anchor\": \"jenis-coil\"}, \"type\": \"heading\"}, {\"id\": \"block_1767758888148_p1kqbh1\", \"data\": {\"text\": \"Ada dua jenis coil utama yang perlu Anda ketahui:\"}, \"type\": \"paragraph\"}, {\"id\": \"block_1767758888148_wmnqeft\", \"data\": {\"items\": [{\"text\": \"<strong>Mesh Coil</strong> - Memberikan rasa yang lebih kaya dan produksi vapor yang lebih baik\"}, {\"text\": \"<strong>Regular Coil</strong> - Lebih hemat liquid dan cocok untuk MTL (Mouth-to-Lung)\"}], \"style\": \"unordered\"}, \"type\": \"list\"}, {\"id\": \"block_1767758888148_hwyssa2\", \"data\": {\"text\": \"3. Kapasitas Pod\", \"level\": \"3\", \"anchor\": \"kapasitas-pod\"}, \"type\": \"heading\"}, {\"id\": \"block_1767758888148_fyxx6u4\", \"data\": {\"text\": \"Pod dengan kapasitas <strong>2ml</strong> adalah standar yang baik untuk pemula. Cukup untuk sehari penggunaan tanpa perlu sering-sering refill.\"}, \"type\": \"paragraph\"}, {\"id\": \"block_1767758888148_pscej67\", \"data\": {\"text\": \"4. Fitur Keamanan\", \"level\": \"3\", \"anchor\": \"fitur-keamanan\"}, \"type\": \"heading\"}, {\"id\": \"block_1767758888148_phq6k3p\", \"data\": {\"text\": \"Pastikan pod system Anda memiliki fitur keamanan seperti:\"}, \"type\": \"paragraph\"}, {\"id\": \"block_1767758888148_u9bn9ey\", \"data\": {\"items\": [{\"text\": \"Short circuit protection\", \"checked\": \"1\"}, {\"text\": \"Over-discharge protection\", \"checked\": \"1\"}, {\"text\": \"Low voltage protection\", \"checked\": \"1\"}], \"style\": \"checklist\"}, \"type\": \"list\"}, {\"id\": \"block_1767758888148_81g55zj\", \"data\": {\"style\": \"gradient\", \"spacing\": \"lg\"}, \"type\": \"divider\"}, {\"id\": \"block_1767758888148_jrewrrk\", \"data\": {\"text\": \"Rekomendasi Pod System untuk Pemula\", \"level\": \"3\", \"anchor\": \"rekomendasi\"}, \"type\": \"heading\"}, {\"id\": \"block_1767758888148_uvjqv93\", \"data\": {\"title\": \"Perbandingan Pod System Populer\", \"headers\": [\"Vaporesso XROS 3\", \"VOOPOO Drag Nano 2\", \"Caliburn G2\"], \"features\": [{\"label\": \"Kapasitas Baterai\", \"values\": [\"1000mAh\", \"800mAh\", \"750mAh\"]}, {\"label\": \"Kapasitas Pod\", \"values\": [\"2ml\", \"2ml\", \"2ml\"]}, {\"label\": \"Mesh Coil\", \"values\": [\"1\", \"1\", \"1\"]}, {\"label\": \"Adjustable Airflow\", \"values\": [\"1\", \"1\", \"0\"]}, {\"label\": \"Harga\", \"values\": [\"Rp 250.000\", \"Rp 220.000\", \"Rp 200.000\"]}], \"highlightColumn\": \"0\"}, \"type\": \"comparison-table\"}, {\"id\": \"block_1767758888148_mhn88l1\", \"data\": {\"style\": \"gradient\", \"title\": \"Butuh Bantuan Memilih?\", \"buttonUrl\": \"/contact\", \"buttonText\": \"Konsultasi Gratis\", \"description\": \"Tim kami siap membantu Anda menemukan pod system yang tepat sesuai kebutuhan.\"}, \"type\": \"cta-box\"}]','Memilih Pod System Pertama Anda Bagi Anda yang baru memulai perjalanan vaping, memilih pod system yang tepat bisa menjadi tantangan tersendiri. Dengan begitu banyak pilihan di pasaran, artikel ini akan membantu Anda membuat keputusan yang tepat. 1. Kapasitas Baterai Untuk pemula, kami merekomendasikan pod system dengan baterai minimal 500mAh. Ini akan memberikan daya tahan yang cukup untuk sehari penuh penggunaan moderate. Rekomendasi Baterai VOOPOO Drag Nano 2 (800mAh) atau Vaporesso XROS 3 (1000mAh) menawarkan kapasitas yang sangat baik untuk pemula. 2. Jenis Coil Ada dua jenis coil utama yang perlu Anda ketahui: Mesh Coil - Memberikan rasa yang lebih kaya dan produksi vapor yang lebih baik Regular Coil - Lebih hemat liquid dan cocok untuk MTL (Mouth-to-Lung) 3. Kapasitas Pod Pod dengan kapasitas 2ml adalah standar yang baik untuk pemula. Cukup untuk sehari penggunaan tanpa perlu sering-sering refill. 4. Fitur Keamanan Pastikan pod system Anda memiliki fitur keamanan seperti: Short circuit protection Over-discharge protection Low voltage protection Rekomendasi Pod System untuk Pemula Butuh Bantuan Memilih? Tim kami siap membantu Anda menemukan pod system yang tepat sesuai kebutuhan.',NULL,NULL,NULL,'https://sas-assets.sgp1.cdn.digitaloceanspaces.com/ogitu-com/development/articles/thumbnails/20260107144251-cara-memilih-pod-system-untuk-pemula.webp','https://sas-assets.sgp1.cdn.digitaloceanspaces.com/ogitu-com/development/articles/banners/20260107144252-cara-memilih-pod-system-untuk-pemula.webp','tips','[\"pod system\", \"pemula\", \"vape guide\", \"tips vaping\"]','published',1,1,1261,89,45,2,'2026-01-05 04:08:08','2026-01-07 04:08:08','2026-01-07 07:42:52'),(2,1,'Review Lengkap: Vaporesso XROS 3 - Pod System Terbaik 2024','review-vaporesso-xros-3','Review mendalam Vaporesso XROS 3 dengan fitur adjustable airflow dan baterai 1000mAh. Apakah layak dibeli?','[{\"id\": \"block_1767758888155_iwjx4vy\", \"data\": {\"text\": \"Vaporesso XROS 3 - Review Lengkap\", \"level\": \"2\"}, \"type\": \"heading\"}, {\"id\": \"block_1767758888155_vvzpncv\", \"data\": {\"text\": \"Vaporesso XROS 3 adalah iterasi terbaru dari seri XROS yang sangat populer. Dengan peningkatan signifikan dari versi sebelumnya, apakah pod system ini layak menjadi pilihan Anda? Mari kita bahas.\", \"dropCap\": \"1\"}, \"type\": \"paragraph\"}, {\"id\": \"block_1767758888155_njs7drb\", \"data\": {\"alt\": \"Vaporesso XROS 3 dalam berbagai warna\", \"src\": \"/images/articles/xros-3-review.jpg\", \"caption\": \"Vaporesso XROS 3 hadir dalam 8 pilihan warna menarik\", \"alignment\": \"full\"}, \"type\": \"image\"}, {\"id\": \"block_1767758888155_43zdkva\", \"data\": {\"text\": \"Spesifikasi\", \"level\": \"3\"}, \"type\": \"heading\"}, {\"id\": \"block_1767758888155_b5dub19\", \"data\": {\"rows\": [[\"Kapasitas Baterai\", \"1000mAh\"], [\"Kapasitas Pod\", \"2ml\"], [\"Coil Resistance\", \"0.6Ω & 1.0Ω\"], [\"Output\", \"11-16W (Auto)\"], [\"Charging\", \"Type-C 1A\"], [\"Material\", \"Zinc Alloy + Leather\"]], \"headers\": [\"Spesifikasi\", \"Detail\"], \"striped\": \"1\", \"bordered\": \"1\"}, \"type\": \"table\"}, {\"id\": \"block_1767758888155_1a3uo0u\", \"data\": {\"text\": \"Penilaian Kami\", \"level\": \"3\"}, \"type\": \"heading\"}, {\"id\": \"block_1767758888155_kavewk7\", \"data\": {\"style\": \"detailed\", \"title\": \"Score Keseluruhan\", \"verdict\": \"Vaporesso XROS 3 adalah pilihan excellent untuk pemula maupun veteran. Adjustable airflow dan baterai besar menjadi nilai plus.\", \"criteria\": [{\"label\": \"Build Quality\", \"rating\": \"4.8\"}, {\"label\": \"Flavor Production\", \"rating\": \"4.5\"}, {\"label\": \"Battery Life\", \"rating\": \"4.6\"}, {\"label\": \"Ease of Use\", \"rating\": \"4.7\"}, {\"label\": \"Value for Money\", \"rating\": \"4.2\"}], \"maxRating\": \"5\", \"overallRating\": \"4.5\"}, \"type\": \"rating-box\"}, {\"id\": \"block_1767758888155_b4it0t1\", \"data\": {\"text\": \"Kelebihan & Kekurangan\", \"level\": \"3\"}, \"type\": \"heading\"}, {\"id\": \"block_1767758888155_kb1vglx\", \"data\": {\"cons\": [\"Harga lebih mahal dari kompetitor\", \"Pod tidak compatible dengan XROS versi lama\", \"Tidak ada wattage display\"], \"pros\": [\"Baterai 1000mAh sangat awet\", \"Adjustable airflow untuk customisasi\", \"Build quality premium dengan leather texture\", \"Dual activation (button + auto-draw)\", \"Flavor excellent dengan mesh coil\"], \"style\": \"side-by-side\"}, \"type\": \"pros-cons\"}, {\"id\": \"block_1767758888155_75mtz63\", \"data\": {\"text\": \"Video Review\", \"level\": \"3\"}, \"type\": \"heading\"}, {\"id\": \"block_1767758888155_u1h345b\", \"data\": {\"url\": \"https://www.youtube.com/watch?v=dQw4w9WgXcQ\", \"caption\": \"Video review lengkap Vaporesso XROS 3\", \"provider\": \"youtube\", \"aspectRatio\": \"16:9\"}, \"type\": \"embed\"}, {\"id\": \"block_1767758888155_nt8yq5a\", \"data\": {\"text\": \"Kesimpulan\", \"level\": \"3\"}, \"type\": \"heading\"}, {\"id\": \"block_1767758888155_5j3spjs\", \"data\": {\"text\": \"Vaporesso XROS 3 adalah <strong>pod system terbaik di kelasnya</strong> saat ini. Dengan kombinasi fitur premium, build quality excellent, dan performa flavor yang outstanding, pod ini sangat layak untuk investasi jangka panjang.\"}, \"type\": \"paragraph\"}, {\"id\": \"block_1767758888155_icclnu4\", \"data\": {\"url\": \"/produk/vaporesso-xros-3\", \"icon\": \"i-lucide-shopping-cart\", \"size\": \"lg\", \"text\": \"Beli Vaporesso XROS 3\", \"style\": \"primary\", \"alignment\": \"center\", \"iconPosition\": \"left\"}, \"type\": \"button\"}]','Vaporesso XROS 3 - Review Lengkap Vaporesso XROS 3 adalah iterasi terbaru dari seri XROS yang sangat populer. Dengan peningkatan signifikan dari versi sebelumnya, apakah pod system ini layak menjadi pilihan Anda? Mari kita bahas. Spesifikasi Spesifikasi Detail Kapasitas Baterai 1000mAh Kapasitas Pod 2ml Coil Resistance 0.6Ω & 1.0Ω Output 11-16W (Auto) Charging Type-C 1A Material Zinc Alloy + Leather Penilaian Kami Kelebihan & Kekurangan Video Review Kesimpulan Vaporesso XROS 3 adalah pod system terbaik di kelasnya saat ini. Dengan kombinasi fitur premium, build quality excellent, dan performa flavor yang outstanding, pod ini sangat layak untuk investasi jangka panjang.',NULL,NULL,NULL,'https://sas-assets.sgp1.cdn.digitaloceanspaces.com/ogitu-com/development/articles/thumbnails/20260107145008-review-vaporesso-xros-3.webp','https://sas-assets.sgp1.cdn.digitaloceanspaces.com/ogitu-com/development/articles/banners/20260107145008-review-vaporesso-xros-3.webp','review','[\"xros 3\", \"pod system\"]','published',1,0,2153,156,78,1,'2026-01-02 04:08:08','2026-01-07 04:08:08','2026-01-07 07:50:08'),(3,1,'Regulasi Vape Indonesia 2024: Apa yang Perlu Anda Ketahui','regulasi-vape-indonesia-2024','Update terbaru mengenai regulasi vape di Indonesia. Cukai, batasan usia, dan aturan penjualan online.','[{\"id\": \"block_1767758888155_kndqv6e\", \"data\": {\"text\": \"Update Regulasi Vape 2024\", \"level\": 2}, \"type\": \"heading\"}, {\"id\": \"block_1767758888155_lgolk4z\", \"data\": {\"text\": \"Artikel ini berisi rangkuman regulasi. Untuk informasi resmi, silakan cek website Kementerian Keuangan dan BPOM.\", \"type\": \"warning\", \"title\": \"Informasi Penting\"}, \"type\": \"alert\"}, {\"id\": \"block_1767758888155_cifzhos\", \"data\": {\"text\": \"Pemerintah Indonesia telah mengeluarkan beberapa kebijakan baru terkait produk vape pada tahun 2024. Berikut rangkuman lengkap yang perlu Anda ketahui sebagai konsumen maupun pelaku usaha.\"}, \"type\": \"paragraph\"}, {\"id\": \"block_1767758888155_1gghu5d\", \"data\": {\"text\": \"Tarif Cukai Terbaru\", \"level\": 3}, \"type\": \"heading\"}, {\"id\": \"block_1767758888155_6a90m5d\", \"data\": {\"text\": \"Per 1 Januari 2024, tarif cukai hasil pengolahan tembakau lainnya (HPTL) termasuk liquid vape mengalami penyesuaian:\"}, \"type\": \"paragraph\"}, {\"id\": \"block_1767758888155_zbz69ak\", \"data\": {\"rows\": [[\"Liquid Closed System\", \"Rp 6.838/ml\", \"Cartridge pre-filled\"], [\"Liquid Open System\", \"Rp 1.198/ml\", \"Refillable\"], [\"Disposable Vape\", \"Rp 6.838/ml\", \"Sekali pakai\"]], \"headers\": [\"Jenis Produk\", \"Tarif Cukai\", \"Keterangan\"], \"bordered\": true}, \"type\": \"table\"}, {\"id\": \"block_1767758888155_e5r2nq6\", \"data\": {\"text\": \"Batasan Usia\", \"level\": 3}, \"type\": \"heading\"}, {\"id\": \"block_1767758888155_sk1tlht\", \"data\": {\"text\": \"Sesuai UU No. 39 Tahun 2007 tentang Cukai, penjualan produk vape hanya diperbolehkan untuk konsumen berusia <strong>minimal 18 tahun</strong>. Retailer wajib melakukan verifikasi usia.\"}, \"type\": \"paragraph\"}, {\"id\": \"block_1767758888155_sn65kis\", \"data\": {\"text\": \"Aturan Penjualan Online\", \"level\": 3}, \"type\": \"heading\"}, {\"id\": \"block_1767758888155_ks9dgvd\", \"data\": {\"items\": [{\"text\": \"Wajib memiliki NPPBKC (Nomor Pokok Pengusaha Barang Kena Cukai)\"}, {\"text\": \"Produk harus memiliki pita cukai yang sah\"}, {\"text\": \"Verifikasi usia pembeli melalui KTP\"}, {\"text\": \"Larangan iklan produk vape di platform digital\"}], \"style\": \"ordered\"}, \"type\": \"list\"}, {\"id\": \"block_1767758888155_k2fukup\", \"data\": {\"items\": [{\"title\": \"Apakah vape legal di Indonesia?\", \"content\": \"Ya, vape legal di Indonesia dengan syarat produk memiliki pita cukai yang sah dan dijual kepada konsumen berusia minimal 18 tahun.\"}, {\"title\": \"Bagaimana cara mengecek keaslian pita cukai?\", \"content\": \"Anda bisa mengecek keaslian pita cukai melalui aplikasi resmi Bea Cukai atau website cukai.kemenkeu.go.id dengan memasukkan kode yang tertera pada pita.\"}, {\"title\": \"Apakah bisa membawa vape ke luar negeri?\", \"content\": \"Peraturan berbeda di setiap negara. Beberapa negara seperti Singapura dan Thailand melarang total kepemilikan vape. Selalu cek regulasi negara tujuan sebelum bepergian.\"}], \"style\": \"bordered\", \"allowMultiple\": true}, \"type\": \"accordion\"}, {\"id\": \"block_1767758888155_pdjyi0m\", \"data\": {\"style\": \"card\", \"title\": \"Dapatkan Update Regulasi Terbaru\", \"buttonText\": \"Subscribe\", \"description\": \"Subscribe newsletter kami untuk mendapatkan informasi regulasi dan berita vape terkini.\"}, \"type\": \"newsletter\"}]','Update Regulasi Vape 2024 Informasi Penting Artikel ini berisi rangkuman regulasi. Untuk informasi resmi, silakan cek website Kementerian Keuangan dan BPOM. Pemerintah Indonesia telah mengeluarkan beberapa kebijakan baru terkait produk vape pada tahun 2024. Berikut rangkuman lengkap yang perlu Anda ketahui sebagai konsumen maupun pelaku usaha. Tarif Cukai Terbaru Per 1 Januari 2024, tarif cukai hasil pengolahan tembakau lainnya (HPTL) termasuk liquid vape mengalami penyesuaian: Jenis Produk Tarif Cukai Keterangan Liquid Closed System Rp 6.838/ml Cartridge pre-filled Liquid Open System Rp 1.198/ml Refillable Disposable Vape Rp 6.838/ml Sekali pakai Batasan Usia Sesuai UU No. 39 Tahun 2007 tentang Cukai, penjualan produk vape hanya diperbolehkan untuk konsumen berusia minimal 18 tahun. Retailer wajib melakukan verifikasi usia. Aturan Penjualan Online Wajib memiliki NPPBKC (Nomor Pokok Pengusaha Barang Kena Cukai) Produk harus memiliki pita cukai yang sah Verifikasi usia pembeli melalui KTP Larangan iklan produk vape di platform digital Apakah vape legal di Indonesia? Ya, vape legal di Indonesia dengan syarat produk memiliki pita cukai yang sah dan dijual kepada konsumen berusia minimal 18 tahun. Bagaimana cara mengecek keaslian pita cukai? Anda bisa mengecek keaslian pita cukai melalui aplikasi resmi Bea Cukai atau website cukai.kemenkeu.go.id dengan memasukkan kode yang tertera pada pita. Apakah bisa membawa vape ke luar negeri? Peraturan berbeda di setiap negara. Beberapa negara seperti Singapura dan Thailand melarang total kepemilikan vape. Selalu cek regulasi negara tujuan sebelum bepergian.',NULL,NULL,NULL,'https://sas-assets.sgp1.cdn.digitaloceanspaces.com/ogitu-com/development/articles/thumbnails/20260107145008-review-vaporesso-xros-3.webp','https://sas-assets.sgp1.cdn.digitaloceanspaces.com/ogitu-com/development/articles/thumbnails/20260107145008-review-vaporesso-xros-3.webp','news','[\"regulasi\", \"cukai\", \"berita vape\", \"indonesia\"]','published',0,0,3429,89,234,2,'2026-01-06 04:08:08','2026-01-07 04:08:08','2026-01-07 04:08:08'),(4,1,'Panduan Lengkap Coil Building untuk Pemula','panduan-coil-building-pemula','Pelajari dasar-dasar coil building dari nol. Termasuk tools yang dibutuhkan, jenis wire, dan step-by-step tutorial.','[{\"id\": \"block_1767758888155_9wy69cx\", \"data\": {\"text\": \"Panduan Coil Building untuk Pemula\", \"level\": 2}, \"type\": \"heading\"}, {\"id\": \"block_1767758888155_bhou12i\", \"data\": {\"text\": \"Coil building adalah seni membuat coil sendiri untuk atomizer rebuildable. Selain lebih hemat, coil building memungkinkan Anda customize vaping experience sesuai preferensi.\", \"dropCap\": true}, \"type\": \"paragraph\"}, {\"id\": \"block_1767758888155_n5i8at5\", \"data\": {\"text\": \"Coil building memerlukan pengetahuan dasar tentang Ohm\'s Law dan keamanan baterai. Pastikan Anda memahami konsep ini sebelum memulai.\", \"type\": \"warning\", \"title\": \"Peringatan Keamanan\"}, \"type\": \"alert\"}, {\"id\": \"block_1767758888155_98haqjo\", \"data\": {\"text\": \"Tools yang Dibutuhkan\", \"level\": 3}, \"type\": \"heading\"}, {\"id\": \"block_1767758888155_s0viq8j\", \"data\": {\"gap\": \"md\", \"images\": [{\"alt\": \"Coil jig\", \"src\": \"/images/articles/coil-jig.jpg\", \"caption\": \"Coil Jig\"}, {\"alt\": \"Wire cutter\", \"src\": \"/images/articles/wire-cutter.jpg\", \"caption\": \"Wire Cutter\"}, {\"alt\": \"Ceramic tweezer\", \"src\": \"/images/articles/ceramic-tweezer.jpg\", \"caption\": \"Ceramic Tweezer\"}, {\"alt\": \"Ohm meter\", \"src\": \"/images/articles/ohm-meter.jpg\", \"caption\": \"Ohm Meter\"}], \"columns\": 4}, \"type\": \"gallery\"}, {\"id\": \"block_1767758888155_eu9ycr1\", \"data\": {\"items\": [{\"text\": \"Coil Jig (diameter 2.5mm - 3mm)\", \"checked\": true}, {\"text\": \"Wire Cutter\", \"checked\": true}, {\"text\": \"Ceramic Tweezer\", \"checked\": true}, {\"text\": \"Ohm Meter atau Mod dengan fitur ohm reading\", \"checked\": true}, {\"text\": \"Cotton (organic cotton atau vape cotton)\", \"checked\": true}, {\"text\": \"Wire (Kanthal, Nichrome, atau SS)\", \"checked\": false}], \"style\": \"checklist\"}, \"type\": \"list\"}, {\"id\": \"block_1767758888155_oitqnhn\", \"data\": {\"text\": \"Jenis-Jenis Wire\", \"level\": 3}, \"type\": \"heading\"}, {\"id\": \"block_1767758888155_xtalspl\", \"data\": {\"rows\": [[\"Kanthal A1\", \"Tinggi\", \"Tidak\", \"Wattage Mode\"], [\"Nichrome N80\", \"Sedang\", \"Tidak\", \"Ramp-up Cepat\"], [\"SS 316L\", \"Rendah\", \"Ya\", \"TC Mode\"], [\"Ni200\", \"Sangat Rendah\", \"Ya\", \"TC Mode Only\"]], \"headers\": [\"Material\", \"Resistivitas\", \"TCR Support\", \"Best For\"], \"striped\": true, \"bordered\": true}, \"type\": \"table\"}, {\"id\": \"block_1767758888155_3b6yvwg\", \"data\": {\"text\": \"Step-by-Step Tutorial\", \"level\": 3}, \"type\": \"heading\"}, {\"id\": \"block_1767758888155_kelx3am\", \"data\": {\"text\": \"Step 1: Persiapan Wire\", \"level\": 4}, \"type\": \"heading\"}, {\"id\": \"block_1767758888155_asabxep\", \"data\": {\"text\": \"Potong wire sekitar 10-15cm. Untuk single coil dengan 6 wraps dan diameter 3mm, Anda membutuhkan sekitar 10cm wire.\"}, \"type\": \"paragraph\"}, {\"id\": \"block_1767758888155_s4ldyd0\", \"data\": {\"text\": \"Step 2: Wrapping\", \"level\": 4}, \"type\": \"heading\"}, {\"id\": \"block_1767758888155_0cp2gom\", \"data\": {\"text\": \"Masukkan coil jig ke wire, kemudian wrap dengan rapat. Pastikan tidak ada gap antar wrap untuk coil reguler.\"}, \"type\": \"paragraph\"}, {\"id\": \"block_1767758888155_pu942pl\", \"data\": {\"code\": \"V = I × R\\nP = V × I\\nP = I² × R\\nP = V² / R\\n\\nKeterangan:\\nV = Voltage (Volt)\\nI = Current (Ampere)\\nR = Resistance (Ohm)\\nP = Power (Watt)\", \"filename\": \"Rumus Ohm\'s Law\", \"language\": \"text\"}, \"type\": \"code\"}, {\"id\": \"block_1767758888155_axc2cdc\", \"data\": {\"style\": \"default\", \"title\": \"Butuh Supplies Coil Building?\", \"buttonUrl\": \"/kategori/diy-supplies\", \"buttonText\": \"Lihat Produk\", \"description\": \"Kami menyediakan berbagai wire, cotton, dan tools untuk coil building dengan harga terbaik.\"}, \"type\": \"cta-box\"}]','Panduan Coil Building untuk Pemula Coil building adalah seni membuat coil sendiri untuk atomizer rebuildable. Selain lebih hemat, coil building memungkinkan Anda customize vaping experience sesuai preferensi. Peringatan Keamanan Coil building memerlukan pengetahuan dasar tentang Ohm\'s Law dan keamanan baterai. Pastikan Anda memahami konsep ini sebelum memulai. Tools yang Dibutuhkan Coil Jig (diameter 2.5mm - 3mm) Wire Cutter Ceramic Tweezer Ohm Meter atau Mod dengan fitur ohm reading Cotton (organic cotton atau vape cotton) Wire (Kanthal, Nichrome, atau SS) Jenis-Jenis Wire Material Resistivitas TCR Support Best For Kanthal A1 Tinggi Tidak Wattage Mode Nichrome N80 Sedang Tidak Ramp-up Cepat SS 316L Rendah Ya TC Mode Ni200 Sangat Rendah Ya TC Mode Only Step-by-Step Tutorial Step 1: Persiapan Wire Potong wire sekitar 10-15cm. Untuk single coil dengan 6 wraps dan diameter 3mm, Anda membutuhkan sekitar 10cm wire. Step 2: Wrapping Masukkan coil jig ke wire, kemudian wrap dengan rapat. Pastikan tidak ada gap antar wrap untuk coil reguler. Butuh Supplies Coil Building? Kami menyediakan berbagai wire, cotton, dan tools untuk coil building dengan harga terbaik.',NULL,NULL,NULL,'https://sas-assets.sgp1.cdn.digitaloceanspaces.com/ogitu-com/development/articles/thumbnails/20260107145008-review-vaporesso-xros-3.webp','https://sas-assets.sgp1.cdn.digitaloceanspaces.com/ogitu-com/development/articles/thumbnails/20260107145008-review-vaporesso-xros-3.webp','guide','[\"coil building\", \"diy\", \"panduan\", \"rebuildable\"]','published',1,0,4521,312,156,2,'2025-12-31 04:08:08','2026-01-07 04:08:08','2026-01-07 04:08:08'),(5,1,'Flash Sale Ramadhan 2024 - Diskon Hingga 50%!','flash-sale-ramadhan-2024','Promo spesial Ramadhan! Dapatkan diskon hingga 50% untuk berbagai produk vape pilihan. Periode terbatas!','[{\"id\": \"block_1767758888155_u360qej\", \"data\": {\"text\": \"Flash Sale Ramadhan 2024 🌙\", \"level\": 2, \"alignment\": \"center\"}, \"type\": \"heading\"}, {\"id\": \"block_1767758888155_udie2dn\", \"data\": {\"text\": \"Marhaban ya Ramadhan! Ogitu.com menghadirkan promo spesial selama bulan suci Ramadhan. Dapatkan diskon hingga 50% untuk produk-produk pilihan!\", \"alignment\": \"center\"}, \"type\": \"paragraph\"}, {\"id\": \"block_1767758888155_0287v8k\", \"data\": {\"alt\": \"Flash Sale Ramadhan 2024\", \"src\": \"/images/articles/ramadhan-sale.jpg\", \"alignment\": \"full\"}, \"type\": \"image\"}, {\"id\": \"block_1767758888155_j2zc1zk\", \"data\": {\"text\": \"Promo berlaku selama bulan Ramadhan, mulai 11 Maret - 10 April 2024. Stok terbatas!\", \"type\": \"info\", \"title\": \"Periode Promo\"}, \"type\": \"alert\"}, {\"id\": \"block_1767758888155_ruc9sv9\", \"data\": {\"text\": \"Produk Promo Pilihan\", \"level\": 3}, \"type\": \"heading\"}, {\"id\": \"block_1767758888155_s03e9il\", \"data\": {\"limit\": 4, \"style\": \"grid\", \"title\": \"Best Deals\", \"columns\": 4, \"category\": \"flash-sale\"}, \"type\": \"product-list\"}, {\"id\": \"block_1767758888155_vz5h8xo\", \"data\": {\"style\": \"gradient\", \"spacing\": \"lg\"}, \"type\": \"divider\"}, {\"id\": \"block_1767758888155_9bcrh6l\", \"data\": {\"text\": \"Syarat & Ketentuan\", \"level\": 3}, \"type\": \"heading\"}, {\"id\": \"block_1767758888155_070p6oo\", \"data\": {\"items\": [{\"text\": \"Promo berlaku untuk semua metode pembayaran\"}, {\"text\": \"Tidak dapat digabung dengan voucher lain\"}, {\"text\": \"Maksimal pembelian 3 unit per produk per akun\"}, {\"text\": \"Promo dapat berakhir sewaktu-waktu jika stok habis\"}, {\"text\": \"Keputusan Ogitu.com bersifat final\"}], \"style\": \"ordered\"}, \"type\": \"list\"}, {\"id\": \"block_1767758888155_56dx4lc\", \"data\": {\"style\": \"gradient\", \"title\": \"Belanja Sekarang!\", \"buttonUrl\": \"/promo\", \"buttonText\": \"Lihat Semua Promo\", \"description\": \"Jangan lewatkan kesempatan ini. Stock terbatas, siapa cepat dia dapat!\"}, \"type\": \"cta-box\"}]','Flash Sale Ramadhan 2024 🌙 Marhaban ya Ramadhan! Ogitu.com menghadirkan promo spesial selama bulan suci Ramadhan. Dapatkan diskon hingga 50% untuk produk-produk pilihan! Periode Promo Promo berlaku selama bulan Ramadhan, mulai 11 Maret - 10 April 2024. Stok terbatas! Produk Promo Pilihan Syarat & Ketentuan Promo berlaku untuk semua metode pembayaran Tidak dapat digabung dengan voucher lain Maksimal pembelian 3 unit per produk per akun Promo dapat berakhir sewaktu-waktu jika stok habis Keputusan Ogitu.com bersifat final Belanja Sekarang! Jangan lewatkan kesempatan ini. Stock terbatas, siapa cepat dia dapat!',NULL,NULL,NULL,'https://sas-assets.sgp1.cdn.digitaloceanspaces.com/ogitu-com/development/articles/thumbnails/20260107145008-review-vaporesso-xros-3.webp','https://sas-assets.sgp1.cdn.digitaloceanspaces.com/ogitu-com/development/articles/thumbnails/20260107145008-review-vaporesso-xros-3.webp','promo','[\"promo\", \"diskon\", \"ramadhan\", \"flash sale\"]','published',1,1,8758,423,567,1,'2026-01-06 22:08:08','2026-01-07 04:08:08','2026-01-07 04:08:08'),(6,1,'Cara Merawat Pod System Agar Awet dan Tahan Lama','cara-merawat-pod-system','Tips perawatan pod system yang benar untuk memperpanjang umur perangkat dan menjaga performa optimal.','[{\"id\": \"block_1767758888155_m8o5b5g\", \"data\": {\"text\": \"Panduan Perawatan Pod System\", \"level\": 2}, \"type\": \"heading\"}, {\"id\": \"block_1767758888155_4bd10wq\", \"data\": {\"text\": \"Pod system yang terawat dengan baik bisa bertahan bertahun-tahun. Ikuti tips berikut untuk menjaga perangkat Anda tetap prima.\"}, \"type\": \"paragraph\"}, {\"id\": \"block_1767758888155_sq7jsko\", \"data\": {\"text\": \"1. Bersihkan Secara Rutin\", \"level\": 3}, \"type\": \"heading\"}, {\"id\": \"block_1767758888155_vhrj9ge\", \"data\": {\"text\": \"Bersihkan koneksi pod dan device minimal seminggu sekali menggunakan cotton bud kering. Sisa liquid yang mengering bisa menyebabkan poor connection.\"}, \"type\": \"paragraph\"}, {\"id\": \"block_1767758888155_s1l2u8k\", \"data\": {\"text\": \"2. Jangan Biarkan Pod Kering\", \"level\": 3}, \"type\": \"heading\"}, {\"id\": \"block_1767758888155_19dwcs0\", \"data\": {\"text\": \"Selalu isi ulang liquid sebelum habis total. Dry hit tidak hanya tidak enak, tapi juga bisa merusak coil secara permanen.\"}, \"type\": \"paragraph\"}, {\"id\": \"block_1767758888155_a73qpmh\", \"data\": {\"text\": \"3. Simpan dengan Benar\", \"level\": 3}, \"type\": \"heading\"}, {\"id\": \"block_1767758888155_l1zgqh4\", \"data\": {\"items\": [{\"text\": \"Hindari paparan sinar matahari langsung\"}, {\"text\": \"Jangan simpan di tempat lembab\"}, {\"text\": \"Jauhkan dari air dan cairan lain\"}, {\"text\": \"Simpan dalam posisi tegak\"}], \"style\": \"unordered\"}, \"type\": \"list\"}, {\"id\": \"block_1767758888155_otvchck\", \"data\": {\"text\": \"4. Charging dengan Benar\", \"level\": 3}, \"type\": \"heading\"}, {\"id\": \"block_1767758888155_atpzclk\", \"data\": {\"text\": \"Gunakan charger dan kabel original atau yang memiliki spesifikasi sama. Hindari fast charger dengan output >2A untuk pod system.\", \"type\": \"warning\", \"title\": \"Tips Charging\"}, \"type\": \"alert\"}, {\"id\": \"block_1767758888155_bnjcsbe\", \"data\": {\"text\": \"5. Ganti Coil/Pod Tepat Waktu\", \"level\": 3}, \"type\": \"heading\"}, {\"id\": \"block_1767758888155_bbpimct\", \"data\": {\"text\": \"Ganti coil setiap 1-2 minggu tergantung penggunaan. Tanda coil perlu diganti: rasa gosong, produksi vapor berkurang, atau warna liquid di pod berubah gelap.\"}, \"type\": \"paragraph\"}]','Panduan Perawatan Pod System Pod system yang terawat dengan baik bisa bertahan bertahun-tahun. Ikuti tips berikut untuk menjaga perangkat Anda tetap prima. 1. Bersihkan Secara Rutin Bersihkan koneksi pod dan device minimal seminggu sekali menggunakan cotton bud kering. Sisa liquid yang mengering bisa menyebabkan poor connection. 2. Jangan Biarkan Pod Kering Selalu isi ulang liquid sebelum habis total. Dry hit tidak hanya tidak enak, tapi juga bisa merusak coil secara permanen. 3. Simpan dengan Benar Hindari paparan sinar matahari langsung Jangan simpan di tempat lembab Jauhkan dari air dan cairan lain Simpan dalam posisi tegak 4. Charging dengan Benar Tips Charging Gunakan charger dan kabel original atau yang memiliki spesifikasi sama. Hindari fast charger dengan output >2A untuk pod system. 5. Ganti Coil/Pod Tepat Waktu Ganti coil setiap 1-2 minggu tergantung penggunaan. Tanda coil perlu diganti: rasa gosong, produksi vapor berkurang, atau warna liquid di pod berubah gelap.',NULL,NULL,NULL,'https://sas-assets.sgp1.cdn.digitaloceanspaces.com/ogitu-com/development/articles/thumbnails/20260107145008-review-vaporesso-xros-3.webp','https://sas-assets.sgp1.cdn.digitaloceanspaces.com/ogitu-com/development/articles/thumbnails/20260107145008-review-vaporesso-xros-3.webp','tips','[\"maintenance\", \"tips\", \"pod system\", \"perawatan\"]','published',0,0,1890,145,67,1,'2025-12-28 04:08:08','2026-01-07 04:08:08','2026-01-07 04:08:08'),(7,1,'Apa Itu Nicotine Salt? Perbedaan dengan Freebase Nicotine','nicotine-salt-vs-freebase','Penjelasan lengkap tentang nicotine salt, perbedaannya dengan freebase, dan mana yang cocok untuk Anda.','[{\"id\": \"block_1767758888155_lg2fvh7\", \"data\": {\"text\": \"Nicotine Salt vs Freebase: Panduan Lengkap\", \"level\": 2}, \"type\": \"heading\"}, {\"id\": \"block_1767758888155_8vftiyn\", \"data\": {\"text\": \"Bingung memilih antara nicotine salt dan freebase? Artikel ini akan menjelaskan perbedaan keduanya secara detail.\"}, \"type\": \"paragraph\"}, {\"id\": \"block_1767758888155_wa9sdl5\", \"data\": {\"text\": \"Apa Itu Freebase Nicotine?\", \"level\": 3}, \"type\": \"heading\"}, {\"id\": \"block_1767758888155_w835drs\", \"data\": {\"text\": \"Freebase nicotine adalah bentuk murni nicotine yang digunakan dalam rokok konvensional dan liquid vape tradisional. Memiliki pH tinggi yang menyebabkan throat hit lebih kuat.\"}, \"type\": \"paragraph\"}, {\"id\": \"block_1767758888155_uen48lc\", \"data\": {\"text\": \"Apa Itu Nicotine Salt?\", \"level\": 3}, \"type\": \"heading\"}, {\"id\": \"block_1767758888155_uqp82rd\", \"data\": {\"text\": \"Nicotine salt adalah nicotine yang dikombinasikan dengan asam organik (benzoic acid). Hasilnya: absorpsi lebih cepat, throat hit lebih smooth, dan bisa menggunakan konsentrasi lebih tinggi.\"}, \"type\": \"paragraph\"}, {\"id\": \"block_1767758888155_177xdtu\", \"data\": {\"title\": \"Perbandingan Nic Salt vs Freebase\", \"headers\": [\"Nicotine Salt\", \"Freebase Nicotine\"], \"features\": [{\"label\": \"Throat Hit\", \"values\": [\"Smooth\", \"Harsh (kadar tinggi)\"]}, {\"label\": \"Konsentrasi Umum\", \"values\": [\"20-50mg\", \"3-12mg\"]}, {\"label\": \"Absorpsi\", \"values\": [\"Cepat\", \"Lambat\"]}, {\"label\": \"Device\", \"values\": [\"Pod System, MTL\", \"Sub-ohm, DTL\"]}, {\"label\": \"Satisfying\", \"values\": [\"Sangat\", \"Moderate\"]}], \"highlightColumn\": 0}, \"type\": \"comparison-table\"}, {\"id\": \"block_1767758888155_j6jp29n\", \"data\": {\"text\": \"Mana yang Cocok untuk Anda?\", \"level\": 3}, \"type\": \"heading\"}, {\"id\": \"block_1767758888155_49gzrr8\", \"data\": {\"gap\": \"lg\", \"columns\": [{\"width\": \"1/2\", \"blocks\": [{\"id\": \"block_1767758888155_pkdnzij\", \"data\": {\"text\": \"Pilih Nic Salt Jika:\", \"level\": 4}, \"type\": \"heading\"}, {\"id\": \"block_1767758888155_6csv9bx\", \"data\": {\"items\": [{\"text\": \"Baru berhenti merokok\"}, {\"text\": \"Menginginkan nicotine hit cepat\"}, {\"text\": \"Menggunakan pod system\"}, {\"text\": \"Tidak suka throat hit harsh\"}], \"style\": \"unordered\"}, \"type\": \"list\"}]}, {\"width\": \"1/2\", \"blocks\": [{\"id\": \"block_1767758888155_otzu0cy\", \"data\": {\"text\": \"Pilih Freebase Jika:\", \"level\": 4}, \"type\": \"heading\"}, {\"id\": \"block_1767758888155_i05y9j8\", \"data\": {\"items\": [{\"text\": \"Sudah terbiasa vaping\"}, {\"text\": \"Menggunakan sub-ohm device\"}, {\"text\": \"Menginginkan cloud besar\"}, {\"text\": \"Ingin konsumsi nicotine lebih rendah\"}], \"style\": \"unordered\"}, \"type\": \"list\"}]}]}, \"type\": \"columns\"}]','Nicotine Salt vs Freebase: Panduan Lengkap Bingung memilih antara nicotine salt dan freebase? Artikel ini akan menjelaskan perbedaan keduanya secara detail. Apa Itu Freebase Nicotine? Freebase nicotine adalah bentuk murni nicotine yang digunakan dalam rokok konvensional dan liquid vape tradisional. Memiliki pH tinggi yang menyebabkan throat hit lebih kuat. Apa Itu Nicotine Salt? Nicotine salt adalah nicotine yang dikombinasikan dengan asam organik (benzoic acid). Hasilnya: absorpsi lebih cepat, throat hit lebih smooth, dan bisa menggunakan konsentrasi lebih tinggi. Mana yang Cocok untuk Anda? Pilih Nic Salt Jika: Baru berhenti merokok Menginginkan nicotine hit cepat Menggunakan pod system Tidak suka throat hit harsh Pilih Freebase Jika: Sudah terbiasa vaping Menggunakan sub-ohm device Menginginkan cloud besar Ingin konsumsi nicotine lebih rendah',NULL,NULL,NULL,'https://sas-assets.sgp1.cdn.digitaloceanspaces.com/ogitu-com/development/articles/thumbnails/20260107145008-review-vaporesso-xros-3.webp','https://sas-assets.sgp1.cdn.digitaloceanspaces.com/ogitu-com/development/articles/thumbnails/20260107145008-review-vaporesso-xros-3.webp','guide','[\"nicotine salt\", \"freebase\", \"panduan\", \"liquid\"]','published',0,0,5670,287,198,1,'2025-12-17 04:08:08','2026-01-07 04:08:08','2026-01-07 04:08:08'),(8,1,'Coming Soon: Review SMOK RPM 5 Pro','review-smok-rpm-5-pro','Review lengkap SMOK RPM 5 Pro akan segera hadir!','[{\"id\": \"block_1767758888155_stfdwgl\", \"data\": {\"text\": \"Review SMOK RPM 5 Pro - Coming Soon\", \"level\": 2}, \"type\": \"heading\"}, {\"id\": \"block_1767758888155_2hsell0\", \"data\": {\"text\": \"Artikel ini masih dalam proses penulisan. Stay tuned!\"}, \"type\": \"paragraph\"}]','Review SMOK RPM 5 Pro - Coming Soon Artikel ini masih dalam proses penulisan. Stay tuned!',NULL,NULL,NULL,'https://sas-assets.sgp1.cdn.digitaloceanspaces.com/ogitu-com/development/articles/thumbnails/20260107145008-review-vaporesso-xros-3.webp','https://sas-assets.sgp1.cdn.digitaloceanspaces.com/ogitu-com/development/articles/thumbnails/20260107145008-review-vaporesso-xros-3.webp','review','[\"review\", \"smok\", \"rpm 5 pro\"]','draft',0,0,0,0,0,1,NULL,'2026-01-07 04:08:08','2026-01-07 04:08:08');
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bugs`
--

DROP TABLE IF EXISTS `bugs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bugs` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `module` varchar(100) NOT NULL COMMENT 'Module/Controller where error occurred',
  `action` varchar(100) NOT NULL COMMENT 'Action/Method name',
  `error_type` varchar(100) DEFAULT NULL COMMENT 'Error type/name',
  `error_message` text NOT NULL COMMENT 'Error message',
  `error_stack` text COMMENT 'Error stack trace',
  `request_data` json DEFAULT NULL COMMENT 'Request data that caused the error',
  `context` json DEFAULT NULL COMMENT 'Additional context information',
  `user_type` varchar(50) DEFAULT NULL COMMENT 'admin, customer, guest',
  `user_id` int unsigned DEFAULT NULL COMMENT 'User ID if authenticated',
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `method` varchar(10) DEFAULT NULL COMMENT 'HTTP method',
  `severity` enum('low','medium','high','critical') DEFAULT 'medium',
  `status` enum('new','investigating','resolved','ignored') DEFAULT 'new',
  `resolution_notes` text,
  `resolved_by` int unsigned DEFAULT NULL,
  `resolved_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bugs`
--

LOCK TABLES `bugs` WRITE;
/*!40000 ALTER TABLE `bugs` DISABLE KEYS */;
INSERT INTO `bugs` VALUES (1,'notifications','index','TypeError','Cannot read properties of undefined (reading \'id\')','TypeError: Cannot read properties of undefined (reading \'id\')\n    at NotificationsController.index (/Users/ict/Documents/AdonisJs/ogitu.com/app/controllers/admin/notifications_controller.ts:35:65)\n    at ContainerResolver.call (file:///Users/ict/Documents/AdonisJs/ogitu.com/node_modules/@adonisjs/fold/build/chunk-NNIB6TMY.js:410:25)',NULL,NULL,'admin',NULL,'::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36','/admin/notifications','GET','medium','new',NULL,NULL,NULL,'2025-12-20 16:32:20','2025-12-20 16:32:20'),(2,'notifications','index','TypeError','Cannot read properties of undefined (reading \'id\')','TypeError: Cannot read properties of undefined (reading \'id\')\n    at NotificationsController.index (/Users/ict/Documents/AdonisJs/ogitu.com/app/controllers/admin/notifications_controller.ts:35:65)\n    at ContainerResolver.call (file:///Users/ict/Documents/AdonisJs/ogitu.com/node_modules/@adonisjs/fold/build/chunk-NNIB6TMY.js:410:25)',NULL,NULL,'admin',NULL,'::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36','/admin/notifications','GET','medium','new',NULL,NULL,NULL,'2025-12-22 02:35:45','2025-12-22 02:35:45'),(3,'notifications','index','TypeError','Cannot read properties of undefined (reading \'id\')','TypeError: Cannot read properties of undefined (reading \'id\')\n    at NotificationsController.index (/Users/ict/Documents/AdonisJs/ogitu.com/app/controllers/admin/notifications_controller.ts:35:65)\n    at ContainerResolver.call (file:///Users/ict/Documents/AdonisJs/ogitu.com/node_modules/@adonisjs/fold/build/chunk-NNIB6TMY.js:410:25)',NULL,NULL,'admin',NULL,'::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36','/admin/notifications','GET','medium','new',NULL,NULL,NULL,'2025-12-22 03:06:53','2025-12-22 03:06:53');
/*!40000 ALTER TABLE `bugs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `customer_id` int unsigned DEFAULT NULL,
  `product_id` int unsigned DEFAULT NULL,
  `product_variant_id` int unsigned DEFAULT NULL,
  `quantity` int DEFAULT '1',
  `checked` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cart_items_customer_id_product_id_product_variant_id_unique` (`customer_id`,`product_id`,`product_variant_id`),
  KEY `cart_items_product_id_foreign` (`product_id`),
  KEY `cart_items_product_variant_id_foreign` (`product_variant_id`),
  CONSTRAINT `cart_items_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cart_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cart_items_product_variant_id_foreign` FOREIGN KEY (`product_variant_id`) REFERENCES `product_variants` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES (1,9,2,6,1,1,'2025-12-23 04:09:49','2025-12-23 04:09:49');
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text,
  `image` varchar(255) DEFAULT NULL,
  `parent_id` int unsigned DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `sort_order` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categories_slug_unique` (`slug`),
  KEY `categories_parent_id_foreign` (`parent_id`),
  CONSTRAINT `categories_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Pod System','pod-system','Perangkat vape portabel dengan sistem pod yang mudah digunakan, cocok untuk pemula dan pengguna yang menginginkan kepraktisan.','/images/categories/pod-system.jpg',NULL,1,1,'2025-12-20 16:13:01','2025-12-20 16:13:04'),(2,'Mod & Kit','mod-kit','Box mod dan starter kit lengkap untuk pengalaman vaping yang lebih advanced dengan fitur pengaturan power dan temperature control.','/images/categories/mod-kit.jpg',NULL,1,2,'2025-12-20 16:13:01','2025-12-20 16:13:04'),(3,'Liquid Premium','liquid-premium','E-liquid premium freebase dengan berbagai pilihan rasa dan level nikotin untuk mod dan RDA/RTA.','/images/categories/liquid-premium.jpg',NULL,1,3,'2025-12-20 16:13:01','2025-12-20 16:13:04'),(4,'Salt Nicotine','salt-nicotine','E-liquid salt nicotine dengan tingkat nikotin tinggi, sensasi throat hit yang halus, ideal untuk pod system.','/images/categories/salt-nicotine.jpg',NULL,1,4,'2025-12-20 16:13:01','2025-12-20 16:13:04'),(5,'Atomizer & Coil','atomizer-coil','RDA, RTA, RDTA, dan berbagai jenis coil/kawat untuk kebutuhan rebuildable atomizer.','/images/categories/atomizer-coil.jpg',NULL,1,5,'2025-12-20 16:13:01','2025-12-20 16:13:04'),(6,'Accessories','accessories','Aksesoris vape termasuk baterai, charger, cotton, tool kit, dan perlengkapan lainnya.','/images/categories/accessories.jpg',NULL,1,6,'2025-12-20 16:13:01','2025-12-20 16:13:04'),(7,'Disposable','disposable','Vape sekali pakai dengan berbagai rasa, praktis tanpa perlu isi ulang atau charging.','/images/categories/disposable.jpg',NULL,1,7,'2025-12-20 16:13:01','2025-12-20 16:13:04'),(8,'Closed Pod','closed-pod','Pod dengan cartridge tertutup, tidak bisa diisi ulang',NULL,1,1,1,'2025-12-20 16:13:01','2025-12-20 16:13:04'),(9,'Open Pod','open-pod','Pod dengan cartridge terbuka yang bisa diisi ulang liquid',NULL,1,1,2,'2025-12-20 16:13:01','2025-12-20 16:13:04'),(10,'AIO Pod','aio-pod','All-in-one pod system dengan fitur lengkap',NULL,1,1,3,'2025-12-20 16:13:01','2025-12-20 16:13:04'),(11,'Box Mod','box-mod','Mod dengan baterai internal atau external dalam bentuk box',NULL,2,1,1,'2025-12-20 16:13:01','2025-12-20 16:13:04'),(12,'Tube Mod','tube-mod','Mechanical mod atau regulated mod dalam bentuk tabung',NULL,2,1,2,'2025-12-20 16:13:01','2025-12-20 16:13:04'),(13,'Starter Kit','starter-kit','Paket lengkap mod dengan tank untuk pemula',NULL,2,1,3,'2025-12-20 16:13:01','2025-12-20 16:13:04'),(14,'Squonk Mod','squonk-mod','Bottom feeder mod dengan botol liquid internal',NULL,2,1,4,'2025-12-20 16:13:01','2025-12-20 16:13:04'),(15,'Fruity','liquid-fruity','E-liquid dengan rasa buah-buahan segar',NULL,3,1,1,'2025-12-20 16:13:01','2025-12-20 16:13:04'),(16,'Dessert','liquid-dessert','E-liquid dengan rasa dessert dan bakery',NULL,3,1,2,'2025-12-20 16:13:01','2025-12-20 16:13:05'),(17,'Tobacco','liquid-tobacco','E-liquid dengan rasa tembakau klasik',NULL,3,1,3,'2025-12-20 16:13:01','2025-12-20 16:13:05'),(18,'Menthol & Mint','liquid-menthol','E-liquid dengan sensasi dingin dan mint',NULL,3,1,4,'2025-12-20 16:13:01','2025-12-20 16:13:05'),(19,'Beverage','liquid-beverage','E-liquid dengan rasa minuman seperti kopi, milkshake',NULL,3,1,5,'2025-12-20 16:13:01','2025-12-20 16:13:05'),(20,'Salt Nic Fruity','saltnic-fruity','Salt nicotine rasa buah-buahan',NULL,4,1,1,'2025-12-20 16:13:01','2025-12-20 16:13:05'),(21,'Salt Nic Dessert','saltnic-dessert','Salt nicotine rasa dessert',NULL,4,1,2,'2025-12-20 16:13:01','2025-12-20 16:13:05'),(22,'Salt Nic Tobacco','saltnic-tobacco','Salt nicotine rasa tembakau',NULL,4,1,3,'2025-12-20 16:13:01','2025-12-20 16:13:05'),(23,'Salt Nic Menthol','saltnic-menthol','Salt nicotine dengan sensasi dingin',NULL,4,1,4,'2025-12-20 16:13:01','2025-12-20 16:13:05'),(24,'RDA','rda','Rebuildable Dripping Atomizer untuk dripping',NULL,5,1,1,'2025-12-20 16:13:01','2025-12-20 16:13:05'),(25,'RTA','rta','Rebuildable Tank Atomizer dengan tank',NULL,5,1,2,'2025-12-20 16:13:01','2025-12-20 16:13:05'),(26,'RDTA','rdta','Rebuildable Dripping Tank Atomizer',NULL,5,1,3,'2025-12-20 16:13:01','2025-12-20 16:13:05'),(27,'Sub Ohm Tank','sub-ohm-tank','Tank dengan coil replacement untuk sub ohm vaping',NULL,5,1,4,'2025-12-20 16:13:01','2025-12-20 16:13:05'),(28,'Coil Replacement','coil-replacement','Coil pengganti untuk berbagai jenis tank',NULL,5,1,5,'2025-12-20 16:13:01','2025-12-20 16:13:05'),(29,'Coil Wire','coil-wire','Kawat untuk building coil (Kanthal, NiChrome, SS)',NULL,5,1,6,'2025-12-20 16:13:01','2025-12-20 16:13:05'),(30,'Battery & Charger','battery-charger','Baterai 18650, 21700 dan charger',NULL,6,1,1,'2025-12-20 16:13:01','2025-12-20 16:13:05'),(31,'Cotton','cotton','Kapas untuk wicking atomizer',NULL,6,1,2,'2025-12-20 16:13:01','2025-12-20 16:13:05'),(32,'Tool Kit','tool-kit','Peralatan untuk building dan maintenance',NULL,6,1,3,'2025-12-20 16:13:01','2025-12-20 16:13:05'),(33,'Drip Tip','drip-tip','Mouthpiece pengganti dengan berbagai material',NULL,6,1,4,'2025-12-20 16:13:01','2025-12-20 16:13:05'),(34,'Case & Bag','case-bag','Tas dan case untuk menyimpan vape',NULL,6,1,5,'2025-12-20 16:13:01','2025-12-20 16:13:05'),(35,'Pod Cartridge','pod-cartridge','Cartridge pengganti untuk pod system',NULL,6,1,6,'2025-12-20 16:13:01','2025-12-20 16:13:05'),(36,'Disposable 600 Puffs','disposable-600','Disposable vape 600 puffs',NULL,7,1,1,'2025-12-20 16:13:01','2025-12-20 16:13:05'),(37,'Disposable 1500+ Puffs','disposable-1500','Disposable vape 1500 puffs atau lebih',NULL,7,1,2,'2025-12-20 16:13:01','2025-12-20 16:13:05'),(38,'Disposable Rechargeable','disposable-rechargeable','Disposable yang bisa di-charge',NULL,7,1,3,'2025-12-20 16:13:01','2025-12-20 16:13:05');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_ranks`
--

DROP TABLE IF EXISTS `customer_ranks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_ranks` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `slug` varchar(50) NOT NULL,
  `icon` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `color` varchar(50) DEFAULT NULL,
  `min_orders` int NOT NULL DEFAULT '0',
  `min_spent` int NOT NULL DEFAULT '0',
  `cashback_rate` decimal(5,2) NOT NULL DEFAULT '0.00',
  `affiliate_bonus_rate` decimal(5,2) NOT NULL DEFAULT '0.00',
  `benefits` json DEFAULT NULL,
  `order_priority` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `customer_ranks_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_ranks`
--

LOCK TABLES `customer_ranks` WRITE;
/*!40000 ALTER TABLE `customer_ranks` DISABLE KEYS */;
INSERT INTO `customer_ranks` VALUES (9,'Vapor Newbie','vapor-newbie','i-lucide-flame','slate',0,0,2.00,0.00,'[\"Akses promo reguler\", \"Support 24/7\", \"Cashback 2%\"]',1,1,'2025-12-22 10:17:27','2025-12-22 10:17:27'),(10,'Vapor Active','vapor-active','i-lucide-zap','cyan',5,1000000,5.00,1.00,'[\"Cashback 5%\", \"Bonus affiliate +1%\", \"Early access promo\", \"Priority support\", \"Free shipping (min. Rp200k)\"]',2,1,'2025-12-22 10:17:27','2025-12-22 10:17:27'),(11,'Vapor Pro','vapor-pro','i-lucide-crown','orange',15,5000000,10.00,2.00,'[\"Cashback 10%\", \"Bonus affiliate +2%\", \"VIP exclusive products\", \"Free shipping semua order\", \"Dedicated support\", \"Birthday gift\", \"Exclusive events invitation\"]',3,1,'2025-12-22 10:17:27','2025-12-22 10:17:27');
/*!40000 ALTER TABLE `customer_ranks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `gender` enum('male','female') DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `is_verified` tinyint(1) DEFAULT '0',
  `rank_id` int unsigned DEFAULT NULL,
  `referred_by_code` varchar(50) DEFAULT NULL,
  `total_orders_count` int NOT NULL DEFAULT '0',
  `total_spent` decimal(15,2) NOT NULL DEFAULT '0.00',
  `verification_token` varchar(255) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `customers_email_unique` (`email`),
  KEY `customers_rank_id_foreign` (`rank_id`),
  CONSTRAINT `customers_rank_id_foreign` FOREIGN KEY (`rank_id`) REFERENCES `customer_ranks` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'Ahmad Fauzi','ahmad.fauzi@gmail.com','$scrypt$n=16384,r=8,p=1$RI8pAyCghiVr5SwLJv359Q$r/lvV3iGBEPbl/RuG+t40COD/lQsAzZv0utl00sawL3UWnH/vA7aZ2aepMkNjKFVmxaKWg6pT1+hufvxKdIf6g','081234567890','1990-05-15','male',NULL,1,1,NULL,NULL,0,0.00,NULL,'2025-12-20 16:13:03','2025-12-20 16:13:01','2025-12-20 16:13:03'),(2,'Siti Rahayu','siti.rahayu@gmail.com','$scrypt$n=16384,r=8,p=1$90S2wCr82ecNGx0PJYSb3w$aKMfIJfr4bvfP/hLt59QNZ8Uzvk295RLeK8Mh1u4sIfsqM4HJ/I8vs1gxyx6Zl5RStlAEkaMJqSByrB2SMQ6Hg','081298765432','1995-08-22','female',NULL,1,1,NULL,NULL,0,0.00,NULL,'2025-12-20 16:13:03','2025-12-20 16:13:01','2025-12-20 16:13:03'),(3,'Budi Santoso','budi.santoso@gmail.com','$scrypt$n=16384,r=8,p=1$CVsaJaDrCu6XCbOjMZlx0A$yajTv3d7atrWmoImqtZ5faXNeCP1nQjBHdXfmfmLGeuwATLsv0JLFeG7oWQTRLP0d7SGX+5duycaAiY0JGYWwg','085612345678','1988-03-10','male',NULL,1,1,NULL,NULL,0,0.00,NULL,'2025-12-20 16:13:03','2025-12-20 16:13:01','2025-12-20 16:13:03'),(4,'Dewi Lestari','dewi.lestari@gmail.com','$scrypt$n=16384,r=8,p=1$DmekRervh0PIzaBq/1zing$Twgvyu50yv//972tAka4e5vUtr1Uc5ej1wwHh5xAUWT9Fpr7oAGXg8Q3jY/N6Y6+sHdjx2kFJgbq6Z0/48nTKQ','087812345678','1992-11-28','female',NULL,1,1,NULL,NULL,0,0.00,NULL,'2025-12-20 16:13:03','2025-12-20 16:13:02','2025-12-20 16:13:04'),(5,'Rudi Hermawan','rudi.hermawan@gmail.com','$scrypt$n=16384,r=8,p=1$d0SOkIDa8MDogm48TK7aQg$iVqhep1qogmmLrR/CJBP+sXUqKTYiYoIuyqsZe9IyQAStqr1HV9etjBnYz3rWonz8cuMzJPFgZXbjnxy62NXNw','081356789012','1985-07-05','male',NULL,1,1,NULL,'AHM0001PJ7',0,0.00,NULL,'2025-12-20 16:13:04','2025-12-20 16:13:02','2025-12-20 16:13:04'),(6,'Rina Wulandari','rina.wulandari@gmail.com','$scrypt$n=16384,r=8,p=1$e1v67mq6llEByCPR5UZWag$k18fYsj5eOKRyZXF3RQiXi6RWq7KOZ515O1wELSccMDN5x5G4SBIKW6kNRTwBiDcKQUJ9hcVLc80pKo+XHCJEA','082145678901','1993-09-18','female',NULL,1,1,NULL,'OGIOWROK2',0,0.00,NULL,'2025-12-20 16:13:04','2025-12-20 16:13:02','2025-12-23 07:24:20'),(7,'Doni Pratama','doni.pratama@gmail.com','$scrypt$n=16384,r=8,p=1$4U4eyTU8uU66QlSgzkpSOg$DaGmwVHUEscWG4upTZ3SLt9d9aH/y9+bDVX4ecIvUMCqJgWwoNQNjRZzZ7tojlkSTqLyXcMrMxUm/eusQEyjUg','085678901234','1991-12-03','male',NULL,1,1,NULL,'OGIOWROK2',0,0.00,NULL,'2025-12-20 16:13:04','2025-12-20 16:13:02','2025-12-23 07:21:59'),(8,'Maya Sari','maya.sari@gmail.com','$scrypt$n=16384,r=8,p=1$flqnTacn5Pyp2sWp0EUFpg$lqDdMqbjuCpRXZCTkruMOl93EjL6Ljdir16v4t44dT0LElPQS0zppiw7G4gARuYUWmkfClFg3nv5rUpc7BDBWA','081567890123','1994-04-25','female',NULL,1,1,NULL,NULL,0,0.00,NULL,'2025-12-20 16:13:04','2025-12-20 16:13:02','2025-12-20 16:13:04'),(9,'Eko Wijaya','eko.wijaya@gmail.com','$scrypt$n=16384,r=8,p=1$tUetuAtEVt/WQG5AQSRLug$lbYZJT6/L+qvBekgAjBKzfSYVV4m+drhDhyw/skItf6ZtfxN0wNQL9VZs6QhHV0GnVRsLbgwIXw2To9sYjh52w','087890123456','1987-06-12','male',NULL,1,1,NULL,NULL,0,0.00,NULL,'2025-12-20 16:13:04','2025-12-20 16:13:03','2025-12-20 16:13:04'),(10,'Fitri Handayani','fitri.handayani@gmail.com','$scrypt$n=16384,r=8,p=1$7mCjVepVoguzZlSy4850fw$AMI/Bv6f8qt/7MggNfxMpq6Xv6l+20hRIgXj/ebGitM5v+ThBerKMsZxyOoYpNDSBr+DtPBVQiPJ7doq6EPeLA','082234567890','1996-02-08','female',NULL,1,1,NULL,NULL,0,0.00,NULL,'2025-12-20 16:13:04','2025-12-20 16:13:03','2025-12-20 16:13:04');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discount_products`
--

DROP TABLE IF EXISTS `discount_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discount_products` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `discount_id` int unsigned DEFAULT NULL,
  `product_id` int unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `discount_products_discount_id_product_id_unique` (`discount_id`,`product_id`),
  KEY `discount_products_product_id_foreign` (`product_id`),
  CONSTRAINT `discount_products_discount_id_foreign` FOREIGN KEY (`discount_id`) REFERENCES `discounts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `discount_products_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discount_products`
--

LOCK TABLES `discount_products` WRITE;
/*!40000 ALTER TABLE `discount_products` DISABLE KEYS */;
INSERT INTO `discount_products` VALUES (1,1,13,'2025-12-22 03:51:11'),(2,1,20,'2025-12-22 03:51:11'),(3,1,24,'2025-12-22 03:51:11');
/*!40000 ALTER TABLE `discount_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discounts`
--

DROP TABLE IF EXISTS `discounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discounts` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int unsigned DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `type` enum('percentage','fixed') DEFAULT 'percentage',
  `value` decimal(10,2) NOT NULL,
  `min_purchase` decimal(12,2) DEFAULT '0.00',
  `max_discount` decimal(12,2) DEFAULT NULL,
  `usage_limit` int DEFAULT NULL,
  `used_count` int DEFAULT '0',
  `start_date` timestamp NOT NULL,
  `end_date` timestamp NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `applies_to_all` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `discounts_product_id_foreign` (`product_id`),
  CONSTRAINT `discounts_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discounts`
--

LOCK TABLES `discounts` WRITE;
/*!40000 ALTER TABLE `discounts` DISABLE KEYS */;
INSERT INTO `discounts` VALUES (1,NULL,'Diskon Natal','Diskon dan promo akhir tahun','percentage',10.00,0.00,NULL,NULL,0,'2025-12-21 13:47:00','2025-12-21 13:47:00',1,0,'2025-12-22 03:36:20','2025-12-22 03:51:20');
/*!40000 ALTER TABLE `discounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flash_sale_products`
--

DROP TABLE IF EXISTS `flash_sale_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flash_sale_products` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `flash_sale_id` int unsigned DEFAULT NULL,
  `product_id` int unsigned DEFAULT NULL,
  `original_price` decimal(12,2) NOT NULL,
  `flash_price` decimal(12,2) NOT NULL,
  `stock_limit` int NOT NULL,
  `sold_count` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `flash_sale_products_flash_sale_id_product_id_unique` (`flash_sale_id`,`product_id`),
  KEY `flash_sale_products_product_id_foreign` (`product_id`),
  CONSTRAINT `flash_sale_products_flash_sale_id_foreign` FOREIGN KEY (`flash_sale_id`) REFERENCES `flash_sales` (`id`) ON DELETE CASCADE,
  CONSTRAINT `flash_sale_products_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flash_sale_products`
--

LOCK TABLES `flash_sale_products` WRITE;
/*!40000 ALTER TABLE `flash_sale_products` DISABLE KEYS */;
INSERT INTO `flash_sale_products` VALUES (1,1,13,295000.00,36000.00,10,0,'2025-12-22 04:23:21','2025-12-22 04:23:21'),(2,1,24,485000.00,88000.00,10,0,'2025-12-22 04:23:21','2025-12-22 04:23:21');
/*!40000 ALTER TABLE `flash_sale_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flash_sales`
--

DROP TABLE IF EXISTS `flash_sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flash_sales` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `start_date` timestamp NOT NULL,
  `end_date` timestamp NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flash_sales`
--

LOCK TABLES `flash_sales` WRITE;
/*!40000 ALTER TABLE `flash_sales` DISABLE KEYS */;
INSERT INTO `flash_sales` VALUES (1,'Flash Sale 1212','Flash Sale yang diadakan pada tanggal 12 Desember.','2025-12-11 17:00:00','2025-12-12 16:59:00',1,'2025-12-22 04:23:21','2025-12-22 04:23:21');
/*!40000 ALTER TABLE `flash_sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification_settings`
--

DROP TABLE IF EXISTS `notification_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification_settings` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `event_key` varchar(100) NOT NULL,
  `event_name` varchar(255) NOT NULL,
  `event_group` varchar(50) DEFAULT 'orders',
  `description` text,
  `email_enabled` tinyint(1) DEFAULT '1',
  `push_enabled` tinyint(1) DEFAULT '1',
  `whatsapp_enabled` tinyint(1) DEFAULT '0',
  `email_template` varchar(255) DEFAULT NULL,
  `whatsapp_template` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `notification_settings_event_key_unique` (`event_key`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification_settings`
--

LOCK TABLES `notification_settings` WRITE;
/*!40000 ALTER TABLE `notification_settings` DISABLE KEYS */;
INSERT INTO `notification_settings` VALUES (1,'order_placed','Pesanan Baru','orders','Notifikasi ketika ada pesanan baru masuk',1,1,0,NULL,NULL,'2025-12-22 06:39:28','2025-12-22 06:39:28'),(2,'order_paid','Pembayaran Diterima','orders','Notifikasi ketika pembayaran pesanan berhasil',1,1,0,NULL,NULL,'2025-12-22 06:39:28','2025-12-22 06:39:28'),(3,'order_processing','Pesanan Diproses','orders','Notifikasi ketika pesanan mulai diproses',1,1,0,NULL,NULL,'2025-12-22 06:39:28','2025-12-22 06:39:28'),(4,'order_shipped','Pesanan Dikirim','orders','Notifikasi ketika pesanan sudah dikirim',1,1,0,NULL,NULL,'2025-12-22 06:39:28','2025-12-22 06:39:28'),(5,'order_delivered','Pesanan Sampai','orders','Notifikasi ketika pesanan sudah sampai tujuan',1,1,0,NULL,NULL,'2025-12-22 06:39:28','2025-12-22 06:39:28'),(6,'order_cancelled','Pesanan Dibatalkan','orders','Notifikasi ketika pesanan dibatalkan',1,1,0,NULL,NULL,'2025-12-22 06:39:28','2025-12-22 06:39:28'),(7,'payment_pending','Menunggu Pembayaran','payments','Notifikasi reminder pembayaran',1,1,0,NULL,NULL,'2025-12-22 06:39:28','2025-12-22 06:39:28'),(8,'payment_expired','Pembayaran Kadaluarsa','payments','Notifikasi ketika pembayaran sudah expired',1,1,0,NULL,NULL,'2025-12-22 06:39:28','2025-12-22 06:39:28'),(9,'refund_processed','Refund Diproses','payments','Notifikasi ketika refund sedang diproses',1,1,0,NULL,NULL,'2025-12-22 06:39:28','2025-12-22 06:39:28'),(10,'withdrawal_approved','Withdraw Disetujui','payments','Notifikasi ketika permintaan withdraw disetujui',1,1,0,NULL,NULL,'2025-12-22 06:39:28','2025-12-22 06:39:28'),(11,'withdrawal_rejected','Withdraw Ditolak','payments','Notifikasi ketika permintaan withdraw ditolak',1,1,0,NULL,NULL,'2025-12-22 06:39:28','2025-12-22 06:39:28'),(12,'flash_sale_start','Flash Sale Dimulai','promotions','Notifikasi ketika flash sale dimulai',1,1,0,NULL,NULL,'2025-12-22 06:39:28','2025-12-22 06:39:28'),(13,'voucher_received','Voucher Diterima','promotions','Notifikasi ketika customer menerima voucher',1,1,0,NULL,NULL,'2025-12-22 06:39:28','2025-12-22 06:39:28'),(14,'low_stock','Stok Menipis','system','Notifikasi ketika stok produk hampir habis',1,1,0,NULL,NULL,'2025-12-22 06:39:28','2025-12-22 06:39:28'),(15,'new_review','Review Baru','system','Notifikasi ketika ada review produk baru',1,1,0,NULL,NULL,'2025-12-22 06:39:28','2025-12-22 06:39:28'),(16,'bug_report','Laporan Bug','system','Notifikasi ketika ada laporan bug dari user',1,1,0,NULL,NULL,'2025-12-22 06:39:28','2025-12-22 06:39:28');
/*!40000 ALTER TABLE `notification_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned DEFAULT NULL,
  `customer_id` int unsigned DEFAULT NULL,
  `type` enum('order_new','order_paid','order_cancelled','order_shipped','order_completed','review_new','product_low_stock','product_out_of_stock','withdrawal_approved','withdrawal_rejected','system') NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `data` json DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT '0',
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `notifications_user_id_is_read_index` (`user_id`,`is_read`),
  KEY `notifications_user_id_created_at_index` (`user_id`,`created_at`),
  KEY `notifications_customer_id_is_read_index` (`customer_id`,`is_read`),
  KEY `notifications_customer_id_created_at_index` (`customer_id`,`created_at`),
  CONSTRAINT `notifications_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `notifications_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1,NULL,NULL,'order_new','Pesanan Baru!','Pesanan baru dari Ahmad Fauzi senilai Rp 663.000','{\"amount\": 663000, \"orderId\": 1, \"orderNumber\": \"OGT202512050001\", \"customerName\": \"Ahmad Fauzi\"}',0,NULL,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(2,NULL,NULL,'order_new','Pesanan Baru!','Pesanan baru dari Siti Rahayu senilai Rp 608.000','{\"amount\": 608000, \"orderId\": 2, \"orderNumber\": \"OGT202512080002\", \"customerName\": \"Siti Rahayu\"}',0,NULL,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(3,NULL,NULL,'order_new','Pesanan Baru!','Pesanan baru dari Budi Santoso senilai Rp 1.798.000','{\"amount\": 1798000, \"orderId\": 3, \"orderNumber\": \"OGT202511300003\", \"customerName\": \"Budi Santoso\"}',0,NULL,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(4,NULL,NULL,'order_new','Pesanan Baru!','Pesanan baru dari Dewi Lestari senilai Rp 579.000','{\"amount\": 579000, \"orderId\": 4, \"orderNumber\": \"OGT202512170004\", \"customerName\": \"Dewi Lestari\"}',0,NULL,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(5,NULL,NULL,'order_new','Pesanan Baru!','Pesanan baru dari Rudi Hermawan senilai Rp 1.285.000','{\"amount\": 1285000, \"orderId\": 5, \"orderNumber\": \"OGT202512190005\", \"customerName\": \"Rudi Hermawan\"}',0,NULL,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(6,NULL,NULL,'order_new','Pesanan Baru!','Pesanan baru dari Rina Wulandari senilai Rp 604.000','{\"amount\": 604000, \"orderId\": 6, \"orderNumber\": \"OGT202512120006\", \"customerName\": \"Rina Wulandari\"}',0,NULL,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(7,NULL,NULL,'order_new','Pesanan Baru!','Pesanan baru dari Doni Pratama senilai Rp 434.000','{\"amount\": 434000, \"orderId\": 7, \"orderNumber\": \"OGT202512200007\", \"customerName\": \"Doni Pratama\"}',0,NULL,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(8,NULL,NULL,'order_new','Pesanan Baru!','Pesanan baru dari Maya Sari senilai Rp 482.000','{\"amount\": 482000, \"orderId\": 8, \"orderNumber\": \"OGT202512100008\", \"customerName\": \"Maya Sari\"}',0,NULL,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(9,NULL,NULL,'order_new','Pesanan Baru!','Pesanan baru dari Eko Wijaya senilai Rp 597.000','{\"amount\": 597000, \"orderId\": 9, \"orderNumber\": \"OGT202511250009\", \"customerName\": \"Eko Wijaya\"}',0,NULL,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(10,NULL,NULL,'order_new','Pesanan Baru!','Pesanan baru dari Fitri Handayani senilai Rp 599.000','{\"amount\": 599000, \"orderId\": 10, \"orderNumber\": \"OGT202512200010\", \"customerName\": \"Fitri Handayani\"}',0,NULL,'2025-12-20 16:13:06','2025-12-20 16:13:06');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int unsigned DEFAULT NULL,
  `product_id` int unsigned DEFAULT NULL,
  `product_variant_id` int unsigned DEFAULT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_sku` varchar(255) NOT NULL,
  `variant_name` varchar(255) DEFAULT NULL,
  `price` decimal(12,2) NOT NULL,
  `quantity` int NOT NULL,
  `subtotal` decimal(12,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_items_order_id_foreign` (`order_id`),
  KEY `order_items_product_id_foreign` (`product_id`),
  KEY `order_items_product_variant_id_foreign` (`product_variant_id`),
  CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_items_product_variant_id_foreign` FOREIGN KEY (`product_variant_id`) REFERENCES `product_variants` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,1,1,1,'SMOK Nord 5 Pod Kit 80W','SMOK-NORD5-BLK','Color: Black',425000.00,1,425000.00,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(2,1,9,32,'Emkay Brew Mango Smoothie 60ml','EMKAY-MANGO-3MG','Nicotine: 3mg',110000.00,2,220000.00,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(3,2,3,14,'RELX Infinity Plus Device','RELX-INF-RSG','Color: Rose Gold',209000.00,1,209000.00,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(4,2,14,40,'RELX Pod Pro Grape 30ml','RELX-GRAPE-30MG','Nicotine: 30mg',130000.00,3,390000.00,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(5,3,6,20,'GeekVape Aegis Legend 2 Kit','GEEK-AGL2-BLK','Color: Classic Black',1150000.00,1,1150000.00,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(6,3,21,NULL,'Sony VTC6 18650 3000mAh 30A','SONY-VTC6-18650-001',NULL,130000.00,4,520000.00,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(7,3,23,NULL,'Cotton Bacon Prime','CTNBCN-PRIME-001',NULL,58000.00,2,116000.00,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(8,4,2,9,'Voopoo Argus P1 Pod Kit','VOOP-P1-PNK','Color: Pink',245000.00,1,245000.00,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(9,4,10,34,'Nasty Juice Cush Man 60ml','NASTY-CUSH-3MG','Nicotine: 3mg',155000.00,2,310000.00,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(10,5,7,24,'Voopoo Drag 4 Mod','VOOP-D4-GNM','Color: Gun Metal',825000.00,1,825000.00,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(11,5,17,28,'Hellvape Dead Rabbit 3 RDA','HELL-DR3-BLK','Color: Matte Black',445000.00,1,445000.00,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(12,6,4,19,'Vaporesso XROS 3 Mini','VAPO-X3M-RPK','Color: Rose Pink',295000.00,1,295000.00,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(13,6,16,44,'Naked 100 Salt Polar Breeze 30ml','NKD-POLAR-35MG','Nicotine: 35mg',150000.00,2,300000.00,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(14,7,12,37,'Indonesian Juice Kopi Susu 60ml','INDJ-KOPI-6MG','Nicotine: 6mg',85000.00,5,425000.00,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(15,8,26,46,'IGET Bar Plus 6000 Puffs','IGET-6000-GRAPE','Flavor: Grape Ice',149000.00,3,447000.00,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(16,9,19,NULL,'SMOK RPM 3 Mesh Coil 0.23ohm (5pcs)','SMOK-RPM3-COIL-023-001',NULL,110000.00,2,220000.00,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(17,9,22,NULL,'Nitecore i4 Intellicharger','NITC-I4-CHARGER-001',NULL,365000.00,1,365000.00,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(18,10,24,NULL,'Coil Master DIY Kit V3','COILM-DIYKITV3-001',NULL,445000.00,1,445000.00,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(19,10,20,NULL,'Coilology Alien Clapton Wire SS316L','COIL-ALIEN-SS316L-001',NULL,68000.00,2,136000.00,'2025-12-20 16:13:06','2025-12-20 16:13:06');
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `order_number` varchar(255) NOT NULL,
  `customer_id` int unsigned DEFAULT NULL,
  `address_id` int unsigned DEFAULT NULL,
  `status` enum('pending_payment','paid','processing','shipped','delivered','cancelled','refunded') DEFAULT 'pending_payment',
  `subtotal` decimal(12,2) NOT NULL,
  `tax` decimal(12,2) DEFAULT '0.00',
  `shipping_cost` decimal(12,2) DEFAULT '0.00',
  `discount` decimal(12,2) DEFAULT '0.00',
  `admin_fee` decimal(12,2) DEFAULT '0.00',
  `total` decimal(12,2) NOT NULL,
  `customer_notes` text,
  `admin_notes` text,
  `paid_at` timestamp NULL DEFAULT NULL,
  `processed_at` timestamp NULL DEFAULT NULL,
  `shipped_at` timestamp NULL DEFAULT NULL,
  `delivered_at` timestamp NULL DEFAULT NULL,
  `cancelled_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `orders_order_number_unique` (`order_number`),
  KEY `orders_customer_id_foreign` (`customer_id`),
  KEY `orders_address_id_foreign` (`address_id`),
  CONSTRAINT `orders_address_id_foreign` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`) ON DELETE SET NULL,
  CONSTRAINT `orders_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'OGT202512050001',1,1,'delivered',645000.00,0.00,18000.00,0.00,0.00,663000.00,NULL,NULL,'2025-12-05 16:43:06','2025-12-05 18:13:06','2025-12-06 16:13:06','2025-12-09 16:13:06',NULL,'2025-12-05 16:13:06','2025-12-05 16:13:06'),(2,'OGT202512080002',2,3,'delivered',599000.00,0.00,9000.00,0.00,0.00,608000.00,NULL,NULL,'2025-12-08 16:43:06','2025-12-08 18:13:06','2025-12-09 16:13:06','2025-12-10 16:13:06',NULL,'2025-12-08 16:13:06','2025-12-08 16:13:06'),(3,'OGT202511300003',3,4,'delivered',1786000.00,0.00,12000.00,0.00,0.00,1798000.00,NULL,NULL,'2025-11-30 16:43:06','2025-11-30 18:13:06','2025-12-01 16:13:06','2025-12-03 16:13:06',NULL,'2025-11-30 16:13:06','2025-11-30 16:13:06'),(4,'OGT202512170004',4,6,'shipped',555000.00,0.00,24000.00,0.00,0.00,579000.00,NULL,NULL,'2025-12-17 16:43:06','2025-12-17 18:13:06','2025-12-18 16:13:06',NULL,NULL,'2025-12-17 16:13:06','2025-12-17 16:13:06'),(5,'OGT202512190005',5,7,'processing',1270000.00,0.00,15000.00,0.00,0.00,1285000.00,NULL,NULL,'2025-12-19 16:43:06','2025-12-19 18:13:06',NULL,NULL,NULL,'2025-12-19 16:13:06','2025-12-19 16:13:06'),(6,'OGT202512120006',6,8,'delivered',595000.00,0.00,9000.00,0.00,0.00,604000.00,NULL,NULL,'2025-12-12 16:43:06','2025-12-12 18:13:06','2025-12-13 16:13:06','2025-12-15 16:13:06',NULL,'2025-12-12 16:13:06','2025-12-12 16:13:06'),(7,'OGT202512200007',7,9,'paid',425000.00,0.00,9000.00,0.00,0.00,434000.00,NULL,NULL,'2025-12-20 16:43:06',NULL,NULL,NULL,NULL,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(8,'OGT202512100008',8,10,'delivered',447000.00,0.00,35000.00,0.00,0.00,482000.00,NULL,NULL,'2025-12-10 16:43:06','2025-12-10 18:13:06','2025-12-11 16:13:06','2025-12-16 16:13:06',NULL,'2025-12-10 16:13:06','2025-12-10 16:13:06'),(9,'OGT202511250009',9,11,'delivered',585000.00,0.00,12000.00,0.00,0.00,597000.00,NULL,NULL,'2025-11-25 16:43:06','2025-11-25 18:13:06','2025-11-26 16:13:06','2025-11-27 16:13:06',NULL,'2025-11-25 16:13:06','2025-11-25 16:13:06'),(10,'OGT202512200010',10,12,'pending_payment',581000.00,0.00,18000.00,0.00,0.00,599000.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-12-20 16:13:06','2025-12-20 16:13:06');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `otps`
--

DROP TABLE IF EXISTS `otps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `otps` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `code` varchar(6) NOT NULL,
  `type` enum('login','register','forgot_password') NOT NULL,
  `is_used` tinyint(1) DEFAULT '0',
  `expires_at` timestamp NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `otps_email_code_type_index` (`email`,`code`,`type`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `otps`
--

LOCK TABLES `otps` WRITE;
/*!40000 ALTER TABLE `otps` DISABLE KEYS */;
INSERT INTO `otps` VALUES (1,'admin@ogitu.com','601682','login',1,'2025-12-20 16:36:54','2025-12-20 16:31:54','2025-12-20 16:32:14'),(2,'admin@ogitu.com','766582','login',1,'2025-12-22 02:39:26','2025-12-22 02:34:26','2025-12-22 02:34:44'),(3,'ahmad.fauzi@gmail.com','396148','login',1,'2025-12-22 10:18:15','2025-12-22 10:13:15','2025-12-22 10:14:06'),(4,'admin@ogitu.com','386677','login',1,'2025-12-22 14:55:01','2025-12-22 14:50:01','2025-12-22 14:50:40'),(5,'admin@ogitu.com','187574','login',1,'2025-12-23 03:20:24','2025-12-23 03:15:24','2025-12-23 03:15:48'),(6,'admin@ogitu.com','111485','login',1,'2026-01-07 02:45:41','2026-01-07 02:40:41','2026-01-07 02:41:21'),(7,'admin@ogitu.com','317258','login',1,'2026-01-07 04:49:15','2026-01-07 04:44:15','2026-01-07 04:44:32');
/*!40000 ALTER TABLE `otps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int unsigned DEFAULT NULL,
  `payment_type` varchar(255) NOT NULL COMMENT 'credit_card, bank_transfer, gopay, etc',
  `transaction_id` varchar(255) DEFAULT NULL COMMENT 'Midtrans transaction ID',
  `order_id_midtrans` varchar(255) DEFAULT NULL COMMENT 'Midtrans order_id',
  `gross_amount` decimal(12,2) NOT NULL,
  `transaction_status` enum('pending','capture','settlement','deny','cancel','expire','refund') DEFAULT 'pending',
  `status_code` varchar(255) DEFAULT NULL,
  `fraud_status` varchar(255) DEFAULT NULL,
  `payment_details` json DEFAULT NULL COMMENT 'Full response from Midtrans',
  `snap_token` varchar(255) DEFAULT NULL COMMENT 'Snap token for frontend',
  `snap_redirect_url` varchar(255) DEFAULT NULL,
  `transaction_time` timestamp NULL DEFAULT NULL,
  `settlement_time` timestamp NULL DEFAULT NULL,
  `expiry_time` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `payments_order_id_unique` (`order_id`),
  UNIQUE KEY `payments_transaction_id_unique` (`transaction_id`),
  UNIQUE KEY `payments_order_id_midtrans_unique` (`order_id_midtrans`),
  CONSTRAINT `payments_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,1,'bank_transfer','TXNOGT202512050001','OGT202512050001',663000.00,'settlement','200',NULL,NULL,NULL,NULL,'2025-12-05 16:43:06','2025-12-05 16:48:06',NULL,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(2,2,'gopay','TXNOGT202512080002','OGT202512080002',608000.00,'settlement','200',NULL,NULL,NULL,NULL,'2025-12-08 16:43:06','2025-12-08 16:48:06',NULL,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(3,3,'bank_transfer','TXNOGT202511300003','OGT202511300003',1798000.00,'settlement','200',NULL,NULL,NULL,NULL,'2025-11-30 16:43:06','2025-11-30 16:48:06',NULL,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(4,4,'gopay','TXNOGT202512170004','OGT202512170004',579000.00,'settlement','200',NULL,NULL,NULL,NULL,'2025-12-17 16:43:06','2025-12-17 16:48:06',NULL,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(5,5,'credit_card','TXNOGT202512190005','OGT202512190005',1285000.00,'settlement','200',NULL,NULL,NULL,NULL,'2025-12-19 16:43:06','2025-12-19 16:48:06',NULL,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(6,6,'credit_card','TXNOGT202512120006','OGT202512120006',604000.00,'settlement','200',NULL,NULL,NULL,NULL,'2025-12-12 16:43:06','2025-12-12 16:48:06',NULL,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(7,7,'qris','TXNOGT202512200007','OGT202512200007',434000.00,'settlement','200',NULL,NULL,NULL,NULL,'2025-12-20 16:43:06','2025-12-20 16:48:06',NULL,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(8,8,'credit_card','TXNOGT202512100008','OGT202512100008',482000.00,'settlement','200',NULL,NULL,NULL,NULL,'2025-12-10 16:43:06','2025-12-10 16:48:06',NULL,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(9,9,'credit_card','TXNOGT202511250009','OGT202511250009',597000.00,'settlement','200',NULL,NULL,NULL,NULL,'2025-11-25 16:43:06','2025-11-25 16:48:06',NULL,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(10,10,'bank_transfer',NULL,'OGT202512200010',599000.00,'pending','201',NULL,NULL,'SNAP_OGT202512200010_TOKEN','https://app.sandbox.midtrans.com/snap/v3/redirection/OGT202512200010',NULL,NULL,'2025-12-21 16:13:06','2025-12-20 16:13:06','2025-12-20 16:13:06');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_images` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int unsigned DEFAULT NULL,
  `url` varchar(255) NOT NULL,
  `alt_text` varchar(255) DEFAULT NULL,
  `is_primary` tinyint(1) DEFAULT '0',
  `sort_order` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_images_product_id_foreign` (`product_id`),
  CONSTRAINT `product_images_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (1,1,'/products/01K9C7HTVMVRRF4C3YR63VJFH4.jpeg','SMOK Nord 5 Package Contents',0,3,'2025-12-20 16:13:05','2025-12-20 16:13:06'),(2,2,'/products/01K9C7HTVMVRRF4C3YR63VJFH4.jpeg','Voopoo Argus P1 In Hand',0,2,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(3,3,'/products/01K9C7HTVMVRRF4C3YR63VJFH4.jpeg','RELX Infinity Plus Charging',0,2,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(4,4,'/products/01K9C7HTVMVRRF4C3YR63VJFH4.jpeg','Vaporesso XROS 3 Mini Pod',0,2,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(5,5,'/products/01K9C7HTVMVRRF4C3YR63VJFH4.jpeg','GeekVape Wenax K1 Colors',0,1,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(6,6,'/products/01K9C7HTVMVRRF4C3YR63VJFH4.jpeg','GeekVape Aegis Legend 2 IP68',0,3,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(7,7,'/products/01K9C7HTVMVRRF4C3YR63VJFH4.jpeg','Voopoo Drag 4 Display',0,2,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(8,8,'/products/01K9C7HTVMVRRF4C3YR63VJFH4.jpeg','Dovpo Topside Dual Squonk Bottle',0,1,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(9,9,'/products/01K9C7HTVMVRRF4C3YR63VJFH4.jpeg','Emkay Mango Smoothie Label',0,1,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(10,10,'/products/01K9C7HTVMVRRF4C3YR63VJFH4.jpeg','Nasty Juice Cush Man Bottle',0,1,'2025-12-20 16:13:06','2025-12-20 16:13:07'),(11,11,'/products/01K9C7HTVMVRRF4C3YR63VJFH4.jpeg','Dinner Lady Lemon Tart Ice',1,0,'2025-12-20 16:13:06','2025-12-20 16:13:07'),(12,12,'/products/01K9C7HTVMVRRF4C3YR63VJFH4.jpeg','Indonesian Juice Kopi Susu Label',0,1,'2025-12-20 16:13:06','2025-12-20 16:13:07'),(13,13,'/products/01K9C7HTVMVRRF4C3YR63VJFH4.jpeg','Black Note Virginia Main',1,0,'2025-12-20 16:13:06','2025-12-20 16:13:07'),(14,14,'/products/01K9C7HTVMVRRF4C3YR63VJFH4.jpeg','RELX Pod Pro Grape Package',0,1,'2025-12-20 16:13:06','2025-12-20 16:13:07'),(15,15,'/products/01K9C7HTVMVRRF4C3YR63VJFH4.jpeg','Saltnic Labs Vanilla Custard',1,0,'2025-12-20 16:13:06','2025-12-20 16:13:07'),(16,16,'/products/01K9C7HTVMVRRF4C3YR63VJFH4.jpeg','Naked 100 Polar Breeze Main',1,0,'2025-12-20 16:13:06','2025-12-20 16:13:07'),(17,17,'/products/01K9C7HTVMVRRF4C3YR63VJFH4.jpeg','Hellvape Dead Rabbit 3 Airflow',0,2,'2025-12-20 16:13:06','2025-12-20 16:13:07'),(18,18,'/products/01K9C7HTVMVRRF4C3YR63VJFH4.jpeg','QP Juggerknot V2 Deck',0,1,'2025-12-20 16:13:06','2025-12-20 16:13:07'),(19,19,'/products/01K9C7HTVMVRRF4C3YR63VJFH4.jpeg','SMOK RPM 3 Coil Pack',1,0,'2025-12-20 16:13:06','2025-12-20 16:13:07'),(20,20,'/products/01K9C7HTVMVRRF4C3YR63VJFH4.jpeg','Coilology Alien Clapton Wire',1,0,'2025-12-20 16:13:06','2025-12-20 16:13:07'),(21,21,'/products/01K9C7HTVMVRRF4C3YR63VJFH4.jpeg','Sony VTC6 QR Code',0,1,'2025-12-20 16:13:06','2025-12-20 16:13:07'),(22,22,'/products/01K9C7HTVMVRRF4C3YR63VJFH4.jpeg','Nitecore i4 Charging',0,1,'2025-12-20 16:13:06','2025-12-20 16:13:07'),(23,23,'/products/01K9C7HTVMVRRF4C3YR63VJFH4.jpeg','Cotton Bacon Prime Strip',0,1,'2025-12-20 16:13:06','2025-12-20 16:13:07'),(24,24,'/products/01K9C7HTVMVRRF4C3YR63VJFH4.jpeg','Coil Master DIY Kit V3 Contents',0,1,'2025-12-20 16:13:06','2025-12-20 16:13:07'),(25,25,'/products/01K9C7HTVMVRRF4C3YR63VJFH4.jpeg','Voopoo ITO Cartridge',1,0,'2025-12-20 16:13:06','2025-12-20 16:13:07'),(26,26,'/products/01K9C7HTVMVRRF4C3YR63VJFH4.jpeg','IGET Bar Plus Flavors',0,1,'2025-12-20 16:13:06','2025-12-20 16:13:07'),(27,27,'/products/01K9C7HTVMVRRF4C3YR63VJFH4.jpeg','Elf Bar 600 All Flavors',0,1,'2025-12-20 16:13:06','2025-12-20 16:13:07');
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_variants`
--

DROP TABLE IF EXISTS `product_variants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_variants` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int unsigned DEFAULT NULL,
  `name` varchar(255) NOT NULL COMMENT 'e.g., Color, Size, Flavor',
  `value` varchar(255) NOT NULL COMMENT 'e.g., Red, 60ml, Mint',
  `sku` varchar(255) NOT NULL,
  `price_adjustment` decimal(12,2) DEFAULT '0.00',
  `stock` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_variants_sku_unique` (`sku`),
  KEY `product_variants_product_id_foreign` (`product_id`),
  CONSTRAINT `product_variants_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_variants`
--

LOCK TABLES `product_variants` WRITE;
/*!40000 ALTER TABLE `product_variants` DISABLE KEYS */;
INSERT INTO `product_variants` VALUES (1,1,'Color','Black','SMOK-NORD5-BLK',0.00,15,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(2,1,'Color','Silver','SMOK-NORD5-SLV',0.00,12,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(3,1,'Color','Red','SMOK-NORD5-RED',0.00,10,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(4,1,'Color','Blue','SMOK-NORD5-BLU',0.00,8,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(5,1,'Color','Rainbow','SMOK-NORD5-RNB',15000.00,5,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(6,2,'Color','Black','VOOP-P1-BLK',0.00,20,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(7,2,'Color','White','VOOP-P1-WHT',0.00,18,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(8,2,'Color','Green','VOOP-P1-GRN',0.00,15,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(9,2,'Color','Pink','VOOP-P1-PNK',0.00,12,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(10,2,'Color','Blue','VOOP-P1-BLU',0.00,10,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(11,3,'Color','Obsidian Black','RELX-INF-BLK',0.00,30,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(12,3,'Color','Silver','RELX-INF-SLV',0.00,25,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(13,3,'Color','Gold','RELX-INF-GLD',10000.00,20,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(14,3,'Color','Rose Gold','RELX-INF-RSG',10000.00,15,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(15,3,'Color','Navy Blue','RELX-INF-NVY',0.00,10,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(16,4,'Color','Black','VAPO-X3M-BLK',0.00,20,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(17,4,'Color','Space Grey','VAPO-X3M-SGY',0.00,15,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(18,4,'Color','Sky Blue','VAPO-X3M-SBL',0.00,12,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(19,4,'Color','Rose Pink','VAPO-X3M-RPK',0.00,8,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(20,6,'Color','Classic Black','GEEK-AGL2-BLK',0.00,8,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(21,6,'Color','Rainbow','GEEK-AGL2-RNB',25000.00,5,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(22,6,'Color','Red','GEEK-AGL2-RED',0.00,6,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(23,6,'Color','Blue','GEEK-AGL2-BLU',0.00,6,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(24,7,'Color','Gun Metal','VOOP-D4-GNM',0.00,10,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(25,7,'Color','Black','VOOP-D4-BLK',0.00,8,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(26,7,'Color','Tropical Orange','VOOP-D4-ORG',0.00,6,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(27,7,'Color','Ocean Blue','VOOP-D4-OBL',0.00,6,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(28,17,'Color','Matte Black','HELL-DR3-BLK',0.00,12,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(29,17,'Color','SS','HELL-DR3-SS',0.00,10,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(30,17,'Color','Rainbow','HELL-DR3-RNB',15000.00,8,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(31,17,'Color','Gunmetal','HELL-DR3-GNM',0.00,5,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(32,9,'Nicotine','3mg','EMKAY-MANGO-3MG',0.00,50,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(33,9,'Nicotine','6mg','EMKAY-MANGO-6MG',0.00,50,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(34,10,'Nicotine','3mg','NASTY-CUSH-3MG',0.00,40,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(35,10,'Nicotine','6mg','NASTY-CUSH-6MG',0.00,40,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(36,12,'Nicotine','3mg','INDJ-KOPI-3MG',0.00,60,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(37,12,'Nicotine','6mg','INDJ-KOPI-6MG',0.00,60,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(38,13,'Nicotine','3mg','BLKN-VIRG-3MG',0.00,12,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(39,13,'Nicotine','6mg','BLKN-VIRG-6MG',0.00,13,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(40,14,'Nicotine','30mg','RELX-GRAPE-30MG',0.00,75,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(41,14,'Nicotine','50mg','RELX-GRAPE-50MG',10000.00,75,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(42,15,'Nicotine','25mg','SLAB-VANI-25MG',0.00,40,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(43,15,'Nicotine','35mg','SLAB-VANI-35MG',0.00,40,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(44,16,'Nicotine','35mg','NKD-POLAR-35MG',0.00,32,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(45,16,'Nicotine','50mg','NKD-POLAR-50MG',10000.00,33,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(46,26,'Flavor','Grape Ice','IGET-6000-GRAPE',0.00,25,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(47,26,'Flavor','Watermelon Ice','IGET-6000-WTMLN',0.00,25,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(48,26,'Flavor','Mango Ice','IGET-6000-MANGO',0.00,20,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(49,26,'Flavor','Lush Ice','IGET-6000-LUSH',0.00,15,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(50,26,'Flavor','Strawberry Kiwi','IGET-6000-STKW',0.00,15,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(51,27,'Flavor','Blue Razz Lemonade','ELFBAR-600-BRL',0.00,30,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(52,27,'Flavor','Strawberry Ice','ELFBAR-600-STR',0.00,30,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(53,27,'Flavor','Watermelon','ELFBAR-600-WTM',0.00,30,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(54,27,'Flavor','Mango','ELFBAR-600-MNG',0.00,30,1,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(55,27,'Flavor','Cola','ELFBAR-600-COLA',0.00,30,1,'2025-12-20 16:13:05','2025-12-20 16:13:07');
/*!40000 ALTER TABLE `product_variants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `category_id` int unsigned DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `sku` varchar(255) NOT NULL,
  `description` text,
  `specifications` text,
  `price` decimal(12,2) NOT NULL,
  `discount_price` decimal(12,2) DEFAULT NULL,
  `stock` int DEFAULT '0',
  `min_order` int DEFAULT '1',
  `max_order` int DEFAULT NULL,
  `weight` decimal(8,2) NOT NULL COMMENT 'in grams',
  `brand` varchar(255) DEFAULT NULL,
  `condition` enum('new','used') DEFAULT 'new',
  `status` enum('draft','active','inactive','out_of_stock') DEFAULT 'draft',
  `is_featured` tinyint(1) DEFAULT '0',
  `rating` decimal(3,2) DEFAULT '0.00',
  `total_reviews` int DEFAULT '0',
  `total_sold` int DEFAULT '0',
  `view_count` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `products_slug_unique` (`slug`),
  UNIQUE KEY `products_sku_unique` (`sku`),
  KEY `products_category_id_foreign` (`category_id`),
  CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,9,'SMOK Nord 5 Pod Kit 80W','smok-nord-5-pod-kit-80w','SMOK-NORD5-001','SMOK Nord 5 adalah pod system terbaru dari SMOK dengan fitur-fitur canggih:\n\n• Daya maksimal 80W dengan chip IQ-M\n• Baterai built-in 2000mAh\n• Layar OLED 0.96 inch\n• Kompatibel dengan coil RPM 3 dan RPM series\n• Sistem airflow adjustable\n• Kapasitas pod 5ml\n\nPaket termasuk:\n- 1x SMOK Nord 5 Device\n- 1x RPM 3 Mesh Coil 0.23ohm\n- 1x RPM 3 Mesh Coil 0.15ohm\n- 1x Nord 5 Pod 5ml\n- 1x USB Type-C Cable\n- User Manual','{\"brand\":\"SMOK\",\"power\":\"5-80W\",\"battery\":\"2000mAh Built-in\",\"display\":\"0.96\\\" OLED\",\"pod_capacity\":\"5ml\",\"resistance\":\"0.15-3.0ohm\",\"charging\":\"Type-C 2A\",\"dimensions\":\"104.9 x 26.1 x 25.6mm\"}',485000.00,425000.00,50,1,NULL,150.00,'SMOK','new','active',1,4.80,45,128,0,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(2,9,'Voopoo Argus P1 Pod Kit','voopoo-argus-p1-pod-kit','VOOP-ARGUSP1-001','Voopoo Argus P1 adalah pod system super compact dengan performa luar biasa:\n\n• Ukuran super kecil dan ringan\n• Baterai 800mAh\n• Kompatibel dengan coil ITO series\n• Gene AI Chip untuk output optimal\n• Side filling system\n• 5 level power adjustment\n\nCocok untuk daily use dan travelling!','{\"brand\":\"Voopoo\",\"power\":\"5-25W\",\"battery\":\"800mAh Built-in\",\"pod_capacity\":\"2ml\",\"resistance\":\"0.7-3.0ohm\",\"charging\":\"Type-C\",\"dimensions\":\"91.3 x 24.3 x 14.8mm\"}',275000.00,245000.00,75,1,NULL,80.00,'Voopoo','new','active',1,4.70,62,205,0,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(3,8,'RELX Infinity Plus Device','relx-infinity-plus-device','RELX-INFPLUS-001','RELX Infinity Plus dengan teknologi Super Smooth:\n\n• Teknologi Super Smooth untuk sensasi halus\n• Baterai 380mAh dengan charging 45 menit\n• Smart Pace Vibration\n• Leak-resistant maze structure\n• Magnetic pod connection\n• Premium metallic finish\n\nDevice only, pod dijual terpisah.','{\"brand\":\"RELX\",\"battery\":\"380mAh Built-in\",\"charging\":\"Type-C Fast Charge\",\"pod_type\":\"Closed System\",\"dimensions\":\"117 x 22 x 10.6mm\",\"weight\":\"25g\"}',199000.00,NULL,100,1,NULL,50.00,'RELX','new','active',1,4.90,156,520,0,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(4,10,'Vaporesso XROS 3 Mini','vaporesso-xros-3-mini','VAPO-XROS3M-001','Vaporesso XROS 3 Mini - Perfect for MTL vaping:\n\n• SSS Leak-resistant Technology\n• AXON Chip untuk rasa optimal\n• Baterai 1000mAh\n• Adjustable airflow\n• Kapasitas pod 2ml\n• Top filling system\n• Draw & Button activated\n\nPaket termasuk 2 pod cartridge dengan coil berbeda.','{\"brand\":\"Vaporesso\",\"power\":\"11-16W\",\"battery\":\"1000mAh Built-in\",\"pod_capacity\":\"2ml\",\"coil\":\"XROS Series\",\"charging\":\"Type-C 1A\",\"dimensions\":\"99.2 x 24.2 x 13.8mm\"}',325000.00,295000.00,60,1,NULL,95.00,'Vaporesso','new','active',1,4.80,89,312,0,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(5,9,'GeekVape Wenax K1','geekvape-wenax-k1','GEEK-WENAXK1-001','GeekVape Wenax K1 - Sleek & Powerful:\n\n• Desain ultra slim pen-style\n• Baterai 600mAh\n• Kompatibel dengan G Series Coil\n• Top airflow anti-leak\n• Kapasitas 2ml\n• Auto-draw activation\n\nPerfect everyday pod!','{\"brand\":\"GeekVape\",\"power\":\"16W Max\",\"battery\":\"600mAh Built-in\",\"pod_capacity\":\"2ml\",\"coil\":\"G Series Coil\",\"resistance\":\"0.8-1.2ohm\",\"charging\":\"Type-C\",\"dimensions\":\"113 x 18.5mm\"}',185000.00,165000.00,45,1,NULL,60.00,'GeekVape','new','active',0,4.50,34,98,0,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(6,13,'GeekVape Aegis Legend 2 Kit','geekvape-aegis-legend-2-kit','GEEK-AGL2-KIT-001','GeekVape Aegis Legend 2 Kit - The Ultimate Durable Mod:\n\n• IP68 Water, Dust & Shock Resistant\n• Dual 18650 Battery (not included)\n• Power hingga 200W\n• AS Chip 3.0\n• Zeus Sub Ohm Tank 5.5ml\n• Layar TFT Color 1.08\"\n• Tri-proof protection\n\nPaket termasuk:\n- Aegis Legend 2 Mod\n- Zeus Sub Ohm Tank\n- Z Series Mesh Coil 0.2ohm\n- Z Series Mesh Coil 0.25ohm\n- Extra glass tube\n- USB Type-C Cable\n- User Manual','{\"brand\":\"GeekVape\",\"power\":\"5-200W\",\"battery\":\"Dual 18650 (Not included)\",\"display\":\"1.08\\\" TFT Color\",\"tank_capacity\":\"5.5ml\",\"resistance\":\"0.1-3.0ohm\",\"protection\":\"IP68 Tri-proof\",\"dimensions\":\"140.45 x 53.5 x 30.6mm\"}',1250000.00,1150000.00,25,1,NULL,350.00,'GeekVape','new','active',1,4.90,78,156,0,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(7,11,'Voopoo Drag 4 Mod','voopoo-drag-4-mod','VOOP-DRAG4-MOD-001','Voopoo Drag 4 - Next Level Performance:\n\n• Gene Fan 3.0 Chip\n• Dual 18650 Battery\n• Output hingga 177W\n• Layar TFT 0.96\"\n• 8 Mode Vaping\n• Smart Mode dengan AI adjustment\n• Leather grip premium\n\nMod only, tank dijual terpisah.','{\"brand\":\"Voopoo\",\"power\":\"5-177W\",\"battery\":\"Dual 18650 (Not included)\",\"display\":\"0.96\\\" TFT\",\"resistance\":\"0.1-3.0ohm\",\"modes\":\"Smart/RBA/TC/Turbo\",\"dimensions\":\"148.8 x 54 x 28mm\"}',895000.00,825000.00,30,1,NULL,180.00,'Voopoo','new','active',1,4.80,45,89,0,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(8,14,'Dovpo Topside Dual Squonk','dovpo-topside-dual-squonk','DOVP-TOPSIDE-DUAL-001','Dovpo Topside Dual - Top Fill Squonk Innovation:\n\n• Revolutionary top fill squonk system\n• Dual 18650 battery\n• Output 200W\n• 10ml squonk bottle\n• YIHI Chip\n• Ergonomic design\n• Leak-proof construction\n\nThe most convenient squonk mod!','{\"brand\":\"Dovpo\",\"power\":\"5-200W\",\"battery\":\"Dual 18650 (Not included)\",\"bottle_capacity\":\"10ml\",\"resistance\":\"0.08-3.5ohm\",\"modes\":\"VW/Bypass/TC\",\"dimensions\":\"92.5 x 59 x 30mm\"}',1650000.00,1495000.00,15,1,NULL,220.00,'Dovpo','new','active',0,4.70,23,45,0,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(9,15,'Emkay Brew Mango Smoothie 60ml','emkay-brew-mango-smoothie-60ml','EMKAY-MANGO-60-001','Emkay Brew Mango Smoothie - Local Premium Liquid:\n\n• Rasa: Mango smoothie dengan hint yogurt\n• VG/PG: 70/30\n• Nikotin: Tersedia 3mg dan 6mg\n• Ukuran: 60ml\n• Made in Indonesia\n\nSensasi mango segar dengan creamy yogurt yang smooth!','{\"brand\":\"Emkay\",\"flavor\":\"Mango Yogurt Smoothie\",\"vg_pg\":\"70/30\",\"size\":\"60ml\",\"nicotine\":\"3mg / 6mg\",\"origin\":\"Indonesia\"}',125000.00,110000.00,100,1,NULL,120.00,'Emkay','new','active',1,4.60,89,425,0,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(10,16,'Nasty Juice Cush Man 60ml','nasty-juice-cush-man-60ml','NASTY-CUSHMAN-60-001','Nasty Juice Cush Man - International Bestseller:\n\n• Rasa: Low Mint Mango\n• VG/PG: 70/30\n• Nikotin: 3mg\n• Ukuran: 60ml\n• Made in Malaysia\n\nMango ripe yang manis dengan subtle mint finish!','{\"brand\":\"Nasty Juice\",\"flavor\":\"Low Mint Mango\",\"vg_pg\":\"70/30\",\"size\":\"60ml\",\"nicotine\":\"3mg\",\"origin\":\"Malaysia\"}',175000.00,155000.00,80,1,NULL,120.00,'Nasty Juice','new','active',1,4.80,156,680,0,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(11,18,'Dinner Lady Lemon Tart Ice 60ml','dinner-lady-lemon-tart-ice-60ml','DNRL-LEMONTART-ICE-001','Dinner Lady Lemon Tart Ice - Award Winning Liquid:\n\n• Rasa: Lemon custard tart dengan mint ice\n• VG/PG: 70/30\n• Nikotin: 3mg\n• Ukuran: 60ml\n• Made in UK\n\nDessert citrus yang perfect dengan cooling sensation!','{\"brand\":\"Dinner Lady\",\"flavor\":\"Lemon Tart Ice\",\"vg_pg\":\"70/30\",\"size\":\"60ml\",\"nicotine\":\"3mg\",\"origin\":\"UK\"}',185000.00,NULL,60,1,NULL,120.00,'Dinner Lady','new','active',0,4.70,67,289,0,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(12,19,'Indonesian Juice Kopi Susu 60ml','indonesian-juice-kopi-susu-60ml','INDJ-KOPISUSU-60-001','Indonesian Juice Kopi Susu - Authentic Indonesian Coffee:\n\n• Rasa: Es kopi susu ala coffee shop\n• VG/PG: 70/30\n• Nikotin: 3mg dan 6mg\n• Ukuran: 60ml\n• Made in Indonesia\n\nSensasi ngopi yang familiar dengan creamy milk!','{\"brand\":\"Indonesian Juice\",\"flavor\":\"Kopi Susu (Coffee Milk)\",\"vg_pg\":\"70/30\",\"size\":\"60ml\",\"nicotine\":\"3mg / 6mg\",\"origin\":\"Indonesia\"}',95000.00,85000.00,120,1,NULL,120.00,'Indonesian Juice','new','active',1,4.50,234,890,0,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(13,17,'Black Note Virginia 30ml','black-note-virginia-30ml','BLKN-VIRGINIA-30-001','Black Note Virginia - Natural Tobacco Extract:\n\n• Rasa: Authentic Virginia tobacco\n• VG/PG: 50/50\n• Nikotin: 3mg dan 6mg\n• Ukuran: 30ml\n• Made in USA\n\nReal tobacco flavor untuk ex-smoker yang mencari rasa autentik!','{\"brand\":\"Black Note\",\"flavor\":\"Virginia Tobacco\",\"vg_pg\":\"50/50\",\"size\":\"30ml\",\"nicotine\":\"3mg / 6mg\",\"origin\":\"USA\"}',295000.00,265000.00,25,1,NULL,80.00,'Black Note','new','active',0,4.60,45,120,0,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(14,20,'RELX Pod Pro Grape 30ml','relx-pod-pro-grape-30ml','RELX-POD-GRAPE-30-001','RELX Pod Pro Grape - Smooth Salt Nic:\n\n• Rasa: Fresh grape dengan subtle mint\n• VG/PG: 50/50\n• Nikotin: 30mg Salt Nic\n• Ukuran: 30ml\n• Compatible dengan RELX Infinity & Essential\n\nSensasi anggur segar yang refreshing!','{\"brand\":\"RELX\",\"flavor\":\"Fresh Grape\",\"vg_pg\":\"50/50\",\"size\":\"30ml\",\"nicotine\":\"30mg Salt Nic\",\"compatibility\":\"RELX Infinity/Essential\"}',145000.00,130000.00,150,1,NULL,60.00,'RELX','new','active',1,4.80,289,1250,0,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(15,21,'Saltnic Labs Vanilla Custard 30ml','saltnic-labs-vanilla-custard-30ml','SLAB-VANILLACUST-30-001','Saltnic Labs Vanilla Custard - Creamy Delight:\n\n• Rasa: Rich vanilla custard\n• VG/PG: 50/50\n• Nikotin: 25mg dan 35mg\n• Ukuran: 30ml\n• Made in USA\n\nCreamy custard yang lembut tanpa throat hit kasar!','{\"brand\":\"Saltnic Labs\",\"flavor\":\"Vanilla Custard\",\"vg_pg\":\"50/50\",\"size\":\"30ml\",\"nicotine\":\"25mg / 35mg Salt Nic\",\"origin\":\"USA\"}',135000.00,NULL,80,1,NULL,60.00,'Saltnic Labs','new','active',0,4.60,78,340,0,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(16,23,'Naked 100 Salt Polar Breeze 30ml','naked-100-salt-polar-breeze-30ml','NKD100-POLARBR-SALT-001','Naked 100 Salt Polar Breeze - Icy Refreshment:\n\n• Rasa: Honeydew melon dengan ice blast\n• VG/PG: 50/50\n• Nikotin: 35mg dan 50mg\n• Ukuran: 30ml\n• Made in USA\n\nExtremely refreshing dengan intense cooling!','{\"brand\":\"Naked 100\",\"flavor\":\"Honeydew Ice\",\"vg_pg\":\"50/50\",\"size\":\"30ml\",\"nicotine\":\"35mg / 50mg Salt Nic\",\"origin\":\"USA\"}',165000.00,150000.00,65,1,NULL,60.00,'Naked 100','new','active',1,4.70,112,478,0,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(17,24,'Hellvape Dead Rabbit 3 RDA','hellvape-dead-rabbit-3-rda','HELL-DR3-RDA-001','Hellvape Dead Rabbit 3 RDA - Flagship Dripper:\n\n• Dual post build deck\n• Adjustable side airflow\n• 810 & 510 drip tip included\n• 24mm diameter\n• Deep juice well\n• Gold-plated 510 pin\n• BF pin included\n\nBest in class flavor dan cloud production!','{\"brand\":\"Hellvape\",\"type\":\"Dual Coil RDA\",\"diameter\":\"24mm\",\"deck\":\"Dual Post\",\"airflow\":\"Side Adjustable\",\"drip_tip\":\"810 & 510\",\"bf_pin\":\"Included\"}',485000.00,445000.00,35,1,NULL,80.00,'Hellvape','new','active',1,4.90,67,145,0,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(18,25,'QP Design Juggerknot V2 RTA','qp-design-juggerknot-v2-rta','QPD-JUGGV2-RTA-001','QP Design Juggerknot V2 RTA - High End RTA:\n\n• Single coil build deck\n• Top airflow leak-proof\n• 4ml bubble glass\n• 26mm diameter\n• Postless deck design\n• Premium machining\n• Made in Philippines\n\nFlavor beast dengan zero leaking!','{\"brand\":\"QP Design\",\"type\":\"Single Coil RTA\",\"diameter\":\"26mm\",\"capacity\":\"4ml\",\"deck\":\"Postless Single\",\"airflow\":\"Top\",\"origin\":\"Philippines\"}',1250000.00,1150000.00,12,1,NULL,120.00,'QP Design','new','active',0,4.80,28,56,0,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(19,28,'SMOK RPM 3 Mesh Coil 0.23ohm (5pcs)','smok-rpm3-mesh-coil-023ohm-5pcs','SMOK-RPM3-COIL-023-001','SMOK RPM 3 Mesh Coil 0.23ohm:\n\n• Resistance: 0.23ohm\n• Wattage: 25-30W\n• Pack of 5 coils\n• Compatible: RPM 3, Nord 5, RPM 5 series\n• Mesh structure untuk flavor optimal\n• Long lasting\n\nCoil replacement untuk RPM 3 series pod.','{\"brand\":\"SMOK\",\"type\":\"Mesh Coil\",\"resistance\":\"0.23ohm\",\"wattage\":\"25-30W\",\"quantity\":\"5 pcs\",\"compatibility\":\"RPM 3/Nord 5/RPM 5 Series\"}',125000.00,110000.00,200,1,NULL,50.00,'SMOK','new','active',0,4.50,156,890,0,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(20,29,'Coilology Alien Clapton Wire SS316L','coilology-alien-clapton-wire-ss316l','COIL-ALIEN-SS316L-001','Coilology Alien Clapton Wire SS316L:\n\n• Material: SS316L (Stainless Steel)\n• Type: Alien Clapton\n• Core: 3x28ga\n• Wrap: 36ga\n• Length: 10 feet\n• TC compatible\n\nPremium pre-built wire untuk rebuilder!','{\"brand\":\"Coilology\",\"material\":\"SS316L\",\"type\":\"Alien Clapton\",\"core\":\"3x28ga\",\"wrap\":\"36ga\",\"length\":\"10 feet\",\"tc_compatible\":\"Yes\"}',75000.00,68000.00,80,1,NULL,30.00,'Coilology','new','active',0,4.60,45,234,0,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(21,30,'Sony VTC6 18650 3000mAh 30A','sony-vtc6-18650-3000mah-30a','SONY-VTC6-18650-001','Sony/Murata VTC6 18650 Battery:\n\n• Capacity: 3000mAh\n• Max Continuous: 30A\n• Nominal Voltage: 3.6V\n• Flat Top\n• Authentic dengan QR code verification\n\nBaterai favorit untuk high drain vaping!','{\"brand\":\"Sony/Murata\",\"model\":\"VTC6\",\"capacity\":\"3000mAh\",\"continuous_discharge\":\"30A\",\"voltage\":\"3.6V\",\"type\":\"Flat Top\",\"chemistry\":\"Li-ion\"}',145000.00,130000.00,150,1,NULL,50.00,'Sony','new','active',1,4.90,289,1560,0,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(22,30,'Nitecore i4 Intellicharger','nitecore-i4-intellicharger','NITC-I4-CHARGER-001','Nitecore i4 Intellicharger - Universal Charger:\n\n• 4 bay universal charger\n• Compatible: 18650, 21700, 26650, AA, AAA\n• Auto detection chemistry\n• LED indicators\n• Over-charge protection\n• Short circuit protection\n• IMR compatible\n\nCharger terbaik untuk semua jenis baterai!','{\"brand\":\"Nitecore\",\"model\":\"i4\",\"slots\":\"4\",\"input\":\"AC 100-240V\",\"compatible\":\"18650/21700/26650/AA/AAA\",\"features\":\"Auto detect, LED indicator\",\"protection\":\"Overcharge/Short circuit\"}',395000.00,365000.00,45,1,NULL,250.00,'Nitecore','new','active',0,4.80,112,345,0,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(23,31,'Cotton Bacon Prime','cotton-bacon-prime','CTNBCN-PRIME-001','Cotton Bacon Prime - Premium Wicking Cotton:\n\n• 100% USA grown cotton\n• Organic & unbleached\n• Zero break-in time\n• Superior wicking\n• Clean flavor\n• Pack: 10 strips\n\nKapas terbaik untuk wicking atomizer!','{\"brand\":\"Wick n Vape\",\"type\":\"Organic Cotton\",\"quantity\":\"10 strips\",\"origin\":\"USA\",\"features\":\"Zero break-in, Superior wicking\"}',65000.00,58000.00,200,1,NULL,20.00,'Wick n Vape','new','active',1,4.70,345,2150,0,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(24,32,'Coil Master DIY Kit V3','coil-master-diy-kit-v3','COILM-DIYKITV3-001','Coil Master DIY Kit V3 - Complete Building Set:\n\n• Coil jig dengan 6 diameter\n• Ceramic tweezers\n• Diagonal pliers\n• Needle nose pliers\n• Scissors\n• Screwdrivers set\n• Ohm meter\n• Premium carrying case\n\nSemua yang dibutuhkan untuk building!','{\"brand\":\"Coil Master\",\"contents\":\"Coil jig, Tweezers, Pliers, Scissors, Screwdrivers, Ohm meter\",\"case\":\"Premium carrying case\",\"coil_sizes\":\"2.0-4.0mm\"}',485000.00,445000.00,25,1,NULL,500.00,'Coil Master','new','active',0,4.80,67,189,0,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(25,35,'Voopoo ITO Cartridge 2ml (2pcs)','voopoo-ito-cartridge-2ml-2pcs','VOOP-ITO-CART-2ML-001','Voopoo ITO Cartridge Replacement:\n\n• Capacity: 2ml\n• Pack of 2 cartridges\n• Compatible: Argus P1, Drag Q, Doric E\n• Side filling\n• Coil included: ITO-M2 1.0ohm\n\nCartridge pengganti untuk pod Voopoo series!','{\"brand\":\"Voopoo\",\"capacity\":\"2ml\",\"quantity\":\"2 pcs\",\"coil\":\"ITO-M2 1.0ohm included\",\"compatibility\":\"Argus P1/Drag Q/Doric E\",\"filling\":\"Side fill\"}',85000.00,78000.00,120,1,NULL,40.00,'Voopoo','new','active',0,4.50,89,456,0,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(26,37,'IGET Bar Plus 6000 Puffs','iget-bar-plus-6000-puffs','IGET-BARPLUS-6000-001','IGET Bar Plus 6000 Puffs Disposable:\n\n• 6000 Puffs\n• Rechargeable via Type-C\n• 16ml pre-filled e-liquid\n• Nikotin: 5%\n• 600mAh battery\n• Multiple flavors available\n\nLong lasting disposable dengan rasa premium!','{\"brand\":\"IGET\",\"puffs\":\"6000\",\"capacity\":\"16ml\",\"nicotine\":\"5%\",\"battery\":\"600mAh\",\"rechargeable\":\"Yes (Type-C)\",\"type\":\"Disposable\"}',165000.00,149000.00,100,1,NULL,80.00,'IGET','new','active',1,4.60,234,890,0,'2025-12-20 16:13:05','2025-12-20 16:13:07'),(27,36,'Elf Bar 600 Puffs','elf-bar-600-puffs','ELFBAR-600-001','Elf Bar 600 Puffs Disposable:\n\n• 600 Puffs\n• 2ml pre-filled e-liquid\n• Nikotin: 2%\n• 550mAh battery\n• Compact design\n• Draw activated\n\nSimple & tasty disposable!','{\"brand\":\"Elf Bar\",\"puffs\":\"600\",\"capacity\":\"2ml\",\"nicotine\":\"2%\",\"battery\":\"550mAh\",\"rechargeable\":\"No\",\"type\":\"Disposable\"}',75000.00,68000.00,150,1,NULL,40.00,'Elf Bar','new','active',0,4.40,178,720,0,'2025-12-20 16:13:05','2025-12-20 16:13:07');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rate_limits`
--

DROP TABLE IF EXISTS `rate_limits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rate_limits` (
  `key` varchar(255) NOT NULL,
  `points` int NOT NULL DEFAULT '0',
  `expire` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rate_limits`
--

LOCK TABLES `rate_limits` WRITE;
/*!40000 ALTER TABLE `rate_limits` DISABLE KEYS */;
INSERT INTO `rate_limits` VALUES ('rlflx:admin_admin_1_::1',2,1767773976992),('rlflx:admin_admin_anonymous_::1',1,1767773918900),('rlflx:customerApi_customer_api_anonymous_::1',12,1767774183970),('rlflx:public_public_::1',3,1767774183241);
/*!40000 ALTER TABLE `rate_limits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `remember_me_tokens`
--

DROP TABLE IF EXISTS `remember_me_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `remember_me_tokens` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_id` int unsigned NOT NULL,
  `hash` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `expires_at` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `remember_me_tokens_tokenable_id_foreign` (`tokenable_id`),
  CONSTRAINT `remember_me_tokens_tokenable_id_foreign` FOREIGN KEY (`tokenable_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `remember_me_tokens`
--

LOCK TABLES `remember_me_tokens` WRITE;
/*!40000 ALTER TABLE `remember_me_tokens` DISABLE KEYS */;
INSERT INTO `remember_me_tokens` VALUES (2,1,'41991c09cfec24ee931cee6430c7df2239dcb74bdf61d546d88943842cf2ca06','2025-12-22 13:51:30','2025-12-22 13:51:30','2027-12-23 01:51:30');
/*!40000 ALTER TABLE `remember_me_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int unsigned DEFAULT NULL,
  `customer_id` int unsigned DEFAULT NULL,
  `order_id` int unsigned DEFAULT NULL,
  `rating` int NOT NULL COMMENT '1-5 stars',
  `comment` text,
  `images` json DEFAULT NULL COMMENT 'Array of review images',
  `is_verified_purchase` tinyint(1) DEFAULT '1',
  `is_approved` tinyint(1) DEFAULT '0',
  `helpful_count` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `admin_reply` text,
  `admin_replied_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `reviews_product_id_foreign` (`product_id`),
  KEY `reviews_customer_id_foreign` (`customer_id`),
  KEY `reviews_order_id_foreign` (`order_id`),
  CONSTRAINT `reviews_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reviews_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reviews_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,1,1,1,5,'Coil nya tahan lama, flavor production bagus. Mantap!',NULL,1,1,14,'2025-12-20 16:13:06','2025-12-20 16:13:06',NULL,NULL),(2,9,1,1,4,'Device nya smooth, battery awet. Worth the price!',NULL,1,1,7,'2025-12-20 16:13:06','2025-12-20 16:13:06',NULL,NULL),(3,3,2,2,5,'Packaging rapi dan aman. Admin ramah dan helpful.',NULL,1,1,2,'2025-12-20 16:13:06','2025-12-20 16:13:06',NULL,NULL),(4,14,2,2,4,'Barang sesuai deskripsi, fast response. Puas banget sama pelayanannya.',NULL,1,1,6,'2025-12-20 16:13:06','2025-12-20 16:13:06',NULL,NULL),(5,6,3,3,5,'Sudah langganan di sini, selalu puas dengan produknya.',NULL,1,1,3,'2025-12-20 16:13:06','2025-12-20 16:13:06',NULL,NULL),(6,21,3,3,5,'Liquid nya enak banget, rasa nya pas! Pasti repeat order.',NULL,1,1,13,'2025-12-20 16:13:06','2025-12-20 16:13:06',NULL,NULL),(7,23,3,3,5,'Packaging rapi dan aman. Admin ramah dan helpful.',NULL,1,1,2,'2025-12-20 16:13:06','2025-12-20 16:13:06',NULL,NULL),(8,4,6,6,5,'Packaging rapi dan aman. Admin ramah dan helpful.',NULL,1,1,14,'2025-12-20 16:13:06','2025-12-20 16:13:06',NULL,NULL),(9,16,6,6,5,'Kualitas premium dengan harga terjangkau. Top!',NULL,1,1,5,'2025-12-20 16:13:06','2025-12-20 16:13:06',NULL,NULL),(10,26,8,8,5,'Sudah langganan di sini, selalu puas dengan produknya.',NULL,1,1,9,'2025-12-20 16:13:06','2025-12-20 16:13:06',NULL,NULL),(11,19,9,9,5,'Device nya smooth, battery awet. Worth the price!',NULL,1,1,9,'2025-12-20 16:13:06','2025-12-20 16:13:06',NULL,NULL),(12,22,9,9,5,'Packaging rapi dan aman. Admin ramah dan helpful.',NULL,1,1,8,'2025-12-20 16:13:06','2025-12-20 16:13:06',NULL,NULL);
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipping_couriers`
--

DROP TABLE IF EXISTS `shipping_couriers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipping_couriers` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `description` text,
  `services` json DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `sort_order` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `shipping_couriers_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipping_couriers`
--

LOCK TABLES `shipping_couriers` WRITE;
/*!40000 ALTER TABLE `shipping_couriers` DISABLE KEYS */;
INSERT INTO `shipping_couriers` VALUES (1,'jne','JNE Express','/images/couriers/jne.png',NULL,'[{\"code\": \"REG\", \"name\": \"JNE Reguler\", \"enabled\": true}, {\"code\": \"YES\", \"name\": \"JNE YES (Yakin Esok Sampai)\", \"enabled\": true}, {\"code\": \"OKE\", \"name\": \"JNE OKE (Ongkos Kirim Ekonomis)\", \"enabled\": true}]',1,0,'2025-12-22 06:39:06','2025-12-22 06:39:06');
/*!40000 ALTER TABLE `shipping_couriers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shippings`
--

DROP TABLE IF EXISTS `shippings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shippings` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int unsigned DEFAULT NULL,
  `courier_code` varchar(255) NOT NULL COMMENT 'jne, pos, tiki, etc',
  `courier_service` varchar(255) NOT NULL COMMENT 'REG, OKE, YES, etc',
  `courier_name` varchar(255) NOT NULL,
  `service_description` varchar(255) DEFAULT NULL,
  `cost` decimal(12,2) NOT NULL,
  `weight` int NOT NULL COMMENT 'in grams',
  `etd` varchar(255) DEFAULT NULL COMMENT 'Estimated Time Delivery',
  `waybill` varchar(255) DEFAULT NULL COMMENT 'Tracking number/resi',
  `origin_city_id` varchar(255) NOT NULL,
  `destination_city_id` varchar(255) NOT NULL,
  `rajaongkir_response` json DEFAULT NULL COMMENT 'Full response from RajaOngkir',
  `shipped_at` timestamp NULL DEFAULT NULL,
  `delivered_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `shippings_order_id_unique` (`order_id`),
  CONSTRAINT `shippings_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shippings`
--

LOCK TABLES `shippings` WRITE;
/*!40000 ALTER TABLE `shippings` DISABLE KEYS */;
INSERT INTO `shippings` VALUES (1,1,'jne','REG','JNE Regular','JNE Regular Service',18000.00,390,'2-3','JNE17662471865720','151','151',NULL,'2025-12-06 16:13:06','2025-12-09 16:13:06','2025-12-20 16:13:06','2025-12-20 16:13:06'),(2,2,'jne','YES','JNE YES','JNE YES Service',9000.00,230,'1','JNE17662471865971','151','23',NULL,'2025-12-09 16:13:06','2025-12-10 16:13:06','2025-12-20 16:13:06','2025-12-20 16:13:06'),(3,3,'sicepat','REG','SiCepat REG','SiCepat REG Service',12000.00,590,'1-2','SICEPAT17662471866402','151','444',NULL,'2025-12-01 16:13:06','2025-12-03 16:13:06','2025-12-20 16:13:06','2025-12-20 16:13:06'),(4,4,'jne','REG','JNE Regular','JNE Regular Service',24000.00,320,'3-4','JNE17662471866753','151','501',NULL,'2025-12-18 16:13:06',NULL,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(5,5,'jne','REG','JNE Regular','JNE Regular Service',15000.00,260,'2-3',NULL,'151','398',NULL,NULL,NULL,'2025-12-20 16:13:06','2025-12-20 16:13:06'),(6,6,'jnt','REG','J&T Regular','J&T Regular Service',9000.00,215,'1-2','JNT17662471867255','151','114',NULL,'2025-12-13 16:13:06','2025-12-15 16:13:06','2025-12-20 16:13:06','2025-12-20 16:13:06'),(7,8,'jne','REG','JNE Regular','JNE Regular Service',35000.00,240,'4-5','JNE17662471867577','151','263',NULL,'2025-12-11 16:13:06','2025-12-16 16:13:06','2025-12-20 16:13:06','2025-12-20 16:13:06'),(8,9,'sicepat','BEST','SiCepat BEST','SiCepat BEST Service',12000.00,350,'1','SICEPAT17662471867758','151','55',NULL,'2025-11-26 16:13:06','2025-11-27 16:13:06','2025-12-20 16:13:06','2025-12-20 16:13:06');
/*!40000 ALTER TABLE `shippings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_addresses`
--

DROP TABLE IF EXISTS `store_addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store_addresses` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `contact_name` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address_line1` text NOT NULL,
  `address_line2` text,
  `district_id` varchar(20) NOT NULL,
  `district_name` varchar(100) NOT NULL,
  `city_id` varchar(20) NOT NULL,
  `city_name` varchar(100) NOT NULL,
  `province_id` varchar(20) NOT NULL,
  `province_name` varchar(100) NOT NULL,
  `postal_code` varchar(10) NOT NULL,
  `country` varchar(50) DEFAULT 'Indonesia',
  `is_default` tinyint(1) DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_addresses`
--

LOCK TABLES `store_addresses` WRITE;
/*!40000 ALTER TABLE `store_addresses` DISABLE KEYS */;
/*!40000 ALTER TABLE `store_addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_settings`
--

DROP TABLE IF EXISTS `store_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store_settings` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(100) NOT NULL,
  `value` text,
  `type` varchar(50) DEFAULT 'string',
  `group` varchar(50) DEFAULT 'general',
  `description` text,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `store_settings_key_unique` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_settings`
--

LOCK TABLES `store_settings` WRITE;
/*!40000 ALTER TABLE `store_settings` DISABLE KEYS */;
/*!40000 ALTER TABLE `store_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) DEFAULT NULL,
  `email` varchar(254) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('superadmin','admin') DEFAULT 'admin',
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Super Admin','admin@ogitu.com','$scrypt$n=16384,r=8,p=1$BDFGcXU3piToqlamfXnZBA$ThQ/dlnvvcmAvOp0LizUlFYoXrHdscP9+bHmnnswXRmLs/1f1KWfoEcSTqTw7EQYY9njtou2Neyp8G9dS+ymDg','superadmin','2025-12-20 16:13:03','2025-12-20 16:13:07');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voucher_products`
--

DROP TABLE IF EXISTS `voucher_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voucher_products` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `voucher_id` int unsigned DEFAULT NULL,
  `product_id` int unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `voucher_products_voucher_id_product_id_unique` (`voucher_id`,`product_id`),
  KEY `voucher_products_product_id_foreign` (`product_id`),
  CONSTRAINT `voucher_products_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `voucher_products_voucher_id_foreign` FOREIGN KEY (`voucher_id`) REFERENCES `vouchers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voucher_products`
--

LOCK TABLES `voucher_products` WRITE;
/*!40000 ALTER TABLE `voucher_products` DISABLE KEYS */;
/*!40000 ALTER TABLE `voucher_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voucher_usages`
--

DROP TABLE IF EXISTS `voucher_usages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voucher_usages` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `voucher_id` int unsigned DEFAULT NULL,
  `customer_id` int unsigned DEFAULT NULL,
  `order_id` int unsigned DEFAULT NULL,
  `discount_amount` decimal(12,2) NOT NULL,
  `used_at` timestamp NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `voucher_usages_voucher_id_foreign` (`voucher_id`),
  KEY `voucher_usages_customer_id_foreign` (`customer_id`),
  KEY `voucher_usages_order_id_foreign` (`order_id`),
  CONSTRAINT `voucher_usages_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `voucher_usages_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE SET NULL,
  CONSTRAINT `voucher_usages_voucher_id_foreign` FOREIGN KEY (`voucher_id`) REFERENCES `vouchers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voucher_usages`
--

LOCK TABLES `voucher_usages` WRITE;
/*!40000 ALTER TABLE `voucher_usages` DISABLE KEYS */;
/*!40000 ALTER TABLE `voucher_usages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vouchers`
--

DROP TABLE IF EXISTS `vouchers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vouchers` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `type` enum('percentage','fixed','free_shipping') DEFAULT 'percentage',
  `value` decimal(10,2) NOT NULL,
  `min_purchase` decimal(12,2) DEFAULT '0.00',
  `max_discount` decimal(12,2) DEFAULT NULL,
  `usage_limit` int DEFAULT NULL,
  `usage_limit_per_customer` int DEFAULT '1',
  `used_count` int DEFAULT '0',
  `start_date` timestamp NOT NULL,
  `end_date` timestamp NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `is_public` tinyint(1) DEFAULT '1',
  `applies_to_all` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `vouchers_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vouchers`
--

LOCK TABLES `vouchers` WRITE;
/*!40000 ALTER TABLE `vouchers` DISABLE KEYS */;
INSERT INTO `vouchers` VALUES (1,'OGITU03BBPJ','pengguna baru','ini khusus pengguna baru','percentage',10.00,50000.00,100000.00,NULL,1,0,'2025-12-01 04:04:00','2025-12-31 04:04:00',1,0,1,'2025-12-22 04:05:16','2025-12-22 04:05:16');
/*!40000 ALTER TABLE `vouchers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wallet_transactions`
--

DROP TABLE IF EXISTS `wallet_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wallet_transactions` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `wallet_id` int unsigned DEFAULT NULL,
  `customer_id` int unsigned DEFAULT NULL,
  `transaction_type` varchar(50) NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `balance_before` decimal(15,2) NOT NULL,
  `balance_after` decimal(15,2) NOT NULL,
  `reference_type` varchar(50) DEFAULT NULL,
  `reference_id` int unsigned DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` varchar(30) NOT NULL DEFAULT 'completed',
  `metadata` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `wallet_transactions_wallet_id_transaction_type_index` (`wallet_id`,`transaction_type`),
  KEY `wallet_transactions_customer_id_created_at_index` (`customer_id`,`created_at`),
  CONSTRAINT `wallet_transactions_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `wallet_transactions_wallet_id_foreign` FOREIGN KEY (`wallet_id`) REFERENCES `wallets` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wallet_transactions`
--

LOCK TABLES `wallet_transactions` WRITE;
/*!40000 ALTER TABLE `wallet_transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `wallet_transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wallets`
--

DROP TABLE IF EXISTS `wallets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wallets` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `customer_id` int unsigned DEFAULT NULL,
  `balance` decimal(15,2) NOT NULL DEFAULT '0.00',
  `pending_balance` decimal(15,2) NOT NULL DEFAULT '0.00',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `wallets_customer_id_unique` (`customer_id`),
  CONSTRAINT `wallets_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wallets`
--

LOCK TABLES `wallets` WRITE;
/*!40000 ALTER TABLE `wallets` DISABLE KEYS */;
INSERT INTO `wallets` VALUES (1,1,0.00,0.00,1,'2025-12-22 10:14:11','2025-12-22 10:14:11'),(2,9,0.00,0.00,1,'2025-12-22 17:13:12','2025-12-22 17:13:12'),(3,10,0.00,0.00,1,'2025-12-23 07:24:40','2025-12-23 07:24:40');
/*!40000 ALTER TABLE `wallets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlists`
--

DROP TABLE IF EXISTS `wishlists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlists` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `customer_id` int unsigned DEFAULT NULL,
  `product_id` int unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `wishlists_customer_id_product_id_unique` (`customer_id`,`product_id`),
  KEY `wishlists_product_id_foreign` (`product_id`),
  CONSTRAINT `wishlists_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `wishlists_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlists`
--

LOCK TABLES `wishlists` WRITE;
/*!40000 ALTER TABLE `wishlists` DISABLE KEYS */;
/*!40000 ALTER TABLE `wishlists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'adonis_ogitu-com'
--
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-07 16:11:18
