import { nanoid } from "nanoid";
import bcrypt from 'bcrypt';

export const usersSeederData = [
    {
        id: "1r9fAAasdeMawe3_",
        email: "admin2@a.com",
        password: "12345",
        username: "admin2",
        isAdmin: true,
    }
]

const userNames = [
    "hellobello12",
    "chucky20",
    "Kirsky",
    "Chidle",
    "elrotry",
    "Quertyy"
]

function passwordHash(password) {
  const saltRounds = 10;

  const hashedPassword = new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function(err, hash) {
      if (err) reject(err)
      resolve(hash)
    });
  })

  return hashedPassword
}

for (let i = 0; i < userNames.length; i++) {
    usersSeederData.push({
      id: nanoid(16),
      email: `teszt${i}@teszt.hu`,
      password: "password",
      username: userNames[i],
      isAdmin: false,
    });
}