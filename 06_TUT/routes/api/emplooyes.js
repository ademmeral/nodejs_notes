const express = require('express');
const router = express.Router();
const path = require('path');

router.use(express.json());     
// We must have to use this middleware (express.json()) when handling data in type of json

const {
  getEmployees,
  getEmployee,
  updateEmployee,
  addEmployee,
  deleteEmployee
} = require('../../controllers/emplooyes');

router.route('/employees')
  .get(getEmployees)
  .post(addEmployee)
  .put(updateEmployee)
  .delete(deleteEmployee);

router.get('/employees/:id', getEmployee)

router.all('/employees/*', (req, res) => {
  if (req.accepts('json')) {
    res.status(404).json({error: 'Not found!'});
  } else if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, '../', 'pages', '404.html'));
  } else {
    res.status(404).send('Not found');
  }
});

module.exports = router;
