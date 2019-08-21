import React,{useState} from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom'

import { withRouter } from 'react-router-dom';

import { withFirebase } from './../Firebase'



const Register = (props) => { 

  const [NewUser,SetNewUser] = useState({
    UserName:'',
    email:'',
    password:'',
    confirmpassword:''
  })

  const handleChange = e =>{
    let newState = {...NewUser}
    newState[e.target.name] = e.target.value
    SetNewUser(newState)
  }

  const OnSubmit = async () =>{
    const { UserName,email, password} = NewUser
    const authUser = await props.firebase.doCreateUserWithEmailAndPassword(email, password)
    props.firebase.user(authUser.user.uid)
      .set({
        UserName,
        email
      })
  }

  const isValid = NewUser.password !== NewUser.confirmpassword || NewUser.password === '' || NewUser.email === '' || NewUser.UserName === ''

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Nueva cuenta
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                autoComplete="username"
                name="UserName"
                id="UserName"
                label="Nombre de usuario"
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="confirmpassword"
                label="Confirmar Contraseña"
                type="password"
                id="confirmpassword"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isValid}
              onClick={()=>OnSubmit()}
            >
              Crear Cuenta
            </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to='/Login' variant="body2">
                ¿Ya tenes una cuenta? Ingresa
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default withRouter(withFirebase(Register))

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
