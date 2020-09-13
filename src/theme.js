import theme from "@theme-ui/preset-base";
import {darken, lighten} from "@theme-ui/color";

export default {
    ...theme,
    colors: {
        text: "#000",
        background: "#e4ebef",
        primary: "#4f8bb3",
        secondary: "#D7DFE0",
        muted: "#92bad3"
    },
    container: {
        maxWidth: 768
    },
    breakpoints: ["40em"],
    buttons: {
        primary: {
            outline: "none",
            cursor: "pointer",
            color: "white",
            fontWeight: "bold",
            bg: "primary",
            borderBottomWidth: 4,
            borderStyle: "solid",
            borderColor: darken("primary", 0.1),
            "&:hover": {
                bg: lighten("primary", 0.1),
                borderColor: "primary"
            },
            "&:focus": {
                bg: lighten("primary", 0.1),
                borderColor: "primary"
            },
            "&:active": {
                bg: lighten("primary", 0.1),
                borderColor: "primary"
            }
        }
    },
    styles: {
        ...theme.styles,
        hr: {
            bg: "muted",
            height: "4px"
        }
    }
};
