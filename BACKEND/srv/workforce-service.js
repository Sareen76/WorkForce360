const cds = require('@sap/cds')

module.exports = cds.service.impl(async function () {
    const { Employees, Departments } = this.entities;
    const validStatuses = [
        'PROBATION',
        'ACTIVE',
        'ON_LEAVE',
        'RESIGNED'
    ];

    // Status Normalization + Validation
    this.before(['CREATE', 'UPDATE'], 'Employees', (req) => {

        if (!req.data.status) return;

        req.data.status = req.data.status.toUpperCase();

        if (!validStatuses.includes(req.data.status)) {
            req.reject(400,
                'Status must be PROBATION, ACTIVE, ON_LEAVE or RESIGNED');
        }
    });

    
    // Before Create Employee
    this.before('CREATE', Employees, async (req) => {

        const {
            employeeId,
            email,
            salary,
            department_ID
        } = req.data;

        // Check Employee ID uniqueness
        const empExists = await SELECT.one
            .from(Employees)
            .where({ employeeId });

        if (empExists) {
            req.reject(400, 'Duplicate Employee ID');
        }

        // Check Email uniqueness
        const emailExists = await SELECT.one
            .from(Employees)
            .where({ email });

        if (emailExists) {
            req.reject(400, 'Employee already exists');
        }

        // Salary validation
        if (salary <= 0) {
            req.reject(400, 'Invalid salary');
        }

        // Department validation
        const deptExists = await SELECT.one
            .from(Departments)
            .where({ ID: department_ID });

        if (!deptExists) {
            req.reject(400, 'Department not found');
        }

    });


    // Before Update Employee
    this.before('UPDATE', Employees, async (req) => {

        const { salary, email } = req.data;

        if (salary !== undefined && salary <= 0) {
            req.reject(400, 'Invalid salary');
        }

        if (email) {

            const existing = await SELECT.one
                .from(Employees)
                .where({ email });

            if (
                existing &&
                existing.ID !== req.data.ID
            ) {
                req.reject(400, 'Email already exists');
            }
        }

    });



});


/*
Why did you use service hooks instead of UI validation?

Answer: 
Business validations were implemented in CAP service hooks (before CREATE and before UPDATE) because service-level validations ensure data integrity regardless of the consumer application. Whether data comes from a Fiori UI, external API, Postman, or another service, the validation logic is enforced centrally and consistently.
 */