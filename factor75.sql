-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 22, 2024 at 11:08 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `factor75`
--

-- --------------------------------------------------------

--
-- Table structure for table `coupons`
--

CREATE TABLE `coupons` (
  `id` int(11) NOT NULL,
  `code` varchar(50) NOT NULL,
  `discount_type` enum('percentage','fixed') NOT NULL,
  `discount_value` decimal(10,2) NOT NULL,
  `is_guest_only` tinyint(1) DEFAULT 1,
  `validity_start` datetime DEFAULT NULL,
  `validity_end` datetime DEFAULT NULL,
  `usage_limit` int(11) DEFAULT 1,
  `times_used` int(11) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `coupons`
--

INSERT INTO `coupons` (`id`, `code`, `discount_type`, `discount_value`, `is_guest_only`, `validity_start`, `validity_end`, `usage_limit`, `times_used`, `created_at`) VALUES
(1, 'SE9M24E4OD', 'percentage', 10.00, 1, '2024-11-19 00:00:00', '2024-12-31 23:59:59', 1, 0, '2024-11-19 02:01:22'),
(2, 'HMB41IJ4QD', 'percentage', 10.00, 1, '2024-11-20 00:00:00', '2024-12-31 23:59:59', 1, 0, '2024-11-19 02:05:33'),
(3, 'S4GO854N4V', 'percentage', 10.00, 0, '2024-11-19 00:00:00', '2024-12-31 23:59:59', 1, 0, '2024-11-19 02:09:44'),
(4, 'G7RNVVRXLK', 'percentage', 10.00, 0, '2024-11-19 00:00:00', '2024-12-31 23:59:59', 1, 0, '2024-11-19 19:12:05');

-- --------------------------------------------------------

--
-- Table structure for table `coupon_redemptions`
--

CREATE TABLE `coupon_redemptions` (
  `id` int(11) NOT NULL,
  `coupon_id` int(11) NOT NULL,
  `guest_email` varchar(255) DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL,
  `redeemed_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `address` varchar(45) NOT NULL,
  `address2` varchar(45) NOT NULL,
  `city` varchar(45) NOT NULL,
  `state` varchar(45) NOT NULL,
  `zipcode` varchar(45) NOT NULL,
  `phone_number` varchar(45) NOT NULL,
  `payment_method` enum('card','paypal') DEFAULT 'card',
  `card_verified` enum('yes','no') NOT NULL DEFAULT 'no',
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `user_id`, `first_name`, `last_name`, `address`, `address2`, `city`, `state`, `zipcode`, `phone_number`, `payment_method`, `card_verified`, `created_at`, `updated_at`) VALUES
(2, 2, 'Abdul Samad', 'Abdul Qadir', 'Plot L 532', 'Sector 5C-3', 'Karachi', 'Sindh', '2300', '+92 3323490754', 'card', 'yes', '2023-12-28 10:33:58.471543', '2023-12-28 10:33:58.471543');

-- --------------------------------------------------------

--
-- Table structure for table `dish`
--

CREATE TABLE `dish` (
  `id` int(11) NOT NULL,
  `dish_name` varchar(225) NOT NULL,
  `total_calories` varchar(225) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `instructions` varchar(1000) NOT NULL,
  `allergens` varchar(45) NOT NULL,
  `add_on` tinyint(1) NOT NULL DEFAULT 0,
  `label` varchar(45) NOT NULL,
  `image` varchar(225) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dish`
--

INSERT INTO `dish` (`id`, `dish_name`, `total_calories`, `description`, `instructions`, `allergens`, `add_on`, `label`, `image`, `created_at`, `updated_at`) VALUES
(1, 'd6', '100', '<p>Hamza</p><p><strong><em><u>Ansari</u></em></strong></p>\n', 'Done', '31', 0, 'Label', '/uploads/240_F_436980100_E7H4Bq1X3yRh7OU1Dk51h57HferrcSkh.jpg', '2024-01-12 14:28:33.498373', '2024-01-12 14:28:33.498373'),
(2, 'Sun-Dried Tomato Chicken', '100', '<p>Hamza</p><p><strong><em><u>Ansari</u></em></strong></p>\n', 'Done', '31', 1, 'Label', '/uploads/240_F_436980100_E7H4Bq1X3yRh7OU1Dk51h57HferrcSkh.jpg', '2024-01-12 14:30:27.425269', '2024-01-12 14:30:27.425269');

-- --------------------------------------------------------

--
-- Table structure for table `dish_ingredients`
--

CREATE TABLE `dish_ingredients` (
  `id` int(11) NOT NULL,
  `dish_id` int(11) NOT NULL,
  `ingredient_id` int(11) NOT NULL,
  `ingredient_qty` int(11) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dish_ingredients`
--

INSERT INTO `dish_ingredients` (`id`, `dish_id`, `ingredient_id`, `ingredient_qty`, `created_at`, `updated_at`) VALUES
(1, 15, 4, 33, '2024-01-05 14:19:54.725903', '2024-01-05 14:19:54.725903'),
(4, 17, 4, 0, '2024-01-05 14:24:16.969326', '2024-01-05 14:24:16.969326'),
(5, 17, 5, 32, '2024-01-05 14:24:17.017558', '2024-01-05 14:24:17.017558'),
(6, 19, 4, 33, '2024-01-05 14:27:10.955212', '2024-01-05 14:27:10.955212'),
(7, 19, 5, 32, '2024-01-05 14:27:11.007554', '2024-01-05 14:27:11.007554'),
(8, 1, 4, 33, '2024-01-12 14:28:33.574504', '2024-01-12 14:28:33.574504'),
(9, 1, 5, 32, '2024-01-12 14:28:33.651646', '2024-01-12 14:28:33.651646'),
(10, 2, 4, 33, '2024-01-12 14:30:29.168188', '2024-01-12 14:30:29.168188'),
(11, 2, 5, 32, '2024-01-12 14:30:29.266404', '2024-01-12 14:30:29.266404');

-- --------------------------------------------------------

--
-- Table structure for table `dish_nutrients`
--

CREATE TABLE `dish_nutrients` (
  `id` int(11) NOT NULL,
  `dish_id` int(11) NOT NULL,
  `dish_nutrients` int(11) NOT NULL,
  `nutrient_qty` int(11) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dish_nutrients`
--

INSERT INTO `dish_nutrients` (`id`, `dish_id`, `dish_nutrients`, `nutrient_qty`, `created_at`, `updated_at`) VALUES
(1, 6, 2, 300, '2023-12-27 12:26:07.267618', '2023-12-27 12:26:07.267618'),
(2, 7, 2, 300, '2023-12-27 12:33:30.390346', '2023-12-27 12:33:30.390346'),
(3, 5, 2, 300, '2024-01-03 13:52:00.377632', '2024-01-03 13:52:00.377632'),
(4, 17, 0, 0, '2024-01-05 14:24:17.054833', '2024-01-05 14:24:17.054833'),
(5, 19, 2, 300, '2024-01-05 14:27:11.058349', '2024-01-05 14:27:11.058349'),
(6, 1, 2, 300, '2024-01-12 14:28:33.695351', '2024-01-12 14:28:33.695351'),
(7, 2, 2, 300, '2024-01-12 14:30:29.341766', '2024-01-12 14:30:29.341766');

-- --------------------------------------------------------

--
-- Table structure for table `dish_prefernces`
--

CREATE TABLE `dish_prefernces` (
  `id` int(11) NOT NULL,
  `dish_id` int(11) NOT NULL,
  `preference_id` int(11) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dish_prefernces`
--

INSERT INTO `dish_prefernces` (`id`, `dish_id`, `preference_id`, `created_at`, `updated_at`) VALUES
(1, 7, 1, '2023-12-27 12:33:30.454734', '2023-12-27 12:33:30.454734'),
(2, 7, 2, '2023-12-27 12:33:30.487295', '2023-12-27 12:33:30.487295'),
(3, 5, 1, '2024-01-03 13:52:00.576918', '2024-01-03 13:52:00.576918'),
(4, 5, 2, '2024-01-03 13:52:00.722731', '2024-01-03 13:52:00.722731'),
(5, 17, 0, '2024-01-05 14:24:17.129423', '2024-01-05 14:24:17.129423'),
(6, 19, 1, '2024-01-05 14:27:11.124871', '2024-01-05 14:27:11.124871'),
(7, 1, 1, '2024-01-12 14:28:33.836151', '2024-01-12 14:28:33.836151'),
(8, 2, 1, '2024-01-12 14:30:29.508476', '2024-01-12 14:30:29.508476');

-- --------------------------------------------------------

--
-- Table structure for table `ingredients`
--

CREATE TABLE `ingredients` (
  `id` int(11) NOT NULL,
  `ingredient` varchar(225) NOT NULL,
  `unit_id` int(11) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ingredients`
--

INSERT INTO `ingredients` (`id`, `ingredient`, `unit_id`, `created_at`, `updated_at`) VALUES
(3, 'Chicken2', 2, '2023-12-26 11:08:12.023821', '2023-12-26 11:53:19.585080'),
(4, 'Chicken', 2, '2023-12-26 12:14:19.646323', '2023-12-26 12:14:19.646323');

-- --------------------------------------------------------

--
-- Table structure for table `new_table`
--

CREATE TABLE `new_table` (
  `id` int(11) NOT NULL,
  `week_id` int(11) NOT NULL,
  `dish_id` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `nutrients`
--

CREATE TABLE `nutrients` (
  `id` int(11) NOT NULL,
  `nutrient` varchar(45) NOT NULL,
  `nutrient_unit` varchar(45) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nutrients`
--

INSERT INTO `nutrients` (`id`, `nutrient`, `nutrient_unit`, `created_at`, `updated_at`) VALUES
(2, 'Calories', 'KCals', '2023-12-27 12:23:34.827804', '2023-12-27 12:24:22.205116');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `order_from` varchar(45) NOT NULL,
  `order_to` varchar(45) NOT NULL,
  `plan_id` int(11) NOT NULL,
  `order_dishes` longtext NOT NULL,
  `status` enum('pending','accepted','inprogress','on the way','delivered') NOT NULL DEFAULT 'pending',
  `coupon_code` varchar(50) NOT NULL,
  `discounted_amount` varchar(50) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `customer_id`, `order_from`, `order_to`, `plan_id`, `order_dishes`, `status`, `coupon_code`, `discounted_amount`, `created_at`, `updated_at`) VALUES
(1, 2, '2024-01-01', '2024-01-07', 2, '', '', '', '', '2023-12-28 14:14:11.999449', '2023-12-28 14:14:11.999449'),
(2, 2, '2024-01-01', '2024-01-07', 2, '', '', '', '', '2024-01-03 11:49:56.170594', '2024-01-03 11:49:56.170594'),
(3, 2, '2024-01-01', '2024-01-07', 2, '', '', '', '', '2024-01-03 11:52:19.005776', '2024-01-03 11:52:19.005776'),
(4, 2, '2024-01-01', '2024-01-07', 2, '', '', '', '', '2024-01-03 12:01:42.355243', '2024-01-03 12:01:42.355243'),
(5, 2, '2024-01-01', '2024-01-07', 2, '', '', '', '', '2024-01-03 12:03:12.845064', '2024-01-03 12:03:12.845064'),
(6, 2, '2024-01-01', '2024-01-07', 2, '', '', '', '', '2024-01-03 12:10:41.076922', '2024-01-03 12:10:41.076922'),
(7, 2, '2024-01-01', '2024-01-07', 2, '', '', '', '', '2024-01-05 13:00:02.286947', '2024-01-05 13:00:02.286947'),
(9, 2, '2024-01-01', '2024-01-07', 2, '', '', '', '', '2024-01-10 13:06:30.974792', '2024-01-10 13:06:30.974792'),
(10, 2, '2024-01-01', '2024-01-07', 2, '', '', '', '', '2024-04-22 10:55:28.906393', '2024-04-22 10:55:28.906393'),
(11, 2, '2024-01-01', '2024-01-07', 2, '', '', '', '', '2024-04-22 11:08:39.875369', '2024-04-22 11:08:39.875369'),
(12, 2, '2024-01-01', '2024-01-07', 2, '', '', '', '', '2024-04-22 11:26:04.230142', '2024-04-22 11:26:04.230142'),
(13, 2, '2024-01-01', '2024-01-07', 2, '[{\"dish_id\" :2,\"quantity\" :3},{\"dish_id\":2, \"quantity\" :3}]', '', '', '', '2024-11-18 20:27:40.272793', '2024-11-18 20:27:40.272793'),
(14, 2, '2024-01-01', '2024-01-07', 2, '[{\"dish_id\" :2,\"quantity\" :3},{\"dish_id\":2, \"quantity\" :3}]', '', '342sam', '230', '2024-11-18 20:54:49.999835', '2024-11-18 20:54:49.999835'),
(15, 2, '2024-01-01', '2024-01-07', 2, '[{\"dish_id\" :2,\"quantity\" :3},{\"dish_id\":2, \"quantity\" :3}]', '', '342sam', '230', '2024-11-19 09:20:11.000392', '2024-11-19 09:20:11.000392');

-- --------------------------------------------------------

--
-- Table structure for table `order_addon`
--

CREATE TABLE `order_addon` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `add_on` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_addon`
--

INSERT INTO `order_addon` (`id`, `order_id`, `add_on`) VALUES
(4, 9, 1),
(5, 9, 3),
(6, 9, 6),
(7, 11, 1),
(8, 11, 5),
(9, 11, 6),
(10, 12, 1),
(11, 12, 5),
(12, 12, 6),
(13, 13, 1),
(14, 13, 5),
(15, 13, 6),
(16, 14, 1),
(17, 14, 5),
(18, 14, 6),
(19, 15, 1),
(20, 15, 5),
(21, 15, 6);

-- --------------------------------------------------------

--
-- Table structure for table `order_dishes`
--

CREATE TABLE `order_dishes` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `dish_id` int(11) NOT NULL,
  `dish_qty` int(11) NOT NULL,
  `order_status` enum('Pending','Processing','Out for Delivery','Delivered','Cancelled','Delayed','Confirmed','On Hold','Returned') NOT NULL DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_dishes`
--

INSERT INTO `order_dishes` (`id`, `order_id`, `dish_id`, `dish_qty`, `order_status`) VALUES
(1, 11, 1, 1, 'Pending'),
(2, 11, 5, 2, 'Pending'),
(3, 12, 1, 1, 'Pending'),
(4, 12, 2, 2, 'Pending'),
(5, 13, 2, 3, 'Pending'),
(6, 13, 2, 3, 'Pending'),
(7, 14, 2, 3, 'Pending'),
(8, 14, 2, 3, 'Pending'),
(9, 15, 2, 3, 'Pending'),
(10, 15, 2, 3, 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `plans`
--

CREATE TABLE `plans` (
  `id` int(11) NOT NULL,
  `plan_name` varchar(45) NOT NULL,
  `no_meals` int(11) NOT NULL DEFAULT 0,
  `price` int(11) NOT NULL DEFAULT 0,
  `shipping_fee` int(11) DEFAULT 10,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `plans`
--

INSERT INTO `plans` (`id`, `plan_name`, `no_meals`, `price`, `shipping_fee`, `created_at`, `updated_at`) VALUES
(2, 'Basic', 8, 1020, 10, '2023-12-22 14:25:23.126033', '2023-12-26 06:31:41.595179'),
(3, 'Test', 4, 1000, 8, '2023-12-26 06:34:09.039994', '2023-12-26 06:34:09.039994');

-- --------------------------------------------------------

--
-- Table structure for table `prefernces`
--

CREATE TABLE `prefernces` (
  `id` int(11) NOT NULL,
  `preference` varchar(225) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prefernces`
--

INSERT INTO `prefernces` (`id`, `preference`, `created_at`, `updated_at`) VALUES
(1, 'Vegan', '2023-12-22 14:53:15.688122', '2023-12-22 14:57:55.832119'),
(2, 'Keto', '2023-12-22 14:57:20.918377', '2023-12-22 14:57:20.918377');

-- --------------------------------------------------------

--
-- Table structure for table `purchasing`
--

CREATE TABLE `purchasing` (
  `id` int(11) NOT NULL,
  `ing_id` int(11) NOT NULL,
  `pur_on` timestamp(6) NULL DEFAULT NULL,
  `rate` float NOT NULL,
  `qty` float NOT NULL,
  `total` float NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `purchasing`
--

INSERT INTO `purchasing` (`id`, `ing_id`, `pur_on`, `rate`, `qty`, `total`, `created_at`, `updated_at`) VALUES
(1, 2, '2024-01-05 19:00:00.000000', 230, 10, 2300, '2024-11-18 19:51:53.236520', '2024-11-18 19:51:53.236520'),
(2, 3, '2024-01-05 19:00:00.000000', 230, 10, 2300, '2024-11-18 19:58:40.231239', '2024-11-18 19:58:40.231239');

-- --------------------------------------------------------

--
-- Table structure for table `units`
--

CREATE TABLE `units` (
  `id` int(11) NOT NULL,
  `unit` varchar(225) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `units`
--

INSERT INTO `units` (`id`, `unit`, `created_at`, `updated_at`) VALUES
(2, 'Kg', '2023-12-26 08:52:38.547514', '2023-12-26 08:52:38.547514'),
(3, 'Pounds', '2023-12-26 11:24:39.924567', '2023-12-26 11:24:39.924567');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `user_type` enum('customer','admin') NOT NULL DEFAULT 'customer',
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `user_type`, `created_at`, `updated_at`) VALUES
(2, 'admin', 'admin@admin.com', '12345678', 'admin', '2023-12-28 08:39:03.049577', '2023-12-28 08:39:03.049577');

-- --------------------------------------------------------

--
-- Table structure for table `weekly_menu`
--

CREATE TABLE `weekly_menu` (
  `id` int(11) NOT NULL,
  `label` varchar(45) DEFAULT NULL,
  `datefrom` timestamp(6) NULL DEFAULT NULL,
  `dateto` timestamp(6) NULL DEFAULT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `weekly_menu`
--

INSERT INTO `weekly_menu` (`id`, `label`, `datefrom`, `dateto`, `created_at`, `updated_at`) VALUES
(2, 'Week 1', '2024-01-06 19:00:00.000000', '2024-01-13 19:00:00.000000', '2024-01-14 15:44:11.266345', '2024-01-14 15:44:11.266345');

-- --------------------------------------------------------

--
-- Table structure for table `week_dishes`
--

CREATE TABLE `week_dishes` (
  `id` int(11) NOT NULL,
  `week_id` int(11) NOT NULL,
  `dish_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `week_dishes`
--

INSERT INTO `week_dishes` (`id`, `week_id`, `dish_id`) VALUES
(1, 1, 2),
(2, 1, 5),
(3, 2, 2),
(4, 2, 5);

-- --------------------------------------------------------

--
-- Table structure for table `zipcodes`
--

CREATE TABLE `zipcodes` (
  `id` int(11) NOT NULL,
  `zipcode` varchar(255) NOT NULL,
  `status` enum('active','inactive','','') NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `zipcodes`
--

INSERT INTO `zipcodes` (`id`, `zipcode`, `status`, `created_at`, `updated_at`) VALUES
(2, '3670', 'active', '2024-11-18 20:43:07', '2024-11-18 20:43:07');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Indexes for table `coupon_redemptions`
--
ALTER TABLE `coupon_redemptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `coupon_id` (`coupon_id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_fkey_idx` (`user_id`);

--
-- Indexes for table `dish`
--
ALTER TABLE `dish`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `un_name` (`dish_name`);

--
-- Indexes for table `dish_ingredients`
--
ALTER TABLE `dish_ingredients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dish_nutrients`
--
ALTER TABLE `dish_nutrients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dish_key_idx` (`dish_id`);

--
-- Indexes for table `dish_prefernces`
--
ALTER TABLE `dish_prefernces`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `unit_id_idx` (`unit_id`);

--
-- Indexes for table `new_table`
--
ALTER TABLE `new_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nutrients`
--
ALTER TABLE `nutrients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `plan_key_idx` (`plan_id`),
  ADD KEY `customer_key_idx` (`customer_id`);

--
-- Indexes for table `order_addon`
--
ALTER TABLE `order_addon`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_dishes`
--
ALTER TABLE `order_dishes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `plans`
--
ALTER TABLE `plans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `prefernces`
--
ALTER TABLE `prefernces`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `purchasing`
--
ALTER TABLE `purchasing`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `units`
--
ALTER TABLE `units`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `weekly_menu`
--
ALTER TABLE `weekly_menu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `week_dishes`
--
ALTER TABLE `week_dishes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zipcodes`
--
ALTER TABLE `zipcodes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `coupons`
--
ALTER TABLE `coupons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `coupon_redemptions`
--
ALTER TABLE `coupon_redemptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `dish`
--
ALTER TABLE `dish`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `dish_ingredients`
--
ALTER TABLE `dish_ingredients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `dish_nutrients`
--
ALTER TABLE `dish_nutrients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `dish_prefernces`
--
ALTER TABLE `dish_prefernces`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `new_table`
--
ALTER TABLE `new_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `nutrients`
--
ALTER TABLE `nutrients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `order_addon`
--
ALTER TABLE `order_addon`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `order_dishes`
--
ALTER TABLE `order_dishes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `plans`
--
ALTER TABLE `plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `prefernces`
--
ALTER TABLE `prefernces`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `purchasing`
--
ALTER TABLE `purchasing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `units`
--
ALTER TABLE `units`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `weekly_menu`
--
ALTER TABLE `weekly_menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `week_dishes`
--
ALTER TABLE `week_dishes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `zipcodes`
--
ALTER TABLE `zipcodes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `coupon_redemptions`
--
ALTER TABLE `coupon_redemptions`
  ADD CONSTRAINT `coupon_redemptions_ibfk_1` FOREIGN KEY (`coupon_id`) REFERENCES `coupons` (`id`);

--
-- Constraints for table `customers`
--
ALTER TABLE `customers`
  ADD CONSTRAINT `user_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `ingredients`
--
ALTER TABLE `ingredients`
  ADD CONSTRAINT `unit_id` FOREIGN KEY (`unit_id`) REFERENCES `units` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `customer_key` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `plan_key` FOREIGN KEY (`plan_id`) REFERENCES `plans` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
