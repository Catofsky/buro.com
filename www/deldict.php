<?php 

include 'connect.php';

$dict = $_POST['dict'];

$sql = "DELETE FROM {$dict} WHERE {$dict}_name='" . $_POST['name'] . "'";

echo $sql;
echo mysqli_query($link, $sql) or die(mysqli_error($link));