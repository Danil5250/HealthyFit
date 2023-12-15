import {useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from '../../../config/axios'


const Login = () => {

    const navigate = useNavigate()
 
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const ClearInput = () => {
        setLogin("");
        setPassword("")
    }

    const Sign = (e) => {
        e.preventDefault();

        axios.post('http://localhost:7770/api/auth/sign', {
            login : login,
            password : password
        })
        .then(v => {
            if(v.data === "") {
                navigate('/main')
            }
            else if(v.data === "admin")
                navigate('/admin')
            else {
                ClearInput();
                Swal.fire({
                    title: 'Помилка',
                    text: v.data,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });  
            }
        })
        
    }

    return (
        <div className='backgroundsea'>
            <h1 style={{padding: "0px 50px", backgroundColor: "snow", color:"indianred", fontStyle: "italic", fontWeight: "1000",
            boxShadow: "7px 10px 17px red", textAlign: "center"}}>HealthyFit</h1>
            <br />
            <div className="d-flex justify-content-center align-items-center">
                <h2 style={{textAlign:"center", backgroundColor: "rgba(25, 25, 224, 0.905)", fontWeight: "500", color: "white", width: "250px", borderRadius: "10px", fontSize: "25px"}}>Опишіть ваші данні</h2>
            </div>
            <div style={{textAlign: "left", margin: "5px"}}>
                <NavLink to='/' className="btn btn-outline-primary" >←Назад на головну</NavLink>
            </div>
            <br />
            <div className="d-flex justify-content-center align-items-center">
                <form onSubmit={e => Sign(e)} style={{width: "550px"}} >
                    <div className="input-group" style={{boxShadow: "1px 1px 10px rgb(174, 0, 255)"}}>
                        <label for="login" style={{backgroundColor: "bisque"}} className="input-group-text">Login: </label>
                        <input type="text" className="form-control" onChange={(e) => setLogin(e.target.value)} value={login} name="login" id="login" title="Ваш логін" placeholder="Ivan" required />
                    </div>
                    <br />
                    <div className="input-group" style={{boxShadow: "1px 1px 10px rgb(221, 13, 13)"}}>
                        <label for="password" style={{backgroundColor: "bisque"}} className="input-group-text">Пароль: </label>
                        <input type="password" className="form-control " onChange={ e => setPassword(e.target.value)} value={password} name="password" id="password" title="Ваш пароль" placeholder="Vy758Una" required />
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div style={{textAlign: "center"}}>
                        <input type="submit" name="Sign" id="Sign" style={{fontSize: "20px"}} className="btn btn-primary" value="Увійти" />
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </form>
            </div>
        </div>
    )
}

export {Login}