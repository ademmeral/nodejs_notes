const EventEmitter = require('events')
const logEvents = require('./logEvents');

const myEvent = new EventEmitter()

// Listener for the my Log Event
myEvent.on('log', (msg, /*,parameters comig from emit*/) => logEvents(msg) )

setTimeout(() => {
  myEvent.emit('log', 'Another log event emitted!' /*,parameters,...*/)
}, 2000)

// We can give our event any name. I pereferred to give it "log"