import React from "react";


type PropsType = {
    value: number
    editMode: boolean
    error: boolean
    maxValue:number
}

function ScreenIter(props:PropsType){

    return (
        <div className={ !props.editMode && props.value === props.maxValue ? `screen error` : "screen"}>
            <div className={props.editMode ? `editMode` : ""}>{props.value}</div>
            <div className={props.editMode && !props.error ? "" : `editMode`}>Enter values and press 'set'</div>
            <div className={props.editMode && props.error ? "error" : `editMode`}>Incorrect value!</div>
        </div>
    )
}

export default ScreenIter;