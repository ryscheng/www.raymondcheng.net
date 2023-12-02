<head>
<link href='css/style-classic.css' rel='stylesheet' type='text/css'>
<title>Raymond Cheng</title>
</head>
<body>
<?
$url="classic.php";
include "log/personallog.php";
include "helper/functions.php";
//Google Analytics
include_once("log/googlelog.php");
$page = $_GET['p'];
//Initialize Data
if ($page==NULL) $page = "all";
$data = array(	
	array("<h2>Raymond Cheng</h2>","contact","<a href='img/me.jpg'><img src='img/me.jpg' alt='Me' width='100px'></a>"),
	array("<h1>About Me</h1>","aboutme","<a href='img/pike.jpg'><img src='img/pike-t.jpg' alt='Pike' width='100px'></a>"),
	array("<h1>Research</h1>","research","<a href='img/unblock.png'><img src='img/unblock.png' alt='Unblock' width='100px'></a>"),
	array("<h1>Projects</h1>","projects","<a href='img/website.png'><img src='img/website-t.jpg' alt='raymondcheng.net' width='100px'></a>"),
	array("<h1>Education</h1>", "education", "<a href='img/uw-cse.gif'><img src='img/uw-cse.gif' alt='UW' width='100px'></a><br><br><br><a href='img/mit.gif'><img src='img/mit.gif' alt='MIT' width='100px'></a>"),
	array("<h1>Publications</h1>","publications","<a href='img/whanausip.jpg'><img src='img/whanausip-t.jpg' alt='WhanauSIP' width='100px'></a>"),
	array("<h1>Invited Talks</h1>","talks","<a href='img/talks.jpg'><img src='img/talks-t.jpg' alt='Talks' width='100px'></a>"),
	array("<h1>Awards and Honors</h1>","awards",""),
	array("<h1>Dance</h1>","dance","<a href='img/dance.jpg'><img src='img/dance-t.jpg' alt='Dance' width='100px'></a>"),
	array("<h1>Flight</h1>","flight","<a href='img/fly.jpg'><img src='img/fly-t.jpg' alt='Fly' width='100px'></a>"),
	array("<h1>Seaman</h1>","boating","<a href='img/boat.jpg'><img src='img/boat-t.jpg'></a>"),
	array("<h1>Motorcycle</h1>","motorcycle","<a href='img/moto.jpg'><img src='img/moto-t.jpg'></a>"));
//Begin table
echo "<table>";

//Populate content
for ($i=0;$i<count($data);$i++) {
  echo "<tr><td colspan='2'>";
  echo "<a href='".$url."?p=".$data[$i][1]."'>";
  echo $data[$i][0];
  echo "</a>";
  echo "</td></tr>";
  if (($page=="all")||($page == $data[$i][1])) {
  echo "<tr><td>";
  echo "<p>".getdata("pages",$data[$i][1])."</p>";
  echo "</td><td>";
  echo $data[$i][2];
  echo "</td></tr>";
  }
}
echo "</table>";
?>
<p>Last updated on 2012/10/22</p>
</body>
