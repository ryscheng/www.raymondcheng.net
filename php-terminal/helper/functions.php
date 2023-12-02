<?
include "content.php";

function printline($line) {
  global $startindex;
  global $screendata;
  //$screendata[$startindex] = substr($line, 0, CHARWIDTH);
  $screendata[$startindex] = $line;
  $startindex = ($startindex+1)%NUMROWS;
  //if (strlen($line) > CHARWIDTH) printline(substr($line,CHARWIDTH),$screendata,$startindex);
}
//Breaks a string with <br> tags into multiple printline calls
function printmultlines($line) {
  $cutpoint = strpos($line,"<br>");
  while($cutpoint) {
    printline(substr($line,0,$cutpoint));
    $line = substr($line, ($cutpoint+4));
    $cutpoint = strpos($line,"<br>");
  }
  printline($line);
  printline("");
}
function getfirst(&$line) {
  $cutpoint = strpos($line," ");
  if($cutpoint) {
    $command = substr($line, 0, $cutpoint);
    $line = substr($line, ($cutpoint+1));
  } else {
    $command = $line;
    $line="";
  }
  return $command;
}
function getdata($table, $rowname) {
  return $GLOBALS["CONTENT"][$table][$rowname]["data"];
/**
  open_mysql();
  $query = "SELECT * FROM ".$table." WHERE name='".$rowname."'";
  $result = mysql_query($query);
  if(mysql_numrows($result)==0) {
    return NULL;
  } else {
    return mysql_result($result,0,"data");
  }
**/
}
function getmysqltablesummary($table) {
  $answer="";
  foreach ($GLOBALS["CONTENT"][$table] as $k => $v) {
    $answer=$answer." <br> ".$k." - ".$v["comment"];
  }
/**
  open_mysql();
  $query = "SELECT * FROM ".$table." ORDER BY name ASC";
  $result = mysql_query($query);
  for ($i=0;$i<mysql_numrows($result);$i++) {
    $name = mysql_result($result, $i, "name");
    $comment = mysql_result($result, $i, "comment");
    $answer=$answer." <br> ".$name." - ".$comment;
  }
  mysql_close();
**/
  return $answer;
}

/***** COMMANDS ******/
class commands {
  function clear($line) {
    global $screendata;
    for ($i=0;$i<NUMROWS;$i++) {
      $screendata[$i]="";
    }
  }

  function rash($line) {
    $this->clear("");
    //printline("Welcome to RaymondCheng.net");
    //printline("Beta v1.1");
    //printline("IF NONE OF THIS MAKES SENSE: TYPE 'wget classic' INTO THE COMMAND LINE AND HIT ENTER");
    //printline("");
    interpretline("more general");
    interpretline("help");
  }

  function ifconfig($line) {
    $ip = isset($_SERVER['HTTP_X_FORWARDED_FOR']) ?
    $_SERVER['HTTP_X_FORWARDED_FOR'] : $_SERVER['REMOTE_ADDR'];
    printmultlines("eth* Link encap:Ethernet HWaddr ra:sh:ter:m0:ro:ck:s! <br>".
		"inet addr:".$ip." Mask:255.255.255.0 <br>".
  		"UP BROADCAST MULTICAST  MTU:1000  Metric:1");
  }

  function ls($line) {
    $result = getmysqltablesummary("pages");
    printmultlines($result);
  }

  function help($line) {
    printline("These are the list of all commands");
    printline("Use 'man' command on these to see how to use them");
    $result = getmysqltablesummary("man");
    printmultlines($result);
  }

  function more($line) {
    //Sanitize inputs
    $name = getfirst($line);
    $name=ereg_replace('[^a-zA-Z0-9]','',$name);
    $result = getdata("pages", $name);
    if ($result == NULL) {
      printmultlines($name.": No such file or directory");
    } else {
      printmultlines($result);
    }
  }

  function man($line) {
    //Sanitize inputs
    $name = getfirst($line);
    $name=ereg_replace('[^a-zA-Z0-9]','',$name);
    $result = getdata("man",$name);
    if($result == NULL)	{
      printmultlines("No manual entry for ".$name);
    } else {
      printmultlines($result);
    }
  }

