module.exports = {
    purge: {
        enabled: true,
        content: [
            "src/**/*.js",
            "src/**/*.jsx",
            "src/**/*.ts",
            "src/**/*.tsx",
            "public/**/*.html",
        ],
    },
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                sm: "100%",
                md: "100%",
                lg: "100%",
                xl: "960px",
            },
        },
        extend: {},
        fontFamily: {
            roboto: ["robotolight"],
            museo: ["museo100"],
        },
    },
    variants: {},
    plugins: [require("@tailwindcss/forms")],
};
