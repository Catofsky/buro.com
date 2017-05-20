-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1
-- Время создания: Май 14 2017 г., 16:26
-- Версия сервера: 5.5.25
-- Версия PHP: 5.3.13

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `employ`
--

-- --------------------------------------------------------

--
-- Структура таблицы `comp`
--

CREATE TABLE IF NOT EXISTS `comp` (
  `comp_id` int(11) NOT NULL AUTO_INCREMENT,
  `comp_name` text NOT NULL,
  PRIMARY KEY (`comp_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Дамп данных таблицы `comp`
--

INSERT INTO `comp` (`comp_id`, `comp_name`) VALUES
(1, 'ИП "К.Обзал"'),
(2, 'CRECAT.CORP'),
(3, 'ПАО "Довбанюк"'),
(4, 'AICC.INC');

-- --------------------------------------------------------

--
-- Структура таблицы `employ`
--

CREATE TABLE IF NOT EXISTS `employ` (
  `employ_id` int(11) NOT NULL AUTO_INCREMENT,
  `employ_name` text NOT NULL,
  `employ_work` int(11) NOT NULL,
  `employ_salary` int(11) NOT NULL,
  `employ_comp` int(11) NOT NULL,
  `employ_date` date NOT NULL,
  PRIMARY KEY (`employ_id`),
  KEY `employ_work` (`employ_work`),
  KEY `employ_work_2` (`employ_work`),
  KEY `employ_comp` (`employ_comp`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=65 ;

--
-- Дамп данных таблицы `employ`
--

INSERT INTO `employ` (`employ_id`, `employ_name`, `employ_work`, `employ_salary`, `employ_comp`, `employ_date`) VALUES
(45, 'хуй', 2, 4555, 2, '2017-05-10'),
(46, 'ргш', 4, 5000, 2, '2017-05-18'),
(61, 'хуй', 2, 4555, 2, '2017-05-10'),
(63, 'хуй', 2, 4555, 2, '2017-05-10'),
(64, 'ргш', 4, 5000, 2, '2017-05-18');

-- --------------------------------------------------------

--
-- Структура таблицы `work`
--

CREATE TABLE IF NOT EXISTS `work` (
  `work_id` int(11) NOT NULL AUTO_INCREMENT,
  `work_name` text NOT NULL,
  PRIMARY KEY (`work_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Дамп данных таблицы `work`
--

INSERT INTO `work` (`work_id`, `work_name`) VALUES
(1, 'Кассир'),
(2, 'Тестировщик ПО'),
(3, 'Бухгалтер'),
(4, 'Программист');

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `employ`
--
ALTER TABLE `employ`
  ADD CONSTRAINT `employ_ibfk_1` FOREIGN KEY (`employ_work`) REFERENCES `work` (`work_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employ_ibfk_2` FOREIGN KEY (`employ_comp`) REFERENCES `comp` (`comp_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
