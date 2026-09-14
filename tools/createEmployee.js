import { z } from "zod";
import { createEmployee } from "../services/airtable.js";

export function registerCreateEmployeeTool(server) {
  server.registerTool(
    "createEmployee",
    {
      title: "Create Employee",
      description: "Create a new employee in Airtable",
      inputSchema: {
        employeeId: z.string().describe("Employee ID"),
        name: z.string().describe("Employee Name"),
        department: z.string().describe("Department"),
        designation: z.string().describe("Designation"),
        email: z.string().describe("Email Address"),
        phone: z.string().describe("Phone Number"),
        joiningDate: z.string().describe("Joining Date (YYYY-MM-DD)"),
        status: z.string().describe("Employee Status")
      }
    },
    async ({
      employeeId,
      name,
      department,
      designation,
      email,
      phone,
      joiningDate,
      status
    }) => {

      const result = await createEmployee({
        employeeId,
        name,
        department,
        designation,
        email,
        phone,
        joiningDate,
        status
      });

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  );
}