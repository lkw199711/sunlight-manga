<?
	if(!$_POST){
		$_POST=$_GET;
	}else{
		$_POST=array_merge($_POST,$_GET);
	}

	$clientTimeStamp=$_POST['timestamp'];
	$clientKeyWord=$_POST['keyword'];

	check_time_stamp($clientTimeStamp);

	check_key_word($clientTimeStamp,$clientKeyWord);

	$DIR = 'D:\9下载器\阳光漫画盒\download\雅漫社\\';

	function check_time_stamp($timestamp=false){

		if (!$timestamp) return_error();

		$timestamp=round($timestamp/1000);

		$diff = abs(time()-$timestamp);

		if ($diff>10) return_error();
		
		return $diff;
	}

	function check_key_word($timestamp,$keyword){
		$serveKey = md5($timestamp.'sunlight-manga');

		if ($keyword!==$serveKey) return_error();
	}

	function return_error(){
		exit('123');
	}
?>