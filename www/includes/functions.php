<?php 

function build_table($data) {
	echo '<table class="table"><tr><td>Имя Фамилия</td><td>Профессия</td><td>Зарплата</td><td>Предприятие</td><td>Дата регистрации</td></tr>';
	foreach ($data as $key => $field) {
		echo '<tr class="dat"><td>' . $field['employ_name'] . '</td><td>' . $field['work_name'] . '</td><td align="right">' . format_salary($field['employ_salary']) . '</td><td>' . $field['comp_name'] . '</td><td align="right">' . format_date($field['employ_date']) . '</td><td><img class="icon" src="img/edit.png" alt="Изменить"></td><td><img class="icon delete" src="img/delete.png" alt="Удалить"></td><td class="field-id" style="display: none">' . $field['employ_id'] .'</td></tr>';
	}
	echo '</table>';
}

function format_salary($source) {
	return strrev(join(' ', str_split(strrev($source), 3))) . ' тг';
}

function format_date($source) {
	$dat = explode('-', $source);
	$mounth = '';
	switch ($dat[1]) {
		case '01':
			$mounth = 'янв';
			break;
		case '02':
			$mounth = 'фев';
			break;
		case '03':
			$mounth = 'мар';
			break;
		case '04':
			$mounth = 'апр';
			break;
		case '05':
			$mounth = 'май';
			break;
		case '06':
			$mounth = 'июн';
			break;
		case '07':
			$mounth = 'июл';
			break;
		case '08':
			$mounth = 'авг';
			break;
		case '09':
			$mounth = 'сен';
			break;
		case '10':
			$mounth = 'окт';
			break;
		case '11':
			$mounth = 'ноя';
			break;
		case '12':
			$mounth = 'дек';
			break;
	}
	return (int)$dat[2] . ' ' . $mounth . ' ' . $dat[0] . ' г';
}

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