import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Protected(props) {
    const {Component} = props;
    const navigate = useNavigate();
    useEffect(()=>{
        var data = JSON.parse(window.sessionStorage.getItem("loginStatus"));
        if(data === null){
            
            navigate("/");
        }
        if(data !== null && data["role"] === "user" && !data["isLoggedIn"]){
            navigate("/login");
        }
       if(data !== null && data["role"] === "admin" && !data["isLoggedIn"]){
            navigate("/AdminLogin");
       }
    },[]);
  return (
    <Component/>
  )
}
