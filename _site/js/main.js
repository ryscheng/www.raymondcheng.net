console.log('raymondcheng.net.');

$(".collapse").collapse("hide");
if(window.location.hash) {
  $(window.location.hash).find(".collapse").collapse("show");
}
