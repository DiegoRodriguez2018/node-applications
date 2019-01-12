function shutDownGracefuly() {
  process.on('SIGINT', function () {
    console.log("Shutting down gracefuly.");
    setTimeout(function(){
      console.clear();
      process.exit();
    }, 800);
  });
}

module.exports = shutDownGracefuly;




