import * as React from "react";
import AreaCheck from "../features/areacheck/components/AreaCheck";
import Results from "../features/areacheck/components/results/Results";

const MainPage = () => {
    return <div className="mainPage">
        <div className={"dotsWorkContainer"}>
            <AreaCheck/>
        </div>
        <div className={"results"}>
            <Results/>
        </div>
    </div>
}

export default MainPage