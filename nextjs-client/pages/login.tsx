import { useState } from 'react'
import axios from 'axios'

export default function Login(){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        const credentials = { username, password }

        const user = await axios.post('http://localhost:3000/auth/login', credentials).then()
        console.log(user.data)
    }
 
    return <>
        <h1>Login</h1>
        <form onSubmit={e=> handleSubmit(e)}>
        <input name='username' type="text" placeholder="username" value={username}
        onChange={e => setUsername(e.target.value)}></input>
        <input name="password" type="password" placeholder="password" value={password}
        onChange={e => setPassword(e.target.value)}></input>
        <button>Login</button>
        </form>
    </>
}