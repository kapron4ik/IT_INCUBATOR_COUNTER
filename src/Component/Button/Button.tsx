import React from "react";
import s from './Button.module.css'


type PropsType = {
    title: string
    isActive: ()=>boolean
    onClick:()=>void
}


function Button(props:PropsType) {
    return (
        <button disabled={props.isActive()} onClick={props.onClick} className={s.button}>{props.title}</button>
    );
}

export default Button;