import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";

const navigation = [
    {id: 'about', title: 'About'},
    {id: 'portfolio', title: 'Portfolio'},
    {id: 'services', title: 'Services'},
    {id: 'contacts', title: 'Contacts'},
]

const NavBar = () => {
    return (
        <Box sx={{flexGrow: 1, zIndex: 10}}>
            <AppBar position='static' sx={{backgroundColor: '#171717'}}>
                <Toolbar>
                    <Typography variant='h6'
                                sx={{flexGrow: 1, textDecoration: 'none', color: 'white'}}
                                component={NavLink}
                                to='/pages/home'>
                        Home
                    </Typography>

                    {navigation.map(page => {
                        return <Button color='inherit' to={`/pages/${page.id}`} component={NavLink}>{page.title}</Button>
                    })}

                    <Button color='inherit' to='/pages/admin' component={NavLink}>Admin</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default NavBar;