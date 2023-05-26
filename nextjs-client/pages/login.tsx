import LoginForm from "../components/login/LoginForm"
import Navbar from "../components/Navbar"

const LoginPage = () => {
    return <>
        <Navbar/>
        <div className="page">
            <h1 className="title">כניסת מנהל</h1>
            <LoginForm/>
        </div>
    </>
}

export default LoginPage