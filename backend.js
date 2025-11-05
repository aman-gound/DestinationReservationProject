import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();


app.use(cors());
app.use(express.json());


const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "asdxc@123",
  database: "users", 
});

console.log(" MySQL connected successfully");


app.post("/api/booking", async (req, res) => {
  try {
    const { fname, lname, phone,  address, destination } = req.body;

   
    const values = [fname, lname, phone, address, destination];
    await db.query(
      "INSERT INTO booking(fname, lname, phone,  address, destination) VALUES (?)",
      [values]
    );

   
    const [rows] = await db.query("SELECT * FROM booking");
    console.log("All bookings:", rows);

    res.json({ message: "Booking saved successfully!", bookings: rows });
  } catch (err) {
    console.error("Error inserting booking:", err);
    res.status(500).json({ error: "Failed to save booking" });
  }
});


app.listen(3000, () => console.log("Server running on http://localhost:3000"));
