var deleteId;
var deleteTarget;
var editId;
var editTarget;
var table;
var mounthsList = {'01':'янв', '02':'фев', '03':'мар', '04':'апр', '05':'май', '06':'июн', '07':'июл', '08':'авг', '09':'сен', '10':'окт', '11':'ноя', '12':'дек'};
var currentDict;

var workDict = {};
var compDict = {};

$(document).ready(main);

function main() {
	$('.login').fadeIn(500);

	$(document).on('click', '.reg-btn', onReg);
	$(document).on('click', '.reg-cancel-btn', closeReg);
	$(document).on('click', '.reg-ok-btn', confirmReg);
	$(document).on('click', '.login-btn', onLogin);
}

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

function onMain() {
	$('.login').fadeOut(50);
	$('.reg').fadeOut(50);
	$('#bg-popup').fadeOut(50);

	$('#content').fadeIn(500);
	$('.buts').fadeIn(500);

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
	$(document).on('click', '.add-btn', onAdd);
	$(document).on('click', '.add-ok-btn', confirmAdd);
	$(document).on('click', '.fil-btn', onFilter);
	$(document).on('click', '.work-btn', onWork);
	$(document).on('click', '.comp-btn', onComp);
	$(document).on('click', '.cancel-dic-btn', onDicCancel);
	$(document).on('click', '.delete-f', onDictDelete);
	$(document).on('click', '.add-dic-btn', onAddDict);
	$(document).on('click', '.c-dic-btn', onCloseInputDict);
	$(document).on('click', '.add-c-dic-btn', onAddDictConfirm);
	$(document).on('click', '.edit-f', onDictEditOpen);
	$(document).on('click', '.e-c-dic-btn', onDictEdit);

	$(document).on('click', '.sf-name', () => { sorting('employ_name') });
	$(document).on('click', '.sf-work', () => { sorting('work_name') });
	$(document).on('click', '.sf-salary', () => { sorting('employ_salary') });
	$(document).on('click', '.sf-comp', () => { sorting('comp_name') });
	$(document).on('click', '.sf-date', () => { sorting('employ_date') });
}

var order = true;
function sorting(field) {
	if (order)
		table.sort(dynamicSort(field));
	else
		table.sort(dynamicSort('-' + field));
	$('#content').html('');
	showTableFill(table);
	order = !order;
}

function onAddDict() {
	$('.dic-input').fadeIn(500);
	$('.dic-bg-popup').fadeIn(500);
}

function onCloseInputDict() {
	$('.dic-input').fadeOut(500);
	$('.dic-input-e').fadeOut(500);
	$('.dic-bg-popup').fadeOut(500);
}

function onDicCancel() {
	$('#bg-popup').fadeOut(500);
	$('.dic-popup').fadeOut(500);
}

function onWork() {
	$('#bg-popup').fadeIn(500);
	$('.dic-popup').fadeIn(500);

	showDic(workDict, 'Профессия');
	$('.dic-popup').height($('.dic-popup table').height() + 170);
	currentDict = 'work';
}

function onComp() {
	$('#bg-popup').fadeIn(500);
	$('.dic-popup').fadeIn(500);

	showDic(compDict, 'Компания');
	$('.dic-popup').height($('.dic-popup table').height() + 170);
	currentDict = 'comp';
}

function onFilter() {
	var text = $('.fil').val();
	var field = $('.sf').val();
	$('#content').html('');

	showTableFill(filter(field, text));
}

function onLogin() {
	var user = $('.l-user').val();
	var password = $('.l-pass').val();

	$.ajax({
		url: 'login.php',
		data: {user: user, password: password},
		type: 'POST',
		success: (data) => {
			if (data == '1')
				onMain();
		}
	});
}

function confirmReg() {
	var user = $('.r-user').val();
	var password = $('.r-pass').val();

	$.ajax({
		url: 'signup.php',
		data: {user: user, password: password},
		type: 'POST',
		success: (data) => {
			closeReg();
		}
	});
}

function onAdd() {
	$('#bg-popup').fadeIn(500);
	$('.add-popup').fadeIn(500);
}

function onReg() {
	$('#bg-popup').fadeIn(500);
	$('.reg').fadeIn(500);
}

