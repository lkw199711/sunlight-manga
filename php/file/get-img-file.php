<?
	require_once 'check-key-word.php';

	$DIR = 'D:\9下载器\阳光漫画盒\download\雅漫社\\';
	
	$file = $_POST['file'];

	echo file_get_contents($DIR.$file);
	// echo ($DIR.$file);
?>