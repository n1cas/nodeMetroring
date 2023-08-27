const repl = require("repl");

function getRandomNumber (max) {
   return Math.floor(1 + Math.random() * (+max + 1 - 1));
}

console.log(getRandomNumber(100));

const replServer = repl.start();

replServer.defineCommand('getRandomNumber', {
  action(maxNum) {
    const result = getRandomNumber(maxNum)
    console.log(result);
    replServer.context.getRandomNumber = result;

    this.displayPrompt();
  }
})


replServer.on('exit', () => {
  console.log('Ending REPL mode');
  process.exit();
});

