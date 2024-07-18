
import {redirect} from "next/navigation";
import React from "react";
import {useEffect } from "react";

const sessionStatus=localStorage.getItem("token");
export default function withAuth(Component: any){
    return function WithAuth(props: any){
        const sessionStatus = localStorage.getItem("token");

        useEffect(()=>{
            if(!sessionStatus){
                redirect("/");
            }
        }, []);

        return <Component {...props}/>;
    };
}