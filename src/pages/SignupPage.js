import {useNavigate, Link, /*useState*/} from "react-router-dom";
import "../styles/SignupPage.css";
import StarCanvas from "../components/starCanvas";
//import axios from "axios";
//import { withRouter } from "react-router-dom";
//import { API_BASE_URL } from "../components/apiConstants";

const SignupPage = () => {
    const navigate = useNavigate();
    /*
    const [state, setState] = useState({
        email: "",
        username: "",
        password: "",
        confirmPW: "",
        successMessage: null
    });

    const handleChange = (e) => {
        const {id, value} = e.target
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const sendToServer = () => {
        if (state.email.length && state.password.length) {
            props.showError(null);
            const payload = {
                "email": state.email,
                "password": state.password,
                "name": state.username
            }
            axios.post(API_BASE_URL + '/users', payload)
                .then(function (response) {
                    setState(prevState => ({
                        ...prevState, 
                        'successMessage' : 'Registration successful.'
                    }))
                    localStorage.setItem
                })
        }
    }
    */
    return (
        <div className="login-container">
            <h1 className="login-title">Sign Up</h1>
            <form>
                <input type="email" className="login-email" placeholder="email"/>
                <input type="text" className="userName" placeholder="username"/>
                <input type="password" className="login-password" placeholder="password"/>
                <input type="password" className="password-confirm" placeholder="confirm password"/>
            </form>
            <button className="signup-button" onClick={() => navigate("/journal")}>Sign Up</button>
            <p className="signin-text">Already have an account? <Link to="/Login" className="Signin-Link">Sign in!</Link></p>
            <StarCanvas />
        </div>
    );
};

export default SignupPage;