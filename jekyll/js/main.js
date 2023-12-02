console.log('raymondcheng.net.');

// Add bootstrap styling to tables (e.g. from blog markdown)
$("table").addClass("table");

// Enable hash routing to a particular accordion
if(window.location.hash) {
  $(window.location.hash).find(".collapse").addClass("show");
}

