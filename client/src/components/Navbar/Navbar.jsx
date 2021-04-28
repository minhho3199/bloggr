import React, { useState } from 'react';
import { AppBar, Typography, Menu, MenuItem, IconButton } from "@material-ui/core"
import { AccountCircle } from "@material-ui/icons";
import useStyles from "./styles";
import { useDispatch } from 'react-redux';
import { signOutStart } from './signOut';

const Navbar = () => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	console.log(open);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<div>
			<AppBar className={classes.appBar} position="sticky" color="primary">
				<Typography className={classes.typography} variant="h4" >Bloggr</Typography>
				{localStorage.usertoken && (
					<div className={classes.iconContainer}>
						<IconButton
							aria-label="user-account"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleMenu}>
							<AccountCircle />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'bottom',
								horizontal: 'right',
							}}
							open={open}
							onClose={handleClose}
						>
							<MenuItem onClick={() => dispatch(signOutStart())}>Sign Out</MenuItem>
						</Menu>
					</div>

				)}

			</AppBar>
		</div>
	);
}

export default Navbar;