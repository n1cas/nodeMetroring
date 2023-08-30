const repl = require("repl");

function getRandomNumber(max = 100) {
  if(typeof max !== 'number' &&  isNaN(max)) {
    return 'Invalid Value, please enter number!'
  }
  return Math.floor(Math.random() * (+max + 1));
}

console.log(getRandomNumber());

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

