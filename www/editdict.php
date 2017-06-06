<?php 

include 'connect.php';

$name = $_POST['name'];
$dict = $_POST['dict'];
$old = $_POST['old'];

$sql = "UPDATE {$dict} SET {$dict}_name = '{$name}' WHERE {$dict}_name='{$old}'";

$res = mysqli_query($link, $sql) or die(mysqli_error($link));

echo $res;