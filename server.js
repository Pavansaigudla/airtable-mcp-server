import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import dotenv from "dotenv";

import { registerCreateEmployeeTool } from "./tools/createEmployee.js";
import { registerUpdateEmployeeTool } from "./tools/updateEmployee.js";
import { registerDeleteEmployeeTool } from "./tools/deleteEmployee.js";
import { registerDashboardTool } from "./tools/dashboard.js";
import { registerAdvancedEmployeeSearchTool } from "./tools/advancedEmployeeSearch.js";


dotenv.config();

const server = new McpServer({
  name: "airtable-mcp-server",
  version: "1.0.0",
});


registerCreateEmployeeTool(server);
registerUpdateEmployeeTool(server);
registerDeleteEmployeeTool(server);
registerDashboardTool(server);
registerAdvancedEmployeeSearchTool(server);



const transport = new StdioServerTransport();

await server.connect(transport);

console.error("MCP Server is running...");