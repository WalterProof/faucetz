/** @jsx jsx */
import { Box, Text, jsx } from "theme-ui";
import { ReactComponent as PictoTZ } from "../svg/tz.svg";

function Amount(props: any) {
    return (
        <Box>
            <Text
                sx={{
                    verticalAlign: "middle",
                    display: "inline-block"
                }}
            >
                {props.amount}
            </Text>
            <PictoTZ
                sx={{
                    verticalAlign: "middle",
                    display: "inline-block",
                    height: "1em",
                    width: "1em"
                }}
            />
        </Box>
    );
}

export default Amount;
