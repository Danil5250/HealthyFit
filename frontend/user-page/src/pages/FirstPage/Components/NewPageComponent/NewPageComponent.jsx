import { useParams } from "react-router-dom"
import axios from '../../../../config/axios'
import { baseUrlMain } from "../../../../config/config";
import { useEffect, useState } from "react";



const NewPageComponent = () => {

    const [newN, setNew] = useState({})
    const {id} = useParams();

    useEffect( () => {
        getNew()
    }, [])

    const getNew = () => {
        axios.post(baseUrlMain + 'getnewbyid', {
            id:id
        })
        .then(res => {
            setNew(res.data)
            console.log(newN)
        })
    }
    
    return(
        <div>
            <div className="card text-bg-danger mb-3" style={{margin:"10px", border:"3px solid red"}}>
                <div className="card-title" style={{width:'700px', textAlign:"center", margin:"0px 0px 0px 450px"}}>
                <img src={`${process.env.PUBLIC_URL}/img/newsImg/${newN.img}`} width='700px' height='550px' />
                </div>
              <div className="card-body">
                <h5 className="card-title" style={{fontWeight:'600', fontSize:"1.5rem", textAlign:"center"}}>{newN.name}</h5>
                <p className="card-text" style={{fontWeight:'600'}}>{newN.contant}</p>
              </div>
            </div>
        </div>
    )
}

export {NewPageComponent}