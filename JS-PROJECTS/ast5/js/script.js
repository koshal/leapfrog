window.onload = function() {
  // var apps = document.getElementsByClassName("app");

  // var height = 700;
  // var width = 500;

  // for (var i = 0; i < apps.length; i++) {
  //   apps.item(i).appendChild(new Game(height, width, apps).init());
  // }

  var game = document.getElementById("flappy-world");
  var height = 600;
  var width = 400;
  game.appendChild(new Game(height, width, game).init());
};
