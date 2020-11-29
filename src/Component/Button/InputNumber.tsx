import React, {ChangeEvent, useEffect, useState} from "react";
import s from './InputNumber.module.css'

type PropsType = {
    title: string
    keyLS: string
    value: number
    errorHandlerValue: () => void
    errorHandler: boolean
}

function InputNumber(props: PropsType) {
    const [value, setValue] = useState<number>(props.value)
    const [error, setError] = useState<boolean>(props.errorHandler)

    const onChangeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newValue = +e.currentTarget.value
        localStorage.setItem(props.keyLS, JSON.stringify({value: newValue}))
        setValue(newValue)
        props.errorHandlerValue()
    }
    useEffect(() => {
        setError(props.errorHandler)
    })
    return (
        <div>
            <label htmlFor={props.keyLS}>{props.title}</label>
            <input type="number"
                   value={value}
                   name={props.keyLS}
                   onChange={onChangeValueHandler}
                   className={error ? `${s.error}` : ""}
            />
        </div>
    );
}

export default InputNumber;