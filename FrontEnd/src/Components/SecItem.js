import React from 'react'

const colorHandler=(cat)=>{
    if(cat==="Men"){
        return "#5C9FA8";
    }
    if(cat==="Women"){
        return "#FFB9E1";
    }if(cat==="Kids"){
        return "#FFF0C6";
    }
}

export default function SecItem(props) {
    return (
        <div className="secItem" style={{backgroundColor:colorHandler(props.category)}}>
           <h1>{props.category}</h1> 
        </div>
    )
}
