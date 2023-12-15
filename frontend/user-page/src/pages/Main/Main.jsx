import { NavLink, Navigate, useLocation, useNavigate } from "react-router-dom"
import axios from '../../config/axios'
import config, { baseUrlMain } from '../../config/config'
import cookies from 'js-cookie'
import './Layouts/Layout.css'
import { useEffect, useState } from "react"
import './Main.css'
import Swal from "sweetalert2"

const Main = () => {
    const [myweight1, SetMyWeight1] = useState(0)
    const [myvolumeT1, SetMyVolumeT1] = useState(0)
    const [myvolumeB1, SetVolumeB1] = useState(0)
    const [myvolumeA1, SetMyVolumeA1] = useState(0)
    
    const [myweight2, SetMyWeight2] = useState(0)
    const [myvolumeT2, SetMyVolumeT2] = useState(0)
    const [myvolumeB2, SetVolumeB2] = useState(0)
    const [myvolumeA2, SetMyVolumeA2] = useState(0)
    
    const [myweight3, SetMyWeight3] = useState(0)
    const [myvolumeT3, SetMyVolumeT3] = useState(0)
    const [myvolumeB3, SetVolumeB3] = useState(0)
    const [myvolumeA3, SetMyVolumeA3] = useState(0)
    
    const [myweight4, SetMyWeight4] = useState(0)
    const [myvolumeT4, SetMyVolumeT4] = useState(0)
    const [myvolumeB4, SetVolumeB4] = useState(0)
    const [myvolumeA4, SetMyVolumeA4] = useState(0)

    const [isChangeData, setIsChangeData] = useState(false)
    
    const login = cookies.get('login')
    const [weight, setWeight] = useState(30)
    const [user, setUser] = useState({})
    const [isShowCalendar, setIsShowCalendar] = useState(false)

    const [isShowChangeWeight, setIsShowChangeWeight] = useState(false)
    const [changeWeightData, setChangeWeightData] = useState('')

    const changeWeight = () => {
        setIsShowChangeWeight(!isShowChangeWeight)
    }

    const getAll = () => {
        axios.get(baseUrlMain + "userdata")
            .then(res => {
                setUser(res.data)
            })
            .catch(err => { })
    }

    const loadArchivements = () => {
        axios.post(baseUrlMain + "getuserarchivements", {})
        .then(res => {
            let str = res.data.first
            str = String(str).split(' ')
            Number(str[0]) > 0 ? SetMyWeight1(Number(str[0])) : SetMyWeight1(user.weight)
            Number(str[1]) > 0 ? SetMyVolumeT1(str[1]) : SetMyVolumeT1(50)
            Number(str[2]) > 0 ? SetVolumeB1(str[2]) : SetVolumeB1(50)
            Number(str[3]) > 0 ? SetMyVolumeA1(str[3]) : SetMyVolumeA1(50)
            str = res.data.second
            str = String(str).split(' ')
            Number(str[0]) > 0 ? SetMyWeight2(str[0]) : SetMyWeight2(user.weight)
            Number(str[1]) > 0 ? SetMyVolumeT2(str[1]) : SetMyVolumeT2(50)
            Number(str[2]) > 0 ? SetVolumeB2(str[2]) : SetVolumeB2(50)
            Number(str[3]) > 0 ? SetMyVolumeA2(str[3]) : SetMyVolumeA2(50)
            str = res.data.third
            str = String(str).split(' ')
            Number(str[0]) > 0 ? SetMyWeight3(str[0]) : SetMyWeight3(user.weight)
            Number(str[1]) > 0 ? SetMyVolumeT3(str[1]) : SetMyVolumeT3(50)
            Number(str[2]) > 0 ? SetVolumeB3(str[2]) : SetVolumeB3(50)
            Number(str[3]) > 0 ? SetMyVolumeA3(str[3]) : SetMyVolumeA3(50)
            str = res.data.fourth
            str = String(str).split(' ')
            Number(str[0]) > 0 ? SetMyWeight4(str[0]) : SetMyWeight4(user.weight)
            Number(str[1]) > 0 ? SetMyVolumeT4(str[1]) : SetMyVolumeT4(50)
            Number(str[2]) > 0 ? SetVolumeB4(str[2]) : SetVolumeB4(50)
            Number(str[3]) > 0 ? SetMyVolumeA4(str[3]) : SetMyVolumeA4(50)

            console.log(myweight1)
        })
    }

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        getAll();

    }, [weight, changeWeightData])

    const WeightChangeSubmit = (e) => {
        e.preventDefault();
        if (changeWeightData > 30 && changeWeightData < 250) {
            axios.post(baseUrlMain + 'changeweight', {
                weight: changeWeightData
            })
                .then(res => Swal.fire({
                    title: res.data
                }))
        }
        else
            Swal.fire({ title: "Неккоректні дані" })

        setChangeWeightData('')
        setIsShowChangeWeight(false)
        getAll()

    }



    const addData = () => {
        if (myweight1 > 250 || myweight2 > 250 || myweight3 > 250 || myweight4 > 250 || myweight1 < 20 || myweight2 < 20 || myweight3 < 20 || myweight4 < 20 ||
            myvolumeT1 < 40 || myvolumeT2 < 40 || myvolumeT3 < 40 || myvolumeT4 < 40 || myvolumeT1 > 250 || myvolumeT2 > 250 || myvolumeT3 > 250 || myvolumeT4 > 250 ||
            myvolumeB1 < 3 || myvolumeB2 < 3 || myvolumeB3 < 3 || myvolumeB4 < 3 || myvolumeB1 > 200 || myvolumeB2 > 200 || myvolumeB3 > 200 || myvolumeB4 > 200 ||
            myvolumeA1 < 3 || myvolumeA2 < 3 || myvolumeA3 < 3 || myvolumeA4 < 3 || myvolumeA1 > 200 || myvolumeA2 > 200 || myvolumeA3 > 200 || myvolumeA4 > 200) {
            Swal.fire({
                title: "Неккорктні дані"
            })
        }
        else {
            let First = `${myweight1} ${myvolumeT1} ${myvolumeB1} ${myvolumeA1}`
            let Second = `${myweight2} ${myvolumeT2} ${myvolumeB2} ${myvolumeA2}`
            let Third = `${myweight3} ${myvolumeT3} ${myvolumeB3} ${myvolumeA3}`
            let Fourth = `${myweight4} ${myvolumeT4} ${myvolumeB4} ${myvolumeA4}`
            axios.post(baseUrlMain + "updateuseradvertisment", {
                first: First,
                second: Second,
                third: Third,
                fourth: Fourth
            })
                .then(res => setIsChangeData(false))
        }
    }


    if (cookies.get("login") && cookies.get('token')) {
        return (

            <div>
                <div>
                    <h1 style={{ backgroundColor: 'white' }}>Мій кабінет</h1>
                </div>

                <br />
                <br />

                <div className="text-center">
                    <div className="row">

                        <div className="col-4 p-1 mb-1" style={{ width: "20%" }}>
                            <div className="card text-bg-secondary" style={{ width: "150%", backgroundColor: "rgb(0, 177, 247)", margin: "30px" }}>
                                <div className="card-header"><h2>{login}</h2></div>
                                <div className="card-body">
                                    <menu>
                                        <h5 style={{ fontWeight: '600' }}>Ваша вага: <k style={{ color: "red" }}>{user.weight}</k></h5>
                                        <button className="btn btn-success" style={{ fontSize: '1.2rem', fontWeight: '600' }} onClick={e => changeWeight()}>Змінити вагу</button>
                                        <br />
                                        {
                                            isShowChangeWeight ?
                                                <form onSubmit={(e) => WeightChangeSubmit(e)} style={{ display: 'flex' }}>
                                                    <input type="number" className="form-control" placeholder='Ваша вага' onChange={(e) => setChangeWeightData(e.target.value)} value={changeWeightData} />
                                                    <button type="submit" style={{ fontSize: '1.2rem', fontWeight: '600' }} className="btn btn-outline-light">Змінити</button>
                                                </form>
                                                :
                                                null
                                        }
                                        <br />
                                        <h5 style={{ fontWeight: '600' }}>Ваш ІМТ індекс: <k style={{ color: "red" }}>{Math.round(user.weight / ((user.height / 100) * (user.height / 100))) ? Math.round(user.weight / ((user.height / 100) * (user.height / 100))) : null}</k></h5>
                                    </menu>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-9 p-1" style={{textAlign:"center"}}>
                            <br />
                            <br />
                            <br />
                            <div className="card text-bg-secondary" style={{ textAlign: "center", width: "80%", margin: '0% 20%', borderRadius: '15px', }}>
                                <h3 className="card-header" style={{ fontWeight: '600' }}>Ваша особиста програма для тіла-мрії:</h3>
                                <div >
                                    <div style={{ textAlign: "center", margin: "10px", display: "inline-block"}}>
                                        <button className="btn btn-outline-light" style={{ fontSize: '1.2rem', fontWeight: '600', color:"white" }}><NavLink to={'/train'} >Тренування</NavLink></button>
                                    </div>

                                    <div style={{ textAlign: "center", margin: "10px", display: "inline-block" }}>
                                        <button className="btn btn-outline-light" style={{ fontSize: '1.2rem', fontWeight: '600' }}><NavLink to={'/food'} >Харчування</NavLink></button>
                                    </div>

                                    <div style={{ textAlign: "center", margin: "10px", display: "inline-block" }}>
                                        <button className="btn btn-outline-light" style={{ fontSize: '1.2rem', fontWeight: '600' }} onClick={() => { loadArchivements(); setIsShowCalendar(!isShowCalendar) }}><NavLink>Трекер схуднення</NavLink></button>
                                    </div>

                                    <div style={{ textAlign: "center", margin: "10px", display: "inline-block" }}>
                                        <button className="btn btn-outline-light" style={{ fontSize: '1.2rem', fontWeight: '600' }}><NavLink to={'/challenge'} >Кинути челендж</NavLink></button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {
                            isShowCalendar ?
                                <div className="card text-bg-info" style={{margin:"0% 0% 0% 3%", width:"95%"}}>
                                    <div className="card-header"><h3 style={{fontWeight:'600'}}>Ваші досягнення</h3></div>
                                    <div className="card-body">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                <th scope="col">№ тижня</th>
                                                <th scope="col">Моя вага</th>
                                                <th scope="col">Об'єм талії</th>
                                                <th scope="col">Об'єм бедер</th>
                                                <th scope="col">Обхват руки зверху</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td scope="row">1</td>
                                                    <td><input id="liveToastBtn" type="number" className="form-control" onChange={(e) => {setIsChangeData(true); SetMyWeight1(e.target.value)}} value={myweight1} /></td>
                                                    <td><input type="number" className="form-control" onChange={(e) => {setIsChangeData(true); SetMyVolumeT1(e.target.value)}} value={myvolumeT1} /></td>
                                                    <td><input type="number" className="form-control" onChange={(e) => {setIsChangeData(true); SetVolumeB1(e.target.value)}} value={myvolumeB1} /></td>
                                                    <td><input type="number" className="form-control" onChange={(e) => {setIsChangeData(true); SetMyVolumeA1(e.target.value)}} value={myvolumeA1} /></td>
                                                </tr>
                                                <tr>
                                                    <td scope="row">2</td>
                                                    <td><input type="number" className="form-control" onChange={(e) => {setIsChangeData(true); SetMyWeight2(e.target.value)}} value={myweight2} /></td>
                                                    <td><input type="number" className="form-control" onChange={(e) => {setIsChangeData(true); SetMyVolumeT2(e.target.value)}} value={myvolumeT2} /></td>
                                                    <td><input type="number" className="form-control" onChange={(e) => {setIsChangeData(true); SetVolumeB2(e.target.value)}} value={myvolumeB2} /></td>
                                                    <td><input type="number" className="form-control" onChange={(e) => {setIsChangeData(true); SetMyVolumeA2(e.target.value)}} value={myvolumeA2} /></td>
                                                </tr>
                                                <tr>
                                                    <td scope="row">3</td>
                                                    <td><input type="number" className="form-control" onChange={(e) => {setIsChangeData(true); SetMyWeight3(e.target.value)}} value={myweight3} /></td>
                                                    <td><input type="number" className="form-control" onChange={(e) => {setIsChangeData(true); SetMyVolumeT3(e.target.value)}} value={myvolumeT3} /></td>
                                                    <td><input type="number" className="form-control" onChange={(e) => {setIsChangeData(true); SetVolumeB3(e.target.value)}} value={myvolumeB3} /></td>
                                                    <td><input type="number" className="form-control" onChange={(e) => {setIsChangeData(true); SetMyVolumeA3(e.target.value)}} value={myvolumeA3} /></td>
                                                </tr>
                                                <tr>
                                                    <td scope="row">4</td>
                                                    <td><input type="number" className="form-control" onChange={(e) => {setIsChangeData(true); SetMyWeight4(e.target.value)}} value={myweight4} /></td>
                                                    <td><input type="number" className="form-control" onChange={(e) => {setIsChangeData(true); SetMyVolumeT4(e.target.value)}} value={myvolumeT4} /></td>
                                                    <td><input type="number" className="form-control" onChange={(e) => {setIsChangeData(true); SetVolumeB4(e.target.value)}} value={myvolumeB4} /></td>
                                                    <td><input type="number" className="form-control" onChange={(e) => {setIsChangeData(true); SetMyVolumeA4(e.target.value)}} value={myvolumeA4} /></td>
                                                </tr>
                                            </tbody>
                                        </table>


                                    </div>
                                </div>
                                :
                                null
                        }
                    </div>
                    {
                        isChangeData ? <div className="card text-bg-warning" style={{ width: '300px', position: 'fixed', bottom:'0', right:'0' }}>
                        <div className="card-header"><h4>Зберегти</h4></div>
                        <div className="card-body" style={{ textAlign: 'center' }}>
                            <div>
                                <button className="btn btn-primary" onClick={() => addData()}>Зберегти дані</button>
                                <button className="btn btn-danger" onClick={() => {loadArchivements(); setIsChangeData(false)}}>Відмінити</button>
                            </div>
                        </div>
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

export { Main }