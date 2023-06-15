import * as React from "react";
import {useEffect} from "react";
import AreaCheck from "../features/areacheck/components/AreaCheck";
import Results from "../features/areacheck/components/results/Results";
import {useAreaStore} from "../context/areaStore";
import {getAllAccountDots} from "../features/areacheck/services/checkArea";
import {Access} from "../context/store";
import {StoredPoint} from "../features/areacheck/types";

export type MainPageProps = {
    access: Access,
}

const MainPage = ({access}: MainPageProps) => {

    const setDots = useAreaStore(state => state.setDots)

    useEffect(() => {
            getAllAccountDots(access)
                .then(response => {
                        const dots: StoredPoint[] = response.data
                        setDots(dots)
                    }
                )
        }
    )

    return <div className="main-page">
        <div className="dots-work-container">
            <AreaCheck access={access}/>
        </div>
        <div className={"results"}>
            <Results/>
        </div>
    </div>
}

export default MainPage