<?php

	require "conexao.php";

	if(isset($_GET['acao']) && $_GET['acao'] == 'inserir'){
		$nome = $_GET['nome'];
		$erros = intval($_GET['erros']);
		$tempo = $_GET['tempo'];
		$pontos = intval($_GET['pontos']);

		$query = "insert into score(nome,tempo,erros,pontos) values('$nome', '$tempo', $erros, $pontos)";
		$stmt = $conexao->prepare($query);
		$stmt->execute();

		header('Location: index.php');
	}


	if($acao == 'recuperar'){
		$query = "select nome,tempo,erros,pontos from score where nome != '' order by pontos desc limit 10";
		$stmt = $conexao->prepare($query);
		$stmt->execute();
		$jogadores = $stmt->fetchAll(PDO::FETCH_OBJ);
		/*
		echo '<pre>';
		print_r($jogadores);
		echo '</pre>';
		*/
	}

?>