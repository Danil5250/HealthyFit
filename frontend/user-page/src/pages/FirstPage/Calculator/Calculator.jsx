import { useEffect, useState } from "react"
import Swal from "sweetalert2"


const Calculator = () => {

    const [stat, setStat] = useState('')
    const [height, setHeight] = useState('')

    const SetRadio = (value) => {
        setStat(value)
    }

    const SubmitHandler = (e) => {
        let idealWeight
        if(stat === "Men") {
            idealWeight = Math.round((height - 100) - ((height - 150)/4) )
        }
        if(stat === "Women") {
            idealWeight  = Math.round((height - 100) - ((height - 150)/2))
        }
        e.preventDefault();
        Swal.fire({
            title:'Ваша ідеальна вага: ',
            text: idealWeight
        })
        setHeight('')
        setStat('')
    }

    
    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <form className="container-xl" onSubmit={(e) => SubmitHandler(e)}>
                <div className="d-flex justify-content-center align-items-center" >
                    <div style={{ display: "flex", left: "50%" }} className="form-check">
                        <input type="radio" checked={stat === "Men"} onClick={() => SetRadio('Men')} name="Stat" style={{ boxShadow: "1px 1px 10px rgb(41, 45, 84)" }} className="form-check-input" value="Men" title="Виберіть стать" required /> <label className="form-check-label" style={{ backgroundColor: "bisque", borderRadius: "25px", margin: "0px 5px", padding: "0px 5px" }} >Чоловіча стать</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="radio" checked={stat === "Women"} onClick={() => SetRadio('Women')} name="Stat" style={{ boxShadow: "1px 1px 10px rgba(255, 40, 158, 0.537)" }} className="form-check-input" value="Women" title="Виберіть стать" required /> <label className="form-check-label" style={{ backgroundColor: "bisque", borderRadius: "25px", margin: "0px 5px", padding: "0px 5px" }}>Жіноча стать</label>
                    </div>
                </div>

                <br />
                <div className="input-group" style={{ boxShadow: "1px 1px 10px rgb(255, 204, 0)" }}>
                    <label style={{ backgroundColor: "bisque" }} htmlFor="height" className="input-group-text">Ваш зріст у см</label>
                    <input type="number" placeholder="Ваш зріст у см" className="form-control" onChange={(e) => {setHeight(e.target.value)}} value={height} required />
                </div>
                <br />
                <div style={{textAlign:"center"}}>
                    <button type="submit" className="btn btn-success">Дізнатись мою вагу</button>
                </div>
                <br />
                <br />
                <br />
            </form>
        </div>
    )
}

export {Calculator}