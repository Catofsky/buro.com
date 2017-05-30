<?php 

$db_host = 'localhost';
$db_login = 'root';
$db_pass = '';
$db_name = 'signup';

$link = mysqli_connect($db_host, $db_login, $db_pass, $db_name) or die ('Ошибка подключения к базе');

$username = trim($_POST['user']);
$password = trim($_POST['password']);

$sql = "INSERT INTO  `signup`.`signup` (
`user_id` ,
`username` ,
`password`
)
VALUES (
NULL ,  '{$username}',  '{$password}'
);";

$res = mysqli_query($link, $sql);
echo $res;