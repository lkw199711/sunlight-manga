<?php
#设置跨域
header('Access-Control-Allow-Origin:*');
header('content-type:text/html;charset=UTF-8');

#获取数据
if(!$_POST) $_POST=$_GET;

$page = $_POST['pgae'];

echo $page;

$dir = 'D:\9下载器\阳光漫画盒\download\雅漫社\秘密教学\\';

if (!$page) {
	$page='1 第2话你要hellip学学看吗';
	// echo false;
	// exit();
}

$request = get_file_list($dir.$page);

#返回信息
echo json_encode($request);

function get_file_list($path){
	$list = array();
	$dir = dir($path);

	// echo "Handle: " . $dir->handle . "<br>";
	// echo "Path: " . $dir->path . "<br>";

	while (($file = $dir->read()) !== false){
		if($file!=='.'&&$file!=='..')
	  		array_push($list,$dir.$page.'\\'.$file);
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

?>