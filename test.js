import { getEmployees } from "./services/airtable.js";

async function test() {
  try {
    console.log("Fetching employees from Airtable...\n");

    const employees = await getEmployees();

    console.log(employees);
  } catch (error) {
    console.error("Test Failed!");
    console.error(error.message);
  }
}

test();