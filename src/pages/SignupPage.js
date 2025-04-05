import {useNavigate, Link} from "react-router-dom";
import "../styles/SignupPage.css";

const SignupPage = () => {
    const navigate = useNavigate();
    return (
        <div className="login-container">
            <h1 className="login-title">Sign Up</h1>
            <form>
                <input type="email" className="login-email" placeholder="email"/>
                <input type="password" className="login-password" placeholder="password"/>
                <input type="password" className="password-confirm" placeholder="confirm password"/>
            </form>
            <button className="signup-button" onClick={() => navigate("/journal")}>Sign Up</button>
            <p className="signin-text">Already have an account? <Link to="/Login" className="Signin-Link">Sign in!</Link></p>
        </div>
    );
};

export default SignupPage;