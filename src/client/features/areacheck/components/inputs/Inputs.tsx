import * as React from "react";
import {useRef} from "react";
import {useAreaStore} from "../../../../context/areaStore";

const Inputs = (props: { onSendButtonClick: (x: string, y: string) => void, onCleanButtonClick: () => void }) => {

    const xRef: any = useRef()
    const yRef: any = useRef()

    const xErr = useAreaStore(state => state.xErr)
    const yErr = useAreaStore(state => state.yErr)
    const rErr = useAreaStore(state => state.rErr)
    const message = useAreaStore(state => state.message)

    const rParam = useAreaStore(state => state.rParam)
    const setRParam = useAreaStore(state => state.setRParam)

    const rGetClassName = (buttonValue: number) => {
        if (buttonValue === rParam) {
            return "btn btn-active"
        } else {
            return "btn"
        }
    }

    const rOnClick = (value: number) => {
        setRParam(value)
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    let x = 0

    return <div>
        <div className="form-control">
            <label className="label">
                <span className="label-text">X parameter</span>
            </label>
            <span style={{fontSize: "large", color: "red"}}>{xErr}</span>
            <input ref={xRef} type="text" placeholder="X parameter" className="input input-primary input-bordered"/>
        </div>

        <div className="form-control">
            <label className="label">
                <span className="label-text">Y parameter</span>
            </label>
            <span style={{fontSize: "large", color: "red"}}>{yErr}</span>
            <input ref={yRef} type="text" placeholder="Y parameter" className="input input-primary input-bordered"/>
        </div>


        <div className="form-control">
            <label className="label">
                <span className="label-text">R parameter</span>
            </label>
        </div>
        <span style={{fontSize: "large", color: "red"}}>{rErr}</span>
        <div className="btn-group">
            <button onClick={() => {
                rOnClick(-5)
            }} className={rGetClassName(-5)}>-5
            </button>
            <button onClick={() => {
                rOnClick(-4)
            }} className={rGetClassName(-4)}>-4
            </button>
            <button onClick={() => {
                rOnClick(-3)
            }} className={rGetClassName(-3)}>-3
            </button>
            <button onClick={() => {
                rOnClick(-2)
            }} className={rGetClassName(-2)}>-2
            </button>
            <button onClick={() => {
                rOnClick(-1)
            }} className={rGetClassName(-1)}>-1
            </button>
            <button onClick={() => {
                rOnClick(1)
            }} className={rGetClassName(1)}>1
            </button>
            <button onClick={() => {
                rOnClick(2)
            }} className={rGetClassName(2)}>2
            </button>
            <button onClick={() => {
                rOnClick(3)
            }} className={rGetClassName(3)}>3
            </button>
        </div>

        <div>
            <label>{message}</label>
            <div>
                <button className="btn btn-wide btn-outline btn-success" onClick={() => {
                    props.onSendButtonClick(xRef.current.value, yRef.current.value)
                    scrollToTop()
                }}>Check point
                </button>
            </div>
            <div>
                <button className="btn btn-wide btn-outline btn-warning" onClick={() => {
                    props.onCleanButtonClick()
                    scrollToTop()
                }}>Clean
                </button>
            </div>
        </div>
    </div>
}
export default Inputs
