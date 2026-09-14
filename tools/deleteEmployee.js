import { z } from "zod";
import { deleteEmployee } from "../services/airtable.js";

export function registerDeleteEmployeeTool(server) {
  server.registerTool(
    "deleteEmployee",
    {
      title: "Delete Employee",
      description: "Delete an employee from Airtable",
      inputSchema: {
        employeeId: z.string().describe("Employee ID")
      }
    },
    async ({ employeeId }) => {

      const result = await deleteEmployee(employeeId);

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