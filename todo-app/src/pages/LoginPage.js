import { useDispatch } from "react-redux";
import { useState } from "react";
import { loginUser } from "../features/auth/auth-slice-actions";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
export default function LoginPage() {
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        username: "",
        password: ""
    });

    const handleSubmitEvent = async (e) => {
        e.preventDefault();
        if (input.username !== "" && input.password !== "") {

            dispatch(loginUser({
                username: input.username,
                password: input.password
            }))

        }
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh",
            background: 'radial-gradient(50% 123.47% at 50% 50%, #00ff94 0%, #720059 100%)',
        }}>
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <form onSubmit={handleSubmitEvent} className="p-4 border rounded-3 shadow-sm bg-white">
                    <div className="text-center mb-4">
                        <h3 className="fw-bold">Login</h3>
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="usernameInput" className="form-label">Username</label>
                        <input
                            type="text"
                            name="username"
                            onChange={handleInput}
                            className="form-control"
                            id="usernameInput"
                            placeholder="Enter username"
                            value={input.username}
                        />
                    </div>

                    <div className="form-group mb-4">
                        <label htmlFor="passwordInput" className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleInput}
                            className="form-control"
                            id="passwordInput"
                            placeholder="Password"
                            value={input.password}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100 py-2">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}