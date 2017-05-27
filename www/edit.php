<?php 

include 'connect.php';

$field = $_POST['field'];

$sql = "UPDATE employ.employ SET employ_name = '{$field['name']}', employ_work = '{$field['work']}', employ_salary = '{$field['salary']}', employ_comp = '{$field['comp']}' WHERE employ.employ_id = {$field['id']}";

$res = mysqli_query($link, $sql) or die(mysqli_error($link));

echo $res;