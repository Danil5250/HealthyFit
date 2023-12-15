import { useEffect, useState } from "react"
import axios from '../../../config/axios'
import { baseUrlAdmin } from "../../../config/config"
import Swal from "sweetalert2"
import { Navigate } from "react-router-dom"
import cookies from 'js-cookie'



const CommentsPage = () => {

    const [commentNameDel, setCommentNameDel] = useState('')
    const [commentContantDel, setCommentContantDel] = useState('')

    const[comments, setComments] = useState([])

    const [isShowComments, setIsShowComments] = useState([])

    useEffect( () => {
        getAllComments()
    }, [])

    const getAllComments = () => {
        axios.post(baseUrlAdmin + 'getAllComments')
        .then(res => {
            setComments(res.data)
        })
    }

    const deleteComments = (e) => {
        e.preventDefault()
        if(commentNameDel && commentContantDel) {
            axios.post(baseUrlAdmin + 'deleteComment', {
                name : commentNameDel, 
                contant : commentContantDel
            })
            .then(res => {
                Swal.fire({
                    title:res.data
                })
                getAllComments()
                setCommentNameDel('')
                setCommentContantDel('')
            })
        }
    }

    if (cookies.get("login") == 'admin' && cookies.get('token')) {
        return (
            <div>
                <h2 style={{ borderRadius: "15px", backgroundColor: "rgba(128, 128, 128, 0.8)", margin: '0 1%', textAlign: 'center', fontWeight: '900', fontSize: '3rem', color: 'Red' }}>Коментарі</h2>
                <div style={{ borderRadius: "15px", backgroundColor: "rgba(128, 128, 128, 0.8)", margin: "1%", padding: "1%" }}>
                    <form onSubmit={(e) => deleteComments(e)}>
                        <div className="input-group">
                            <label htmlFor="commentName" style={{ backgroundColor: "bisque", fontSize:'1.1rem', fontWeight:'600'  }} className="input-group-text">Ім'я коментатора: </label>
                            <input type="text" onChange={(e) => setCommentNameDel(e.target.value)} className="form-control" value={commentNameDel} placeholder="Ivan" required minLength={3} />
                        </div>
                        <br />
                        <div className="input-group">
                            <label htmlFor="commentName" style={{ backgroundColor: "bisque", fontSize:'1.1rem', fontWeight:'600'  }} className="input-group-text">Сам коментарій: </label>
                            <input type="text" onChange={(e) => setCommentContantDel(e.target.value)} className="form-control" value={commentContantDel} placeholder="..." required minLength={3} />
                        </div>
                        <br />
                        <button className="btn btn-danger" style={{fontWeight:'600'}}>Видалити коментар</button>
                    </form>
                </div>
                <button className="btn btn-primary" onClick={() => setIsShowComments(!isShowComments)} style={{fontWeight:'600', fontSize:'1.2rem'}} type="button">Показати/сховати коментарі</button>
                {
                isShowComments ?
                comments.map((item, index) => {
                    return (
                    <div style={{margin:'10px'}}>
                        <div className="card mb-3" style={{ width: '50%', backgroundColor: "rgb(114, 238, 239)", height: "auto"  }} key={`Comment${index}`}>
                       <div className="card-body">
                          <p> <i style={{ fontWeight: 700 }}>{item.name}</i> - {item.date}</p>
                          <p className="card-text">
                            {item.contant}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                      
                    )
                  })
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

export { CommentsPage }