import * as React from "react";
import {useAreaStore} from "../../../../context/areaStore";
import {NewPoint, StoredPoint} from "../../types";

const Results = () => {

    const dots = useAreaStore(state=>state.dots)
    let res = dots.map((item:StoredPoint) => {
        return <tr key={item.id}>
            <th>{item.id}</th>
            <td>{item.x}</td>
            <td>{item.y}</td>
            <td>{item.r}</td>
            <td>{String(item.hit)}</td>
        </tr>;
    });


    return <div className="overflow-x-auto">
        <table className="table w-full table-compact">
            <thead>
            <tr>
                <th></th>
                <th>X</th>
                <th>Y</th>
                <th>R</th>
                <th>Get</th>
            </tr>
            </thead>
            <tbody>
            {res}
            </tbody>
            <tfoot>
            <tr>
                <th></th>
                <th>X</th>
                <th>Y</th>
                <th>R</th>
                <th>Get</th>
            </tr>
            </tfoot>
        </table>
    </div>
}

export default Results