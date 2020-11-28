import React, {useState} from 'react';
import './App.css';
import Button from "./Component/Button/Button";
import InputNumber from "./Component/Button/InputNumber";

export type FilterValuesType = "enter values and press 'set" | "Incorrect value!"

function App() {
    const keyMaxValue: string = "MaxValue"
    const keyMinValue: string = "MinValue"

    function getLocalStorageObjectItem(key: string, defaultValue: number) {
        const json = localStorage.getItem(key)
        if (json) {
            let inputValue = JSON.parse(json)
            return inputValue.value
        } else {
            return defaultValue
        }
    }

    let maxValue = getLocalStorageObjectItem(keyMaxValue, 10)
    let minValue = getLocalStorageObjectItem(keyMinValue, 0)

    const [myValue, setMyValue] = useState({
        start:getLocalStorageObjectItem(keyMinValue, 0),
        stop:getLocalStorageObjectItem(keyMaxValue, 10)})
    const [value, setValue] = useState<number>(minValue)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    function incValue() {
        if (value < maxValue) {
            setValue(value + 1)
        }
    }

    function resetValue() {
        setValue(minValue)
    }

    function setValueInput() {
        minValue = getLocalStorageObjectItem(keyMinValue, 0)
        setValue(minValue)
        setEditMode(false)
    }

    let disableReset = () => value === minValue
    let disableInc = () => value === maxValue
    let disableSet = () => true

    if (editMode) {
        disableReset = () => true
        disableInc = () => true
        disableSet = () => false
    }

    if (error){
        disableReset = () => true
        disableInc = () => true
        disableSet = () => true
    }

    const [errorInput, setErrorInput] = useState({min: false, max: false})

    function errorHandlerValue() {
        debugger
        let maxValue = getLocalStorageObjectItem(keyMaxValue, 10)
        let minValue = getLocalStorageObjectItem(keyMinValue, 0)
        setEditMode(true)
        if (minValue < 0) {
            setErrorInput({min: true, max: false})
            setError(true)
        } else if (maxValue = 0 || maxValue == minValue || maxValue < minValue) {
            setErrorInput({min: true, max: true})
            setError(true)
        } else {
            setErrorInput({min: false, max: false})
            setError(false)
        }
    }

    return (
        <div className="App">
            <div className="item">
                <div className="screen">
                    <InputNumber value={maxValue}
                                 title="max value:"
                                 keyLS={keyMaxValue}
                                 errorHandlerValue={errorHandlerValue}
                                 errorHandler={errorInput.max}
                    />
                    <InputNumber value={minValue}
                                 title="start value:"
                                 keyLS={keyMinValue}
                                 errorHandlerValue={errorHandlerValue}
                                 errorHandler={errorInput.min}
                    />
                </div>
                <div className="panel">
                    < Button
                        title={"set"}
                        isActive={disableSet}
                        onClick={setValueInput}
                    />
                </div>
            </div>
            <div className="item">
                <div className={value === maxValue ? `screen error` : "screen"}>
                    <div className={editMode ? `editMode` : ""}>{value}</div>
                    <div className={editMode && !error ? "" : `editMode`}>Enter values and press 'set'</div>
                    <div className={editMode && error ? "error" : `editMode`}>Incorrect value!</div>
                </div>
                <div className="panel">
                    < Button
                        title={"inc"}
                        isActive={disableInc}
                        onClick={incValue}
                    />
                    < Button
                        title={"reset"}
                        isActive={disableReset}
                        onClick={resetValue}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
