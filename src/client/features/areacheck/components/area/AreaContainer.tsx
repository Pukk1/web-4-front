import * as React from "react";
import Area from "./Area";
import {PointType} from "../../types/Point";
import {useAreaStore} from "../../../../context/areaStore";

const AreaContainer = (props: { dots: Array<PointType>, click: Function }) => {

    const rParam = useAreaStore(state=>state.rParam)


    const checkDot = (dot: PointType) => {
        if(rParam>0) {
            if (dot.x < 0 && dot.y < 0) {
                return false;
            } else if (dot.x >= 0 && dot.y <= 0) {
                return Math.pow(Math.abs(dot.x), 2) + Math.pow(Math.abs(dot.y), 2) <= Math.pow(rParam, 2);
            } else if (dot.x >= 0 && dot.y >= 0) {
                return dot.x <= rParam / 2 && dot.y <= rParam;
            } else if (dot.x <= 0 && dot.y >= 0) {
                return dot.x + rParam - dot.y >= 0;
            } else {
                return false;
            }
        }else {
            if (dot.x > 0 && dot.y > 0) {
                return false;
            } else if (dot.x <= 0 && dot.y >= 0) {
                return Math.pow(Math.abs(dot.x), 2) + Math.pow(Math.abs(dot.y), 2) <= Math.pow(rParam, 2);
            } else if (dot.x <= 0 && dot.y <= 0) {
                return dot.x >= rParam / 2 && dot.y >= rParam;
            } else if (dot.x >= 0 && dot.y <= 0) {
                return dot.x + rParam - dot.y <= 0;
            } else {
                return false;
            }
        }
    }


    return <Area dots={props.dots} click={props.click} checkDot={checkDot}/>
}
export default AreaContainer