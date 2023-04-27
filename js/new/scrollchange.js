if ($("button") == null && $("#canvas2").attr("class") == "canvasU") {
  var button = $("<button>");
  button.attr("class", "load");
  $("body").append(button);
}
$(".load").click(function () {
  window.location.href = "30000.html";
});
