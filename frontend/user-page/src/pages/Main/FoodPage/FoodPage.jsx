import { useEffect, useState } from "react"
import axios from '../../../config/axios'
import { baseUrlMain } from "../../../config/config"
import Food from "../Components/Food/Food"
import './FoodPage.css'
import cookies from 'js-cookie'
import Swal from "sweetalert2"
import { Navigate } from "react-router-dom"

const FoodPage = () => {
    const [prodcuts, setProducts] = useState([])
    const [userData, setUserData] = useState({})

    const [kcal, setKcal] = useState(0)
    const [squirrels, SetSquirrels ] = useState(0)
    const [fat, SetFat ] = useState(0)
    const [carbonydrahets, setCarbonydrahets] = useState(0)

    const [seekData, setSeekData] = useState('')
    
    useEffect(() => {
        getAllProducts()
        getUserdata();
    }, [])

    useEffect( () => {
        setUserPersonal()
    }, [userData])

    const getAllProducts = () => {
        axios.get(baseUrlMain + "getallproducts")
            .then(res => {
                setProducts(res.data)
            })
    }

    const getUserdata = () => {
        axios.post(baseUrlMain + 'getuserdata', {
            login:cookies.get('login')
        })
        .then(res => {
            console.log(res.data)
            setUserData(res.data)
        })
    }

    const setUserPersonal = () => {
        if (userData.stat == "Men") {

            //Kcal
            if (userData.activity == 'sitting')
                setKcal(Math.round((66.5 + (13.75 * userData.weight) + (5.003 * userData.height) - (46.775 * userData.age)) * 1.2))
            if (userData.activity == 'mixed')
                setKcal(Math.round((66.5 + (13.75 * userData.weight) + (5.003 * userData.height) - (46.775 * userData.age)) * 1.5))
            if (userData.activity == 'active')
                setKcal(Math.round((66.5 + (13.75 * userData.weight) + (5.003 * userData.height) - (46.775 * userData.age)) * 1.7))


            //Squirels
            if(userData.goal == "gainweight")
                SetSquirrels(Math.round(0.75*userData.weight + 1.5))
            else
                SetSquirrels(Math.round(0.75*userData.weight))

            
            
            //Fats
            if(userData.goal == 'loseweight')
                SetFat(Math.round(0.8*userData.weight))
            else
                SetFat(Math.round(1.0 * userData.weight))



            //Carbonydrahets
            if(userData.goal == "loseweight")
                setCarbonydrahets(3*userData.weight)
            else
                setCarbonydrahets(5*userData.weight)
            
        }
        if (userData.stat == "Women") {

            //Kcal
            if (userData.activity == 'sitting')
                setKcal(Math.round((655.1 + (9.563 * userData.weight) + (1.85 * userData.height) - (4.676 * userData.age)) * 1.2))
            if (userData.activity == 'mixed')
                setKcal(Math.round((655.1 + (9.563 * userData.weight) + (1.85 * userData.height) - (4.676 * userData.age)) * 1.5))
            if (userData.activity == 'active')
                setKcal(Math.round((655.1 + (9.563 * userData.weight) + (1.85 * userData.height) - (4.676 * userData.age)) * 1.7))


            //Squirels
            if(userData.goal == "gainweight")
                SetSquirrels(Math.round(0.75*userData.weight + 1.5))
            else
                SetSquirrels(Math.round(0.75*userData.weight))

            
            //Fats
            if(userData.goal == 'loseweight')
                SetFat(Math.round(0.8*userData.weight))
            else
                SetFat(Math.round(1.0 * userData.weight))





            //Carbonydrahets
            if(userData.goal == "loseweight")
                setCarbonydrahets(3*userData.weight)
            else
                setCarbonydrahets(5*userData.weight)
        }
    }


    const SubmitHandler = (e) => {
        e.preventDefault();
        axios.post(baseUrlMain + 'getproductsbykcal', {
            kcal : +seekData
        })
        .then(res => {
            setProducts(res.data)
        })
        console.log('seek', prodcuts)
        setSeekData('')
    }
    {/**/ }


    if (cookies.get("login") && cookies.get('token')) {
        return (
            <div>
                <h1>Харчування</h1>
                <br />
                <br />

                <div>
                    <div>

                        <div className="row">


                            <form className="col" >
                                <div className="card" style={{padding:"0px 0px 0px 15px", margin:"0px 10px", textAlign:"center" }}>
                                    <h3 style={{ textDecorationLine: "underline" }}>Ваша добова енергетична потреба в раціоні:</h3>

                                    <div style={{ display: "flex", textAlign:"center"}}>
                                        <div class="alert alert-primary" role="alert" style={{ margin: "5px", fontSize: "1.2rem", fontWeight: "600", display:"inline-block" }}>{kcal} калорій</div>
                                        <div class="alert alert-danger" role="alert" style={{ margin: "5px", fontSize: "1.2rem", fontWeight: "600", display:"inline-block" }}>{squirrels}г білків</div>
                                        <div class="alert alert-success" role="alert" style={{ margin: "5px", fontSize: "1.2rem", fontWeight: "600", display:"inline-block"}}>{fat}г жирів</div>
                                        <div class="alert alert-info" role="alert" style={{ margin: "5px", fontSize: "1.2rem", fontWeight: "600", display:"inline-block" }}>{carbonydrahets}г вуглеводів</div>
                                        <div class="alert alert-dark" role="alert" style={{ margin: "5px", fontSize: "1.2rem", fontWeight: "600", display:"inline-block" }}>Норма води в день 2.1-2.8 л</div>
                                    </div>
                                </div>

                            </form>
                            <div className="col-4" style={{textAlign:"center"}}>
                                
                            <div className="card" style={{padding:"0px 0px 15px 15px", margin:"0px 10px", textAlign:"center" }}>
                                <h3 style={{ textDecorationLine: "underline" }}>Рекомендоване меню на тиждень</h3>
                                <button className="btn btn-primary" style={{ margin: "0px 10%", fontSize: "1.2rem", fontWeight: '600' }} onClick={() => {
                                    Swal.fire({
                                        html: `
                                    <div id="carouselExample" class="carousel slide" style={{backgroundColor:"black"}}>
                                      <div class="carousel-inner">
                                        <div class="carousel-item active">
                                        <h2>Пеший тиждень</h2>
                                        <img src='` + `${process.env.PUBLIC_URL}/img/calendarfood7.png' alt="" width="700px" height="770px" style={{ margin: "10px" }} />
                                        </div>
                                        <div class="carousel-item">
                                        <h2>Другий тиждень</h2>
                                        <img src='` + `${process.env.PUBLIC_URL}/img/calendarfood7.png' alt="" width="700px" height="770px" style={{ margin: "10px" }} />
                                        </div>
                                        <div class="carousel-item">
                                        <h2>Третій тиждень</h2>
                                        <img src='` + `${process.env.PUBLIC_URL}/img/calendarfood7.png' alt="" width="700px" height="770px" style={{ margin: "10px" }} />
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
                                        width: '800px'
                                    })
                                    }}>Індивідуальне меню страв на тиждень</button>

                                </div>
                            </div>

                        </div>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <div className="row">
                            <h3 style={{ padding: "3px", textDecorationLine: "underline", backgroundColor: 'grey', width: "60%", marginLeft: "1%", textAlign: "center", borderRadius: '15px', color: "white", fontWeight: '800', fontSize: "1.5rem" }}>Пошук страви за калорійністю для самостійного підбору харчування</h3>
                            <div class="container-fluid">
                                <div className="card" style={{margin:"1%", padding:"5px"}}>
                                    <form class="d-flex" role="search" onSubmit={(e) => SubmitHandler(e)}>
                                        <input class="form-control me-2" type="number" onChange={(e) => { setSeekData(e.target.value) }} value={seekData} placeholder="Ви пишите бажану кількість калорій та отримуєте страви в цьому діапазоні" aria-label="Search" />
                                        <button class="btn btn-warning" style={{ width: "300px", margin:'3px' }} type="submit">Пошук страв</button>
                                    </form>
                                    <br />
                                    <br />
                                    <br />
                                    <button style={{fontWeight:'600', margin:'3px'}} className="btn btn-primary" onClick={() => getAllProducts()}>Показати усі страви</button>
                                </div>
                            </div>
                        </div>



                        <br />
                            <h3 style={{padding: "3px", textDecorationLine: "underline", backgroundColor: 'grey', width: "30%", marginLeft: "1%", textAlign: "center", borderRadius: '15px', color: "white", fontWeight: '800', fontSize: "1.5rem"}}>Рекомендовані продукти</h3>
                        <div className="row">
                            {

                                prodcuts.map((item, index) => {
                                    return (
                                        <div className="food-card" >
                                            <Food
                                                key={index}
                                                name={item.name}
                                                kcal={item.kcal}
                                            />
                                        </div>)
                                })
                            }
                        </div>
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

export { FoodPage }