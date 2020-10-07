<?php
#设置跨域
header('Access-Control-Allow-Origin:*');
header('content-type:text/html;charset=UTF-8');
#输出所有错误信息
error_reporting(E_ALL);
ini_set('display_errors', '1');

#将出错信息输出到一个文本文件
ini_set('error_log', dirname(__FILE__) . '/error_log.txt');

#设置图片存储路径
$fileDir = $_SERVER['DOCUMENT_ROOT'].'/file/';
#设置图片网络路径
$onlineFileDir = '/file/';
#设置日期路径
$dateDir = date('Y').'/'.date('m').'/'.date('d').'/';

$SAMEFILENAME=0;
#设置文件最大值限制
$mixFileSize=10*1024*1024;
#获取文件的md5列表
$fileList = array();
#创建返回值
$request = array('errno'=>0,'file'=>array());

foreach ($_FILES as $key => $value) {
	global $fileList;
	#输入时 转码GBK 避免文件系统中文乱码
	// $fileName = iconv("UTF-8","gbk",$value['name']);
	$fileName = $value['name'];
	#判断文件类型
	$fileType = explode('/', $value['type'])[0];
	#生成完整本地路径
	$dir = $fileDir.$fileType.'/'.$dateDir;
	#生成完整网络路径
	$onlineDir = $onlineFileDir.$fileType.'/'.$dateDir;
	#文件夹不存在则创建
	if(!is_dir($dir)) mkdir($dir,0755,true);
	#获取当前文件夹中文件的md5列表
	if(!isset($fileList[$fileType])) $fileList[$fileType] = get_file_list($dir);
	#判断是否有重复文件
	$sameFile = file_exist_md5($value['tmp_name'],$fileList[$fileType]);

	if($sameFile===false){
		#查看是否有重名文件
		$fileName = file_exist_name($fileName,$fileList[$fileType]);
		#存储文件
		move_uploaded_file($value['tmp_name'],$dir.$fileName);
		#更新md5列表
		array_push($fileList[$fileType],array('name'=>$fileName,'md5'=>md5_file($dir.$fileName)));
	}else{
		$fileName = $sameFile;
	}

	#输出时 转码UTF-8 避免中文乱码
	#$fileName = iconv("gbk","UTF-8",$fileName);

	array_push($request['file'],array('type'=>$fileType,'name'=>$fileName,'link'=>$onlineDir.$fileName));
}

#返回信息
echo json_encode($request);

function get_file_list($path){
	$list = array();
	$dir = dir($path);

	// echo "Handle: " . $dir->handle . "<br>";
	// echo "Path: " . $dir->path . "<br>";

	while (($file = $dir->read()) !== false){
		if($file!=='.'&&$file!=='..')
	  		array_push($list,array('name'=>$file,'md5'=>md5_file($path.$file)));
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