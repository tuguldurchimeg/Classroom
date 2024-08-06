import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Generate a 256-bit (32 bytes) secret key
const secretKey = crypto.randomBytes(32).toString("hex");

// Path to your .env file
const envPath = path.resolve(__dirname, ".env");

// Check if .env file exists
if (!fs.existsSync(envPath)) {
  fs.writeFileSync(envPath, "");
}

// Read the existing content of .env file
const envContent = fs.readFileSync(envPath, "utf8");

// Check if SECRET_KEY already exists
if (envContent.includes("SECRET_KEY")) {
  console.log("SECRET_KEY already exists in .env file");
} else {
  // Append the secret key to the .env file
  fs.appendFileSync(envPath, `SECRET_KEY=${secretKey}\n`, {
    encoding: "utf8",
    flag: "a",
  });
  console.log(`Secret key generated and saved to .env file: ${secretKey}`);
}
