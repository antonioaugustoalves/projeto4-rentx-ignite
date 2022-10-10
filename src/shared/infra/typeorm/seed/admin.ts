import { hash } from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import createConnection from "../index";

async function createUserAdmin() {
    const connection = await createConnection();
    const id = uuidv4();
    const password = hash("admin", 8);
    await connection.query(`
    INSERT INTO USERS
    (id, name, email, password, driver_license, isAdmin, created_at) 
    VALUES('${id}', 'Antonio Augusto Alves', 
    'antonio.admin-rentxcar@gmail.com', '${password}', '2322114412', true, 
    ${new Date()})
    `);
}

createUserAdmin().then(() => console.log("User admin created successfully"));
