"use client"
// import { Navbar } from "@/app/Components/Home/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

function Article({params}) {
    const [article,setArticle]=useState([]);
    const [load,setLoad] = useState(true);
    const articleApi=`https://api.realworld.io/api/articles/${params.slug}`;
    async function fetchArticleSlug(){
       const response=await axios.get(articleApi);
      setArticle(response.data.article);
      setLoad(false);
    //   console.log(response.data.article);
    }console.log(article.author);
    useEffect(()=> fetchArticleSlug, []);

    function getDate(date) {
        const dat = new Date(date);
        return dat.toDateString();
      }
    return(
        <>
          <link
        href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic"
        rel="stylesheet"
      />
      <link
        href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
        rel="stylesheet"
      />
      {load ? (<span className="loader"></span>): <>
      <div className="article-title">
            <h1 className="tit">{article.title}</h1>
            <div className="banner-article">
                <img src={article.author.image} />
                <div>
                <Link className="link" href={`/profile/${article.author.username}`}>
                <h1 className="author">{article.author.username}</h1>
                </Link>
                <p className="date">{getDate(article.createdAt)}</p>
                </div>
                <div className="buttons-article">
                <button className="btnn banner-name"><i className="ion-plus-round">Follow {article.author.username}</i></button>
                <button className="btnn banner-like"><i className="ion-heart">Favourite Post({article.favoritesCount})</i></button>
               
                </div>
                </div>
                
            </div>
            
         <div>
            <div className="bodyy"> <p>{article.body}</p></div>
            <div className="tagList tag">
                    {article.tagList.map((item)=>(
                      <Link href={`/article/${article.slug}`}><button className="taglist">{item}</button></Link>
                        
                    ))}
                  </div>
         </div>
         </>}
        
         </>
    )
}
export default Article;