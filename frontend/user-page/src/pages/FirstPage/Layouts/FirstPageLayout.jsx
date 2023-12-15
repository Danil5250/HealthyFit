import { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from '../../../config/axios'
import { baseUrlMain } from '../../../config/config'

const FirstPageLayout = () => {

  const [login, setLogin] = useState('')
  const [content, setContent] = useState('')
  const [comments, setComments] = useState([])

  const showRecepts = () => {
    Swal.fire({
      html: `<div id="carouselExample" class="carousel slide" style={{backgroundColor:"black"}}>
                                      <div class="carousel-inner">
                                        <div class="carousel-item active">
                                        <h2>Ви переглядаєте рекомендовані страви</h2>
                                        <img src='` + `${process.env.PUBLIC_URL}/img/cook1.png' alt="" width="650px" height="770px" style={{ margin: "10px" }} />
                                        </div>
                                        <div class="carousel-item">
                                        <img src='` + `${process.env.PUBLIC_URL}/img/cook4.png' alt="" width="650px" height="770px" style={{ margin: "10px" }} />
                                        </div>
                                        <div class="carousel-item">
                                        <img src='` + `${process.env.PUBLIC_URL}/img/cook3.png' alt="" width="650px" height="770px" style={{ margin: "10px" }} />
                                        </div>
                                        <div class="carousel-item">
                                        <img src='` + `${process.env.PUBLIC_URL}/img/cook2.png' alt="" width="650px" height="770px" style={{ margin: "10px" }} />
                                        </div>
                                      </div>
                                      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample"  data-bs-slide="prev" style={{color:"red"}} data-bs-theme="dark">
                                        <span class="carousel-control-prev-icon" style={{color:"red"}} aria-hidden="true"></span>
                                        <span class="visually-hidden" style={{color:"red"}} >Previous</span>
                                      </button>
                                      <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Next</span>
                                      </button>
                                    </div>
            `,
      width: '800'
    })
  }

  useEffect( () => {
    getComments()
  }, [])
  
  const getComments = async() => {
    await axios.post(baseUrlMain + "getcomments")
    .then(res => setComments(res.data))
  }

  const addComment = async(e) => {
    e.preventDefault();

    if(content != "") {
      axios.post(baseUrlMain + 'addcomment', {
        name : login,
        contant:content
      })
      .then(res => {Swal.fire({
        title:res.data
      })
      getComments()})
      setLogin('')
      setContent('')
    }
  }

  return (
    <div className='backimg' style={{ backgroundColor: "honeydew" }}>
      <h1 style={{
        padding: "0px 50px", backgroundColor: "snow", color: "indianred", fontStyle: "italic", fontWeight: "1000",
        boxShadow: "7px 10px 17px red", textAlign: "center"
      }}>HealthyFit</h1>
      <hr />
      <nav className="navbar " style={{ backgroundColor: "#e3f2fd", margin:"0 1%" }}>
        <div className="container-fluid">
          <NavLink style={{ fontSize: "1.2rem" }} to='/' className="btn btn-warning">Домашня сторінка</NavLink>
          <NavLink style={{ fontSize: "1.2rem" }} to='/register' className="btn btn-primary" >Твій крок до ідеальної фігури.....</NavLink>
          <NavLink style={{ fontSize: "1.2rem" }} to='/firsttrain' className='btn btn-secondary'>Тренування</NavLink>
          <NavLink style={{ fontSize: "1.2rem" }} to='/news' className='btn btn-danger'>Новини</NavLink>
          <button style={{ fontSize: "1.2rem" }} className='btn btn-dark' onClick={() => showRecepts()}>Рецепти</button>
          <NavLink style={{ fontSize: "1.2rem" }} to='/calculator' className="btn btn-info" >Вага ідеального тіла</NavLink>
          <NavLink style={{ fontSize: "1.2rem" }} to='/login' className="btn btn-success" >Мій кабінет</NavLink>
        </div>
      </nav>

      <div>
        <Outlet />
      </div>

      <br />
      <br />
      <br />
      <br />
      <div style={{ margin: '10px'}}>
        <h3 style={{padding:'10px', width: '50%', backgroundColor: "grey", height: "auto", borderRadius:"15px", fontSize:'1rem', color:"white" }}>Спілкуйтеся з іншими користувачами та професійними спортсменами</h3>
        <div >
        <div class="card mb-3" style={{ width: '800px' }}>
          <div class="card-body">
            <form onSubmit={(e) => {addComment(e)}}>
            <h5 class="card-title"><div className="input-group" style={{ boxShadow: "1px 1px 10px rgb(0, 165, 245)", width: '500px' }}>
              <label htmlFor="login" style={{ backgroundColor: "rgb(1, 198, 251)", fontWeight: '600', color: 'white' }} className="input-group-text">Ваше ім'я: </label>
              <input type="text" onChange={(e) => setLogin(e.target.value)} className="form-control " value={login} name="login" id="login" title="Ваш логін" placeholder="Ivan" required minLength={3} />
            </div></h5>
            <p className="card-text" style={{ height: "150px" }}>
              <textarea className='form-control' onChange={(e) => setContent(e.target.value)} value={content} style={{ height: "150px" }} maxLength={700} />
            </p>
            <div style={{ textAlign: 'right' }} >
              <button type='submit' className="btn btn-outline-primary">Відправити</button>
            </div>
            </form>
          </div>
            
        </div>
          {
            comments.map((item, index) => {
              return (
                <div className="card mb-3" style={{ width: '50%', backgroundColor: "rgb(114, 238, 239)", height: "auto" }} key={`Comment${index}`}>
                  <div className="card-body">
                    <p> <i style={{ fontWeight: 700 }}>{item.name}</i> - {item.date}</p>
                    <p className="card-text">
                      {item.contant}
                    </p>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>

      <footer style={{fontSize:'1.5rem', fontWeight:'700'}}>
        <hr />
        &copy;HealthyFit
      </footer>
    </div>
  )
}

export { FirstPageLayout }