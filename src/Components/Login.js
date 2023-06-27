import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [username, usernameupdate] = useState("");
  const [password, passwordupdate] = useState("");

  const usenavigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  });

  const ProceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      ///implimentation
      // console.log('proceed');

      fetch("http://localhost:8000/user/" + username)
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          // console.log(resp)
          if (Object.keys(resp).length === 0) {
            toast.error("Please Enter valid username");
          } else {
            if (resp.password === password) {
              toast.success("Success");
              sessionStorage.setItem("username", username);
              usenavigate("/");
            } else {
              toast.error("Please Enter valid password");
            }
          }
        })
        .catch((err) => {
          toast.error("Login Failed due to :" + err.message);
        });
    }
  };
  const validate = () => {
    let result = true;
    if (username === "" || username === null) {
      result = false;
      toast.warning("Please Enter Username");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Please Enter Password");
    }
    return result;
  };

  return (
    <div className="TodoWrapper1">
      <div className="offset-lg-1 col-lg-10">
        <form onSubmit={ProceedLogin} className="container">
          <div >
            <div className="card-header">
              <h2>User Login</h2>
            </div>
            <br/>
            <div className="card-body">
              <div className="form-group">
                <label>
                  User Name <span className="errmsg">*</span>
                </label>
                <input
                  value={username}
                  onChange={(e) => usernameupdate(e.target.value)}
                  className="form-control"
                ></input>
              </div>
              <br/>
              <div className="form-group">
                <label>
                  Password <span className="errmsg">*</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => passwordupdate(e.target.value)}
                  className="form-control"
                ></input>
              </div>
            </div>
            <br/>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                {" "}
                Login{" "}
              </button>{" "}
              |
              <Link className="btn btn-success" to={"/register"}>
                {" "}
                New User
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;