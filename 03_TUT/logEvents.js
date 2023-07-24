const fs = require('fs');
const path = require('path');

function logEvents(dir, fileName, msg){
  try{
    const timeStamp = Date.now();
    const id = global.crypto.randomUUID().split('-').join('');    // replace method didn't work =\
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    fs.appendFileSync(
      path.join(dir, fileName), 
      `${timeStamp}\t\t${id}\t\t${msg}\n`
    )
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

module.exports = logEvents;