function closeReg() {
	$('.r-user').val('');
	$('.r-pass').val('');

	$('#bg-popup').fadeOut(500);
	$('.reg').fadeOut(500);	
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

	$('.i-name').val(name);
	$('.i-work').val(findKey(workDict, work));
	$('.i-salary').val(salary);
	$('.i-comp').val(findKey(compDict, comp));
	$('.i-date').val(date);

	$('#bg-popup').fadeIn(500);
	$('.edit-popup').fadeIn(500);
}

function findKey(dict, value) {
	for (key in dict) {
		if (dict[key] === value)
			return key;
	}
	return null;
}

function onDelete(event) {
	$('#bg-popup').fadeIn(500);
	$('.popup').fadeIn(500);
	deleteTarget = $(event.target).parent().parent();
	deleteId = deleteTarget.children('.field-id').html();

	deleteRecord(deleteId);
}

function onDictDelete(event) {
	if ($(event.target).hasClass('icon'))
		target = $(event.target).parent().parent();
	else
		target = $(event.target).parent();
	name = target.children('.d-name').html();
	target.fadeOut(500);
	delDict(currentDict, name);
	if (currentDict === 'comp')
		dict = compDict;
	else
		dict = workDict;
	for (key in dict) {
		if (name == dict[key]) {
			delete dict[key];
			break;
		}
	}
}

var edname;
var edtarget;

function onDictEditOpen(event) {
	$('.dic-input-e').fadeIn(500);
	$('.dic-bg-popup').fadeIn(500);

	if ($(event.target).hasClass('icon'))
		edtarget = $(event.target).parent().parent();
	else
		edtarget = $(event.target).parent();
	edname = edtarget.children('.d-name').html();
	$('.dic-i-e').val(edname);
}

function onDictEdit() {
	newname = $('.dic-i-e').val();
	if (currentDict == 'comp')
		editDict(newname, 'comp', edname);
	else
		editDict(newname, 'work', edname);
	onCloseInputDict();
}

function onClose() {
	$('#bg-popup').fadeOut(500);
	$('.popup').fadeOut(500);
	$('.edit-popup').fadeOut(500);
	$('.add-popup').fadeOut(500);
}

function confirmAdd() {
	var name = $('.a-name').val();
	var work = $('.a-work').val();
	var salary = $('.a-salary').val();
	var comp = $('.a-comp').val();
	var date = $('.a-date').val();

	field = {
		name: name,
		work: work,
		salary: salary,
		comp: comp,
		date: date
	};

	addRecord(field);
}

function onAddDictConfirm() {
	var name = $('.dic-i').val();
	addDict(name, currentDict);
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
	var res = '<h1>Бюро занятости</h1><table class="table"><tr><td class="sf-name">Имя Фамилия</td><td class="sf-work">Профессия</td><td class="sf-salary">Зарплата</td><td class="sf-comp">Предприятие</td><td class="sf-date">Регистрация</td></tr>';
	for (key in table) {
		res += '<tr class="dat"><td class="f-name">' + table[key].employ_name + '</td><td class="f-work">' + table[key].work_name + '</td><td align="right" class="f-salary">' + formatSalary(table[key].employ_salary) + '</td><td class="f-comp">' + table[key].comp_name + '</td><td align="right" class="f-date">' + formatDate(table[key].employ_date) + '</td><td class="edit"><img class="icon edit-icon" src="img/edit.png" alt="Изменить"></td><td class="delete"><img class="icon" src="img/delete.png" alt="Удалить"></td><td class="field-id" style="display: none">' + table[key].employ_id + '</td></tr>';
	}
	res += '</table>';
	content.append(res);
	setHeight();
}

function showDic(dict, title) {
	var content = $('.dic-content');
	content.html('');
	var res = '<table><tr><td>#</td><td>' + title + '</td></tr>';
	for (key in dict) {
		res += '<tr class="dat"><td align="center">' + key + '</td><td class="d-name">' + dict[key] + '</td><td class="edit-f"><img class="icon" src="img/edit.png" alt="Изменить"></td><td class="delete-f"><img class="icon" src="img/delete.png" alt="Удалить"></td><td class="dic-id" style="display: none"></tr>';
	}
	res += '</table>';
	content.append(res);
}

