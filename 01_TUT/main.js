// You should already ; 
  // 1- know HTML, CSS, JS
  // 2- have possibly experience with other libraries and frameworks

// How NodeJS differs from Vanilla JS
  // 1- NodeJs runs on a server, not in a browser (backend not frontend)
  // 2- The console is the terminal window
  // 3- You can implement any operations as you do in browser console
  // 4- We use "global" as a global object like "window" object in browsers
    // Example :
      // console.log(global)   // You can access global object
      // global.setTimeout(() => console.log("Hello NodeJS"), 2000)

  // 5- Has Common Core modules, like filesystem (fs), operating system (os), path, etc...
  // 6- CommonJS modules instead of ES6 modules, like const something = require('something')
  // 7- Missing some JS APIs like "fetch"

// OS Module
/* 
const os = require('os');
console.log( os.version() )
console.log( os.type() )
console.log( os.homedir() ) 
*/

// Handling directory and file names (both are global props)
/* 
console.log(__dirname)    // Returns directory name
console.log(__filename)   // Return directory name included the current file name
 */

// PATH Module
/* 
const path = require('path')
console.log( path.dirname(__filename) )   // Returns the "directory name" of a path (whether file or folder)
console.log( path.basename(__dirname) )   // Often used to extract the file/folder name
console.log( path.extname(__filename) )   // Returns the extension name of a "file"
console.log( path.parse(__filename).name ) // Returns the name,base,dir,ext,root of a file/folder as an object 
*/

// We can also import our own modules
// const math = require('./math')
// OR
/* 
const {add, subst, mult, div} = require('./math')
console.log( add(2,8) )
console.log( subst(8,2) )
console.log( mult(2,8) )
console.log( div(8,2) ) 
*/

// FILE SYSTEM (FS Module)

  //* .readFile/readFileSync :
  //    Reads files and keep them in It's an async operation, that's why we've used fs.readFileSync
/*
const fs = require('fs')

const data = fs.readFileSync('prepositions_1.txt').toString()  
const cleaned = data.split("\n").map(el => (
  el.trim().replace(': ', '').replace('\r', '').replace('&', ',')
    .split('\t').filter(it => it)
));

const dataArray = [];
for (const word of cleaned){
  const term = word[0]?.match(/[a-z \(\)\/]+/gi);
  const types = word[1]?.startsWith('(') 
    ? word[1]?.match(/[a-z&, ]+/)?.join('')?.replace(' ', '')
      .split(',').map(el => el.trim())
    : ['']

  const obj = {term,types, descs : [''], examples : [''],synonyms : ['']};
  dataArray.push(obj)
}
if (dataArray.length) 
  fs.writeFileSync(__dirname + '/prepositions_1.json', JSON.stringify(dataArray))
*/
// In the above example, I reorganized my english words and turned the file type into json

  // Handling Errors
/*
const fs = require('fs');
fs.readFile(__dirname + "/exampe.txt", (err, data) => {
  if (err) throw err;
  console.log(data)
})
    //* process.on allows us to overwrite default error message. 'uncaughtException' is an event,- 
    //    there are a lot of events like it.

process.on('uncaughtException', err => {
  console.log('Just an error')
  process.exit(1)
})
*/

  // Writing operation
    //* Sometime, we cannot know directories have normal slashed or reversed ones,-
    // So, we should use "path" module to get the particular file/folder withouth any problem.

    //* fs.writeFileSync or fs.writeFile (async op.) lets us write text in a present file.

    //* fs.appendFile allows us to write text into a present file. It creates a new one if unexists.-
    // if exists, then it updates the file.

    //* fs.rename/renameSync allows us to rename a specified file/folder.
    //    fs.renameSync(path.join(__dirname, 'named.txt'), 'renamed.txt')

    //* fs.unlink/unlinkSync allows us to delete a specified file/folder.
    //    fs.unlinkSync(path.join(__dirname, 'delete.txt'))

    //* fs.mkdir/mkdirSync allows us to create a directory (folder).
    //    fs.mkdirSync('newDir')

    //* fs.rmdir/rmdirSync allows us to delete a directory (folder).
    //    fs.rmdirSync('removeDir')

    //* fs.existsSync allows us to check whether a file/folder or not.
    //    fs.existsSync('doesExist.txt')

    //* path.join method allows us to create or get a directory from multiple parameters ;
    //    const dire = path.join('just', 'an', 'example.js') // just\an\example.js

// const fs = require('fs')
// const path = require('path');

// fs.writeFileSync(path.join(__dirname, 'reply.txt'), 'It was nice to see you again')
// fs.writeFile(path.join(__dirname, /*,directories,*/ 'reply.txt'), 'It was nice to see you again',
//   (err) => {
//     if (err) throw err;
//     console.log('Writing completed!')
//   }
// );

// fs.appendFileSync(path.join(__dirname, 'reply.txt'), 'It was nice to see you again')
// fs.appendFile(path.join(__dirname, /*,directories,*/ 'unexist.txt'), 'It was nice to see you again',
//   (err) => {
//     if (err) throw err;
//     console.log('Appendation completed!')
//   }
// );

// NOTE : Async methods of fs takes a callback function that takes a error argument. 
//  .then or .catch doesn't work on fs methods!

// We can handle files in three ways ;
  // 1- Using normal method but with a callback
  // 2- Using synchronous version (e.g fs.readFileSync)
  // 3- Requiring promises of the fs module (e.g const fs = require('fs').promises)

// NOTE : If we prefer to use the third way, we have use the fs method in an asynchronous function!

// STREAMS (In FS Module)
  //* Lets us to read/write chunk (buffer) by chunk (buffer) without occopying whole the memory max size.
  //* The methods takes two arguments, the one is the path, the second is options (object literal)
  //* high-water-mark is the limit of a chunk size, 64 * 1024 means 64 kilobytes.
  //* To use streams more efficient than regular reading/writing/updating files. They are preferred for performance.


// const fs = require('fs');

// const rs = fs.createReadStream('readStream.txt' /*,{ encoding: 'utf8', highWaterMark: 64 * 1024 }*/)
// const ws = fs.createWriteStream('writeStream.txt' /*,{ encoding: 'utf8', highWaterMark: 64 * 1024 }*/)

// rs.on('data', (chunk) => {
//   console.log('\n\nA chunk recived!\n\n')
//   console.log(chunk)

//   ws.write(chunk)     // "ws" is usually used in "rs". It writes as a chunk comes
// })

// NOTE : We can also pipe streams like this rs.pipe(ws). It's the same as the above event.
