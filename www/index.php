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

	<div id="content">
		
	</div>

	<div id="bg-popup"></div>
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
		<input type="text" class="i-work">
		<p>Зарплата:</p>
		<input type="text" class="i-salary">
		<p>Предприятие:</p>
		<input type="text" class="i-comp">
		<p>Регистрация:</p>
		<input type="text" class="i-date">
		<p></p>
		<div class="buttons">
			<div class="ok-btn">ОК</div>
			<div class="no-btn">Отмена</div>
		</div>
	</div>

	<script type="text/javascript">main();</script>
</body>
</html>