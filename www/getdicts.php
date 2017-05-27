<?php 

include 'connect.php';

$sql = "SELECT * FROM work";
$work = mysqli_fetch_all(mysqli_query($link, $sql)) or die(mysqli_error($link));

$sql = "SELECT * FROM comp";
$comp = mysqli_fetch_all(mysqli_query($link, $sql)) or die(mysqli_error($link));

$res = array('work' => $work, 'comp' => $comp);
echo json_encode($res);

 ?>