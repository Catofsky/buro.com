<?php 

function delete_record($id) {
	$link = mysqli_connect('localhost', 'root', '', 'employ');
	if (mysqli_connect_errno()) {
		echo "Ирор: " . mysqli_connect_error();
		exit();
	}
	$sql = 'DELETE FROM employ WHERE employ_id=' . $id;
	return mysqli_query($link, $sql);;
}

 ?>