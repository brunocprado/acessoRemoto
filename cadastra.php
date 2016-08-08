<?php

    $contas = json_decode(file_get_contents("servidor.json"),true);

    $login = $_POST['login'];
    $senha = $_POST['senha'];
    
    $id = count($contas);

    $contas[$id]['login'] = $login;
    $contas[$id]['senha'] = $senha;
    
    $novo = json_encode($contas);

    //unlink("servidor.json");
    $fp = fopen("servidor.json", 'w');
    fwrite($fp, $novo);
    fclose($fp);

    echo "0";

?>