import { useEffect, useState } from "react"
import axios from '../../../config/axios'
import { baseUrlAdmin } from "../../../config/config"
import Swal from "sweetalert2"
import { Navigate } from "react-router-dom"
import cookies from 'js-cookie'

const ExercicePage = () => {

    const [contantExerciceAdd, setContantExerciceAdd] = useState('')
    const [delkkalExerciceAdd, setDelKkalExerciceAdd] = useState('')

    const [contantExerciceOldUpdate, setContantExerciceOldUpdate] = useState('')
    const [contantExerciceUpdate, setContantExerciceUpdate] = useState('')
    const [delkkalExerciceUpdate, setDelKkalExerciceUpdate] = useState('')
    
    const [contantExerciceDel, setContantExerciceDel] = useState('')

    const [exercices, setExercices] = useState([])

    const [isShowExercice, setIshowExercice] = useState(false)

    useEffect(() => {
        getAllExercice()
    }, [])

    const getAllExercice = () => {
        axios.get(baseUrlAdmin + 'getallexercice')
            .then(res => setExercices(res.data))
    }

    const addExercice = (e) => {
        e.preventDefault()

        if (contantExerciceAdd && delkkalExerciceAdd > 0) {
            axios.post(baseUrlAdmin + "addExercice", {
                contant: contantExerciceAdd,
                delkkal: delkkalExerciceAdd
            })
                .then(res => {
                    Swal.fire({
                        title: res.data
                    })
                    setContantExerciceAdd('')
                    setDelKkalExerciceAdd('')
                    getAllExercice()
                })
        }
        else {
            Swal.fire({
                title: "Некорректні дані"
            })

            setContantExerciceAdd('')
            setDelKkalExerciceAdd('')
        }
    }

    const delExercice = (e) => {
        e.preventDefault();
        if(contantExerciceDel) {
            axios.post(baseUrlAdmin + 'delexercice', {
                contant : contantExerciceDel
            })
            .then(res=> {Swal.fire({title:res.data})
            getAllExercice()
        })
            setContantExerciceDel('')
        }  
    }

    const updateExercice = (e) => {
        e.preventDefault();
        if(contantExerciceUpdate && contantExerciceOldUpdate && delkkalExerciceUpdate > 0) {
            axios.post(baseUrlAdmin + "updateExercice", {
                contant : contantExerciceUpdate,
                delkkal : delkkalExerciceUpdate,
                oldcontant: contantExerciceOldUpdate
            })
            .then(res => {
                Swal.fire({
                    title:res.data
                })
                getAllExercice()
                setContantExerciceOldUpdate('')
                setContantExerciceUpdate('')
                setDelKkalExerciceUpdate('')
            })
        }
    }

    if (cookies.get("login") == 'admin' && cookies.get('token')) {
        return (
            <div>
                <h2 style={{ borderRadius: "15px", backgroundColor: "rgba(128, 128, 128, 0.8)", margin: '0 1%', textAlign: 'center', fontWeight: '900', fontSize: '3rem', color: 'Red' }}>Навантаження</h2>
                <div style={{ borderRadius: "15px", backgroundColor: "rgba(128, 128, 128, 0.8)", margin: "1%", padding: "1%" }}>
                    <h4 style={{ fontWeight: "600", color: 'white' }}>Додати навантаження</h4>
                    <form onSubmit={(e) => addExercice(e)}>
                        <div className="input-group">
                            <label htmlFor="commentName" style={{ backgroundColor: "bisque" , fontSize:'1.1rem', fontWeight:'600' }} className="input-group-text">Контент навантаження: </label>
                            <input type="text" onChange={(e) => setContantExerciceAdd(e.target.value)} className="form-control" value={contantExerciceAdd} placeholder="Віджимання" required minLength={3} />
                        </div>
                        <br />
                        <div className="input-group">
                            <label htmlFor="commentName" style={{ backgroundColor: "bisque", fontSize:'1.1rem', fontWeight:'600' }} className="input-group-text">Кількість спалюваних калорій: </label>
                            <input type="number" onChange={(e) => setDelKkalExerciceAdd(e.target.value)} className="form-control" value={delkkalExerciceAdd} placeholder="0.7" required />
                        </div>
                        <br />
                        <button type="submit" className="btn btn-warning" style={{fontSize:'1.1rem', fontWeight:'600'}}>Додати</button>
                    </form>
                </div>

                <div style={{ borderRadius: "15px", backgroundColor: "rgba(128, 128, 128, 0.8)", margin: "1%", padding: "1%" }}>
                <h4 style={{ fontWeight: "600", color: 'white' }}>Видалити навантаження</h4>
                    <form onSubmit={(e) => delExercice(e)}>
                        <div className="input-group">
                            <label htmlFor="commentName" style={{ backgroundColor: "bisque", fontSize:'1.1rem', fontWeight:'600' }} className="input-group-text">Контент навантаження: </label>
                            <input type="text" onChange={(e) => setContantExerciceDel(e.target.value)} className="form-control" value={contantExerciceDel} placeholder="Віджимання" required minLength={3} />
                        </div>
                        <br />
                        <button type="submit" className="btn btn-danger" style={{fontSize:'1.1rem', fontWeight:'600'}}>Видалити</button>
                    </form>
                </div>


                <div style={{ borderRadius: "15px", backgroundColor: "rgba(128, 128, 128, 0.8)", margin: "1%", padding: "1%" }}>
                    <h4 style={{ fontWeight: "600", color: 'white' }}>Оновити навантаження</h4>
                    <form onSubmit={(e) => updateExercice(e)}>
                        <div className="input-group">
                            <label htmlFor="commentName" style={{ backgroundColor: "bisque", fontSize:'1.1rem', fontWeight:'600' }} className="input-group-text">Старий контент навантаження: </label>
                            <input type="text" onChange={(e) => setContantExerciceOldUpdate(e.target.value)} className="form-control" value={contantExerciceOldUpdate} placeholder="Віджимання" required minLength={3} />
                        </div>
                        <br />
                        <div className="input-group">
                            <label htmlFor="commentName" style={{ backgroundColor: "bisque", fontSize:'1.1rem', fontWeight:'600' }} className="input-group-text">Новий контент навантаження: </label>
                            <input type="text" onChange={(e) => setContantExerciceUpdate(e.target.value)} className="form-control" value={contantExerciceUpdate} placeholder="Віджимання" required minLength={3} />
                        </div>
                        <br />
                        <div className="input-group">
                            <label htmlFor="commentName" style={{ backgroundColor: "bisque", fontSize:'1.1rem', fontWeight:'600' }} className="input-group-text">Кількість спалюваних калорій: </label>
                            <input type="number" onChange={(e) => setDelKkalExerciceUpdate(e.target.value)} className="form-control" value={delkkalExerciceUpdate} placeholder="0.7" required />
                        </div>
                        <br />
                        <button type="submit" className="btn btn-success" style={{fontSize:'1.1rem', fontWeight:'600'}}>Оновити</button>
                    </form>
                </div>



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

            </div>
        )
    }
    else
        return (
            <Navigate to={'/'} />
        )
}

export {ExercicePage}