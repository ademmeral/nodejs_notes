// LOG EVENTS

const fs = require('fs');
const path = require('path');
const uuid = () => crypto.randomUUID();

// Creating a log event function
function logEvents(msg){
  try{
    const logItem = `${Date.now()}\t\t${uuid()}\t\t${msg}\n`;
    if (!fs.existsSync('logs')) fs.mkdirSync('logs');
    fs.appendFileSync(path.join('logs', 'logs.txt'), logItem)
  } catch (err) {
    console.warn(err)
    process.exit(1)
  }
}

module.exports = logEvents;