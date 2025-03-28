import {useNavigate, Link} from "react-router-dom";
import "../styles/LoginPage.css";
import StarCanvas from "../components/starCanvas";

const LoginPage = () => {
    const navigate = useNavigate();
    return (
        <div className="login-container">
            
            <h1 className="login-title">Log in</h1>
            <form>
                <input type="email" className="login-email" placeholder="email"/>
                <input type="password" className="login-password" placeholder="password"/>
            </form>
            <button className="login-button" onClick={() => navigate("/journal")}>Sign Up</button>
            <p className="signup-text">Don't have an account? <Link to="/Signup" className="Signup-Link">Sign up!</Link></p>
            <StarCanvas />
        </div>
    );
};

export default LoginPage;