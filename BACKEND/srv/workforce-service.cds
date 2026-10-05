using {
    workforce.db.Employees   as Employee,
    workforce.db.Departments as Department
} from '../db/schema';

service WorkforceService {
    @restrict: [
        {
            grant: ['READ'],
            to   : [
                'HR_ADMIN',
                'MANAGER',
                'EMPLOYEE'
            ]
        },
        {
            grant: [
                'CREATE',
                'UPDATE',
                'DELETE'
            ],
            to   : ['HR_ADMIN']
        }
    ]
    entity Employees   as projection on Employee;

    @restrict: [
        {
            grant: ['READ'],
            to   : [
                'HR_ADMIN',
                'MANAGER'
            ]
        },
        {
            grant: [
                'CREATE',
                'UPDATE',
                'DELETE'
            ],
            to   : ['HR_ADMIN']
        }
    ]
    entity Departments as projection on Department;
}
