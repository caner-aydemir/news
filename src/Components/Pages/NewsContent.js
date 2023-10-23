import React, {useContext, useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import moment from "moment";
import newsPhoto from "../Images/newsjpg.jpg"
import {AuthContext} from "../../Context/AuthProvider";


function NewsContent() {
    let navigate = useNavigate();
    const {myCategories,getNews} = useContext(AuthContext);
    const location = useLocation()
    const [news, setNews] = useState(location.state.newsData);
    useEffect(() => {
        window.scroll(0,0)
        if (news === null)
        {
            getNews(myCategories)
        }
        console.log("news" , news)

    }, []);

    return (
        <div className="w-full overflow-hidden flex flex-col h-full items-center justify-center gap-y-10 h-screen xs:h-full">
            {news !== null &&
            <>
                <div className="flex flex-col w-1/2 xs:w-full text-red-700 items-center justify-center text-2xl font-bold text-center space-y-2">
                    <p className="w-full ">{news?.title}</p>
                    <p className="flex text-sm  font-semibold">{moment(news?.publishedAt).format("lll")} - {news?.author}  </p>
                    {news?.urlToImage === null ?
                        <img src={newsPhoto} alt="" className="w-full h-96 object-contain hover:scale-95 duration-1000 "/>
                        :
                        <img src={news?.urlToImage} alt="" className="w-full h-96 object-contain hover:scale-95 duration-1000 "/>

                    }
                </div>
                <div className="flex flex-col w-full text-center">
                    <p className="text-xl font-semibold">{news?.description}</p>
                    <p>{news?.content}</p>
                </div>
            </>
            }
        </div>
    );
}

export default NewsContent;