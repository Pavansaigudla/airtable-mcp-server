import { getDashboardData } from "../services/airtable.js";

export function registerDashboardTool(server) {
  server.registerTool(
    "dashboard",
    {
      title: "Employee Dashboard",
      description: "Get employee dashboard statistics",
      inputSchema: {}
    },
    async () => {

      const dashboard = await getDashboardData();

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(dashboard, null, 2)
          }
        ]
      };
    }
  );
}