"use client"
import { createContext,useReducer,useEffect,useMemo, useContext } from "react";
 
const initialState = {
    list:[],
}
 
 
export const productContext = createContext(null);
export const dispatchContext = createContext(null);
 
const reduction = (state,action)=>{
    switch(action.type){
        case "setList":
        return{list:action.payload}
       
}
}
 
export function ProductReducer({children}){
    const[state,dispatch] = useReducer(reduction,initialState)
 
 
return (
    <productContext.Provider value={{state}}>
        <dispatchContext.Provider value={{dispatch}}>
        {children}
        </dispatchContext.Provider>
    </productContext.Provider>
  )
 
}
 
export function useProductContext(){
    return useContext(productContext);
}