<?php
#设置跨域
header('Access-Control-Allow-Origin:*');

#返回文本
header('content-type:text/html;charset=UTF-8');

#验证密钥
require_once 'check-key-word.php';

#获取数据
if(!$_POST) $_POST=$_GET;

$manga = $_POST['manga'];

$DIR = 'D:\9下载器\阳光漫画盒\download\雅漫社\\';

if (!$manga) {
	$manga='';
}

$request = get_file_list($DIR.$manga);

#返回信息
echo json_encode($request);

function get_file_list($path){
	$list = array();
	$dir = dir($path);

	// echo "Handle: " . $dir->handle . "<br>";
	// echo "Path: " . $dir->path . "<br>";

	while (($file = $dir->read()) !== false){
		if($file!=='.'&&$file!=='..')
	  		array_push($list,$file);
	}

	$dir->close();

	return $list;
}

function file_exist_md5($fileName,$fileList){

	foreach ($fileList as $key => $value) {
		if($value['md5']===md5_file($fileName)) return $value['name'];
	}

	return false;
}

function file_exist_name($fileName,$fileList){
	global $SAMEFILENAME;

	$prefix = $SAMEFILENAME===0 ? '' : '('.$SAMEFILENAME.')';
	$finalName = $prefix.$fileName;

	foreach ($fileList as $key => $value) {
		if($value['name']===$finalName){
			$SAMEFILENAME++;
			return file_exist_name($fileName);
		}	
	}

	$SAMEFILENAME=0;
	return $finalName;
}
// iconv("gbk","UTF-8",$file)
// 
// echo file_exist_name('1.txt');
// echo json_encode($prefix = $SAMEFILENAME===0 ? '' : '('.$SAMEFILENAME.')');
//debug();

?>