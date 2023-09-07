const os = require('os');
const fs = require('fs');
const util = require('util');
const childProcess = require('child_process');
const exec = util.promisify(childProcess.exec);

const COMMAND = {
  linux: 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1',
  darwin: 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1',
  win32:
    'powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + \' \' + $_.CPU + \' \' + $_.WorkingSet }"',
};

const systemCommand = COMMAND[os.platform()];

let shellOutput = '';

setInterval(async () => {
  try {
    const { stdout } = await exec(systemCommand);
    shellOutput = stdout.trim();
    process.stdout.write(shellOutput + "\r")
  } catch (error) {
    console.log(error);
  }
}, 100);

setInterval(() => {
  fs.appendFile(
    'task-2-standard-library/logs/activityMonitor.log',
    `${Date.now()} : ${shellOutput}\n`,
    (err) => {
      if (err) console.error(err);
    }
  );
}, 60000);