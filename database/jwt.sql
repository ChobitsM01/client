-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 09, 2023 at 05:20 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jwt`
--

-- --------------------------------------------------------

--
-- Table structure for table `group`
--

CREATE TABLE `group` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `group`
--

INSERT INTO `group` (`id`, `name`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'Dev', 'developer', '2023-03-03 09:40:16', '2023-03-03 09:40:16'),
(2, 'Leader', 'Leader', '2023-03-09 14:16:34', '2023-03-09 14:16:34'),
(3, 'Project Manager', 'Customer', '2023-03-09 14:16:34', '2023-03-09 14:16:34'),
(4, 'User', 'Normal user', '2023-03-10 16:13:32', '2023-03-10 16:13:32');

-- --------------------------------------------------------

--
-- Table structure for table `group_role`
--

CREATE TABLE `group_role` (
  `id` int(11) NOT NULL,
  `groupId` int(11) DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `group_role`
--

INSERT INTO `group_role` (`id`, `groupId`, `roleId`, `createdAt`, `updatedAt`) VALUES
(16, 4, 1, '2023-03-28 15:47:58', '2023-03-28 15:47:58'),
(17, 2, 20, '2023-03-29 08:22:57', '2023-03-29 08:22:57'),
(18, 2, 19, '2023-03-29 08:22:57', '2023-03-29 08:22:57'),
(19, 2, 13, '2023-03-29 08:22:57', '2023-03-29 08:22:57'),
(20, 2, 11, '2023-03-29 08:22:57', '2023-03-29 08:22:57'),
(21, 2, 5, '2023-03-29 08:22:57', '2023-03-29 08:22:57'),
(22, 2, 4, '2023-03-29 08:22:57', '2023-03-29 08:22:57'),
(23, 2, 3, '2023-03-29 08:22:57', '2023-03-29 08:22:57'),
(24, 2, 2, '2023-03-29 08:22:57', '2023-03-29 08:22:57'),
(25, 2, 1, '2023-03-29 08:22:57', '2023-03-29 08:22:57');

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `startDate` varchar(255) DEFAULT NULL,
  `customerId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project_user`
--

CREATE TABLE `project_user` (
  `id` int(11) NOT NULL,
  `projectId` int(11) DEFAULT NULL,
  `customerId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `url`, `description`, `createdAt`, `updatedAt`) VALUES
(1, '/users/read', 'show all users', '2023-03-03 09:41:23', '2023-03-03 09:41:23'),
(2, '/users/edit', 'edit user', '2023-03-03 09:41:23', '2023-03-03 09:41:23'),
(3, '/users/delete', 'delete user', '2023-03-03 09:42:42', '2023-03-03 09:42:42'),
(4, '/group/read', NULL, '2023-03-22 04:31:11', '2023-03-22 04:31:11'),
(5, '/role/create', 'create new role', '2023-03-24 10:46:01', '2023-03-24 10:46:01'),
(11, '/role/read', 'show all roles', '2023-03-25 06:10:14', '2023-03-25 06:10:14'),
(13, '/role/delete', '', '2023-03-25 06:12:12', '2023-03-25 06:12:12'),
(19, '/role/by-group', '', '2023-03-26 15:15:09', '2023-03-26 15:15:09'),
(20, '/role/assign-to-group', '', '2023-03-28 04:15:50', '2023-03-28 04:15:50');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('migration-group-role.js'),
('migration-group.js'),
('migration-project-user.js'),
('migration-project.js'),
('migration-role.js'),
('migration-user.js');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `groupId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `userName`, `email`, `password`, `address`, `sex`, `phone`, `groupId`, `createdAt`, `updatedAt`) VALUES
(80, 'vvvvvvvvvv', 'vvvvvvvvvvvvvvv', '$2a$10$d00n0zApjueVreXqWXcS7u5WJOKsb2/4GZg5M9SWAgVbiCujNMRNe', 'vvvvvvv', 'Female', 'vvvvvvvvvvvvvvv', 1, '2023-03-15 14:02:37', '2023-03-15 14:02:37'),
(81, 'bb', 'zzzzzzzzzzzzzzzzz', '$2a$10$d00n0zApjueVreXqWXcS7u9fGOeC5Ivh09xxoJvVfjeDBPdqmfRVO', 'zz', 'Male', 'zzzzzxxxxxxx', 3, '2023-03-15 14:03:00', '2023-03-20 08:31:53'),
(86, 'testregiste', 'testregister@gmail.com', '$2a$10$vqudRtvdNkdUnW11QxzYzuIx0AxxvUVaFtHy0l4j.x41assNW2HdC', NULL, NULL, 'testregiste', 4, '2023-03-20 15:10:00', '2023-03-20 15:10:00'),
(87, 'aa', 'aa@gmail.com', '$2a$10$iVQiHdAwPjBjMWpAvdpFh.TBMy3T4MqMxtJ4vLLwn60QGQDlRmt8S', NULL, NULL, 'aa', 2, '2023-03-21 02:40:32', '2023-03-21 02:40:32'),
(88, 'jwt', 'jwt@gmail.com', '$2a$10$4Y243YnZVvJcs3f3G9ljJ.jHcDxCVcIydT/xlDV6AY/xJmq.w8QdS', NULL, NULL, 'jwt', 4, '2023-04-09 13:36:49', '2023-04-09 13:36:49');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `group`
--
ALTER TABLE `group`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `group_role`
--
ALTER TABLE `group_role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `project_user`
--
ALTER TABLE `project_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `group`
--
ALTER TABLE `group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `group_role`
--
ALTER TABLE `group_role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `project_user`
--
ALTER TABLE `project_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
