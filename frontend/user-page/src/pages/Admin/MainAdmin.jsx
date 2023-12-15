import { useEffect, useState } from "react"
import axios from '../../config/axios'
import { baseUrlAdmin } from "../../config/config"
import Swal from "sweetalert2"
import { Navigate } from "react-router-dom"
import cookies from 'js-cookie'
import New from "../FirstPage/Components/New/New"


const MainAdmin = () => {

    const [commentNameUpdateNew, setCommentNameUpdateNew] = useState('')
    const [commentNameUpdate, setCommentNameUpdate] = useState('')
    const [commentNameDelete, setCommentNameDelete] = useState('')
    const [commentName, setCommentName] = useState('')
    const [commentContant, setCommentContant] = useState('')
    const [commentImg, setcommentImg] = useState('')
    const [isShowNew, setIsShowNew] = useState(false)
    const [news, setNews] = useState([])
    const [commentImgNew, setcommentImgNew] = useState('')
    const [commentContantNew, setCommentContantNew] = useState('')

    const addNew = (e) => {
        e.preventDefault()

        axios.post(baseUrlAdmin + 'addNew', {
            name: commentName,
            contant: commentContant,
            img: commentImg
        })
            .then(res => {
                Swal.fire(res.data)
                getNews()

            })

        setCommentName('')
        setCommentContant('')
        setcommentImg('')

    }

    useEffect(() => {
        getNews()
    }, [])

    const getNews = () => {
        axios.get(baseUrlAdmin + "getallnews", {})
            .then(res => {
                setNews(res.data)
            })
    }

    const delNew = (e) => {
        e.preventDefault();

        axios.post(baseUrlAdmin + 'deletenew', {
            name : commentNameDelete
        })
        .then(res => {
            Swal.fire({
                title:res.data
            })
            getNews()
        })
        setCommentNameDelete('')   
    }

    const updateNew = (e) => {
        e.preventDefault();
        axios.patch(baseUrlAdmin + "updatenew", {
            name : commentNameUpdateNew,
            oldname : commentNameUpdate,
            img : commentImgNew,
            contant : commentContantNew
        })
        .then(res => {
            getNews()
            setcommentImgNew('')
            setCommentContantNew('')
            setCommentNameUpdateNew('')
            setCommentNameUpdate('')
            setIsShowNew(false)
        })
    }

    if (cookies.get("login") == 'admin' && cookies.get('token')) {
        return (
            <div>
                <h2 style={{ borderRadius:"15px", backgroundColor: "rgba(128, 128, 128, 0.8)", margin:'0 1%', textAlign: 'center', fontWeight: '900', fontSize: '3rem', color:'Red' }}>Новини</h2>
                <div style={{ borderRadius:"15px", backgroundColor:"rgba(128, 128, 128, 0.8)", margin:"1%", padding:"1%"}}>
                    <h4 style={{fontWeight:"700", color:'white', fontSize:"1.7rem"}}>Додати новину</h4>
                    <form onSubmit={(e) => addNew(e)}>
                        <div className="input-group">
                            <label htmlFor="commentName" style={{ backgroundColor: "bisque", fontSize:'1.1rem', fontWeight:'600' }} className="input-group-text">Назва новини: </label>
                            <input type="text" onChange={(e) => setCommentName(e.target.value)} className="form-control" value={commentName} placeholder="Спорт для всіх" required minLength={3} />
                        </div>
                        <br />
                        <div className="input-group">
                            <label htmlFor="commentName" style={{ backgroundColor: "bisque", fontSize:'1.1rem', fontWeight:'600' }} className="input-group-text">Контент: </label>
                            <input type="text" onChange={(e) => setCommentContant(e.target.value)} className="form-control" value={commentContant} placeholder="Усім слід займтись спортом!" required minLength={3} />
                        </div>
                        <br />
                        <div className="input-group">
                            <label htmlFor="commentName" style={{ backgroundColor: "bisque", fontSize:'1.1rem', fontWeight:'600' }} className="input-group-text">Назва малюнка: </label>
                            <input type="text" onChange={(e) => setcommentImg(e.target.value)} className="form-control" value={commentImg} placeholder="AllSports.jpg" required minLength={3} />
                        </div>
                        <br />
                        <button type="submit" className="btn btn-warning" style={{fontSize:'1.1rem', fontWeight:'600'}}>Додати новину</button>
                    </form>
                </div>
                <br />
                <div style={{ borderRadius:"15px", backgroundColor:"rgba(128, 128, 128, 0.8)", margin:"1%", padding:"1%"}}>
                    <h4 style={{fontWeight:"600", color:'white', fontSize:"1.7rem"}}>Видалення новини</h4>
                    <form onSubmit={(e) => delNew(e)}>
                        <div className="input-group">
                            <label htmlFor="commentName" style={{ backgroundColor: "bisque", fontSize:'1.1rem', fontWeight:'600' }} className="input-group-text">Назва коментарію: </label>
                            <input type="text" onChange={(e) => setCommentNameDelete(e.target.value)} className="form-control" value={commentNameDelete} placeholder="Спорт для всіх" required minLength={3} />
                        </div>
                        <br />
                        <button type="submit" className="btn btn-danger" style={{fontSize:'1.1rem', fontWeight:'600'}}>Видалити новину</button>
                    </form>
                </div>
                <br />
                <div style={{ borderRadius:"15px", backgroundColor:"rgba(128, 128, 128, 0.8)", margin:"1%", padding:"1%"}}>
                <h4 style={{fontWeight:"600", color:'white', fontSize:"1.7rem"}}>Оновити новину</h4>
                    <form onSubmit={(e) => updateNew(e)}>
                        <div className="input-group">
                            <label htmlFor="commentName" style={{ backgroundColor: "bisque", fontSize:'1.1rem', fontWeight:'600' }} className="input-group-text">Стара назва новини: </label>
                            <input type="text" onChange={(e) => setCommentNameUpdate(e.target.value)} className="form-control" value={commentNameUpdate} placeholder="Спорт для всіх" required minLength={3} />
                        </div>
                        <br />
                        <div className="input-group">
                            <label htmlFor="commentName" style={{ backgroundColor: "bisque", fontSize:'1.1rem', fontWeight:'600' }} className="input-group-text">Нова назва новини: </label>
                            <input type="text" onChange={(e) => setCommentNameUpdateNew(e.target.value)} className="form-control" value={commentNameUpdateNew} placeholder="Спорт для всіх" required minLength={3} />
                        </div>
                        <br />
                        <div className="input-group">
                            <label htmlFor="commentName" style={{ backgroundColor: "bisque", fontSize:'1.1rem', fontWeight:'600' }} className="input-group-text">Контент: </label>
                            <input type="text" onChange={(e) => setCommentContantNew(e.target.value)} className="form-control" value={commentContantNew} placeholder="Усім слід займтись спортом!" required minLength={3} />
                        </div>
                        <br />
                        <div className="input-group">
                            <label htmlFor="commentName" style={{ backgroundColor: "bisque", fontSize:'1.1rem', fontWeight:'600' }} className="input-group-text">Назва малюнка: </label>
                            <input type="text" onChange={(e) => setcommentImgNew(e.target.value)} className="form-control" value={commentImgNew} placeholder="AllSports.jpg" required minLength={3} />
                        </div>
                        <br />
                        <button type="submit" className="btn btn-success" style={{fontSize:'1.1rem', fontWeight:'600'}}>Оновити новину</button>
                    </form>
                </div>
                <br />
                <br />
                <br />
                <div >
                    <button className="btn btn-primary" style={{fontWeight:'600', fontSize:"1.2rem", textAlign:"center"}} onClick={() => setIsShowNew(!isShowNew)}>Показати/Сховати новини</button>
                    {
                        isShowNew ?
                            <div style={{ borderRadius:"15px", backgroundColor:"rgba(128, 128, 128, 0.8)", margin:"1%", padding:"1%"}}>
                                <h2 style={{color:"white", fontWeight:'700'}}>Ось так будуть виглядати новини:</h2>
                                <div className="card-group">
                                    {
                                        news.map((item, index) => {
                                            return (
                                                <New
                                                    disabledlink={true}
                                                    key={`New${index}`}
                                                    id={item.id}
                                                    img={item.img}
                                                    name={item.name}
                                                />
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
        )
    }
    else
        return (
            <Navigate to={'/'} />
        )
}

export { MainAdmin }