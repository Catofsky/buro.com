var deleteId;
var deleteTarget;
var table;
var mounthsList = {'01':'янв', '02':'фев', '03':'мар', '04':'апр', '05':'май', '06':'июн', '07':'июл', '08':'авг', '09':'сен', '10':'окт', '11':'ноя', '12':'дек'};

function main() {
	$.when(connectDataBase('root', '', (data) => {
			table = JSON.parse(data);
		})).then(() => {
		$.when(showTable()).then(() => {
			$('.delete').click(onDelete);
			$('.no-btn').click(onClose);
			$('.yes-btn').click(confirmDelete);
		});
	});
	// да, я сам в шоке от ассинхронности js
	// приходится юзать when .. then, для синхронности
}

function onDelete(event) {
	$('#bg-popup').fadeIn(500);
	$('.popup').fadeIn(500);
	deleteTarget = $(event.target).parent().parent();
	deleteId = deleteTarget.children('.field-id').html();
}

function onClose() {
	$('#bg-popup').fadeOut(500);
	$('.popup').fadeOut(500);
}

function confirmDelete() {
	// call_php('delete', deleteId);
	deleteTarget.fadeOut(600, setHeight);
	onClose();
}

function setHeight() {
	$('#content').height(100 + $('.table').height());
}

function showTable() {
	var content = $('#content');
	var res = '<h1>Бюро занятости</h1><table class="table"><tr><td>Имя Фамилия</td><td>Профессия</td><td>Зарплата</td><td>Предприятие</td><td>Регистрация</td></tr>';
	for (key in table) {
		res += '<tr class="dat"><td>' + table[key].employ_name + '</td><td>' + table[key].work_name + '</td><td align="right">' + formatSalary(table[key].employ_salary) + '</td><td>' + table[key].comp_name + '</td><td align="right">' + formatDate(table[key].employ_date) + '</td><td><img class="icon" src="img/edit.png" alt="Изменить"></td><td class="delete"><img class="icon" src="img/delete.png" alt="Удалить"></td><td class="field-id" style="display: none">' + table[key].employ_id + '</td></tr>';
	}
	res += '</table>';
	content.append(res);
	setHeight();
}

function connectDataBase(login, password, func) {
	$.ajax({
		url: 'run.php',
		data: {login: login, password: password},
		type: 'POST',
		success: func
	});
}

function formatSalary(source) {
	charArray = [];
	var j = 0;
	for (var i = source.length - 1; i >= 0; i--) {
		if (j % 3 == 0)
			charArray.unshift(' ');
		charArray.unshift(source[i]);
		j++;
	}
	return charArray.join('') + ' тг';
}

function formatDate(source) {
	dat = source.split('-');
	return dat[2] + ' ' + mounthsList[dat[1]] + ' ' + dat[0] + ' г';
}