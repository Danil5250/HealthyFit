import { useEffect, useState } from 'react'
import axios from '../../../config/axios'
import { baseUrlMain } from '../../../config/config'
import New from '../Components/NewClient/NewClient'



const NewsPageClient = () => {

    const[news, setNews] = useState([111])

    useEffect( () => {
        getAllNews()
    }, [])
    
    const getAllNews = () => {
        axios.post(baseUrlMain + 'getallnews')
        .then(res => {
            console.log(res.data)
            setNews(res.data)
        })
        
    }

    return (
        <div style={{margin:"10px"}}>
            <br />
            <h2 style={{color:'white', backgroundColor:"grey", borderRadius:'15px', textAlign:"center", width:'200px', margin:'5px'}}>Новини</h2>

            <div class="card-group">
                {
                    news.map((item, index) => {
                        return (
                            <New
                            key={`New${index}`}
                            id = {item.id}
                            img = {item.img}
                            name = {item.name}
                            />
                        )
                    })
                }
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
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

        </div>
    )
}

export {NewsPageClient}