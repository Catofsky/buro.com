<?php 

include 'connect.php';

$name = $_POST['name'];
$dict = $_POST['dict'];

$sql = "INSERT INTO  `{$dict}` (
`{$dict}_name`
)
VALUES (
'{$name}'
);";

$res = mysqli_query($link, $sql) or die(mysqli_error($link));

echo mysqli_insert_id($link);