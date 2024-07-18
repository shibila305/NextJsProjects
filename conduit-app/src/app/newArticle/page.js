"use client";
// import react, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
// import Link from "next/link";
import withAuth from "../Components/Home/withAuth";
import { useRouter } from "next/navigation";

const NewArticle= () => {
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);

  const router= useRouter();

  async function submit(e) {
    e.preventDefault();

    const url = "https://api.realworld.io/api/articles";

    const jwtToken = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    };
 
    console.log(title);
 
    const data = {
      article: {
        title: title,
        description: about,
        body: content,
        tagList: tags.split(","),
      },
    };

    axios
      .post(url, data, { headers: headers })
      .then((response) => {
        console.log("success:", response.data);
        router.push(`/article/${response.data.article.slug}`);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  function handleChange(e){
        if(e.target.name === "title"){
            setTitle(e.target.value);
        }
        if(e.target.name === "about"){
            setAbout(e.target.value);
        } if(e.target.name === "content"){
            setContent(e.target.value);
        }
        if(e.target.name === "tags"){
            setTags(e.target.value);
        }
  }



    return(
        <>
        <div className="new-article">
        <form className="newarticle-form" onSubmit={submit}>
            <input 
            name="title"
            value={title}
            className="form-control" 
            onChange={handleChange} 
            type="text" 
            placeholder="Article Title"/>
            <input 
            name="about"
            value={about}
            className="form-control" 
            onChange={handleChange} 
            type="text" 
            placeholder="Whats the article about"/>
            <textarea 
            name="content"
            value={content}
            rows="8" 
            className="form-control" 
            onChange={handleChange} 
            type="text" 
            placeholder="Write your article(in markdown"/>
            <input 
            name="tags"
            value={tags}
            className="form-control"
             type="text" 
             onChange={handleChange} 
             placeholder="Enter tags"/>
            
            <button className="new-articlebtn">Publish Article</button>


        </form>
        </div>
       
        </>
    );
}
export default withAuth(NewArticle);