function showTableFill(table) {
	var content = $('#content');
	var res = '<div class="fil-btn">Ок</div><input type="text" class="fil"><select class="sf" name="fitler" id=""><option value="employ_name">Имя</option><option value="work_name">Профессия</option><option value="employ_salary">Зарплата</option><option value="comp_name">Компания</option><option value="employ_date">Дата</option></select><p class="filter">Фильтр:</p>';
	res += '<h1>Бюро занятости</h1><table class="table"><tr><td class="sf-name">Имя Фамилия</td><td class="sf-work">Профессия</td><td class="sf-salary">Зарплата</td><td class="sf-comp">Предприятие</td><td class="sf-date">Регистрация</td></tr>';
	for (key in table) {
		res += '<tr class="dat"><td class="f-name">' + table[key].employ_name + '</td><td class="f-work">' + table[key].work_name + '</td><td align="right" class="f-salary">' + formatSalary(table[key].employ_salary) + '</td><td class="f-comp">' + table[key].comp_name + '</td><td align="right" class="f-date">' + formatDate(table[key].employ_date) + '</td><td class="edit"><img class="icon edit-icon" src="img/edit.png" alt="Изменить"></td><td class="delete"><img class="icon" src="img/delete.png" alt="Удалить"></td><td class="field-id" style="display: none">' + table[key].employ_id + '</td></tr>';
	}
	res += '</table>';
	content.append(res);
	setHeight();
}

function appendTable(row) {
	var content = $('#content table');
	var	res = '<tr class="dat"><td class="f-name">' + row.employ_name + '</td><td class="f-work">' + row.work_name + '</td><td align="right" class="f-salary">' + formatSalary(row.employ_salary) + '</td><td class="f-comp">' + row.comp_name + '</td><td align="right" class="f-date">' + formatDate(row.employ_date) + '</td><td class="edit"><img class="icon edit-icon" src="img/edit.png" alt="Изменить"></td><td class="delete"><img class="icon" src="img/delete.png" alt="Удалить"></td><td class="field-id" style="display: none">' + row.employ_id + '</td></tr>';
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

function addRecord(field) {
	$.ajax({
		url: 'add.php',
		data: {field: field},
		type: 'POST',
		success: (data) => {
			var row = {
				employ_name: field.name,
				work_name: workDict[field.work],
				employ_salary: field.salary,
				comp_name: compDict[field.comp],
				employ_date: field.date,
				employ_id: data
			};
			table.push(row);

			onClose();
			appendTable(row);
		}
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

function addDict(name, dict) {
	$.ajax({
		url: 'adddict.php',
		data: {name: name, dict: dict},
		type: 'POST',
		success: (data) => {		

			if (currentDict === 'comp')
				compDict[data] = name;
			else
				workDict[data] = name;

			$('.dic-content').html('');
			if (currentDict === 'comp')
				showDic(compDict, 'Компания');
			else
				showDic(workDict, 'Профессия');

			$('.dic-popup').height($('.dic-popup table').height() + 190);
			onCloseInputDict();
		}
	});
}

function editDict(name, dict, old) {
	$.ajax({
		url: 'editdict.php',
		data: {name: name, dict: dict, old: old},
		type: 'POST',
		success: (data) => {
			if (currentDict === 'comp')
				key = findKey(compDict, old);
			else
				key = findKey(workDict, old);

			if (currentDict === 'comp')
				compDict[key] = name;
			else
				workDict[key] = name;

			$('.dic-content').html('');
			if (currentDict === 'comp')
				showDic(compDict, 'Компания');
			else
				showDic(workDict, 'Профессия');

			$('.dic-popup').height($('.dic-popup table').height() + 190);
			onCloseInputDict();
		}
	});
}

function delDict(dict, name) {
	$.ajax({
		url: 'deldict.php',
		data: {dict: dict, name: name},
		type: 'POST',
		success: (data) => {
			console.log(data);

			$('.dic-popup').height($('.dic-popup table').height() + 170);
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

			buildSelection();			
		}
	});
}

function buildSelection() {
	$('.a-work').html('');
	$('.i-work').html('');
	$('.a-comp').html('');
	$('.i-comp').html('');
	for (key in workDict) {
		$('.a-work').append('<option value="' + key + '">' + workDict[key] + '</option>');
		$('.i-work').append('<option value="' + key + '">' + workDict[key] + '</option>');
	}	
	for (key in compDict) {
		$('.a-comp').append('<option value="' + key + '">' + compDict[key] + '</option>');
		$('.i-comp').append('<option value="' + key + '">' + compDict[key] + '</option>');
	}	
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

function filter(field, text) {
	res = [];
	for (key in table) {
		if (table[key][field].indexOf(text) !== -1) {
			res.push(table[key]);
		}
	}
	return res;
}