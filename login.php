<?php 
    
    session_start();

    $contas = json_decode(file_get_contents("servidor.json"),true);

    $login = $_POST['login'];
    $senha = $_POST['senha'];
    $i = 0;

    for($i=0;$i<count($contas);$i++){
        if($contas[$i]["login"] == $login && $contas[$i]["senha"] == $senha) {
            echo "1";
            $_SESSION['logado'] = true;
            exit();
        }
    }
    
    echo "0";

?>