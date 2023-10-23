import React, {useContext, useEffect,useState} from 'react';
import {useLocation} from "react-router-dom";
import {AuthContext} from "../../Context/AuthProvider";
import moment from "moment";
import newsPhoto from "../Images/newsjpg.jpg";

function CategoryContent() {
    const location = useLocation()
    const {myCategories,getNews,news,goNewsContent} = useContext(AuthContext);
    const [data, setData] = useState([1,1,1,1,1,1,1,1,1]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredNews, setFilteredNews] = useState([]);
    useEffect(() => {
        window.scroll(0,0)

        getNews(myCategories)
    }, [myCategories]);
    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);

        const filteredNews = news.filter((newsItem) =>
            newsItem.title?.toLowerCase().includes(searchTerm) ||
            newsItem.author?.toLowerCase().includes(searchTerm) ||
            newsItem.description?.toLowerCase().includes(searchTerm) ||
            newsItem.content?.toLowerCase().includes(searchTerm)
        );
        setFilteredNews(filteredNews);
    };
    return (

        <div
            className={`flex flex-col items-center justify-center mx-auto w-full  gap-y-10  my-2`}
        >
            <p className={`text-2xl font-bold`}>{myCategories.toUpperCase()}</p>
            <div className="flex flex-col gap-x-2 w-full items-center justify-center overflow-hidden px-3">
                <div className="flex xs:flex-col gap-x-2  w-1/3 xs:w-full overflow-hidden">
                    <input
                        type="text"
                        className="border-2 rounded-full w-5/6 xs:w-full px-2"
                        placeholder="Search for news.."
                        value={searchTerm.toLowerCase()}
                        onChange={handleSearch}
                    />
                </div>
                <ul className={`border-2 xs:w-full rounded-xl p-4 bg-gray-800 text-white w-2/3 flex  flex-col gap-y-1 ${searchTerm === "" && "hidden"} ${filteredNews.length === 0 && "hidden"}`}>
                    {filteredNews.map((newsItem,i) => (
                        <li onClick={()=>goNewsContent(filteredNews[i],myCategories)} className={`border-b border-gray-300 hover:cursor-pointer hover:bg-gray-300  `} key={newsItem.id}>{newsItem.title}</li>
                    ))}
                </ul>
            </div>

            {news.length === 0 ?
                <>
                    {data.map((i,index)=>(
                        <div
                            key={index}
                            className={`relative w-2/5 h-96 xs:w-11/12 bg-gray-800 animate-pulse rounded-2xl overflow-hidden hover:cursor-pointer`}
                        >

                            <div
                                className="absolute animate-pulse h-20  top-0 flex ">
                            </div>
                            <p className=" flex items-center h-full text-white justify-center"> <span
                                className="w-7 h-7 border-4 border-white border-dotted rounded-full
                                                     animate-[spin_1s_ease-in-out_infinite]  duration-700"/></p>
                            <div className=" animate-pulse absolute w-full px-2 flex h-1/6 bg-red-700 opacity-80 bottom-0  text-white text-lg items-center justify-center overflow-hidden">
                                <p ></p>
                            </div>

                        </div>
                    ))}
                </>
                :
                <>
                    {news.map(({author,content, description,publishedAt,title,url, urlToImage},index)=>(
                            <div
                                onClick={()=>goNewsContent(news[index],myCategories)}
                                className={`relative w-2/5 h-96 xs:w-11/12  rounded-2xl overflow-hidden hover:cursor-pointer`}
                                key={index}
                            >
                                {urlToImage === null ?
                                    <img src={newsPhoto} alt="" className="w-full h-full object-cover absolute "/>
                                    :
                                    <img className="w-full h-full object-cover absolute " src={urlToImage} alt=""/>
                                }
                                <div
                                    className="absolute h-1/12 text-xs overflow-hidden p-2 bg-black w-full bg-opacity-80 items-center justify-between flex top-0 gap-x-1 text-white text-xl ">
                                    <p> {moment(publishedAt).format(`lll`)}</p>
                                    <p> {author}</p>
                                </div>
                                <div className="absolute w-full px-2 flex h-1/6 bg-red-700 bg-opacity-80 bottom-0  text-white text-lg items-center justify-center overflow-hidden">
                                    <p className="truncate font-semibold">{description}</p>
                                </div>

                            </div>
                        )
                    )}
                </>
            }

        </div>
    );
}

export default CategoryContent;