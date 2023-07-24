// If we define a middleware that takes 4 arguments which the first one of them is error,-
// express distinguish that the middleware is created to handle errors. 
function errorHandler(err, req, res, next){
  console.log('An error has occured!', err)
  next()
}

module.exports = errorHandler;