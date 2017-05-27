<?php 

include 'connect.php';

$id = $_POST['id'];

$sql = "SELECT employ.employ_id, employ.employ_name, work.work_name, employ.employ_salary, comp.comp_name, employ.employ_date FROM employ INNER JOIN work ON employ.employ_work = work.work_id INNER JOIN comp ON employ.employ_comp = comp.comp_id WHERE employ.employ_id = $id";

$res = mysqli_query($link, $sql);

echo json_encode(mysqli_fetch_all($res));