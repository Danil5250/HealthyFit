import './FirstPage.css'
import {NavLink} from 'react-router-dom'

const FirstPage = () => {
  return (
    <div className=''>
      <br />
      <br />
      <br />
      
      <p style={{textAlign: 'center', fontStyle: 'italic', color:'orangered', fontWeight:'700', backgroundColor:'grey', fontSize:'1.3rem',  borderRadius: '15px', padding:'7px'}}>
        Ні для кого не секрет, що для досягнення максимального результату потрібно не тільки тренуватися, а й якісно харчуватися. Тут все просто: хочете, щоб м'язи стали рельєфнішими, живіт пішов, і фігура стала спортивною, тоді позбавтеся надлишків жиру. Це досягається комплексом "правильні тренування + правильне харчування для схуднення". І тоді ви не просто «худнете», а робите свою фігуру красивою і спортивною.
      </p>

      <br /><br />

      <div style={{textAlign:'center'}}>
        <p style={{color:'white', backgroundColor:'gray', borderRadius: '15px', width:'75%', marginLeft:'10%', padding:'0px 7px 7px 20px'}}>
          Мета <i style={{color:'red', marginRight:"5px", fontWeight:'900', fontSize:"2rem"}}>HealthyFit</i>  - 
          надихнути та підтримати Вас на шляху до здоров'я та роботи над своїм тілом.
          <br />
          Сайт призначений для всіх, хто прагне здобути здоровий спосіб життя та досягти ідеальної фігури.
          Ви отримаєте комплексний підхід до процесу похудіння, базуючись на принципах правильного харчування, активного тренування, з підбором рентабельних навантажень, адаптованих під самостійне виконання.
          У Вас буде можливість вести трекер своїх досягнень, та змагатись з користувачами завдяки челленджу.
        </p>

      </div>
      <br />

      <div className='infoimg'>
        <img src={`${process.env.PUBLIC_URL}/img/indexpage1.jpg`} alt="" width="400px" height="250px" style={{ margin: "10px 50px" }} />
        <img src={`${process.env.PUBLIC_URL}/img/indexpage2.jpg`} alt="" width="400px" height="250px" style={{ margin: "10px 50px" }} />
      </div>
      <br /><br />
      <div style={{color:'white', backgroundColor:'gray', borderRadius: '15px', width:'75%', marginLeft:'10%', padding:'0px 7px 7px 20px'}}>
        <p>Дуже важливо розуміти теоритичні основи тренінгу та фізіологічних процесів, що відбуваються в організмі. Вивчайте інформацію на нашому сайті. Знання сила!</p>
      </div>
      <br />
      
    </div>
  )
}

export { FirstPage }