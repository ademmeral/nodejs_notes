mongoose.connection.once('open', () => {
  console.log('Connected to CompanyDB')
  app.listen(3500, () => console.log('Server has started'))
})