import { useLogin } from '../../hooks/useLogin'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import styles from './login.module.css'
import axios from 'axios'

const LoginForm = () => {

    const [formState, setFormState] = useState({ username: "", password: ""})


    const handleSubmit = async () => {
        const user = await axios.post('http://localhost:3000/auth/login', formState)
        console.log(user)
    }

    return (
        <form 
        className={styles.login_form}
        onSubmit={e => {
            e.preventDefault()
            handleSubmit()
        }}
        >
            <div className={styles.login_section}>
                <label>שם משתמש:</label>
                <div className={styles.input_line}>
                    <FontAwesomeIcon icon='user' />
                    <input
                    required
                    name="username"
                    value={formState.username}
                    onChange={e => setFormState({...formState, username: e.target.value})}
                    />
                </div>
            </div>
            <div className={styles.login_section}>
                <label>סיסמא:</label>
                <div className={styles.input_line}>
                    <FontAwesomeIcon icon='lock' />
                    <input 
                    required
                    name="password"
                    type='password'
                    value={formState.password}
                    onChange={e => setFormState({...formState, password: e.target.value})}
                    />
                </div>
                
            </div>
            <button className={styles.button}>
                <FontAwesomeIcon icon='right-to-bracket'/>
                {" " + "התחבר"}
            </button>
        </form>
    )
}

export default LoginForm