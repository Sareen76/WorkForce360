using {
    workforce.db.Employees as Employee,
    workforce.db.Departments as Department
} from '../db/schema';

service WorkforceService {

    entity Employees
    as projection on Employee;

    entity Departments
    as projection on Department;
}