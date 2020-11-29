import React, {ChangeEvent, useEffect, useState} from "react";
import s from "./InputNumber.module.css";

type PropsType = {
    minValue: number
    maxValue: number
    onChangeMinValueHandler: (newValue: number) => void
    onChangeMaxValueHandler: (newValue: number) => void
    setEditMode: (props: boolean) => void
    setError: (props: boolean) => void
}

function ScreenInput(props: PropsType) {
    const [errorInput, setErrorInput] = useState({min: false, max: false})

    // Почему в пропсах приходят старые значения?
    // В какой момент перерисовывается значение Input
    let newMinValue = props.minValue
    let newMaxValue = props.maxValue

    const errorHandlerValue = () => {
        props.setEditMode(true)
        if (newMaxValue <= 0 || newMaxValue === newMinValue || newMaxValue < newMinValue) {
            setErrorInput({min: true, max: true})
            props.setError(true)
        } else if (newMinValue < 0) {
            setErrorInput({min: true, max: false})
            props.setError(true)
        } else {
            setErrorInput({min: false, max: false})
            props.setError(false)
        }
    }

    const onChangeMinValue = (e: ChangeEvent<HTMLInputElement>) => {
        newMinValue = +e.currentTarget.value
        props.onChangeMinValueHandler(newMinValue)
        errorHandlerValue()
        // props.errorHandlerValue()
        // setValue(newValue)
        // props.errorHandlerValue()
    }

    const onChangeMaxValue = (e: ChangeEvent<HTMLInputElement>) => {
        newMaxValue = +e.currentTarget.value
        props.onChangeMaxValueHandler(newMaxValue)
        errorHandlerValue()
        // props.errorHandlerValue()
        // setValue(newValue)
        // props.errorHandlerValue()
    }
    useEffect(() => {
        // console.log(props.minValue)
        // console.log(props.maxValue)
        // setErrorInput({min: true, max: false})
    })


    return (
        <div className="screen">
            <div>
                <label htmlFor="minValue">max value:</label>
                <input type="number"
                       value={props.maxValue}
                       name="minValue"
                       onChange={onChangeMaxValue}
                       className={errorInput.max ? `${s.error}` : ""}
                />
            </div>
            <div>
                <label htmlFor="maxValue">start value:</label>
                <input type="number"
                       value={props.minValue}
                       name="maxValue"
                       onChange={onChangeMinValue}
                       className={errorInput.min ? `${s.error}` : ""}
                />
            </div>
        </div>
    )
}

export default ScreenInput;