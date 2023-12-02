<?
include "log/personallog.php";
include "helper/functions.php";
define('DOMAIN','user@raymondcheng.net> ');
define('NUMROWS',42);
define('CHARWIDTH',85);
define('PROMPTCOLOR','#00FF00');
define('HACKERROR','You little hacker... get out of here before I tell your mom!');
$startindex=$_POST['startindex'];
$screendata=$_POST['screendata'];
$line = $_POST['line'];
//$line=ereg_replace('[^a-zA-Z0-9.:/ ]','',$_POST['line']);

//Initialize
if ($startindex==NULL) $startindex = 0;
if ($screendata==NULL) {
  $cmd = new commands;
  $startindex = 0;
  $cmd->rash("");
  $screendata = base64_encode(serialize($screendata));
}
//Check startindex bounds
if ((!is_numeric($startindex))||($startindex<0)||($startindex>NUMROWS)) {
  echo HACKERROR;
//Check screendata is serialized string
} else if (($screendata!=NULL)&&(!is_string($screendata))) {
  echo HACKERROR;
//Decode screendata
} else if (!($screendata = base64_decode($screendata))) {
  echo HACKERROR;
//Unserialize screendata
} else if (!($screendata = unserialize($screendata))) {
  echo HACKERROR;
//Check screendata is an array
} else if (!is_array($screendata)) {
  echo HACKERROR;
}else {
  //Process input
  if (($line != NULL) && (is_string($line))) {
    interpretline($line);
  }
  //Print HTML
  echo "<head>";
  echo "<link href='css/style-rash.css' rel='stylesheet' type='text/css'>";
  echo "<title>Ray Shell | rash</title>";
  echo "</head>";
  echo "<body>";
  echo "<table class='terminal'>";
  echo "<tr><td class='screen'>";
  //Print Screen Data
  for($i=$startindex;$i<NUMROWS;$i++) {
    //echo htmlentities($screendata[$i],ENT_QUOTES),"<br>";
    echo $screendata[$i],"<br>";
  }
  for($i=0;$i<$startindex;$i++) {
    //echo htmlentities($screendata[$i],ENT_QUOTES),"<br>";
    echo $screendata[$i],"<br>";
  }
  echo "</td></tr>";
  //Command Prompt = Form
  echo "<tr><td>";
  echo "<form name='input' method='post' action='terminal.php'>";
  echo "<font color=".PROMPTCOLOR.">".DOMAIN."</font>";
  echo "<input name='line' type='text' value=''>";
  echo "<input name='startindex' type='hidden' value='",$startindex,"'>";
  echo "<input type='hidden' name='screendata' value='",base64_encode(serialize($screendata)),"'>";
  echo "</form>";
  echo "<script>document.input.line.focus();</script>";
  echo "</td></tr>";
  echo "</table>";
//Google Analytics
include_once("log/googlelog.php");
  echo "</body>";
} 
?>
