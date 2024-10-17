<?php

	$dsn = 'mysql:host=localhost;dbname=sudoku';
	$usuario = 'root';
	$senha = '';

	try{
		$conexao = new PDO($dsn, $usuario, $senha);
	}catch(PDOException $e){
		echo 'Erro: ' . $e->getCode() . '<br> Mensagem: ' . $e->getMessage();
	}

?>