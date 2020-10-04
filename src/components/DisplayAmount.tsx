import React from "react";
import { ReactComponent as PictoTZ } from "../svg/tz.svg";

export default function DisplayAmount(props: any) {
  return (
    <div className="g-DisplayTez">
      <span>{props.amount}</span>
      <PictoTZ />
    </div>
  );
}
