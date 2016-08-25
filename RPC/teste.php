<?php
include('phprpc_server.php');  
function inc(&$n,&$s) {  
    $n+=$s;  
}  
$phprpc_server = new PHPRPC_Server();  
$phprpc_server->add('inc');  
$phprpc_server->start();  
?>