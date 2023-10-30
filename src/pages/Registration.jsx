import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUp } from "../redux/user/authOperations";

export const Registration = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function subHandler(e) {
    e.preventDefault();
    const values = { name, username, email, password };
    try {
      const action = await dispatch(signUp(values));
      if (action.error) {
        const error = new Error(action.payload.data.message);
        error.status = action.status;
        throw error;
      }
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div style={{ paddingTop: "100px" }}>Login page</div>
      <form>
        <input id="name" onChange={(e) => setName(e.target.value)} type="name" placeholder="name" />
        <input id="username" onChange={(e) => setUsername(e.target.value)} type="username" placeholder="username" />
        <input id="email" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
        <input id="password" onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" />

        <button type="submit" onClick={subHandler}>
          Log in
        </button>
      </form>
    </>
  );
};
