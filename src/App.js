import React,{useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom'

import Landing from './Components/Landing'
import Login from './Components/Login'
import Register from './Components/Register'
import ForgetPassword from './Components/ForgetPassword'
import ChangePassword from './Components/ChagePassword'

import { withFirebase } from './Firebase'
import {withauthed,WithAuthConsumer} from './Authed/index.js'

const App = (props) => {

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () =>{
    setAnchorEl(null);
  }

 
  return (
    <Router>
      <div className="App">
        <HideOnScroll>
          <AppBar
            color='secondary'
            position='sticky'
            >
            <Toolbar style={styles.menuBar}>
              <Link to='/' style={styles.menuButton}>                
                <MenuIcon style={styles.menuIcon}/>                
              </Link>
              <WithAuthConsumer>
                {AuthUser=>{
                  return console.log(AuthUser)
                }
                }
              </WithAuthConsumer>
              <Button
                color="primary"
                variant="contained"
                onClick={()=>props.firebase.doSignOut()}>hola</Button>
              {props.Authed
                ?(
                  <div>
                    <AccountCircle style={styles.menuIcon} onClick={handleClick}/>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      keepMounted
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                      <MenuItem onClick={handleClose}>My account</MenuItem>
                      <MenuItem onClick={()=>{handleClose();props.firebase.doSignOut()}}>
                        Logout
                      </MenuItem>
                    </Menu>
                  </div>                    
                )
                :(
                  <Link to='/Login' style={styles.menuButton}>
                    <IconButton style={styles.menuButton}>
                      Entrar
                    </IconButton>
                  </Link>
                )
              }
              

              
            </Toolbar>

          </AppBar>
        </HideOnScroll>       

       
        <Switch>
            <Route path='/' exact component={Landing} />
            <Route path='/Login' exact component={Login}/>
            <Route path='/Register' exact component={Register} />
            <Route path='/ForgetPassword' exact component={ForgetPassword}/>
            <Route path='/ChagePassword' exact component={ChangePassword}/>
              
        </Switch>
        
      </div>
    </Router>
  );
}

const HideOnScroll = (props) => {
  const { children } = props;

  const trigger = useScrollTrigger({});

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const styles = {
  menuButton: {
    color:'white',
    textDecoration:'none'
  },
  menuBar:{
    display:'flex',
    justifyContent:'space-between',
  },
  menuIcon:{
    width:30,
    height:30
  }
};

export default withauthed(withFirebase(App));
