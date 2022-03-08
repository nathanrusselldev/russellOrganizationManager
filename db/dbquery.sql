SELECT * FROM department

SELECT title, salary, department_name 
FROM employee_roles
JOIN department
on employee_roles.department_id = department.id;

SELECT
employee.id,
CONCAT(employee.first_name,' ', employee.last_name) AS Employee, 
employee_roles.title AS Title, 
employee_roles.salary AS Salary,
department.department_name AS Department,
CONCAT(e.first_name,' ',e.last_name) AS Manager 
FROM Employee
INNER JOIN 
department
on department.id=employee_roles.department_id
INNER JOIN
employee_roles
on employee_roles.id =  employee.role_id
LEFT JOIN employee e
on employee.manager_id = e.id; 

SELECT 
employee.id,
employee.first_name, 
employee.last_name, 
employee_roles.title, 
employee_roles.salary, 
department.department_name, 
CONCAT(e.first_name, ' ' ,e.last_name) 
AS Manager 
FROM employee 
INNER JOIN 
employee_roles on employee_roles.id = employee.role_id 
INNER JOIN department on 
department.id = employee_roles.department_id 
LEFT JOIN employee e on employee.manager_id = e.id;


SELECT CONCAT(first_name,' ',last_name) AS Manager FROM employee
WHERE manager_id IS NULL;