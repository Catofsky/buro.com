<?php 

$db_host = 'localhost';
$db_login = 'root';
$db_pass = '';
$db_name = 'employ';

$link = mysqli_connect($db_host, $db_login, $db_pass, $db_name) or die ('Ошибка подключения к базе');