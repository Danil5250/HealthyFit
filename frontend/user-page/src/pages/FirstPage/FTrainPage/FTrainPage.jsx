import {NavLink} from 'react-router-dom'
import Swal from 'sweetalert2'


const FTrainPage = () => {

    return (
        <div>
            <div style={{position:"relative", textAlign:'center'}}>
                    <img src={`${process.env.PUBLIC_URL}/img/ManSiluet.jpg`} alt="" width="500px" height="600px" style={{ margin: "10px 50px" }} />
                    <img src={`${process.env.PUBLIC_URL}/img/WomanSiluet.jpg`} alt="" width="500px" height="600px" style={{ margin: "10px 50px" }} />
                    <button onClick={() => {
                        Swal.fire({
                            title:"<h1>Відео з тренуванням для рук</h1>",
                            width:'100%',
                            html : `<iframe width="1280" height="720" src="https://www.youtube.com/embed/vd_CtmfDzXA" title="Тренування рук | Зміцнення мязів рук | Вправи для рук | Вправи для верхнього плечового поясу" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
                        })
                    }} className="btn btn-primary" style={{position:'absolute', left:250, top:300, fontSize:'1.2rem', fontWeight:'600'}}>Руки</button>
                    <button onClick={() => {
                        Swal.fire({
                            title:"<h1>Відео з тренуванням для прес</h1>",
                            width:'100%',
                            html : `<iframe width="1280" height="720" src="https://www.youtube.com/embed/_FT0mq7hIc4" title="🔥 Найкраще тренування на все тіло: НОГИ + ПРЕС" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
                        })
                    }} className="btn btn-success" style={{position:'absolute', left:570, top:300, fontSize:'1.2rem', fontWeight:'600'}}>Прес</button>
                    <button onClick={() => {
                        Swal.fire({
                            title:"<h1>Відео з тренуванням для ніг</h1>",
                            width:'100%',
                            html : `<iframe width="1280" height="720" src="https://www.youtube.com/embed/-XUgzoH8Px4" title="ТОП 5 самих ефективних вправ для пресу!" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
                        })
                    }} className="btn btn-secondary" style={{position:'absolute', left:630, bottom:200, fontSize:'1.2rem', fontWeight:'600'}}>Ноги</button>

                    <button onClick={() => {
                        Swal.fire({
                            title:"<h1>Відео з тренуванням для рук</h1>",
                            width:'100%',
                            html : `<iframe width="1280" height="720" src="https://www.youtube.com/embed/kDUcZuRkUoE" title="Красиві руки без &quot;желе&quot;: найкращі вправи на трицепс для всіх, хто мріє про красиві руки" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
                        })
                    }} className="btn btn-primary" style={{position:'absolute', right:300, top:300, fontSize:'1.2rem', fontWeight:'600'}}>Руки</button>
                    <button onClick={() => {
                        Swal.fire({
                            title:"<h1>Відео з тренуванням для прес</h1>",
                            width:'100%',
                            html : `<iframe width="1280" height="720" src="https://www.youtube.com/embed/vtV5tCTTz7U" title="Тренування для пресу" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
                        })
                    }} className="btn btn-success" style={{position:'absolute', right:550, bottom:230, fontSize:'1.2rem', fontWeight:'600'}}>Прес</button>
                    <button onClick={() => {
                        Swal.fire({
                            title:"<h1>Відео з тренуванням для сідниць</h1>",
                            width:'100%',
                            html : `<iframe width="1280" height="720" src="https://www.youtube.com/embed/ZZFzrV8iWhk" title="Цікавий і дієвий комплекс вправ на ноги і сідниці , силове тренування на низ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
                        })
                    }} className="btn btn-secondary" style={{position:'absolute', right:570, bottom:100, fontSize:'1.2rem', fontWeight:'600'}}>Сідниці</button>
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
        </div>
    )
}

export {FTrainPage}