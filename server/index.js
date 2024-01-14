import express, { query } from "express";
import dotenv from "dotenv";
import pool from "./db.js";
import cors from "cors";
import bodyParser from "body-parser";
import pgPromise from "pg-promise";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/getstudents", async (req, res) => {
  console.log("Ho");
  try {
    const users = await pool.query("select * from students");
    res.status(200).json({ data: users.rows });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/studentdetails", async (req, res) => {
  const { student_id } = req.body;
  console.log(typeof student_id);
  const query = `
      SELECT *
      FROM students 
      JOIN attendance ON students.student_id = attendance.student_id 
      JOIN subjects ON attendance.subject_id = subjects.suject_id 
      WHERE students.student_id = $1  order by attendance.attendance_time;
    `;

  try {
    console.log(req.body.student_id);
    const users = await pool.query(query, [student_id]);
    if (users.rows.length === 0) {
      return res.status(200).json({ message: "No Attendance Available" });
    }
    res.status(200).json({ data: users.rows });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.post("/indiviualclass", async (req, res) => {
  const { student_id, date } = req.body;

  const sqlQuery = `
  SELECT * 
  FROM students 
  JOIN attendance ON attendance.student_id = students.student_id 
  JOIN subjects ON attendance.subject_id = subjects.suject_id 
  WHERE students.student_id = $1 AND attendance.attendance_time::date = $2;
`;

  try {
    const classes = await pool.query(sqlQuery, [student_id, date]);
    res.status(200).json({ data: classes.rows });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  console.log(req.body?.data);
  const { username, password } = req?.body?.data;

  console.log(username);
  console.log(password);

  const query = `
    select * from staffadmin where admin_username = $1 and password = $2
  `;
  try {
    const user = await pool.query(query, [username, password]);

    if (user.rows.length === 0)
      return res
        .status(200)
        .json({ data: "No user found or recheck your credentials" });

    res.status(200).json({ data: user.rows });
  } catch (error) {
    res.status(400).json({ data: "Unable to communicate with server" + error });
  }
});

app.post("/addstudent", async (req, res) => {
  console.log(req?.body?.data);
  const { username, course, usn, gender, section, year } = req?.body?.data;

  try {
    await pool.query("insert into students values ($1, $2, $3, $4, $5, $6)", [
      username,
      course,
      usn,
      gender,
      section,
      year,
    ]);
    res.status(200).json({ data: "success" });
  } catch (error) {
    res.status(200).json({ data: error });
  }
});

app.post("/takeattendance", async (req, res) => {
  console.log(req.body);

  const StudentAttendance = req?.body?.data?.student_data;
  const Subject_id = req?.body?.data?.subject_id;

  console.log("This is : " + Subject_id);

  console.log(StudentAttendance);

  const query = `insert into attendance values ($1, $2, $3, current_timestamp`;

  try {
    // StudentAttendance.map(async (stud) => {
    //   const Data = stud.split(" ");
    //   console.log(Data);
    //   await pool.query(query, [Data[0], Subject_id, Data[1]]);
    // });

    StudentAttendance.forEach((data, index) => {
      const Data = data.split(" ");
      const query = {
        text: "INSERT INTO attendance VALUES ($1, $2, $3, current_timestamp)",
        values: [Data[0], Subject_id, Data[1]],
      };

      pool.query(query, (error, result) => {
        if (error) {
          console.error(`Error inserting data at index ${index}:`, error);
        }
      });
    });

    res.status(200).send({ data: "Data inserted successfully" });
  } catch (error) {
    res.status(200).json({ data: error });
  }
});

app.delete("/delete", async (req, res) => {
  console.log(req.body);
  const { id } = req?.body;

  try {
    await pool.query("delete from students where student_id = $1", [id]);
    const users = await pool.query("select * from students");
    res.status(200).json({ data: users.rows });
  } catch (error) {
    res.status(200).json({ data: error });
  }
});

app.post("/getstudentcond", async (req, res) => {
  console.log(req.body?.data?.usn);

  const usn = req.body?.data?.usn;

  try {
    const users = await pool.query("select * from students where usn = $1", [
      usn,
    ]);
      res.status(200).json({ data: users.rows });
  } catch (error) {
    res.status(200).json({data : error})
  }
});

app.post("/getstud", async (req, res) => {
  try {
    const user = await pool.query('select * from students where student_id = $1', [req?.body?.data?.id])
    res.status(200).json({data : user.rows})
  } catch (error) {
    res.status(400).json({data : error})
  }
});

app.put("/updatestudent", async (req, res) => {
  console.log(req.body);

  const arr = req?.body?.data?.array

  const Concatenator = () => {
    let str = arr[0]

   for (let i = 1; i < arr.length; i++) {
     str += ", " + arr[i] 
    }
    
    return str
  }

  const query = `
    update students set ${Concatenator()} where student_id = $1
  `

  console.log(query);

  try {
    await pool.query(query, [req?.body?.data?.id])
    const users = await pool.query("select * from students");
    res.status(200).json({ data: users.rows });
  } catch (error) {
    console.log(error);
    res.status(200).json({ message: error });
  }
});

app.listen(5000, () => {
  console.log("database connect success...");
  console.log("server is listening...");
});
