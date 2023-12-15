import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import axios from '../../../config/axios'
import { baseUrlMain } from "../../../config/config"
import Cookies from "js-cookie"
import Swal from 'sweetalert2'
import { Navigate } from "react-router-dom"


const ThrowChallenge = () => {

    const [isShowAllUsers, setIsShowAllUsers] = useState(false)
    const [usersLogins, setUserLogins] = useState([])
    const [opponentLogin, setOpponentLogin] = useState('')
    const [criterion, setCriterion] = useState('morelean')

    useEffect( () => {
        if(isShowAllUsers)
        {
            axios.post(baseUrlMain + "getuserslogin", {})
            .then(res => {
                setUserLogins(res.data)
            })
        }
    }, [isShowAllUsers])

    const startChallenge = async(e) => {
        e.preventDefault();
        if(opponentLogin === Cookies.get("login"))
        {
            Swal.fire({
                title:"Ви не можете змагатись з собою!"
            });
        }
        else
        {
            axios.post(baseUrlMain + "getchallengewinner", {
                opponentlogin : opponentLogin,
                criterion : criterion                
            })
            .then(res => {
                Swal.fire({
                    title:res.data
                })
            })
        }
        setOpponentLogin('')

        
    }

    if (Cookies.get("login") && Cookies.get('token')) {
        return (
            <div>

                <div className="card text-bg-primary mb-3" style={{margin:'1%'}}>
                    <div className="card-header"><h3>Заповнювання форми для початку челленджу</h3></div>
                    <div className="card-body">
                        <h5 className="card-title">Напишіть ім'я користувача, з яким хочете змагатись</h5>
                        <form onSubmit={e => { startChallenge(e) }}>
                            <p className="card-text"><input type="text" onChange={(e) => { setOpponentLogin(e.target.value) }} value={opponentLogin} className="form-control" placeholder="Ім'я користувача" required /></p>
                            <h5 className="card-title">Критерії змагання</h5>
                            <p className="card-text">
                                <select className="form-select" onChange={(e) => setCriterion(e.target.value)} value={criterion} placeholder="Ім'я користувача">
                                    <option value="morelean">Хто є більш худим</option>
                                    <option value="morebig">Хто є більшим</option>
                                </select></p>
                            <button type="submit" style={{fontWeight:'600'}} className="btn btn-danger">Почати челлендж</button>
                        </form>

                    </div>
                </div>
                <br />
                <br />
                <div style={{textAlign:"center"}}>
                    <button className="btn btn-success" style={{margin:'1%', fontSize:'1.5rem', fontWeight:'600'}} type="button" onClick={() => setIsShowAllUsers(!isShowAllUsers)}>Показати/сховати користувачів</button>
                </div>
                <br />
                <br />
                <div style={{ display: "flex", flexDirection: "row", margin:'1%' }}>
                    {
                        isShowAllUsers ?
                            <div className="card" style={{ display: "flex", flexDirection: "row", backgroundColor:'grey' }}>
                                {
                                    usersLogins.map((item, index) => {
                                        return (
                                            <div class="alert alert-success" role="alert" style={{ margin: '7px', padding: '7px', fontWeight: '600' }}>{item}</div>
                                        )
                                    })
                                }

                            </div>

                            :
                            null
                    }
                </div>
            </div>
        )
    }
    else
        return (
            <Navigate to={'/'} />
        )
}

export { ThrowChallenge }