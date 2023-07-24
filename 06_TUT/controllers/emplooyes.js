const employees_ = require('../data/employees');

const data = {
  employees : employees_ || [],
  setEmplooyes: (data_) => {
    if ( data_constructorname.name === 'array' ) {
      data.employees = data_;

    } else throw new Error('Employees must be in type of Array!');
  },
  getEmployee: (id) => {
    if ( !isNaN(id) ) {
      return data.employees.find(empl => empl.id === id)

    } else throw new Error('Given ID must be in type of number!');
  },
  updateOne : (obj) => {
    const cond = Object.keys(data.employees[0])
      .some(key => obj.hasOwnProperty(key));

    if ( cond && obj?.id ) {

      let employee = {...data.employees.find(emp => emp.id == obj.id), ...obj}
      const empls = data.employees.filter(emp => emp.id != obj.id)
        .concat(employee);
      data.employees = empls;
      return employee;

    } else throw new Error('Invalid property!');
  },
  deleteOne : (id) => {
    if (!isNaN(id)) {
      data.employees = data.employees
        .filter(emp => emp.id != id)

    } else throw new Error('Given ID must be in type of number!');
    
  },
  addOne: (obj) => {
    const cond = Object.keys(data.employees[0])
      .every(key => obj.hasOwnProperty(key))
    if ( cond || !data.employees.length ) {
      data.employees = [...data.employees, obj]
    } else throw new Error('Given emplooyee must include all properties')
  }
}

const getEmployees = (req,res) => res.json(
    data.employees?.sort((a,b) => a.id - b.id) || []
  );

const updateEmployees = (req, res) => data.setEmplooyes(req.body);

const getEmployee = (req, res) => {
  try {
    const empl = data.getEmployee(+req.params.id)
    res.json(empl)
  } catch (err) {
    res.json({ error: `${err.message}` });
  }
}

const addEmployee = (req, res) => {
  try {
    const id = data.employees.length 
      ? data.employees.sort((a,b) => a.id - b.id).at(-1).id + 1
      : 1;    
    const empl = { id, ...req.body };
    data.addOne(empl)
    res.json(empl);
  } catch (err) {
    console.log(err)
    res.json({ error: `${err.message}` });
  }
};

const updateEmployee = (req, res) => {
  try{
    const empl = data.updateOne(req.body)
    res.json(empl)
  } catch (err) {
    res.json({ error: `${err.message}` });
  }
}

const deleteEmployee = (req, res) => {
  try {
    data.deleteOne(+req.body.id)
    res.json({status: 'OK'})
  } catch (err) {
    res.json({error: `${err.message}` })
  }
}


module.exports = {
  getEmployees,
  updateEmployees,
  getEmployee,
  updateEmployee,
  addEmployee,
  deleteEmployee
}