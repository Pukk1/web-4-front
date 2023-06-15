import * as React from "react";
import Inputs from "./inputs/Inputs";
import AreaContainer from "./area/AreaContainer";
import {NewPoint} from "../types";
import {useAreaStore} from "../../../context/areaStore";
import {Access} from "../../../context/store";

export type AreaCheckProps = {
    access: Access,
}

const AreaCheck = ({access}: AreaCheckProps) => {


    const dots: Array<NewPoint> = useAreaStore(state => state.dots)
    const storeDot = useAreaStore(state => state.storeDot)
    const setErrX = useAreaStore(state => state.setXErr)
    const setErrY = useAreaStore(state => state.setYErr)
    const setErrR = useAreaStore(state => state.setRErr)
    const rParam = useAreaStore(state => state.rParam)
    const cleanDots = useAreaStore(state => state.cleanDots)

    const onAreaClick = (e: any) => {
        let x: number = e.nativeEvent.offsetX - 249.5
        let y: number = e.nativeEvent.offsetY - 249.5
        let r: string | number = rParam

        try {
            x = x / 200 * Number(r)
            y = -y / 200 * Number(r)
            x = Math.round(x * 1000) / 1000
            y = Math.round(y * 1000) / 1000
            if (validate(x, y, r)) {
                storeDot({x: x, y: y, r: Number(r)}, access.accessToken)
            }
        } catch (e) {
            setErrR("R - не число")
        }
    }

    const onSaveButtonClick = (x: string, y: string) => {
        if (validate(x, y, rParam)) {
            storeDot({x: Number(x), y: Number(y), r: Number(rParam)}, access.accessToken)
        }
    }

    const onCleanButtonClick = () => {
        cleanDots(access)
    }

    const cleanMessages = () => {
        setErrR("")
        setErrX("")
        setErrY("")
    }

    const validateParam = (param: any, min: number, max: number, setErr: (err: string) => void) => {
        try {
            param = String(param)
            if (param === "") {
                throw "Пустая строка!"
            }
            if (param.length > 17) {
                setErr("В поле не может быть больше 17 символов");
                return false;
            } else {
                try {
                    param = Number(param)
                    if (isNaN(param)) {
                        setErr("Должно быть число!")
                        return false;
                    } else if (!(param >= min && param <= max)) {
                        setErr(`Значение должно быть в диапозоне [${min}...${max}]`);
                        return false;
                    } else {
                        return true;
                    }
                } catch (e) {
                    setErr("Должно быть число!")
                    return false;
                }
            }
        } catch (e) {
            setErr("Нельзя оставить параметр пустым!")
            return false;
        }
    }

    const rNotNullNumber = (r: number) => {
        return r !== 0;
    }

    const validate: (x: any, y: any, r: any) => boolean = (x, y, r) => {

        cleanMessages()

        if (validateParam(x, -5, 3, setErrX) && validateParam(y, -3, 5, setErrY) && validateParam(r, -5, 3, setErrR)) {
            if (rNotNullNumber(r)) {
                return true
            } else {
                setErrR("R не может быть нулём")
                return false
            }
        } else {
            return false
        }

    }

    return <div className="dots-work">
        <div className="area">
            <AreaContainer dots={dots} click={onAreaClick}/>
        </div>
        <div className="inputs">
            <Inputs onSendButtonClick={onSaveButtonClick} onCleanButtonClick={onCleanButtonClick}/>
        </div>
    </div>
}
export default AreaCheck