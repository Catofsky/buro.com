<?php 

include 'connect.php';

$data = $_POST['field'];

$sql = "INSERT INTO  `employ`.`employ` (
`employ_id` ,
`employ_name` ,
`employ_work` ,
`employ_salary` ,
`employ_comp` ,
`employ_date`
)
VALUES (
NULL ,  '{$data['name']}',  '{$data['work']}',  '{$data['salary']}',  '{$data['comp']}',  '{$data['date']}'
);";

$res = mysqli_query($link, $sql) or die(mysqli_error($link));

echo mysqli_insert_id($link);