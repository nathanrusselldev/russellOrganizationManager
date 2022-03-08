
const express = require('express');
const inquirer = require('inquirer');
const cTable = require('console.table')

// Connectiong to my database.

const mysql = require('mysql');
const res = require('express/lib/response');
const { header } = require('express/lib/response');
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'N@thanjan14',
      database: 'organizational_db'
      
    },
    console.log(`Connected to the organizational_db database.`)
);
    
  

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const init = () => {
    console.log('\n', 'Welcome to your organizational management system.', '\n      **********************************\n')
    inquirer.prompt ([
        {
            type: 'list',
            message: 'How would you like to manage your department?',
            choices: [
                'View departments.',
                'View employee roles.',
                'View all employees.',
                'Add a department.',
                'Add a role.',
                'Add an employee.',
                'Update employee role.',
                'Exit Database.'

            ],
            name: "managementSelection"

        }
        ])
        .then((userChoice) => {
           switch(userChoice.managementSelection) {
                
                case 'View departments.':
                    renderDepartments();
                    break;  
                case 'View employee roles.':
                    renderRoles();
                    break;
                case 'View all employees.':
                    renderAll();
                    break;
                case 'Add a department.':
                    departmentAdd();
                    break;
                case 'Add a role.':
                    roleAdd();
                    break;
                case 'Add an employee.':
                    employeeAdd();
                    break;
                case 'Update employee role.':
                    updateRole();
                    break;
                }
            });
};


const renderDepartments = () => {
    db.query('SELECT id, department_name AS Department FROM department', (err, table) => {
            console.table('\n', table, '\n')
    })
    init()
};


const renderRoles = () => {
    db.query('SELECT title AS Title, salary AS Salary, department_name AS Department FROM employee_roles JOIN department on employee_roles.department_id = department.id', (err, table) => {
            console.table(table)
    })
    init() 
};

const renderAll = () => {

    db.query(`SELECT employee.id, CONCAT(employee.first_name," ",employee.last_name) AS Employee, employee_roles.title AS Title, employee_roles.salary AS Salary, CONCAT(e.first_name, " " ,e.last_name) AS Manager FROM employee INNER JOIN employee_roles on employee_roles.id = employee.role_id INNER JOIN department on department.id = employee_roles.department_id LEFT JOIN employee e on employee.manager_id = e.id;`, (err, table) => {
        console.table('\n', table, '\n')
    });
    init()
};

function departmentAdd() {
    inquirer.prompt ([
        {
            type: 'input',
            message: "Enter a department name.",
            name: "departmentName"
        }
       ])
       .then((userInput) => {
        db.query('INSERT into department SET ? ',
        {
        department_name: userInput.departmentName
        }) 
        console.log("You have sucessfully added a department.")
        init()
    });
}

const employeeAdd = () => {
    inquirer.prompt ([
        {
            type: 'input',
            message: 'What is their first name?',
            name: "eFirstName"
        },
        {
            type: 'input',
            message: 'What is their last name?',
            name: "eLastName"
        },
        {
            type: 'list',
            message: "What is their role?",
            choices: getRoles(),
            name: 'eRole'
        },
        {
            type: 'list',
            message: 'Who is their manager?',
            choices: getManagers(),
            name: 'eManager'
        }
       ]) .then((userInput) => {
            db.query('INSERT INTO employee SET ?', {
                first_name: userInput.eFirstName,
                last_name: userInput.eLastName,
                role_id: userInput.eRole.value,
                manager_id: userInput.eManager.value
                

            })
            console.log(userInput)
            init()
       })
};

const roleAdd = () => {
    inquirer.prompt ([
        {
            type: 'input',
            message: 'What is the name of the role?',
            name: 'roleName'
        },
        {
            type: 'input',
            message: 'What is the salary?',
            name: 'roleSalary'
        },
        {
            type: 'list',
            message: "Which Department does the role belong too?",
            choices: getDepartments(),
            name: 'roleDepartment'
        }
       ]) .then((userInput) => {
            db.query('INSERT INTO employee_roles SET ?', {
                title: userInput.roleName,
                salary: userInput.roleSalary,
                department_id: userInput.roleDepartment.value
            })
            init()
        })
};  

const updateRole = () => {
    console.log('making it here?')
    inquirer.prompt ([
        {
            type: 'input',
            message: 'Enter the employee id you wish to update.',
            name: 'roleName'
        },
        {
            type: 'list',
            message: 'Which role would you like to give them?',
            choices: getRoles(),
            name: 'updatedRole'
        }
       ]) .then((userInput) => {
        db.query('UPDATE employee SET role_id = ? WHERE id = ?', {
            id: userInput.roleName,
            role_id: userInput.updatedRole.value
            })
            init()
        })
};

init()

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });


// This group of functions prepares arrays of answers for our inquirer prompts. 
const managerArray = []
const getManagers = () => {

    db.query('SELECT id, first_name FROM employee WHERE manager_id IS NULL', (err, data) =>   {
     
        data = JSON.parse(JSON.stringify(data))
     
        for (let i = 0; i < data.length; i++){
            managerArray.push({name: data[i].first_name, value: data[i].id})
        } 
    }) 
    return managerArray
}

const roleArray = []
const getRoles = () => {

    db.query('SELECT id, title FROM employee_roles', (err, data) =>   {
     
        data = JSON.parse(JSON.stringify(data))
     
        for (let i = 0; i < data.length; i++){
            roleArray.push({name: data[i].title, value: data[i].id});
            
        }
    }) 
    return roleArray
}

const departmentArray = []
const getDepartments = () => {
    db.query('SELECT id, department_name FROM department', (err, data) =>   {
     
        data = JSON.parse(JSON.stringify(data))
 
        for (let i = 0; i < data.length; i++){
            departmentArray.push({name: data[i].department_name, value: data[i].id});
        
        }
    }) 
    return departmentArray
}