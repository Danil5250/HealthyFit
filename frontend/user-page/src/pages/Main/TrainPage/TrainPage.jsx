import { useEffect, useState } from "react"
import axios from '../../../config/axios'
import { baseUrlMain } from "../../../config/config"
import Train from "../Components/Train/Train"
import './Train.css'
import { NavLink, Navigate } from "react-router-dom"
import cookies from 'js-cookie'


const TrainPage = () => {

    const [trains, setTrains] = useState([])
    const [seek, setSeek] = useState('')

    const getAllTrains = () => {
        axios.get(baseUrlMain + 'getalltrains')
            .then(res => {
                setTrains(res.data)
            })
    }

    const showTrainByCategory = (category) => {
        axios.post(baseUrlMain + 'gettrainbycategory', {
            category
        })
            .then(res => {
                setTrains(res.data)
            })
        //
    }

    const SubmitHandler = (e) => {
        e.preventDefault();
        console.log(seek)
        axios.post(baseUrlMain + 'gettrainbyname', {
            name: seek
        })
            .then(res => {
                setTrains(res.data)
            })
        setSeek('')
    }

    useEffect(() => {
        getAllTrains()
    }, [])

    if (cookies.get("login") && cookies.get('token')) {
        return (
            <div>
                <h1>Тренування</h1>
                <br />
                <br />
                <nav class="navbar " >
                    <div className="col">
                        <div class="container-fluid">
                            <div className="card" style={{padding:'5px'}}>
                            <form class="d-flex" role="search" onSubmit={(e) => SubmitHandler(e)}>
                                <input class="form-control me-2" type="search" onChange={(e) => setSeek(e.target.value)} value={seek} placeholder="Пошук" aria-label="Search" />
                                <button class="btn btn-warning" style={{ width: "300px" }} type="submit">Пошук навантажень</button>
                            </form>
                            </div>
                        </div>
                    </div>
                    <div className="card" style={{textAlign: "center", margin: "10px", display: "inline-block", padding:"5px" }}>
                    <div style={{ textAlign: "center", display: "inline-block" }}>
                        <button className="btn btn-outline-danger" style={{ fontSize: '1.2rem', fontWeight: '600' }}><NavLink to={'https://t.me/danil_bukhantsov'} >Зв'язок з власним тренером</NavLink></button>
                    </div>
                    </div>
                    
                </nav>
                <div style={{ textAlign: "center"}}>
                    <div className="card">
                        <h3>Категорії тренувань:</h3>
                    </div>

                        <div className="card text-bg-secondary mb-3" style={{ width: "30%", textAlign: "center", display: "contents", backgroundColor:'grey'}}>
                            <div style={{backgroundColor:"grey"}}>
                            <button style={{ margin: "10px", width: "*", display: 'inline-block' }} onClick={() => getAllTrains()} className="btn btn-outline-light">Всі тренування</button>
                            <button style={{ margin: "10px", display: 'inline-block' }} onClick={() => showTrainByCategory('Усе тіло')} className="btn btn-outline-light">Усе тіло</button>
                            <button style={{ margin: "10px", display: 'inline-block' }} onClick={() => showTrainByCategory('Для ніг')} className="btn btn-outline-light">Для ніг</button>
                            <button style={{ margin: "10px", display: 'inline-block' }} onClick={() => showTrainByCategory('Для пресу')} className="btn btn-outline-light">Для пресу</button>
                            <button style={{ margin: "10px", display: 'inline-block' }} onClick={() => showTrainByCategory('Для рук')} className="btn btn-outline-light">Для рук</button>
                            </div>
                        </div>

                </div>
                <br />
                <br />
                <br />
                {
                    <div style={{ display: "flex", flexDirection:'row', flexWrap:"wrap" }}>
                        {
                            trains.map((item, index) => {
                                return (
                                    <div className="train-card" style={{display:"inline-block", width:"auto"}}>
                                        <Train
                                            key={index}
                                            id={item.id}
                                            name={item.name}
                                            contant={item.contant}
                                            category={item.category}
                                            time={item.time}
                                            video={item.video}
                                        >
                                        </Train>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </div>
        )
    }
    else
        return (
            <Navigate to={'/'} />
        )
}

export { TrainPage }