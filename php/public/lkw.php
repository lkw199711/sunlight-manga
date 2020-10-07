<?
header("content-type:text/html;charset=UTF-8");
/**
 * [print_error description]
 * @param  [string] $name [description]
 * @return [type]       [description]
 */
function print_error($name){
	#输出所有错误信息
	error_reporting(E_ALL);
	ini_set('display_errors', '1');

	#将出错信息输出到一个文本文件
	ini_set('error_log','I:/0web/sunlight/php/log/'.$name.'_error.txt');

	return true;
}

/**
 * [get_SqlValue description]
 * @param  [string] $sqlComm [description]
 * @return [num]          [description]
 * 获取一个sql值
 */
function get_sql_value($sqlComm){
	#执行sql
	$sql = mysql_query($sqlComm);
	$num = mysql_num_rows($sql);

	#如果找不到数据则返回错误信息
	if($num===0) return false;
	#返回数据
	while ($row = mysql_fetch_array($sql,MYSQL_ASSOC)){
		 return $row;
	}
}

/**
 * 发送post请求
 * @param string $url 请求地址
 * @param array $post_data post键值对数据
 * @return string
 */
function send_post($post_data, $url) {
 
    $postdata = http_build_query($post_data);
    $options = array(
        'http' => array(
            'method' => 'POST',
            'header' => 'Content-type:application/x-www-form-urlencoded',
            'content' => $postdata,
            'timeout' => 1 * 60 // 超时时间（单位:s）
        )
    );
    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
 
    return $result;
}

/**
 * [writeTxt description]
 * @param  [string] $file [description]
 * @param  [string] $str  [description]
 * @return [type]       [description]
 */
function write_txt($file,$str){
	#打开文件
	$myfile = fopen($file, "w") or die("Unable to open file!");
	#写入文本
	fwrite($myfile, $str.'\r\n');
	#关闭文件
	fclose($myfile);

	return true;
}

/**
 * [get_time description]
 * @return [string] [当前时间]
 */
function get_time(){
	return date('Y年m月d日-H时i分s秒');
}

?>