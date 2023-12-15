import { useEffect, useState } from 'react'
import axios from '../../../config/axios'
import { baseUrlMain } from '../../../config/config'
import New from '../Components/New/New'



const NewsPage = () => {

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
            <h2 style={{color:'white'}}>Новини</h2>

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

export {NewsPage}