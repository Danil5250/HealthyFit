import { Link } from "react-router-dom"




export default (props) =>  {



    return (
        <div key={props.key}>
            <div className="card text-bg-danger mb-3" style={{margin:"10px", border:"3px solid red"}}>
            <img src={`${process.env.PUBLIC_URL}/img/newsImg/${props.img}`} width='150px' height='250px' class="card-img-top"/>
              <div className="card-body">
                <h5 className="card-title" style={{fontWeight:'600', fontSize:"1.5rem"}}>{props.name}</h5>
                {props.disabledlink ? <p className="card-text" style={{fontWeight:'600'}}><Link style={{fontWeight:'600', fontSize:"1.5rem"}}>Посилання на детальну інформацію</Link></p> 
                :
                <p className="card-text" style={{fontWeight:'600'}}><Link to={'/newClient/' + props.id} style={{fontWeight:'600', fontSize:"1.5rem"}}>Детальна інформація</Link></p>
              }
              </div>
            </div>
        </div>
    )
}