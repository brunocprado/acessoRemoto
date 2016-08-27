<?php

    //set_time_limit(5);

//    session_start();
//
//    if(!$_SESSION['logado']){
//        echo "Não está logado";
//        exit();
//    }
//    
    header("Access-Control-Allow-Origin: *");
//    $output = passthru("top");
//    //$output = shell_exec($_POST['cmd']);
//    echo "$output";




while (@ ob_end_flush()); // end all output buffers if any

$proc = popen("ping 127.0.0.1", 'r');
echo '<pre>';
    
while (!feof($proc)) { 
    ob_end_flush();
    echo fread($proc, 4096);
    //@ flush();
    
    ob_flush();
    flush();
    
    ob_start();
   // echo "/*/FIM/*/;";
}
echo '</pre>';
?>
