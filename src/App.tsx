import React, {useState} from 'react';
import './App.css';
import Button from "./Component/Button/Button";
import ScreenInput from "./Component/Button/ScreenInput";
import ScreenIter from "./Component/Button/ScreenIter";

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

    const [minValue, setMinValue] = useState<number>(getLocalStorageObjectItem(keyMinValue, 0))
    const [maxValue, setMaxValue] = useState<number>(getLocalStorageObjectItem(keyMaxValue, 10))
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
        localStorage.setItem(keyMinValue, JSON.stringify({value: minValue}))
        localStorage.setItem(keyMaxValue, JSON.stringify({value: maxValue}))
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

    if (error) {
        disableReset = () => true
        disableInc = () => true
        disableSet = () => true
    }

    function onChangeMinValueHandler(newValue: number) {
        setMinValue(newValue)
    }

    function onChangeMaxValueHandler(newValue: number) {
        setMaxValue(newValue)
    }

    return (
        <div className="App">
            <div className="item">
                < ScreenInput
                    minValue={minValue}
                    maxValue={maxValue}
                    onChangeMinValueHandler={onChangeMinValueHandler}
                    onChangeMaxValueHandler={onChangeMaxValueHandler}
                    setEditMode={setEditMode}
                    setError={setError}/>
                <div className="panel">
                    < Button
                        title={"set"}
                        isActive={disableSet}
                        onClick={setValueInput}

                    />
                </div>
            </div>
            <div className="item">
                < ScreenIter
                    value={value}
                    editMode={editMode}
                    error={error}
                    maxValue={maxValue}/>
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
