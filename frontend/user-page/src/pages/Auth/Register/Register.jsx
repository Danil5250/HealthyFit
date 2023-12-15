import {useReducer, useState, useRef} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from '../../../config/axios'




const Register = () => {

    const navigate = useNavigate();
    const [stat, setStat] = useState('')
    const [password, setPassword] = useState('')
    const [login, setLogin] = useState('')
    const [email, setEmail] = useState('')
    const [height, setHeight] = useState('')
    const [age, setAge] = useState('')
    const [weight, setWeight] = useState('')
    const [wantweight, setWantWeight] = useState('')
    const [eatkkal, setEatKkal] = useState('little')
    const [view, setView] = useState('thin') 
    const [wantView, setWantView] = useState('thin') 
    const [activity, setActivity] = useState('sitting') 
    const [goal, setGoal] = useState('loseweight') 

   const ClearInput = () => {
    setStat("")
    setPassword("")
    setLogin("")
    setEmail("")
    setHeight("")
    setAge("")
    setWeight('')
    setWantWeight('')
    setEatKkal('little')
    setView('thin')
    setWantView('thin')
    setActivity('sitting')
    setGoal('loseweight')
   }

    const RegisterSubmit = (e) => {
        e.preventDefault();

    
        axios.post(`http://localhost:7770/api/auth/register`, {
            login : login,
            password : password,
            email : email,
            height : height,
            age : age,
            weight: weight,
            wantWeight : wantweight,
            view : view,
            wantView : wantView,
            activity : activity,
            goal : goal,
            eatkkal: eatkkal,
            stat : stat
        })
            .then(v => {
                if(v.data === ""){
                    navigate('/main')
                }
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

    const SetRadio = (value) => {
        setStat(value)
    }


    return (
        <div className='backgroundsea'>
            <h1 style={{
                padding: "0px 50px", backgroundColor: "snow", color: "indianred", fontStyle: "italic", fontWeight: "1000",
                boxShadow: "7px 10px 17px red", textAlign: "center"
            }}>HealthyFit</h1>
            <br />
            <div className="d-flex justify-content-center align-items-center">
                <h2 style={{ textAlign: "center", backgroundColor: "rgba(25, 25, 224, 0.905)", fontWeight: "500", color: "white", width: "250px", borderRadius: "10px", fontSize: "25px" }}>Опишіть ваші данні</h2>

            </div>
            <div style={{ textAlign: "left", margin: "5px" }}>
                <NavLink to='/' className="btn btn-outline-primary" >←Назад на головну</NavLink>
            </div>
            <br />



            <div className="d-flex justify-content-center align-items-center">
                <form onSubmit={(e) => RegisterSubmit(e)} style={{ width: "550px" }} >
                    <div className="d-flex justify-content-center align-items-center" >
                        <div style={{ display: "flex", left: "50%" }} className="form-check">
                            <input type="radio" checked={stat === "Men"} onClick={() => SetRadio('Men')} name="Stat" style={{ boxShadow: "1px 1px 10px rgb(41, 45, 84)" }} className="form-check-input" value="Men" title="Виберіть стать" required /> <label className="form-check-label" style={{ backgroundColor: "bisque", borderRadius: "25px", margin: "0px 5px", padding: "0px 5px" }} >Чоловіча стать</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <input type="radio" checked={stat === "Women"} onClick={() => SetRadio('Women')} name="Stat" style={{ boxShadow: "1px 1px 10px rgba(255, 40, 158, 0.537)" }} className="form-check-input" value="Women" title="Виберіть стать" required /> <label className="form-check-label" style={{ backgroundColor: "bisque", borderRadius: "25px", margin: "0px 5px", padding: "0px 5px" }}>Жіноча стать</label>
                        </div>
                    </div>

                    <br />
                    <div className="input-group" style={{ boxShadow: "1px 1px 10px rgb(255, 204, 0)" }}>
                        <label htmlFor="login" style={{ backgroundColor: "bisque" }} className="input-group-text">Login: </label>
                        <input type="text" onChange={(e) => setLogin(e.target.value)} className="form-control " value={login} name="login" id="login" title="Ваш логін" placeholder="Ivan" required minLength={3} />
                    </div>
                    <br />
                    <div className="input-group" style={{ boxShadow: "1px 1px 10px rgb(0, 155, 48)" }}>
                        <label htmlFor="password" style={{ backgroundColor: "bisque" }} className="input-group-text">Пароль: </label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control " value={password} name="password" id="password" title="Ваш пароль" placeholder="Vy758Una" required minLength={3} />
                    </div>
                    <br />
                    <div className="input-group" style={{ boxShadow: "1px 1px 10px rgb(234, 110, 0)" }}>
                        <label htmlFor="email" style={{ backgroundColor: "bisque" }} className="input-group-text">Email: </label>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control " name="email" value={email} pattern="/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i" title="Ваш email" placeholder="Ivan@gmail.com" id="email" required />
                    </div>
                    <br />
                    <div className="input-group" style={{ boxShadow: "1px 1px 10px rgb(0, 155, 148)" }}>
                        <label htmlFor="height" style={{ backgroundColor: "bisque" }} className="input-group-text">Ваш зріст(см): </label>
                        <input type="number" onChange={(e) => setHeight(e.target.value)} className="form-control " value={height} name="height" min="20" max="250" id="height" placeholder="180" title="Ваш зріст" required />
                    </div>
                    <br />
                    <div className="input-group" style={{ boxShadow: "1px 1px 10px rgb(174, 0, 255)" }}>
                        <label style={{ backgroundColor: "bisque" }} className="input-group-text" htmlFor="age">Ваш вік: </label>
                        <input type="number" onChange={(e) => setAge(e.target.value)} className="form-control"value={age} name="age" min="5" max="200" id="age" placeholder="18" title="Ваш вік" required />
                    </div>
                    <br />
                    <div className="input-group" style={{ boxShadow: "1px 1px 10px rgb(0, 132, 21)" }}>
                        <label style={{ backgroundColor: "bisque" }} className="input-group-text" htmlFor="weight">Ваша вага: </label>
                        <input type="number" onChange={(e) => setWeight(e.target.value)} className="form-control" value={weight} name="weight" min="10" max="200" id="weight" placeholder="75" title="Ваша вага" required />
                    </div>
                    <br />
                    <div className="input-group" style={{ boxShadow: "1px 1px 10px rgb(155, 90, 26)" }}>
                        <label style={{ backgroundColor: "bisque" }} className="input-group-text" htmlFor="wantWeight">Ваша бажана вага: </label>
                        <input type="number" className="form-control" onChange={(e) => setWantWeight(e.target.value)} value={wantweight} name="wantWeight" style={{ width: "300px" }} min="10" max="200" id="wantWeight" placeholder="70" title="Ваша бажанана вага" required />
                    </div>
                    <br />
                    <div className="input-group" style={{ display: "flex", textAlign: "center", boxShadow: "1px 1px 10px rgb(8, 138, 224)" }}>
                        <label style={{ backgroundColor: "bisque" }} className="input-group-text" htmlFor="view" >Споживаєма кількість калорій у день: </label>
                        <select name="eatkkal" onChange={(e) => setEatKkal(e.target.value)} value={eatkkal} className="form-select" >
                            <option value="little">менше 2200 ккал</option>
                            <option value="medium">2200 - 2700 ккал</option>
                            <option value="alot">більше 2700 ккал</option>
                        </select>
                    </div>
                    <br />
                    <div className="input-group" style={{ display: "flex", textAlign: "center", boxShadow: "1px 1px 10px rgb(220, 68, 5)" }}>
                        <label style={{ backgroundColor: "bisque" }} className="input-group-text" htmlFor="view" >Тип тіла: </label>
                        <select name="view" onChange={(e) => setView(e.target.value)} value={view} className="form-select" >
                            <option value="thin">худий</option>
                            <option value="muscular">у формі</option>
                            <option value="thick">товстий</option>
                        </select>
                    </div>
                    <br />
                    <div className="input-group" style={{ display: "flex", textAlign: "center", boxShadow: "1px 1px 10px rgb(0, 129, 100)" }}>
                        <label style={{ backgroundColor: "bisque" }} className="input-group-text" htmlFor="wantView">Ваш бажаний тип тіла: </label>
                        <select name="wantView" onChange={(e) => setWantView(e.target.value)} value={wantView} className="form-select" id="wantView">
                            <option value="thin">худий</option>
                            <option value="muscular">у формі</option>
                            <option value="thick">товстий</option>
                        </select>
                    </div>
                    <br />
                    <div className="input-group" style={{ display: "flex", textAlign: "center", boxShadow: "1px 1px 10px rgb(254, 221, 0)" }}>
                        <label style={{ backgroundColor: "bisque" }} className="input-group-text" htmlFor="view" >Ваша активність: </label>
                        <select name="activity" onChange={(e) => setActivity(e.target.value)} value={activity} style={{ width: "300px" }} className="form-select" >
                            <option value="sitting">сидяча</option>
                            <option value="mixed">змішана</option>
                            <option value="active">активна</option>
                        </select>
                    </div>
                    <br />
                    <div className="input-group" style={{ boxShadow: "1px 1px 10px rgb(8, 138, 224)" }}>
                        <label style={{ backgroundColor: "bisque" }} className="input-group-text" htmlFor="wantView">Ваша ціль: </label>
                        <select name="goal" onChange={(e) => setGoal(e.target.value)} value={goal} className="form-select" id="Goal">
                            <option value="loseweight">схуднути</option>
                            <option value="keepinshape">підтримувати форму</option>
                            <option value="gainweight">набрати м'язову вагу</option>
                        </select>
                    </div>
                    <br />
                    <br />
                    <div style={{ textAlign: "center" }}>
                        <input type="submit" name="Reg" id="Reg" style={{ fontSize: "20px" }} className="btn btn-primary" value="Зареєструватися" />
                    </div>
                    <br />
                </form>
            </div>
        </div>


    )
}

export { Register }