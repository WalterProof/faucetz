import React from "react";
import { ReactComponent as PictoTZ } from "../svg/tz.svg";

const DisplayAmount = (props: any) => {
    return (
        <div className="g-DisplayTez">
            <span>{props.amount}</span>
            <PictoTZ />
        </div>
    );
};

export default DisplayAmount;
