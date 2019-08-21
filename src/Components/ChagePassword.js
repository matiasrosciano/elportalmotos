import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { withFirebase } from './../Firebase'

import { withRouter } from 'react-router-dom';

import { Link } from 'react-router-dom'

const ChangePassword = (props) =>{

  const [passwords,Setpasswords] = useState({password:'',confirmpassword:''}) 

  const onChange = e =>{
    let newState = {...passwords}
    newState[e.target.name] = e.target.value
    Setpasswords(newState)
  }

  const isValid = passwords.password === '' || passwords.password !== passwords.confirmpassword

  const onSubmit = () =>{
    props.firebase
        .doPasswordUpdate(passwords.password)
        .then(response =>alert('Su contraseña ha sido modificada'))
        .catch(error=>console.log(error))
  }

  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cambiar Contraseña
          </Typography>
          <form className={classes.form} noValidate>
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChange}
            />
            <TextField
                variant="outlined"
                fullWidth
                name="confirmpassword"
                label="Confirmar Contraseña"
                type="password"
                id="confirmpassword"
                onChange={onChange}
              />          
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isValid}
              onClick={onSubmit}
            >
              Cambiar Contraseña
            </Button>
            <Grid container>
              <Grid item>
                <Link to='/Register'>
                  Crear Cuenta
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default withRouter(withFirebase(ChangePassword))

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    height: '100vh',
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));