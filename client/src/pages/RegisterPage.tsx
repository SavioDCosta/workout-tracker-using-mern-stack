import { FormEvent, useState } from "react";
import useRegisterContext from "../hooks/useRegisterContext";

const RegisterPage: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { register, error, isLoading } = useRegisterContext();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await register(firstName, lastName, email, password);
  };

  return (
    <form className="register" onSubmit={handleSubmit}>
      <h3>Register</h3>
      <label>First Name: </label>
      <input
        type="text"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
      />
      <label>Last Name: </label>
      <input
        type="text"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
      />
      <label>Email: </label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password: </label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button disabled={isLoading}>Register</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default RegisterPage;
