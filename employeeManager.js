import { LightningElement } from 'lwc';

export default class EmployeeManager extends LightningElement {

    name = '';
    empId = '';
    salary = '';
    email = '';
    dept = '';
    joinDate = '';

    employees = [];
    usedIds = new Set();

    deptOptions = [
        { label: 'IT', value: 'IT' },
        { label: 'HR', value: 'HR' },
        { label: 'Finance', value: 'Finance' }
    ];

    handleName(e) {
        this.name = e.target.value;
    }

    handleId(e) {
        this.empId = Number(e.target.value);
    }

    handleSalary(e) {
        this.salary = Number(e.target.value);
    }

    handleEmail(e) {
        this.email = e.target.value;
    }

    handleDept(e) {
        this.dept = e.detail.value;
    }

    handleDate(e) {
        this.joinDate = e.target.value;
    }

    handleSave() {

        if (!this.name || this.name.length < 3) {
            alert("Name must be at least 3 characters");
            return;
        }

        if (!this.empId || this.empId <= 0) {
            alert("Invalid Employee ID");
            return;
        }

        if (this.usedIds.has(this.empId)) {
            alert("Employee ID must be unique");
            return;
        }

        if (this.salary < 10000 || this.salary > 500000) {
            alert("Salary must be between 10k and 5L");
            return;
        }

        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(this.email)) {
            alert("Invalid email format");
            return;
        }

        if (!this.dept) {
            alert("Select department");
            return;
        }

        let today = new Date().toISOString().split("T")[0];
        if (this.joinDate > today) {
            alert("Joining date cannot be future");
            return;
        }

        // ✅ CORRECT ARRAY UPDATE (reactive)
        this.employees = [
            ...this.employees,
            {
                empId: this.empId,
                name: this.name,
                salary: this.salary,
                dept: this.dept
            }
        ];

        this.usedIds.add(this.empId);

        alert("Employee added successfully!");
    }
}