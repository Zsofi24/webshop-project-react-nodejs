import { nanoid } from "nanoid";
import bcrypt from 'bcrypt';

export const usersSeederData = [
    {
        id: "1r9fAAasdeMawe3_",
        email: "admin2@a.com",
        password: passwordHash('12345'),
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
  return bcrypt.hashSync(password, 10)
}

for (let i = 0; i < userNames.length; i++) {
    usersSeederData.push({
      id: nanoid(16),
      email: `teszt${i}@teszt.hu`,
      password: passwordHash("password"),
      username: userNames[i],
      isAdmin: false,
    });
}