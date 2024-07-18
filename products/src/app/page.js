"use client";
import { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
// import { useProductContext } from "./Context";
import Link from "next/link";
export default function Home() {
  const [list, showList] = useState([]);
  const [input, setInput] = useState("");
  const [cat, setCat] = useState(["All"]);
  const [sortList, setSort] = useState("");
 
  let product_url = "https://dummyjson.com/products";
 
  function inputCaught(e) {
    const { name, value,textContent } = e.target;
 
    if (name === "input") {
      setInput(value);
    }
    if (name === "select") {
      if(textContent === "All"){
        setCat(["All"])
      }
      else{
      if(cat.includes(textContent)){
        setCat((prevcat)=>prevcat.filter(item=>item !== textContent))
      }
      else{
      setCat(cat.includes("All") ? [...(cat.filter(item=>item!=="All")),textContent]:[...cat,textContent]);
      }
    }
    }
 
    if (name === "sortInput") {
      setSort(value);
    }
  }
  console.log(cat);
 
  const displayArr = useMemo(() => {
    let nonFiltered = list;
 
    nonFiltered = nonFiltered.filter(item=>{
      if(cat[0]!=="All"){
 
        return cat.includes(item.category)
 
      }
 
      return true;
    })
   
    if (input) {
      nonFiltered = nonFiltered.filter((product) =>
        product.title.toLowerCase().includes(input.toLowerCase())
      );
    }
    if (sortList) {
      nonFiltered = nonFiltered.sort((a, b) => {
        if (sortList === "High to Low") {
          return b.price - a.price;
        } else if (sortList === "Low to High") {
 
          return a.price - b.price;
 
        } else {
 
          return nonFiltered;
 
        }
      });
    }
   
    return nonFiltered;
  }, [cat, input, sortList, list]);
 
  function getCategory() {
    let catego = ["All"];
    list.map((item) => {
      if (!catego.includes(item.category)) {
        catego.push(item.category);
      }
    });
 
   
 
    return catego;
  }
 
  let categoryar = getCategory();
 
  function styleButton(category){
    return cat.includes(category) ? true :false;
  }
 
  useEffect(() => {
    async function ProductDetails() {
      let response = await fetch(product_url);
      let response_json = await response.json();
      // const {products} = response_json;
      showList(response_json.products);
    }
 
    ProductDetails();
  }, []);
 
  return (
    <div>
      <div className="center_div">
        <h1>InstaMart</h1>
        <input
          name="input"
          value={input}
          placeholder="Search our items"
          onChange={inputCaught}
        ></input>
       
       
        <label>Sort by: </label>
        <select name="sortInput" value={sortList} onChange={inputCaught}>
          <option value="All">All</option>
          <option value="High to Low">High to Low</option>
          <option value="Low to High">Low to High</option>
        </select>
      </div>
      <div className="flex-div">
        <div className="test">
        <label>Select Category: </label>
          {categoryar.map((item) => (
            <button name="select" value={cat} onClick={inputCaught} style={styleButton(item)?{backgroundColor:"#DED4E8"}:{backgroundColor:"white"}}>{item}</button>
          ))}
        </div>
          <div className="ul-div">
      <ul>
        {displayArr.map((product) => {
          return (
            <Link href="/Product/index.js" onClick={()=>dispatchEvent({
              type:"setList",
              payload:product,
            })}>
              <li key={product.id} className="new_div">
               
                <img className="product-image" src={product.thumbnail} />
                <h3>{product.title}</h3>
                <p>Price: ${product.price}</p>
              </li>
            </Link>
          );
        })}
      </ul>
      </div>
      </div>
    </div>
  );
}