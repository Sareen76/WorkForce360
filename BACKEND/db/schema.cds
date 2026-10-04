namespace workforce.db;

type EmployeeStatus : String enum {
    PROBATION;
    ACTIVE;
    ON_LEAVE;
    RESIGNED;
};

entity Departments {
    key ID          : UUID;

    @assert.notNull
    name            : String(100);

    description     : String(255);

    location        : String(100);

    employees       : Composition of many Employees
                          on employees.department = $self;
}

entity Employees {
    key ID          : UUID;

    @assert.notNull
    employeeId      : String(20);

    @assert.notNull
    firstName       : String(100);

    @assert.notNull
    lastName        : String(100);

    @assert.notNull
    email           : String(150);

    phone           : String(20);

    designation     : String(100);

    @assert.range: [(0), _]
    salary          : Decimal(15,2);

    @assert.notNull
    joiningDate     : Date;

    @assert.notNull
    status          : EmployeeStatus;

    @assert.target
    department      : Association to Departments;
}