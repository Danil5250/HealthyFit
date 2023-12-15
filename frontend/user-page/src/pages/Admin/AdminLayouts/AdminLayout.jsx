import { Outlet } from "react-router-dom"
import { NavLink, Navigate, useLocation, useNavigate } from "react-router-dom"
import axios from '../../../config/axios'
import config from '../../../config/config'
import cookies from 'js-cookie'
import './AdminLayout.css'
import {useState, useEffect} from 'react'
import { baseUrlMain } from "../../../config/config"
import Swal from "sweetalert2"

const AdminLayout = () => {

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
    



    return (
        <div className="backimgclient">
            <header>
        <div class="container">
          <nav id="navigation">
            <NavLink to={'/admin'} className={"logo"}><h1 style={{width:"400px"}}>HealthyFit</h1></NavLink>
            <a aria-label="mobile menu" class="nav-toggle">
              <span></span>
              <span></span>
              <span></span>
            </a>
              <ul class="menu-left">
                <li><NavLink style={({fontSize : "2rem", margin:"0px 5px", color:isCurrentLocation('/admin') ? "red" : "black"})} to={'/admin'}  >Новини</NavLink></li>
                <li><NavLink style={({fontSize : "2rem", margin:"0px 5px", color:isCurrentLocation('/admin/train') ? "red" : "black"})} to={'/admin/train'} >Тренування</NavLink></li>
                <li><NavLink style={({fontSize : "2rem", margin:"0px 5px", color:isCurrentLocation('/admin/exercice') ? "red" : "black"})} to={'/admin/exercice'} >Навантаження</NavLink></li>
                <li><NavLink style={({fontSize : "2rem", margin:"0px 5px", color:isCurrentLocation('/admin/food') ? "red" : "black"})} to={'/admin/food'} >Продукти</NavLink></li>
                <li><NavLink style={({fontSize : "2rem", margin:"0px 5px", color:isCurrentLocation('/admin/comments') ? "red" : "black"})} to={'/admin/comments'} >Коментарі</NavLink></li>
                <li><NavLink onClick={() => Exit()} style={{margin:"0px 5px", color:"black", fontSize:"2rem"}} className={'btn-outline-dark'} >Вихід</NavLink></li> 
              </ul>
          </nav>
        </div>
      </header>
      <br />
      <br />
      <br />
      <br />
            <div>
                <Outlet />
            </div>


            <div>
                <hr />
                <footer style={{fontSize:'1.5rem', fontWeight:'700'}}>&copy;HealthyFit</footer>
            </div>
        </div>
    )
}

export {AdminLayout}