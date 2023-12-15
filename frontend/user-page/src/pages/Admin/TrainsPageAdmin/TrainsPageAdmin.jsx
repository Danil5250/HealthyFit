import { useEffect, useState } from "react"
import axios from '../../../config/axios'
import { baseUrlAdmin } from "../../../config/config"
import Swal from "sweetalert2"
import { Navigate } from "react-router-dom"
import cookies from 'js-cookie'
import Train from "../../Main/Components/Train/Train"




const TrainsPage = () => {
    const [nameTrainAdd, setNameTrainAdd] = useState('')
    const [categoryTrainAdd, setCategoryTrainAdd] = useState('')
    const [timeTrainAdd, setTimeTrainAdd] = useState('')
    const [exercicesAdd, setExercicesAdd] = useState('')
    const [videoTrainAdd, setVideoTrainAdd] = useState('')

    const [nameTrainUpdateOld, setNameTrainUpdateOld] =useState('')
    const [nameTrainUpdate, setNameTrainUpdate] =useState('')
    const [categoryTrainUpdate, setCategoryTrainUpdate] =useState('')
    const [timeTrainUpdate, setTimeTrainUpdate] =useState('')
    const [exercicesTrainUpdate, setExercicesTrainUpdate] =useState('')
    const [videoTrainUpdate, setVideoTrainUpdate] =useState('')

    const [isShowExercice, setIshowExercice] = useState(true)
    const [exercices, setExercice] = useState([])

    const [isShowTrain, setIsShowTrain] = useState(false)

    const [nameTrainDel, setnameTrainDel] = useState()

    const [trains, setTrains] = useState([])

    useEffect( () => {
        getAllExercices()
        getAllTrains()
    }, [])

    const getAllTrains = () => {
        axios.get(baseUrlAdmin + 'gettrain')
        .then(res => {
            setTrains(res.data)
        })
    }

    const getAllExercices = () => {
        axios.post(baseUrlAdmin + 'getallexercice', {})
        .then(res=> {
            setExercice(res.data)
        })
    }

    const addExercice = (e) => {
        e.preventDefault()

        if(nameTrainAdd && categoryTrainAdd && exercicesAdd && timeTrainAdd > 0 && videoTrainAdd) {
            axios.post(baseUrlAdmin + "addtrain", {
                name : nameTrainAdd,
                category : categoryTrainAdd,
                contant : exercicesAdd,
                time : timeTrainAdd,
                video : videoTrainAdd
            })
            .then(res => {
                Swal.fire({title:res.data})
                getAllTrains();
            })
        }
        else {
            Swal.fire({
                title:'Некорректні дані'
            })
        }
        

        setNameTrainAdd('')
        setCategoryTrainAdd('')
        setExercicesAdd('')
        setTimeTrainAdd('')
        setVideoTrainAdd('')
    }

    const delTrain = (e) => {
        e.preventDefault()
        if (nameTrainDel) {
            axios.post(baseUrlAdmin + "deltrain", {
                name: nameTrainDel
            })
                .then(res => {
                    Swal.fire(res.data)
                    getAllTrains();
                })
        }
        else {
            Swal.fire({
                title: 'Некорректні дані'
            })
        }

        setnameTrainDel("")
        getAllTrains();
    }

    const updateTrain = (e) => {
        e.preventDefault();

        if (nameTrainUpdateOld && nameTrainUpdate && categoryTrainUpdate && exercicesTrainUpdate && timeTrainUpdate > 0 && videoTrainUpdate) {
            axios.post(baseUrlAdmin + 'updatetrain', {
                oldname: nameTrainUpdateOld,
                name: nameTrainUpdate,
                category: categoryTrainUpdate,
                contant: exercicesTrainUpdate,
                time: timeTrainUpdate,
                video: videoTrainUpdate
            })
                .then(res => {
                    Swal.fire({
                        title: res.data
                    })
                    getAllTrains();
                    setIsShowTrain(false)
                })
        }
        else {
            Swal.fire({
                title: 'Некорректні дані'
            })
        }
        setNameTrainUpdate('')
        setCategoryTrainUpdate('')
        setTimeTrainUpdate('')
        setExercicesTrainUpdate('')
        setVideoTrainUpdate('')
        setNameTrainUpdateOld('')
    }

    if (cookies.get("login") == 'admin' && cookies.get('token')) {
        return (
            <div>
                <h2 style={{ borderRadius:"15px", backgroundColor: "rgba(128, 128, 128, 0.8)", margin:'0 1%', textAlign: 'center', fontWeight: '900', fontSize: '3rem', color:'Red' }}>Тренування</h2>

                <div>
                    <div>
                        <div style={{ borderRadius:"15px", backgroundColor: "rgba(128, 128, 128, 0.8)", margin: "1%", padding: "1%" }}>
                            <h4 style={{ fontWeight: "600", color: 'white', fontSize:"1.7rem" }}>Додати тренування</h4>
                            <form onSubmit={(e) => addExercice(e)}>
                                <div className="input-group">
                                    <label htmlFor="commentName" style={{ backgroundColor: "bisque", fontSize:'1.1rem', fontWeight:'600'  }} className="input-group-text">Назва тренування: </label>
                                    <input type="text" onChange={(e) => setNameTrainAdd(e.target.value)} className="form-control" value={nameTrainAdd} placeholder="Швидке тренування" required minLength={3} />
                                </div>
                                <br />
                                <div className="input-group">
                                    <label htmlFor="commentName" style={{ backgroundColor: "bisque", fontSize:'1.1rem', fontWeight:'600'  }} className="input-group-text">Категорія: </label>
                                    <input type="text" onChange={(e) => setCategoryTrainAdd(e.target.value)} className="form-control" value={categoryTrainAdd} placeholder="На ноги" required minLength={3} />
                                </div>
                                <br />
                                <div className="input-group">
                                    <label htmlFor="commentName" style={{ backgroundColor: "bisque", fontSize:'1.1rem', fontWeight:'600'  }} className="input-group-text">Час: </label>
                                    <input type="text" onChange={(e) => setTimeTrainAdd(e.target.value)} className="form-control" value={timeTrainAdd} placeholder="10 (хвилин)" required />
                                </div>
                                <br />
                                <div className="input-group">
                                    <label htmlFor="commentName" style={{ backgroundColor: "bisque", fontSize:'1.1rem', fontWeight:'600'  }} className="input-group-text">Приклад-відео: </label>
                                    <input type="text" onChange={(e) => setVideoTrainAdd(e.target.value)} className="form-control" value={videoTrainAdd} placeholder="https://www.youtube.com/embed/FgunKLjGvV8" required minLength={3} />
                                </div>
                                <br />
                                <div className="input-group">
                                    <label htmlFor="commentName" style={{ backgroundColor: "bisque", fontSize:'1.1rem', fontWeight:'600'  }} className="input-group-text">Вправи для тренування: </label>
                                    <input type="text" pattern="^\d+(\s\d+)*$" onChange={(e) => setExercicesAdd(e.target.value)} className="form-control" value={exercicesAdd} placeholder="0 1" required />
                                </div>

                                <br />

                                <button type="submit" className="btn btn-warning" style={{fontSize:'1.1rem', fontWeight:'600'}}>Додати</button>
                                <br />

                            </form>
                        </div>


                        <div style={{ borderRadius:"15px", backgroundColor: "rgba(128, 128, 128, 0.8)", margin: "1%", padding: "1%" }}>
                            <h4 style={{ fontWeight: "600", color: 'white' }}>Видалення тренування</h4>
                            <form onSubmit={(e) => delTrain(e)}>
                                <div className="input-group">
                                    <label htmlFor="commentName" style={{ backgroundColor: "bisque", fontSize:'1.1rem', fontWeight:'600' }} className="input-group-text">Назва тренування: </label>
                                    <input type="text" onChange={(e) => setnameTrainDel(e.target.value)} className="form-control" value={nameTrainDel} placeholder="Швидке тренування" required minLength={3} />
                                </div>
                                <br />
                                <button type="submit" className="btn btn-danger" style={{fontSize:'1.1rem', fontWeight:'600'}}>Видалити</button>
                            </form>
                        </div>


                        <div style={{ borderRadius:"15px", backgroundColor: "rgba(128, 128, 128, 0.8)", margin: "1%", padding: "1%" }}>
                            <h4 style={{ fontWeight: "600", color: 'white' }}>Оновлення тренування</h4>
                            <form onSubmit={(e) => updateTrain(e)}>
                                <div className="input-group">
                                    <label htmlFor="commentName" style={{ backgroundColor: "bisque", fontSize:'1.1rem', fontWeight:'600' }} className="input-group-text">Стара назва тренування: </label>
                                    <input type="text" onChange={(e) => setNameTrainUpdateOld(e.target.value)} className="form-control" value={nameTrainUpdateOld} placeholder="Швидке тренування" required minLength={3} />
                                </div>
                                <br />
                                <div className="input-group">
                                    <label htmlFor="commentName" style={{ backgroundColor: "bisque", fontSize:'1.1rem', fontWeight:'600' }} className="input-group-text">Нова назва тренування: </label>
                                    <input type="text" onChange={(e) => setNameTrainUpdate(e.target.value)} className="form-control" value={nameTrainUpdate} placeholder="Швидке тренування" required minLength={3} />
                                </div>
                                <br />
                                <div className="input-group">
                                    <label htmlFor="commentName" style={{ backgroundColor: "bisque", fontSize:'1.1rem', fontWeight:'600' }} className="input-group-text">Категорія: </label>
                                    <input type="text" onChange={(e) => setCategoryTrainUpdate(e.target.value)} className="form-control" value={categoryTrainUpdate} placeholder="На ноги" required minLength={3} />
                                </div>
                                <br />
                                <div className="input-group">
                                    <label htmlFor="commentName" style={{ backgroundColor: "bisque", fontSize:'1.1rem', fontWeight:'600' }} className="input-group-text">Час: </label>
                                    <input type="number" onChange={(e) => setTimeTrainUpdate(e.target.value)} className="form-control" value={timeTrainUpdate} placeholder="10 (хвилин)" required />
                                </div>
                                <br />
                                <div className="input-group">
                                    <label htmlFor="commentName" style={{ backgroundColor: "bisque", fontSize:'1.1rem', fontWeight:'600' }} className="input-group-text">Приклад-відео: </label>
                                    <input type="text" onChange={(e) => setVideoTrainUpdate(e.target.value)} className="form-control" value={videoTrainUpdate} placeholder="https://www.youtube.com/embed/FgunKLjGvV8" required minLength={3} />
                                </div>
                                <br />
                                <div className="input-group">
                                    <label htmlFor="commentName" style={{ backgroundColor: "bisque", fontSize:'1.1rem', fontWeight:'600' }} className="input-group-text">Вправи для тренування: </label>
                                    <input type="text" onChange={(e) => setExercicesTrainUpdate(e.target.value)} className="form-control" value={exercicesTrainUpdate} placeholder="0 1" required />
                                </div>
                                <br />
                                <button type="submit" className="btn btn-success" style={{fontSize:'1.1rem', fontWeight:'600'}}>Оновити</button>
                            </form>
                        </div>




                        <br />
                        <br />
                        <button style={{fontWeight:'600', fontSize:'1.2rem'}} className="btn btn-primary" onClick={() => setIshowExercice(!isShowExercice)} type="button">Показати/сховати вправи</button>
                        {
                            isShowExercice ?
                                <div style={{ borderRadius:"15px", backgroundColor: "rgba(128, 128, 128, 0.8)", margin: "1%", padding: "1%" }}>
                                    <br />
                                    <table className="table table-striped table-hover table-bordered border-dark" style={{ fontSize: "1.2rem", textAlign: 'center', width: '100%' }}>
                                        <thead className="table-primary">
                                            <tr>
                                                <th scope="col"></th>
                                                <th scope="col">Контент</th>
                                                <th scope="col">Втрачені калорії</th>
                                            </tr>
                                        </thead>
                                        <tbody className="table-group-divider">
                                            {
                                                exercices.map((item, index) => {
                                                    return (
                                                        <tr key={`${index}element${index}`}>
                                                            <td>{item.id}</td>
                                                            <td>{item.contant}</td>
                                                            <td>{item.delkkal}</td>
                                                        </tr>
                                                    )

                                                })
                                            }
                                        </tbody>

                                    </table>
                                </div>
                                :
                                null
                        }
                        <br />
                        <br />
                        <br />
                        <div>
                            <button style={{fontWeight:'600', fontSize:'1.2rem'}} className="btn btn-primary" type="button" onClick={() => setIsShowTrain(!isShowTrain)}>Показати/сховати тренування</button>
                        </div>


                        {
                            isShowTrain ?
                                <div style={{ display: "flex", flexDirection: 'row', flexWrap: "wrap" }}>
                                    <div style={{ borderRadius:"15px", backgroundColor: "rgba(128, 128, 128, 0.8)", margin: "1%", padding: "1%" }}>
                                        {
                                            trains.map((item, index) => {
                                                return (
                                                    <div className="train-card" style={{ display: "inline-block", width: "auto" }}>
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
                                </div>

                                :
                                null
                        }

                    </div>
                </div>
            </div>
        )
    }
    else
        return (
            <Navigate to={'/'} />
        )
}

export {TrainsPage}