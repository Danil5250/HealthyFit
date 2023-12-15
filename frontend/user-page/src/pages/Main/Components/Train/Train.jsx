
import { useEffect, useState } from 'react'
import axios from '../../../../config/axios'
import { baseUrlMain } from '../../../../config/config'
import Swal from 'sweetalert2'
import cookies from 'js-cookie'



export default (props) => {
    const [exercises, setExercises] = useState([])

    useEffect( () => {
        showTrainContant(props.contant)
    }, [])
    
    const showTrainContant= (contant) => {
        console.log(contant)
        axios.post(baseUrlMain+'gettraincontant', {
                    contant : contant
        })
        .then(res => {
            setExercises(res.data)
        })
    }

    const showExercises = () => {
        let data = "<ol style='text-align:center'>"
        exercises.map( (item, index) => {
            if(item) {
              data += `<li>${item.contant}</li>`
              data += "<br/>"
            }
        })
        data += "</ol>"
        return (
            Swal.mixin({
                customClass: {
                  confirmButton: "btn btn-success",
                  cancelButton: "btn btn-danger"
                },
                buttonsStyling: false
              }).fire({
                title : "План тренування",
                icon: 'warning',
                width:'80%',
                html:data,
                showCancelButton:true,
                confirmButtonText : "Виконано",
                cancelButtonText: "Відмінити",
                reverseButtons: true
            }).then( (result) => {
                if (result.isConfirmed) {
                  let delkkal = 0;
                  exercises.map( (value, index) => {
                    if(value)
                    delkkal += value.delkkal
                  })

                  //if(cookies.get('delkkal'))
                  //{
                  //  let alreadydelkkal = cookies.get('delkkal')
                  //  alreadydelkkal += delkkal;
                  //  cookies.set(alreadydelkkal)
                  //}
                  
                    Swal.fire({
                      title: "Тренування завершено!",
                      text: `Витрачено ${delkkal} ккал`,
                      icon: "success"
                    });
                  } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                  ) {
                    Swal.fire({
                      title: "Відмінено!",
                      text: "Тренування відмінено",
                      icon: "warning"
                    });
                  }
            })
        )
    }

    const IsCorrectVideo = (string) => {
      if(String(string).includes('embed'))
        return true
      else
        return false
    }
    
    return(
        
    <div>
        <h2 style={{wordWrap:"normal"}}>{props.name}</h2>
        <h5>Категорія: {props.category}</h5>
        
        <p>
            <button className='btn btn-dark' onClick={() => showExercises()}>Подивитись тренування</button>
        </p>
        <p>Займе: {props.time}хв</p>
        <p>Гарний приклад: </p>
        {
          IsCorrectVideo(props.video) ? <p><iframe width="200" height="200" src={`${props.video}`} allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' allowFullScreen></iframe></p> 
          // title="Тренування" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen
          : null
        }
        
    </div>)
}
