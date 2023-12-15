import Swal from 'sweetalert2'

const showCalories = (props) => {
    return (
        Swal.fire({
            title: "Введіть вагу страви(у грамах)",
            input: "number",
            inputAttributes: {
              autocapitalize: "off"
            },
            showCancelButton: true,
            confirmButtonText: "Дізнатись калорії",
            showLoaderOnConfirm: true,
            preConfirm: async (weight) => {
                let result 
                if(weight > 0 ) {
                    result = Math.round((props.kcal* weight)/100)
                }
                else {
                    result="Неккоректні дані"
                }
                return result
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: `${result.value} калорій`,
              });
            }
          })
    )
}

export default (props) => {
    return (
        <div>
            <h2><button className="btn btn-success" title='Натисини на мене' style={{fontSize:'1.5rem'}} onClick={(e) => {showCalories(props)}}><i>{props.name}</i><br/>100г - {props.kcal}ккал</button></h2>
            {/* {props.kcal}калорій */}
        </div>
    )
}