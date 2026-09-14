import { z } from "zod";
import { updateEmployee } from "../services/airtable.js";

export function registerUpdateEmployeeTool(server) {
  server.registerTool(
    "updateEmployee",
    {
      title: "Update Employee",
      description: "Update an existing employee in Airtable",
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

      const result = await updateEmployee({
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