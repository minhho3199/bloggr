import React from 'react';
import {AppBar, Typography} from "@material-ui/core"
import useStyles from "./styles";
const Navbar = () => {
    const classes = useStyles();
    return (
        <div>
            <AppBar className={classes.appBar} position="sticky" color="primary">
                <Typography className={classes.typography} variant="h4" >Bloggr</Typography>
            </AppBar>
        </div>
    );
}

export default Navbar;