<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Бюро занятости</title>
	<link rel="stylesheet" href="css/style.css">
	<script src="jquery-3.2.1.min.js"></script>
	<script src="main.js"></script>
</head>
<body>

	<div class="login">
		<h1>Вход</h1>

		<p>Логин:</p>
		<input type="text" class="l-user">

		<p>Пароль:</p>
		<input type="password" class="l-pass">
		
		<p> </p>
		<div class="buttons">
			<div class="login-btn">Войти</div>
			<div class="reg-btn">Регистрация</div>
		</div>
	</div>

	<div id="content">
		
	</div>

	<div class="add-btn"><p>Добавить</p></div>

	<div id="bg-popup"></div>

	<div class="reg">
		<h1>Регистрация</h1>

		<p>Логин:</p>
		<input type="text" class="r-user">

		<p>Пароль:</p>
		<input type="password" class="r-pass">
		
		<p> </p>
		<div class="buttons">
			<div class="reg-ok-btn">Создать</div>
			<div class="reg-cancel-btn">Отмена</div>
		</div>
	</div>

	<div class="popup">
		<h1>Удаление</h1>
		<p>Вы уверены что хотите удалить запись?</p>
		<div class="buttons">
			<div class="yes-btn">Да</div>
			<div class="no-btn">Нет</div>
		</div>
	</div>

	<div class="edit-popup">
		<h1>Изменение</h1>

		<p>Имя Фамилия:</p>
		<input type="text" class="i-name">

		<p>Профессия:</p>
		<select class="i-work">

		</select>

		<p>Зарплата:</p>
		<input type="text" class="i-salary">

		<p>Предприятие:</p>
		<select class="i-comp">

		</select>

		<p>Регистрация:</p>
		<input type="text" class="i-date">

		<p></p>
		<div class="buttons">
			<div class="ok-btn">ОК</div>
			<div class="no-btn">Отмена</div>
		</div>
	</div>

	<div class="add-popup">
		<h1>Добавление</h1>

		<p>Имя Фамилия:</p>
		<input type="text" class="a-name">

		<p>Профессия:</p>
		<select class="a-work">

		</select>

		<p>Зарплата:</p>
		<input type="text" class="a-salary">

		<p>Предприятие:</p>
		<select class="a-comp">		
		</select>

		<p>Регистрация:</p>
		<input type="text" class="a-date">

		<p></p>
		<div class="buttons">
			<div class="add-ok-btn">Добавить</div>
			<div class="no-btn">Отмена</div>
		</div>
	</div>
</body>
</html>