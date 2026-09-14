import { z } from "zod";
import { advancedEmployeeSearch } from "../services/airtable.js";

export function registerAdvancedEmployeeSearchTool(server) {
  server.registerTool(
    "advancedEmployeeSearch",
    {
      title: "Advanced Employee Search",
      description: "Search employees using different fields",
      inputSchema: {
        searchBy: z.enum([
          "Name",
          "Department",
          "Status",
          "Designation",
          "Employee ID"
        ]),
        searchValue: z.string()
      }
    },
    async ({ searchBy, searchValue }) => {

      const result = await advancedEmployeeSearch({
        [searchBy.toLowerCase().replace(" ", "")]: searchValue
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