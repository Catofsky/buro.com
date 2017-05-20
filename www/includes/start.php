<?php 

$link = mysqli_connect('localhost', 'root', '', 'employ');
if (mysqli_connect_errno()) {
	echo "Ирор: " . mysqli_connect_error();
	exit();
}

function get_data($link) {
	$res = mysqli_query($link, "SELECT employ.employ_id, employ.employ_name, work.work_name, employ.employ_salary, comp.comp_name, employ.employ_date FROM employ INNER JOIN work ON employ.employ_work = work.work_id INNER JOIN comp ON employ.employ_comp = comp.comp_id");
	return mysqli_fetch_all($res, MYSQLI_ASSOC);
}

$data = get_data($link);

 ?>