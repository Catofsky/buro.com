<?php 

include 'connect.php';

$sql = "DELETE FROM employ WHERE employ_id=" . $_POST['id'];

echo mysqli_query($link, $sql);

 ?>