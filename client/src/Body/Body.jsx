import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "../../api/axios";
import { Link, useParams } from "react-router-dom";
import { IconButton, useScrollTrigger } from "@mui/material";
import { formatISO9075, format } from "date-fns";
import "./Body.css";
import userAuth from "../../context/context";
import { useNavigate, redirect } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import "./Body.css";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Points = ["Get Student List"];

export const Body = () => {
  const { user, setUser } = useContext(userAuth);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "400px",
      }}
    >
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
        }}
      >
        {Points.map((point) => {
          return (
            <Link to={`/${point}`}>
              <button
                style={{
                  padding: "10px 20px",
                  cursor: "pointer",
                  fontSize: "20px",
                  backgroundColor: "#E3232B",
                  border: "none",
                  color: "white",
                  borderRadius: "10px",
                }}
                className="lists"
              >
                See Attendance
              </button>
            </Link>
          );
        })}
      </ul>

      {Object.keys(user).length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link to={"/addstudent"}>
            <button
              style={{
                padding: "10px 20px",
                cursor: "pointer",
                fontSize: "20px",
                fontFamily: "Fira Code",
                backgroundColor: "#E3232B",
                border: "none",
                color: "white",
                margin: "15px 0px",
                borderRadius: "10px",
              }}
              className="lists"
            >
              Add Student
            </button>
          </Link>

          <Link to={"/takeattendance"}>
            <button
              style={{
                padding: "10px 20px",
                cursor: "pointer",
                fontSize: "20px",
                fontFamily: "Fira Code",
                backgroundColor: "#E3232B",
                border: "none",
                color: "white",
                margin: "15px 0px",
                borderRadius: "10px",
              }}
              className="lists"
            >
              Take Attendance
            </button>
          </Link>

          <Link to={"/updatedetails"}>
            <button
              style={{
                padding: "10px 20px",
                cursor: "pointer",
                fontSize: "20px",
                fontFamily: "Fira Code",
                backgroundColor: "#E3232B",
                border: "none",
                color: "white",
                margin: "15px 0px",
                borderRadius: "10px",
              }}
              className="lists"
            >
              Update Student Details
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

const GETSTUDENTS = "/getstudents";
const DELETE = "/delete";

export const Students = () => {
  const [loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);

  const { user, setUser } = useContext(userAuth);

  const DeleteStudent = (ev) => {
    ev.preventDefault();

    if (Object.keys(user).length > 0) {
      (async () => {
        try {
          const reponse = await axios.delete(DELETE, {
            data: {
              id: ev.target.value,
            },
          });
          console.log(reponse?.data?.data);
          setData(reponse?.data?.data);
        } catch (error) {
          console.error(error);
        }
      })();
    } else {
      alert("Please Login!!");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        console.log("Hello");
        const response = await axios.get(GETSTUDENTS);
        console.log(response?.data);
        setData(response?.data?.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "50px",
          }}
        >
          <h1 className="heads">Student List</h1>
          <table border={"#303030"} style={{ borderCollapse: "collapse" }}>
            <tr style={{ fontFamily: "Fira Code" }}>
              <th className="tex">Name</th>
              <th className="tex">USN</th>
              <th className="tex">COURSE</th>
              <th className="tex">Status</th>
              {Object.keys(user).length > 0 && <th>Delete ?</th>}
            </tr>
            {Data.map((users) => {
              return (
                <tr
                  style={{
                    fontFamily: "Fira Code",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  <td className="detail">{users.student_name}</td>
                  <td className="detail">{users.usn}</td>
                  <td className="detail">{users.course}</td>
                  <td
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    className="detail"
                  >
                    <Link to={`/Get Student List/${users.student_id}`}>
                      <button className="DetailButton">Details</button>
                    </Link>
                  </td>
                  {Object.keys(user).length > 0 && (
                    <td>
                      <button
                        style={{
                          padding: "5px 10px",
                          fontFamily: "Fira Code",
                          margin: "5px 10px",
                          backgroundColor: "red",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                        value={`${users.student_id}`}
                        onClick={DeleteStudent}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </table>
        </div>
      )}
    </>
  );
};

const STUDENTDETAILS = "/studentdetails";

export const StudentHistory = () => {
  const { student_id } = useParams();
  console.log(student_id);
  const [loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);

  const data = { student_id: student_id };

  useEffect(() => {
    try {
      (async () => {
        const response = await axios.post(STUDENTDETAILS, data);
        console.log(response?.data?.data);
        setData(response?.data?.data);
        setLoading(false);
      })();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {Data ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1
              style={{
                fontFamily: "Fira Code",
                padding: "5px 15px",
                fontSize: "18px",
              }}
            >
              {Data[0].student_name}
            </h1>
            <h1
              style={{
                fontFamily: "Fira Code",
                padding: "5px 15px",
                fontSize: "18px",
              }}
            >
              {Data[0].usn}
            </h1>
          </div>
          <h1 style={{ fontFamily: "Fira Code", margin: "15px 0px" }}>Dates</h1>
          {Data.map((date) => {
            return (
              <Link
                to={`/Get Student List/:${date.student_id}/${format(
                  date.attendance_time,
                  "yyyy-MM-d"
                )}`}
              >
                <li
                  style={{
                    fontFamily: "Fira Code",
                    listStyle: "none",
                    padding: "8px 0px",
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  {format(date.attendance_time, "d - MMM - yyyy")}
                </li>
              </Link>
            );
          })}
        </>
      ) : (
        <p>Attendance Record Not Found</p>
      )}
    </div>
  );
};

const INDIVIUAL_CLASS = "/indiviualclass";

export const IndiviualClass = () => {
  const { student_id, date } = useParams();
  const [loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);

  const Stud = student_id.substring(1, student_id.length);
  console.log(Stud);
  console.log(date);
  const data = {
    student_id: Stud,
    date: date,
  };

  useEffect(() => {
    try {
      (async () => {
        const response = await axios.post(INDIVIUAL_CLASS, data);
        console.log(response?.data);
        setData(response?.data?.data);
        setLoading(false);
      })();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return loading ? (
    <p>Loading</p>
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 className="Conheads">
        {" "}
        Classes Conducted On {format(Data[0].attendance_time, "yyyy-MM-d")}
      </h1>
      <table
        style={{ borderCollapse: "collapse" }}
        border={"1px solid #303030"}
      >
        {Data.map((subject) => {
          return (
            <tr className="att">
              <td
                style={{
                  backgroundColor:
                    subject.status == "present" ? "green" : "red",
                }}
                className="att"
              >
                {subject.sunject_name}
              </td>
              <td
                style={{
                  backgroundColor:
                    subject.status == "present" ? "green" : "red",
                }}
                className="att"
              >
                {subject.status}
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

const LOGIN = "/login";

export const Login = () => {
  const username = useRef(null);
  const password = useRef(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { user, setUser } = useContext(userAuth);

  const navigate = useNavigate();

  setTimeout(() => {
    setError(false);
  }, 3000);

  const submitHandler = (ev) => {
    ev.preventDefault();
    (async () => {
      try {
        const response = await axios.post(LOGIN, {
          data: {
            username: username.current.value,
            password: password.current.value,
          },
        });
        console.log(response?.data?.data);
        if (Array.isArray(response?.data?.data)) {
          setUser(response?.data?.data);
          navigate("/");
        } else {
          setErrorMessage(response?.data?.data);
          setError(true);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="loginDiv">
        <h1 style={{ fontFamily: "Fira Code" }}>Login Page</h1>
        <form
          onSubmit={submitHandler}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input
            className="inL"
            // style={{
            //   width: "300px",
            //   padding: "6px 16px",
            //   border: "2px solid black",
            //   borderRadius: "10px",
            //   fontSize: "16px",
            //   margin: "20px 10px",
            // }}
            ref={username}
            type="text"
            placeholder="Username ?"
            required
          />
          <input
            className="inL"
            required
            ref={password}
            type="password"
            placeholder="Password ?"
          />
          <p
            id="pp"
            style={{
              color: "#303030",
              fontSize: "12px",
              fontFamily: "Fira Code",
              cursor: "pointer",
            }}
          >
            <p style={{ textAlign: "center" }}>
              Contact the administration for registration
            </p>
          </p>
          <button
            style={{
              backgroundColor: "green",
              padding: "10px 25px",
              border: "none",
              borderRadius: "15px",
              color: "white",
              fontFamily: "Fira Code",
              margin: "10px 0px",
            }}
            type="submit"
          >
            Login
          </button>
        </form>
        {error && <p>{errorMessage}</p>}
      </div>
    </div>
  );
};

const ADDSTUDENT = "/addstudent";

const inputStyle = {
  width: "300px",
  padding: "10px 16px",
  border: "2px solid #303030",
  borderRadius: "10px",
  fontFamily: "Fira Code",
  fontSize: "16px",
  margin: "10px 10px",
};

export const AddStudent = () => {
  const username = useRef(null);
  const course = useRef(null);
  const usn = useRef(null);
  const gender = useRef(null);
  const section = useRef(null);
  const year = useRef(null);

  const navigate = useNavigate();

  const { user, setUser } = useContext(userAuth);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const submitHandler = (ev) => {
    ev.preventDefault();
    console.log(
      username.current.value,
      course.current.value,
      usn.current.value,
      gender.current.value,
      section.current.value,
      year.current.value
    );

    // const data = {
    //   username: username.current.value,
    //   course: course.current.value,
    //   usn: usn.current.value,
    //   gender: gender.current.value,
    //   section: section.current.value,
    //   year: year.current.value,
    // }
    if (Object.keys(user).length !== 0) {
      (async () => {
        try {
          const response = await axios.post(ADDSTUDENT, {
            data: {
              username: username.current.value,
              course: course.current.value,
              usn: usn.current.value,
              gender: gender.current.value,
              section: section.current.value,
              year: year.current.value,
            },
          });
          console.log(response?.data?.data);
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      })();
    } else {
      alert("Please Login !!");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 style={{ fontFamily: "Fira Code" }}>Student Registration</h1>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        onSubmit={submitHandler}
      >
        <input
          style={inputStyle}
          placeholder="Student Name"
          type="text"
          ref={username}
          required
        />
        <input
          style={inputStyle}
          placeholder="Student Course eg : CSE"
          type="text"
          ref={course}
          required
        />
        <input
          style={inputStyle}
          placeholder="Student USN eg : 1hk21xxxxx"
          type="text"
          ref={usn}
          required
        />
        <input
          style={inputStyle}
          placeholder="Student Gender eg : M"
          type="text"
          ref={gender}
          required
        />
        <input
          style={inputStyle}
          placeholder="Student Section eg : c"
          type="text"
          ref={section}
          required
        />
        <input
          style={inputStyle}
          placeholder="Student Year eg : 3"
          type="number"
          min={1}
          max={4}
          ref={year}
          required
        />
        <button
          style={{
            backgroundColor: "green",
            padding: "10px 40px",
            border: "none",
            fontSize: "20px",
            borderRadius: "15px",
            color: "white",
            fontFamily: "Fira Code",
            margin: "10px 0px",
          }}
          type="submit"
          required
        >
          Add
        </button>
      </form>
    </div>
  );
};

const TAKE_ATTENDANCE = "/takeattendance";

const Subjects = [
  {
    subject: " Automata And Comipler Design",
    id: "4ee0c505-5957-4970-9015-dab2f73f3f05",
  },

  {
    subject: "Computer Networks",
    id: "8725d84a-c701-4043-a510-2eacc06bf26f",
  },

  {
    subject: "Database Management System",
    id: "8fbe3863-fb23-47da-b681-1e20cfe9dd69",
  },

  {
    subject: "Artificial Intelligence And Machine Learning",
    id: "17fc2b7d-ab2b-4d2b-a144-8797de8a1093",
  },

  {
    subject: "Research Methodology and Intellectual Property",
    id: "acd8f161-169b-4acd-bb5a-aee0cc94798f",
  },

  {
    subject: "Environmental Studies",
    id: "a0295581-b6f6-4f73-b3e1-287115e0ce00",
  },
];

export const TakeAttendance = () => {
  const Style = {
    padding: "10px 30px",
    color: "white",
    backgroundColor: "#E3232B",
    fontFamily: "Fira Code",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    margin: "15px 10px",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "50px 10px",
      }}
    >
      <h1 style={{ fontFamily: "Fira Code" }}>Select Your Subject</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {Subjects.map((sub) => {
          return (
            <Link to={`/takeattendance/${sub.id}`}>
              <button style={Style} value={sub.id}>
                {sub.subject}
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const ATTENDANCE = "/takeattendance";

export const Attendance = () => {
  const { subid } = useParams();
  console.log(subid);

  const { user, setUser } = useContext(userAuth);

  const [loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState([]);

  console.log(attendance);

  const StateUpdater = (ev) => {
    const value = ev.target.value;
    setAttendance((prev) => [...prev, value]);
  };

  const AttendanceUpdater = (ev) => {
    ev.preventDefault();

    if (Object.keys(user).length > 0) {
      (async () => {
        try {
          const response = await axios.post(ATTENDANCE, {
            data: {
              subject_id: subid,
              student_data: attendance,
            },
          });

          console.log(response?.data);
        } catch (error) {
          console.error(error);
        }
      })();
      navigate("/");
    } else {
      alert("Please Login!!");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        console.log("Hello");
        const response = await axios.get(GETSTUDENTS);
        console.log(response?.data);
        setData(response?.data?.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "30px 0px",
          }}
        >
          <h1 style={{ fontFamily: "Fira Code", margin: "25px 10px" }}>
            Student List For Attendence
          </h1>
          <table
            border={"1px solid #303030"}
            style={{ borderCollapse: "collapse" }}
          >
            <tr style={{ fontFamily: "Fira Code" }}>
              <th className="tex">Name</th>
              <th className="tex">USN</th>
              <th className="tex">COURSE</th>
              <th className="tex">Details</th>
            </tr>
            {Data.map((user) => {
              return (
                <tr className="lists">
                  <td className="lists">{user.student_name}</td>
                  <td className="lists">{user.usn}</td>
                  <td className="lists">{user.course}</td>
                  <td>
                    <button
                      id="attend"
                      className="Gb"
                      value={`${user.student_id} present`}
                      onClick={StateUpdater}
                    >
                      Present
                    </button>
                    <button
                      id="attend"
                      className="Rb"
                      value={`${user.student_id} absent`}
                      onClick={StateUpdater}
                    >
                      Absent
                    </button>
                  </td>
                </tr>
              );
            })}
          </table>
          <button
            onClick={AttendanceUpdater}
            type="submit"
            style={{
              backgroundColor: "green",
              padding: "10px 30px",
              margin: "20px 20px",
              border: "none",
              borderRadius: "10px",
              color: "white",
              fontFamily: "Fira Code",
              fontSize: "16px",
            }}
          >
            Submit
          </button>
        </div>
      )}
    </>
  );
};

const UPDATE = "/updatedetails";

export const UpdateDetails = () => {
  const [Data, setData] = useState(null);
  const usn = useRef(null);

  const ClickHandler = (ev) => {
    ev.preventDefault();
    console.log(usn.current.value);

    (async () => {
      try {
        const response = await axios.post("/getstudentcond", {
          data: {
            usn: usn.current.value,
          },
        });
        setData(response?.data?.data);
        console.log(response?.data?.data);
      } catch (error) {}
    })();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <input
          ref={usn}
          type="text"
          style={{
            width: "300px",
            padding: "6px 16px",
            border: "2px solid black",
            borderRadius: "10px",
            fontSize: "16px",
            marginTop: "40px",
          }}
          placeholder="Enter the USN"
        />
        <p
          style={{
            color: "#303030",
            fontSize: "12px",
            fontFamily: "Fira Code",
            padding: "5px",
          }}
        >
          please enter in capital letters
        </p>
        <button
          style={{
            padding: "8px 20px",
            backgroundColor: "#303030",
            fontFamily: "Fira Code",
            color: "white",
            border: "none",
            borderRadius: "10px",
          }}
          onClick={ClickHandler}
        >
          Search
        </button>
      </div>
      <div style={{ margin: "30px 0px" }}>
        {Data &&
          (Data.length === 0 ? (
            <h1>No Data Found</h1>
          ) : (
            <div>
              {Data.map((user) => {
                return (
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to={`/updatedetails/${user.student_id}`}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "2px solid #303030",
                        padding: "5px 10px",
                        borderRadius: "10px",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "Fira Code",
                          fontSize: "20px",
                          margin: "0px",
                        }}
                      >
                        {user.student_name}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "Fira Code",
                            padding: "0px 5px",
                            fontSize: "16px",
                            margin: "0px",
                          }}
                        >
                          {user.course}
                        </p>
                        <p
                          style={{
                            fontFamily: "Fira Code",
                            padding: "0px 5px",
                            fontSize: "16px",
                            margin: "0px",
                          }}
                        >
                          {user.student_section}
                        </p>
                        <p
                          style={{
                            fontFamily: "Fira Code",
                            padding: "0px 5px",
                            fontSize: "16px",
                            margin: "0px",
                          }}
                        >
                          {user.student_year}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ))}
      </div>
    </div>
  );
};

let Change = [];

const GETSTUDENTSCOND = "/getstud";
const UPDATESTUDENT = "/updatestudent";

export const StudentDetails = () => {
  const { id } = useParams();
  const { user, setUser } = useContext(userAuth);
  const username = useRef(null);
  const course = useRef(null);
  const usn = useRef(null);
  const gender = useRef(null);
  const section = useRef(null);
  const year = useRef(null);

  const navigate = useNavigate();

  const Arrays = {
    student_name: null,
    course: null,
    usn: null,
    gender: null,
    student_section: null,
    student_year: null,
  };

  const [loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);

  const OnchangeName = () => (Arrays.student_name = username.current.value);
  const OnchangeCourse = () => (Arrays.course = course.current.value);
  const OnchangeUSN = () => (Arrays.usn = usn.current.value);
  const OnchangeGender = () => (Arrays.gender = gender.current.value);
  const OnchangeSection = () =>
    (Arrays.student_section = section.current.value);
  const OnchangeYear = () => (Arrays.student_year = year.current.value);

  const submitHandler = (ev) => {
    ev.preventDefault();
    console.log(Arrays);

    for (const key in Arrays) {
      if (Arrays[key] !== null && Arrays[key] !== " " && Arrays[key] !== "") {
        Change.push(`${key}='${Arrays[key]}'`);
      }
    }

    console.log(Object.keys(user));

    if (Object.keys(user).length > 0) {
      (async () => {
        try {
          const response = await axios.put(UPDATESTUDENT, {
            data: {
              array: Change,
              id: id,
            },
          });
          console.log(response?.data);
          Change = [];
        } catch (error) {
          console.error(error);
        }
      })();
      navigate("/Get Student List");
    } else {
      alert("Please Login!!");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        console.log("Hello");
        const response = await axios.post(GETSTUDENTSCOND, {
          data: {
            id: id,
          },
        });
        console.log(response?.data);
        setData(response?.data?.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return loading ? (
    <p>loading</p>
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
      }}
    >
      {Data.map((user) => {
        return (
          <div>
            <h1 style={{ fontFamily: "Fira Code" }}>Student Details</h1>
            <table border={"#303030"} style={{ borderCollapse: "collapse" }}>
              <tr>
                <td style={{ padding: "10px 20px", fontFamily: "Fira Code" }}>
                  Student Name
                </td>
                <td style={{ padding: "10px 20px", fontFamily: "Fira Code" }}>
                  {" "}
                  {user.student_name}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "10px 20px", fontFamily: "Fira Code" }}>
                  Student USN
                </td>
                <td style={{ padding: "10px 20px", fontFamily: "Fira Code" }}>
                  {" "}
                  {user.usn}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "10px 20px", fontFamily: "Fira Code" }}>
                  Student Course
                </td>
                <td style={{ padding: "10px 20px", fontFamily: "Fira Code" }}>
                  {user.course}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "10px 20px", fontFamily: "Fira Code" }}>
                  Student Section
                </td>
                <td style={{ padding: "10px 20px", fontFamily: "Fira Code" }}>
                  {" "}
                  {user.student_section}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "10px 20px", fontFamily: "Fira Code" }}>
                  Student Year
                </td>
                <td style={{ padding: "10px 20px", fontFamily: "Fira Code" }}>
                  {" "}
                  {user.student_year}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "10px 20px", fontFamily: "Fira Code" }}>
                  Student Gender{" "}
                </td>
                <td style={{ padding: "10px 20px", fontFamily: "Fira Code" }}>
                  {user.gender}
                </td>
              </tr>
            </table>
          </div>
        );
      })}

      <div>
        <h4 style={{ fontFamily: "Fira Code", color: "red" }}>
          ! Fill The Only Boxes You Need To Update !
        </h4>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          onSubmit={submitHandler}
        >
          <input
            style={inputStyle}
            placeholder="Student Name"
            type="text"
            ref={username}
            onChange={OnchangeName}
          />
          <input
            style={inputStyle}
            placeholder="Student Course eg : CSE"
            type="text"
            ref={course}
            onChange={OnchangeCourse}
          />
          <input
            style={inputStyle}
            placeholder="Student USN eg : 1hk21xxxxx"
            type="text"
            ref={usn}
            onChange={OnchangeUSN}
          />
          <input
            style={inputStyle}
            placeholder="Student Gender eg : M"
            type="text"
            ref={gender}
            onChange={OnchangeGender}
          />
          <input
            style={inputStyle}
            placeholder="Student Section eg : c"
            type="text"
            ref={section}
            onChange={OnchangeSection}
          />
          <input
            style={inputStyle}
            placeholder="Student Year eg : 3"
            type="number"
            min={1}
            max={4}
            ref={year}
            onChange={OnchangeYear}
          />
          <button
            style={{
              backgroundColor: "green",
              padding: "10px 40px",
              border: "none",
              fontSize: "20px",
              borderRadius: "15px",
              color: "white",
              fontFamily: "Fira Code",
              margin: "10px 0px",
            }}
            type="submit"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};
