const fs = require('fs');
const path = require('path')

function logEvents(msg){      // Event Handler
  const date = Date.now()
  const id = crypto.randomUUID().split('-').join('')
  const logPath = path.join(__dirname, '../', 'logs')
  try{

    const setMsg = `${date}\t\t${id}\t\t${msg}\n`
    if ( !fs.existsSync(logPath) ){
      fs.mkdirSync(logPath)
    }
    fs.appendFileSync(path.join(logPath,'eventLog.txt'), setMsg)

  } catch (err){

    const setMsg = `${date}\t\t${id}\t\t${err.message}\n`
    console.log(err)
    fs.appendFileSync(path.join(logPath,'errorLog.txt'), setMsg)
    process.exit(1)

  }
}

function logger(req, res, next){    // Middleware
  logEvents(
    `${req.headers.origin.split('www.')[1]}\t\t${req.method}\t\t${req.url}`
  );
  next()
}

module.exports = logger