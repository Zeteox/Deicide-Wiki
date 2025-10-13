import fs from "fs";
import { getAllAccounts, logUser } from "./dataUtils.js";

export async function runUnitTests() {
    console.log("--- Running unit tests ---");
    await testDataUtils();
    await validationTests();
    console.log("--- Unit tests completed ---");
}

async function testDataUtils() {
    const expectedAccounts = JSON.parse(fs.readFileSync("./data/accounts.json", "utf-8"));
    const actualAccounts = await getAllAccounts();
    console.log("getAllAccounts:", JSON.stringify(actualAccounts) === JSON.stringify(expectedAccounts) ? "pass" : "fail");
    // Additional tests to add here
}

async function validationTests() {
    const { validationService } = await import("../services/validationService.js");
    console.log("noNameFields:", (validationService('', 'test@mail.com', 'pwd').fields === "Missing required fields" ? "pass" : "fail"));
    console.log("noMailFields:", (validationService('name', '', 'pwd').fields === "Missing required fields" ? "pass" : "fail"));
    console.log("noPwdFields:", (validationService('name', 'test@mail.com', '').fields === "Missing required fields" ? "pass" : "fail"));
    console.log("badMailFormat:", (validationService('name', 'badmail', 'pwd').mail === "Format email is invalid" ? "pass" : "fail"));
    console.log("allGood:", (Object.keys(validationService('name', 'test@mail.com', 'pwd')).length === 0 ? "pass" : "fail"));
}