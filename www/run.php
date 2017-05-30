<?php 

if(isset($_POST['login'])) {
	$link = mysqli_connect('localhost', $_POST['login'], $_POST['password'], 'employ');
	$res = mysqli_query($link, "SELECT employ.employ_id, employ.employ_name, work.work_name, employ.employ_salary, comp.comp_name, employ.employ_date FROM employ INNER JOIN work ON employ.employ_work = work.work_id INNER JOIN comp ON employ.employ_comp = comp.comp_id ORDER BY employ.employ_id DESC");
	$data = mysqli_fetch_all($res, MYSQLI_ASSOC);
	echo json_encode($data);
}

 ?>