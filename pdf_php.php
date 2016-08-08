<?php
header("Access-Control-Allow-Origin: *");
$arq = $_GET['arq'];
header('Content-type: application/pdf');
header('Content-Disposition: inline; filename="the.pdf"');
header('Content-Transfer-Encoding: binary');
header('Content-Length: ' . filesize($arq));
@readfile($arq);
?>