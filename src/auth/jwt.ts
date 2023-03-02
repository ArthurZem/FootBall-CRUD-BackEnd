import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Define the secret for signing the JWT
const secret = "my-secret-key";

// Define the password for the user
const password = "password123";

// Hash the password using bcrypt
const hash = bcrypt.hashSync(password, 10);

// Check if the user's input password is correct
const isValid = bcrypt.compareSync("password123", hash);

if (isValid) {
  // Generate the JWT
  const token = jwt.sign({ userId: 123 }, secret);

  console.log(token); // Outputs the JWT
}