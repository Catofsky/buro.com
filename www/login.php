<?php 

$db_host = 'localhost';
$db_login = 'root';
$db_pass = '';
$db_name = 'signup';

$link = mysqli_connect($db_host, $db_login, $db_pass, $db_name) or die ('Ошибка подключения к базе');
	
$res = mysqli_query($link, "SELECT * FROM  `signup` WHERE username='{$_POST['user']}'") or die(mysqli_error($link));

if (mysqli_num_rows($res) != 0) {
	$data = mysqli_fetch_assoc($res);
	if ($_POST['password'] === $data['password'])
		echo '1';
	else echo '0';
}
else {
	echo '0';
}

 ?>