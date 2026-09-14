# Airtable MCP Server

A production-ready MCP Server built using **Node.js**, **Model Context Protocol (MCP)**, and **Airtable**.

This project demonstrates how AI clients can securely interact with Airtable using MCP tools.

---

## Features

- Search Employee
- Advanced Employee Search
- Create Employee
- Update Employee
- Delete Employee
- Employee Dashboard
- Duplicate Employee ID Validation
- Duplicate Email Validation

---

## Tech Stack

- Node.js
- MCP SDK (v1.30.0)
- Airtable
- Zod
- Dotenv

---

## Project Structure

```text
airtable-mcp-server/

services/
tools/
docs/
screenshots/

server.js
package.json
README.md
.env.example
```

---

## Available MCP Tools

| Tool | Description |
|------|-------------|
| Search Employee | Search employee by name |
| Advanced Employee Search | Search using Department, Status, Designation, Employee ID |
| Create Employee | Create a new employee |
| Update Employee | Update employee details |
| Delete Employee | Delete an employee |
| Dashboard | Employee statistics |

---

## Installation

```bash
npm install
```

---

## Configuration

Create a `.env` file using `.env.example`

```env
AIRTABLE_TOKEN=your_personal_access_token
AIRTABLE_BASE_ID=your_base_id
AIRTABLE_TABLE_NAME=Employee information
```

---

## Run

```bash
npm start
```

---

## Project Architecture

```
ChatGPT / Claude / MCP Inspector
            │
            ▼
      MCP Server
            │
            ▼
      Employee Tools
            │
            ▼
     Airtable Service
            │
            ▼
         Airtable
```

---

## Future Enhancements

- Bulk Employee Import
- Bulk Employee Update
- AI Powered Employee Assistant
- Employee Reports
- Employee Analytics
- Integration with Airtable Official MCP

---

## Author

**Pavansai Gudla**