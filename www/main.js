var deleteId;
var deleteTarget;
var editId;
var editTarget;
var table;
var mounthsList = {'01':'янв', '02':'фев', '03':'мар', '04':'апр', '05':'май', '06':'июн', '07':'июл', '08':'авг', '09':'сен', '10':'окт', '11':'ноя', '12':'дек'};

var workDict = {};
var compDict = {};

function main() {
	connectDataBase('root', '', (data) => {
			table = JSON.parse(data);
			showTable();
		})

	setDicts();

	$(document).on('click', '.delete', onDelete);
	$(document).on('click', '.no-btn', onClose);
	$(document).on('click', '.yes-btn', confirmDelete);
	$(document).on('click', '.edit', onEdit);
	$(document).on('click', '.ok-btn', confirmEdit);
}

function onEdit(event) {
	// очень сложный баг-фикс
	if ($(event.target).hasClass('edit-icon'))
		editTarget = $(event.target).parent().parent();
	else
		editTarget = $(event.target).parent();
	
	editId = editTarget.children('.field-id').html();

	var name = editTarget.children('.f-name').html();
	var work = editTarget.children('.f-work').html();
	var salary = editTarget.children('.f-salary').html();
	var comp = editTarget.children('.f-comp').html();
	var date = editTarget.children('.f-date').html();

	console.log(editTarget.html());

	$('.i-name').val(name);
	$('.i-work').val(work);
	$('.i-salary').val(salary);
	$('.i-comp').val(comp);
	$('.i-date').val(date);

	$('#bg-popup').fadeIn(500);
	$('.edit-popup').fadeIn(500);
}

function onDelete(event) {
	$('#bg-popup').fadeIn(500);
	$('.popup').fadeIn(500);
	deleteTarget = $(event.target).parent().parent();
	deleteId = deleteTarget.children('.field-id').html();

	deleteRecord(deleteId);
}

function onClose() {
	$('#bg-popup').fadeOut(500);
	$('.popup').fadeOut(500);
	$('.edit-popup').fadeOut(500);
}

function confirmDelete() {
	deleteTarget.fadeOut(600, setHeight);
	onClose();
}

function confirmEdit() {
	var name = $('.i-name').val();
	var work = $('.i-work').val();
	var salary = $('.i-salary').val();
	var comp = $('.i-comp').val();
	var date = $('.i-date').val();

	field = {
		name: name,
		work: work,
		salary: salary,
		comp: comp,
		date: date,
		id: editId
	};

	editRecord(field);
}

function setHeight() {
	$('#content').height(100 + $('.table').height());
}

function showTable() {
	var content = $('#content');
	var res = '<h1>Бюро занятости</h1><table class="table"><tr><td>Имя Фамилия</td><td>Профессия</td><td>Зарплата</td><td>Предприятие</td><td>Регистрация</td></tr>';
	for (key in table) {
		res += '<tr class="dat"><td class="f-name">' + table[key].employ_name + '</td><td class="f-work">' + table[key].work_name + '</td><td align="right" class="f-salary">' + formatSalary(table[key].employ_salary) + '</td><td class="f-comp">' + table[key].comp_name + '</td><td align="right" class="f-date">' + formatDate(table[key].employ_date) + '</td><td class="edit"><img class="icon edit-icon" src="img/edit.png" alt="Изменить"></td><td class="delete"><img class="icon" src="img/delete.png" alt="Удалить"></td><td class="field-id" style="display: none">' + table[key].employ_id + '</td></tr>';
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

function editRecord(field) {
	$.ajax({
		url: 'edit.php',
		data: {field: field},
		type: 'POST',
		success: () => {
			onClose();
			updateField(field);
		}
	});
}

function deleteRecord(id) {
	$.ajax({
		url: 'delete.php',
		data: {id: id},
		type: 'POST',
		success: () => {

		}
	});
}

function setDicts() {
	$.ajax({
		url: 'getdicts.php',
		success: (data) => {
			var res = JSON.parse(data);
			for (var i = 0; i < res.work.length; i++) {
				workDict[res.work[i][0]] = res.work[i][1];
			}
			for (var i = 0; i < res.comp.length; i++) {
				compDict[res.comp[i][0]] = res.comp[i][1];
			}
		}
	});
}

function updateField(field) {
	editTarget.children('.f-name').html(field.name);
	editTarget.children('.f-work').html(workDict[field.work]);
	editTarget.children('.f-salary').html(formatSalary(field.salary));
	editTarget.children('.f-comp').html(compDict[field.comp]);
	editTarget.children('.f-date').html(formatDate(field.date));
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