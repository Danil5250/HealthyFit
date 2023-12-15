import { Outlet } from "react-router-dom"
import { NavLink, Navigate, useLocation, useNavigate } from "react-router-dom"
import axios from '../../../config/axios'
import config from '../../../config/config'
import cookies from 'js-cookie'
import './Layout.css'
import {useState, useEffect} from 'react'
import { baseUrlMain } from "../../../config/config"
import Swal from "sweetalert2"

const Layout = () => {

    const location = useLocation()
    const navigate = useNavigate()
    
    const isCurrentLocation = (path) => {
        if(location.pathname === path) {
            return true
        }
        else
        return false;
    }

    const Exit = () => {
        axios.get(config.baseUrlMain + 'logout')
        .then(v => {
            console.log(v.data)
            if(v.data == "") navigate('/')})

    }

    const [login, setLogin] = useState('')
    const [content, setContent] = useState('')
    const [comments, setComments] = useState([])

    useEffect( () => {
      getComments()
    }, [])
    
    const getComments = async() => {
      await axios.post(baseUrlMain + "getcomments")
      .then(res => setComments(res.data))
    }
  
    const addComment = async(e) => {
      e.preventDefault();
      if(content != "")
      {
        axios.post(baseUrlMain + 'addcomment', {
          name : cookies.get('login'),
          contant:content
        })
        .then(res => {Swal.fire({
          title:res.data
        })
        getComments()})
        setLogin('')
        setContent('')
        console.log(comments)
      }
      
    }


    return (
        <div className="backimgclient">
            <header>
        <div class="container">
          <nav id="navigation">
            <NavLink to={'/main'} className={"logo"}><h1 style={{width:"400px"}}>HealthyFit</h1></NavLink>
            <a aria-label="mobile menu" class="nav-toggle">
              <span></span>
              <span></span>
              <span></span>
            </a>
              <ul class="menu-left" style={{margin:"-10px 0px 0px -160px"}}>
                <li><NavLink style={({margin:"0px 0px 0px 15px", color:isCurrentLocation('/main') ? "red" : "black", fontSize : "2rem"})} to={'/main'}  >Домашня сторінка</NavLink></li>
                <li><NavLink style={({margin:"0px 5px", color:isCurrentLocation('/train') ? "red" : "black", fontSize : "2rem"})} to={'/train'} >Тренування</NavLink></li>
                <li><NavLink style={({margin:"0px 5px", color:isCurrentLocation('/food') ? "red" : "black", fontSize : "2rem"})} to={'/food'} >Харчування</NavLink></li>
                <li><NavLink style={({margin:"0px 5px", color:isCurrentLocation('/challenge') ? "red" : "black", fontSize : "2rem"})} to={'/challenge'} >Кинути челлендж</NavLink></li>
                <li><NavLink style={({margin:"0px 5px", color:isCurrentLocation('/newsClient') ? "red" : "black", fontSize : "2rem"})} to={'/newsClient'} >Новини</NavLink></li>
                <li><NavLink onClick={() => Exit()} style={{margin:"0px 0px 0px 5px", color:"black", fontSize:"2rem"}} className={'btn-outline-dark'} >Вихід</NavLink></li>
              </ul>
          </nav>
        </div>
      </header>
      <br />
      <br />
            {/* <nav style={{backgroundColor:"#0079E7", height:"40px", textAlign:"center" }} >
                


            </nav> */}
        <br />
        <br />
        <div>
          <Outlet />
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
        <br />
        <br />
        <br />
        <br />
        <div style={{ margin: '10px'}}>
          <div style={{backgroundColor:'grey', width:"200px", textAlign:"center", borderRadius:'15px'}}>
            <h3 style={{color:'white', fontWeight:'800', fontSize:"1.5rem", }}>Коментарі</h3>
          </div>
          
        <div >
        <div class="card mb-3" style={{ width: '800px' }}>
          <div class="card-body">
            <form onSubmit={(e) => {addComment(e)}}>
            <p className="card-text" style={{ height: "150px" }}>
              <textarea className='form-control' placeholder="Поле для коментаря, текст якого буде відправлений" onChange={(e) => setContent(e.target.value)} value={content} style={{ height: "150px" }} maxLength={700} />
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
                <div className="card mb-3" style={{ width: '50%', backgroundColor: "rgb(114, 238, 239)", height: "auto"  }} key={`Comment${index}`}>
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

            <div>
                <hr />
                <footer style={{fontSize:'1.5rem', fontWeight:'700'}}>&copy;HealthyFit</footer>
            </div>
        </div>
    )
}

export {Layout}