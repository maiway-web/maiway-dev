import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Copyright } from "../components/commons";
import { authSvc, firebaseInstance } from "../fBase";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  message: {
    color: "red",
  },
}));

function Login({ callLoading }: any) {
  const classes = useStyles();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;

  const [message, setMessage] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async () => {
    // event.preventDefault();
    try {
      callLoading("WAITING");
      let data;
      // if (newAccount) {
      // data = await authSvc.createUserWithEmailAndPassword(email, password);
      // } else {
      data = await authSvc.signInWithEmailAndPassword(email, password);
      // }
    } catch (error) {
      setMessage(error.message);
    } finally {
      callLoading("SUCCESS");
    }
  };

  // const onCreLogClick = () => setNewAccount((prevState) => !prevState);

  const onSocialClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const target = event.currentTarget as HTMLButtonElement;
    const { name } = target;

    let provider: any;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    }
    // else if (name === "github") {
    //   provider = new firebaseInstance.auth.GithubAuthProvider();
    // } else if (name === "facebook") {
    //   provider = new firebaseInstance.auth.FacebookAuthProvider();
    // }
    const data = await authSvc.signInWithPopup(provider);
    // console.log(data);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ACCOUNT LOGIN
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={onChange}
          />
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
            value={password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
          >
            LOGIN
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid> */}
            {/* <Button
              type="button"
              name="google"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={onSocialClick}
            >
              Sign in with Google
            </Button> */}
            {/* <Button
              type="button"
              name="facebook"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={onSocialClick}
            >
              Sign in with Facebook
            </Button> */}
            <Typography
              component="div"
              variant="h6"
              className={classes.message}
            >
              {message}
            </Typography>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default Login;
