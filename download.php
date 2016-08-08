<?php
$arq = $_POST['arq'];

if (file_exists($arq)) {
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="'.basename($arq).'"');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($arq));
    readfile($arq);
    exit;
}
?>
