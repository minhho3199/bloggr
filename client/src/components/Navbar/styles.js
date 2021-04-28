import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    appBar: {
        borderRadius: 0,
        margin: 0,
        display: "flex",
        flexDirection: "row",
        backgroundColor: "white"
    },
    typography: {
        padding: "10px",
        paddingLeft: "20px",
        borderRadius: 0,
        color: "#1987ea",
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    iconContainer: {
        display: "flex"
    }
}))