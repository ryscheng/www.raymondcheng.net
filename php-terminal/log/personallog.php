<?
$LogFileLocation = "/log/iplog.txt";
$remoteaddr = $_SERVER['REMOTE_ADDR'];

if ($remoteaddr != "127.0.1.1" && $remoteaddr != "127.0.0.1"){
  $fh = fopen($_SERVER['DOCUMENT_ROOT'].$LogFileLocation,'at');
  fwrite($fh,date('dMy H:i:s')."\t".$_SERVER['REMOTE_ADDR']."\t".$_SERVER['REQUEST_URI']."\n");
  fclose($fh);
}
?>
