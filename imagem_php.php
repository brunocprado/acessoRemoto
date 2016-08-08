<?php
header("Access-Control-Allow-Origin: *");
$arq = $_GET['arq'];
$imageInfo = getimagesize($arq);
switch ($imageInfo[2]) {
	case IMAGETYPE_JPEG:
		header("Content-Type: image/jpg");
		break;
	case IMAGETYPE_GIF:
		header("Content-Type: image/gif");
		break;
	case IMAGETYPE_PNG:
		header("Content-Type: image/png");
		break;
   default:
		break;
}
readfile($arq);
?>
