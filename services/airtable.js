import Airtable from "airtable";
import dotenv from "dotenv";

dotenv.config();

const base = new Airtable({
  apiKey: process.env.AIRTABLE_TOKEN,
}).base(process.env.AIRTABLE_BASE_ID);

// Get all employees
export async function getEmployees() {
  try {
    const records = await base(process.env.AIRTABLE_TABLE_NAME)
      .select()
      .firstPage();

    return records.map((record) => ({
      id: record.id,
      ...record.fields,
    }));
  } catch (error) {
    console.error("Error reading Airtable:", error);
    throw error;
  }
}

// Get employee by name
export async function getEmployeeByName(employeeName) {
  try {
    const records = await base(process.env.AIRTABLE_TABLE_NAME)
      .select({
        filterByFormula: `{Name} = "${employeeName}"`,
      })
      .firstPage();

    return records.map((record) => ({
      id: record.id,
      ...record.fields,
    }));
  } catch (error) {
    console.error("Error searching employee:", error);
    throw error;
  }
}

// Create employee
// Create employee
export async function createEmployee(employee) {
  try {

    // Check if Employee ID already exists
    const existingEmployee = await base(process.env.AIRTABLE_TABLE_NAME)
      .select({
        filterByFormula: `{Employee ID} = "${employee.employeeId}"`,
      })
      .firstPage();

    if (existingEmployee.length > 0) {
      return {
        success: false,
        message: `Employee ID ${employee.employeeId} already exists.`,
      };
    }

    // Check if Email already exists
    const existingEmail = await base(process.env.AIRTABLE_TABLE_NAME)
      .select({
        filterByFormula: `{Email} = "${employee.email}"`,
      })
      .firstPage();

    if (existingEmail.length > 0) {
      return {
        success: false,
        message: `Email ${employee.email} already exists.`,
      };
    }

    // Create Employee
    const records = await base(process.env.AIRTABLE_TABLE_NAME).create([
      {
        fields: {
          "Employee ID": employee.employeeId,
          "Name": employee.name,
          "Department": employee.department,
          "Designation": employee.designation,
          "Email": employee.email,
          "Phone": employee.phone,
          "Joining Date": employee.joiningDate,
          "Status": employee.status,
        },
      },
    ]);

    return {
      success: true,
      message: "Employee created successfully.",
      employee: {
        recordId: records[0].id,
        employeeId: employee.employeeId,
        name: employee.name,
      },
    };

  } catch (error) {
    console.error("Error creating employee:", error);
    throw error;
  }
}

//update Employee
export async function updateEmployee(employee) {
  try {
    const records = await base(process.env.AIRTABLE_TABLE_NAME)
      .select({
        filterByFormula: `{Employee ID} = "${employee.employeeId}"`,
      })
      .firstPage();

    if (records.length === 0) {
      return {
        success: false,
        message: "Employee not found.",
      };
    }

    const record = records[0];

    await base(process.env.AIRTABLE_TABLE_NAME).update([
      {
        id: record.id,
        fields: {
          Name: employee.name,
          Department: employee.department,
          Designation: employee.designation,
          Email: employee.email,
          Phone: employee.phone,
          "Joining Date": employee.joiningDate,
          Status: employee.status,
        },
      },
    ]);

    return {
      success: true,
      message: "Employee updated successfully.",
    };
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
}

// Delete employee
export async function deleteEmployee(employeeId) {
  try {
    const records = await base(process.env.AIRTABLE_TABLE_NAME)
      .select({
        filterByFormula: `{Employee ID} = "${employeeId}"`,
      })
      .firstPage();

    if (records.length === 0) {
      return {
        success: false,
        message: "Employee not found.",
      };
    }

    const record = records[0];

    await base(process.env.AIRTABLE_TABLE_NAME).destroy([
      record.id,
    ]);

    return {
      success: true,
      message: "Employee deleted successfully.",
    };
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
}

// Dashboard statistics
export async function getDashboardData() {
  try {
    const employees = await getEmployees();

    const dashboard = {
      totalEmployees: employees.length,
      activeEmployees: 0,
      inactiveEmployees: 0,
      onLeaveEmployees: 0,
      departments: {},
    };

    employees.forEach((employee) => {

      if (employee.Status === "Active") {
        dashboard.activeEmployees++;
      }

      if (employee.Status === "Inactive") {
        dashboard.inactiveEmployees++;
      }

      if (employee.Status === "On Leave") {
        dashboard.onLeaveEmployees++;
      }

      const department = employee.Department;

      dashboard.departments[department] =
        (dashboard.departments[department] || 0) + 1;

    });

    return dashboard;

  } catch (error) {
    console.error("Error generating dashboard:", error);
    throw error;
  }
}

// Advanced Employee Search
export async function advancedEmployeeSearch(filters) {
  try {
    const conditions = [];

    if (filters.name) {
      conditions.push(`{Name} = "${filters.name}"`);
    }

    if (filters.department) {
      conditions.push(`{Department} = "${filters.department}"`);
    }

    if (filters.status) {
      conditions.push(`{Status} = "${filters.status}"`);
    }

    if (filters.designation) {
      conditions.push(`{Designation} = "${filters.designation}"`);
    }

    let filterFormula = "";

    if (conditions.length === 1) {
      filterFormula = conditions[0];
    } else if (conditions.length > 1) {
      filterFormula = `AND(${conditions.join(",")})`;
    }

    const records = await base(process.env.AIRTABLE_TABLE_NAME)
      .select(
        filterFormula
          ? {
              filterByFormula: filterFormula,
            }
          : {}
      )
      .firstPage();

    return records.map((record) => ({
      id: record.id,
      ...record.fields,
    }));
  } catch (error) {
    console.error("Error performing advanced search:", error);
    throw error;
  }
}