  function wget($line) {
    if (substr($line,0,7) == "classic") {
      header("Location: classic.php");
    } else if(substr($line,0,4) == "blog") {
      header("Location: http://ryscheng.blogspot.com");
    } else if((substr($line,0,7)=="http://")||
              (substr($line,0,8)=="https://")||
  	      (substr($line,0,6)=="ftp://")) {
      printline("Redirecting to: ".$line);
      header("Location: ".$line);
    } else {
      printline("Redirecting to: http://".$line);
      header("Location: http://".$line);
    }
  }

  function search($terms) {
    printline("Searching Duckduckgo.com for: ".$terms);
    //wget('http://us.ixquick.com/do/metasearch.pl/?query='.$terms);
    $this->wget('http://duckduckgo.com/?q='.$terms);
  }
  function wiki($terms) {
    printline("Searching Wikipedia for: ".$terms);
    $this->wget('http://en.wikipedia.org/wiki/'.$terms);
  }
  function google($terms) {
    printline("Calculating: ".$terms);
    $this->wget('http://www.google.com/#&q='.$terms);
  }
  function dict($terms) {
    printline("Looking up on dictionary.com: ".$terms);
    $this->wget('http://dictionary.reference.com/browse/'.$terms);
  }
  function map($terms) {
    printline("Searching on Google Maps: ".$terms);
    $this->wget('http://maps.google.com/?q='.$terms);
  }
  function amazon($terms) {
    printline("Searching on Amazon: ".$terms);
    $this->wget('http://www.amazon.com/s/field-keywords='.$terms);
  }
  function youtube($terms) {
    printline("Searching on YouTube: ".$terms);
    $this->wget('http://www.youtube.com/results?search_query='.$terms);
  }
  function weather($terms) {
    printline("Checking weather for: ".$terms);
    $this->wget('http://www.wunderground.com/cgi-bin/findweather/hdfForecast?searchType=WEATHER&query='.$terms);
  }
  function xchat($terms) {
    $this->wget('http://webchat.freenode.net');
  }
  function wolfram($terms){
    $this->wget('http://www.wolframalpha.com/input/?i='.$terms);
  }
/**
  function serena($terms) {
    $this->wget('http://serenasmells.blogspot.com');
  }
  function wvdial($line){
    printline("Make sure pop-ups are allowed and Javascript is turned on");
    echo "<script>window.open('pages/wvdial.html','','scrollbars=no,menubar=no,height=100,width=250,resizable=yes,toolbar=no,location=no,status=no');</script>";
  }
  function nxclient($line){
    printline("Make sure pop-ups are allowed and Javascript is turned on");
    echo "<script>window.open('pages/nx/nxapplet.html','','scrollbars=no,menubar=no,height=300,width=410,resizable=yes,toolbar=no,location=no,status=no');</script>";
  }
  function mindterm($line){
    printline("Make sure pop-ups are allowed and Javascript is turned on");
    echo "<script>window.open('pages/mindterm.html','','scrollbars=no,menubar=no,height=510,width=700,resizable=yes,toolbar=no,location=no,status=no');</script>";
  }
**/
  function cat($line){
    while ($line != ""){
      $file = getfirst($line);
      $this->more($file);
    }
  }
/**
  function bookmarks($line) {
    printline("Opening Bookmarks");
    open_mysql();
    $query = "SELECT * FROM bookmarks";
    $result = mysql_query($query);
    for ($i=0;$i<mysql_numrows($result);$i++) {
      $name = mysql_result($result, $i, "name");
      $url = mysql_result($result, $i, "data");
      printline($name." - ".$url);
      echo "<script>window.open('".$url."','','');</script>";
    }
    mysql_close();
  }
**/

}

function interpretline($line)
{
  $cmd = new commands;
  printmultlines(DOMAIN.$line);
  $command = getfirst($line);
  if (is_callable(array($cmd,$command))) {
    $cmd->$command($line);
  } else {
    printmultlines("rash: ".$command.": command not found");
  }
}
?>
