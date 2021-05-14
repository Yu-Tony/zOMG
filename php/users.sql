CREATE DATABASE  IF NOT EXISTS `zomg_database`;
USE `zomg_database`;

CREATE TABLE `users` (
  `id` int(100) NOT NULL,
  `user` varchar(100) NOT NULL,
  `score` int(100) NOT NULL,
  `pass` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

  ALTER TABLE `users`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT;