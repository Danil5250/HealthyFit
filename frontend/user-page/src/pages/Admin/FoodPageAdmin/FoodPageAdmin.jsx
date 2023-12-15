import { useEffect, useState } from "react"
import axios from '../../../config/axios'
import { baseUrlAdmin } from "../../../config/config"
import Swal from "sweetalert2"
import { Navigate } from "react-router-dom"
import cookies from 'js-cookie'
import Food from "../../Main/Components/Food/Food"

const FoodPageAdmin = () => {

    const [productNameAdd, setProductNameAdd] = useState('')
    const [productKkalAdd, setProductKkalAdd] = useState('')
    
    const [productNameDel, setProductNameDel] = useState('')
    
    const [productNameUpdateOld, setProductNameUpdateOld] = useState('')
    const [productNameUpdate, setProductNameUpdate] = useState('')
    const [productKkalUpdate, setProductKkalUpdate] = useState('')

    const [isShowProducts, setIsShowProducts] = useState(false)

    const [products, setProducts] = useState([])

    useEffect( () => {
        getAllProducts()
    }, [])

    const getAllProducts = () => {
        axios.get(baseUrlAdmin + 'getallProducts')
        .then(res => {
            setProducts(res.data)
        })
    }

    const addProduct = (e) => {
        e.preventDefault()

        if(productNameAdd && productKkalAdd > 0 && productKkalAdd < 1000) {
            axios.post(baseUrlAdmin + 'addProduct', {
                name : productNameAdd,
                kcal : productKkalAdd
            })
            .then(res => {
                Swal.fire({
                    title:res.data
                })
                getAllProducts()
                setProductNameAdd('')
                setProductKkalAdd('')
            }) 
        }
        else
        Swal.fire({title:"Некорректні дані"})
    }

    const delProduct = (e) => {
        e.preventDefault()

        if(productNameDel) {
            axios.post(baseUrlAdmin + 'deleteProduct', {
                name : productNameDel
            })
            .then(res => {
                Swal.fire({
                    title:res.data
                })

                setProductNameDel('')
                getAllProducts()
            })
        }
    }
    

    const updateProduct = (e) => {
        e.preventDefault();
        axios.post(baseUrlAdmin + 'updateProduct', {
            name : productNameUpdate,
            oldname : productNameUpdateOld,
            kcal : productKkalUpdate
        })
        .then(res => {
            Swal.fire({
                title:res.data
            })
            setProductNameUpdate('')
            setProductNameUpdateOld('')
            setProductKkalUpdate('')
            getAllProducts()
        })
    }

    if (cookies.get("login") == 'admin' && cookies.get('token')) {
        return(
            <div>
                <h2 style={{ borderRadius: "15px", backgroundColor: "rgba(128, 128, 128, 0.8)", margin: '0 1%', textAlign: 'center', fontWeight: '900', fontSize: '3rem', color: 'Red' }}>Продукти</h2>

                <div style={{ borderRadius: "15px", backgroundColor: "rgba(128, 128, 128, 0.8)", margin: "1%", padding: "1%" }}>
                    <h4 style={{ fontWeight: "600", color: 'white' }}>Додати продукт</h4>
                    <form onSubmit={(e) => addProduct(e)}>
                        <div className="input-group">
                            <label htmlFor="commentName" style={{ backgroundColor: "bisque", fontSize:'1.1rem', fontWeight:'600'  }} className="input-group-text">Назва продукту: </label>
                            <input type="text" onChange={(e) => setProductNameAdd(e.target.value)} className="form-control" value={productNameAdd} placeholder="Картопля варена" required minLength={3} />
                        </div>
                        <br />
                        <div className="input-group">
                            <label htmlFor="commentName" style={{ backgroundColor: "bisque", fontSize:'1.1rem', fontWeight:'600'  }} className="input-group-text">Калорій: </label>
                            <input type="number" onChange={(e) => setProductKkalAdd(e.target.value)} className="form-control" value={productKkalAdd} placeholder="калорій на 100г" required minLength={3} />
                        </div>
                        <br />
                        <button type="submit" className="btn btn-warning" style={{fontSize:'1.1rem', fontWeight:'600'}}>Додати</button>
                    </form>
                </div>

                <div style={{ borderRadius: "15px", backgroundColor: "rgba(128, 128, 128, 0.8)", margin: "1%", padding: "1%" }}>
                    <h4 style={{ fontWeight: "600", color: 'white' }}>Видалити продукт</h4>
                    <form onSubmit={(e) => delProduct(e)}>
                        <div className="input-group">
                            <label htmlFor="commentName" style={{ backgroundColor: "bisque", fontSize:'1.1rem', fontWeight:'600'  }} className="input-group-text">Назва продукту: </label>
                            <input type="text" onChange={(e) => setProductNameDel(e.target.value)} className="form-control" value={productNameDel} placeholder="Картопля варена" required minLength={3} />
                        </div>
                        <br />
                        <button className="btn btn-danger" style={{fontSize:'1.1rem', fontWeight:'600'}}>Видалити</button>
                    </form>
                </div>
                
                
                <div style={{ borderRadius: "15px", backgroundColor: "rgba(128, 128, 128, 0.8)", margin: "1%", padding: "1%" }}>
                    <h4 style={{ fontWeight: "600", color: 'white' }}>Оновити продукт</h4>
                    <form onSubmit={(e) => updateProduct(e)}>
                        <div className="input-group">
                            <label htmlFor="commentName" style={{ backgroundColor: "bisque", fontSize:'1.1rem', fontWeight:'600'  }} className="input-group-text">Стара назва продукту: </label>
                            <input type="text" onChange={(e) => setProductNameUpdateOld(e.target.value)} className="form-control" value={productNameUpdateOld} placeholder="Картопля варена" required minLength={3} />
                        </div>
                        <br />
                        <div className="input-group">
                            <label htmlFor="commentName" style={{ backgroundColor: "bisque", fontSize:'1.1rem', fontWeight:'600'  }} className="input-group-text">Нова назва продукту: </label>
                            <input type="text" onChange={(e) => setProductNameUpdate(e.target.value)} className="form-control" value={productNameUpdate} placeholder="Картопля варена" required minLength={3} />
                        </div>
                        <br />
                        <div className="input-group">
                            <label htmlFor="commentName" style={{ backgroundColor: "bisque", fontSize:'1.1rem', fontWeight:'600'  }} className="input-group-text">Калорій: </label>
                            <input type="number" onChange={(e) => setProductKkalUpdate(e.target.value)} className="form-control" value={productKkalUpdate} placeholder="калорій на 100г" required minLength={3} />
                        </div>
                        <br />
                        <button className="btn btn-success" style={{fontSize:'1.1rem', fontWeight:'600'}}>Оновити</button>
                    </form>
                </div>


                <div>
                    <button style={{fontWeight:'600', fontSize:'1.2rem'}} className="btn btn-primary" onClick={() => setIsShowProducts(!isShowProducts)}>Показати/сховати продукти</button>

                    <div>
                        {
                            isShowProducts ?
                                products.map((item, index) => {
                                return (
                                    <div className="food-card" >
                                        <Food
                                            key={index}
                                            name={item.name}
                                            kcal={item.kcal}
                                        />
                                    </div>)
                            })
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

export {FoodPageAdmin}