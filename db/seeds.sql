USE organizational_db;

INSERT INTO department (id, department_name)
VALUES  
(25, "Human Resources"),
(20, "Customer Support"),
(53, "Sales"),
(97, "Information Technology"),
(93, "Development"),
(85, "Administrative Support"),
(95, "Executive Leadership");


INSERT INTO employee_roles (id, title, salary, department_id)
VALUES
(100, "Manager", 100000, 25),
(110, "Supervisor", 75000, 25),
(120, "Lead Developer", 90000, 93),
(130, "Helpdesk Agent", 35000, 20),
(140, "Executive Assistant", 42000, 85),
(150, "Systems Analyst", 51000, 97),
(160, "HR Business Partner", 72000, 25),
(170, "Customer Service Rep", 42000, 20),
(180, "Commisioned Salesperson", 25000, 53),
(190, "Sys Admin", 78000, 97),
(200, "Chief Executive Officer", 150000, 95);


INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
(1000, "Daniel", "Jones", 200, NULL),
(1001, "Michael", "Jenkins", 100, NULL),
(1002, "Travis", "Hunt", 100, NULL),
(1003, "James", "Ayala", 100, NULL),
(1004, "John", "Herrera", 110, 1002),
(1005, "Emily", "Dean", 110, 1001);




