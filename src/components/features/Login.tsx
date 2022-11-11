import { useFirebase } from "../../contexts/FirebaseConnector";
import "../../styles/signup.css";
import { Formik } from "formik";
import { TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { SingleAlertMessage } from '../molecules/SingleAlertMessage';
import { IAlert } from '../../models/IAlert';
import { useGlobalContext } from "../../contexts/GlobalContext";

interface LoginFormValues {
  email: string;
  password: string;
}


export const Login = () => {
  const { login } = useFirebase();
  const { showMessage, setShowMessage } = useGlobalContext();
  const navigate = useNavigate();
  let submitAction: string | undefined = undefined;

  const LoginSchema = Yup.object().shape(
    {
      email: Yup.string().email("Revise correo").required(), 
      password: Yup.string().required(),
    });

  //const handleLogin = async (values: LoginFormValues) => {
  const handleLogin = async(values: LoginFormValues) => {
    try {
        const user = await login(values.email, values.password);

      if (user)
      {
        navigate("/");
      }
      else
      { 
        let alert: IAlert = { 
          message: "User or password are invalid",
          type: "error",
          show: true
        };

        setShowMessage(alert);
      }
      
    } catch (error) {
      console.error(error);
    }
  };

  

  return (
    <div>{showMessage?.show ? <SingleAlertMessage message={showMessage.message} type={showMessage.type} show={showMessage.show} /> : <></>}
    <main>
      
    <Formik<LoginFormValues>
      initialValues={{
        email: "",
        password: ""
        }}
        validationSchema={LoginSchema}
        //onSubmit={handleFormSubmit}
        onSubmit={(values, { setSubmitting }) => {
          if (submitAction === "login") {
            handleLogin(values);
            setSubmitting(false);
            
          } 
          /*else if (submitAction === "cancel") {
            handleCancel();
          }
            else { 
              handleRegister();
            }*/
        }}
        



      validateOnBlur
      validateOnChange
      validateOnMount
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        isValid,
        isValidating,
      }) => (
          //<form onSubmit={handleSubmit}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h2" component="h1">
                Login
              </Typography>
          <TextField
            error={touched.email && !!errors.email}
            required
            label="Email"
            type="email"
            placeholder="ejemplo@dominio.com"
            value={values.email}
            onChange={handleChange("email")}
            onBlur={handleBlur("email")}
            helperText={touched.email && errors.email}
          />

          <TextField
            error={touched.password && !!errors.password}
            required
            label="Password"
            type="password"
            placeholder="********"
            value={values.password}
            onChange={handleChange("password")}
            onBlur={handleBlur("password")}
            helperText={touched.password && errors.password}
          />

          <LoadingButton
            loading={isSubmitting || isValidating}
            disabled={!isValid}
            variant="outlined"
            //type="submit"
            onClick={() => {
              submitAction = "login";
              handleSubmit();
              }}>
              Login
            </LoadingButton>
            <LoadingButton
            loading={isSubmitting || isValidating}
              variant="outlined"
              
            onClick={() => {
              navigate("/SignUp");
              }}>
              
            Register
          </LoadingButton>
          <LoadingButton
            loading={isSubmitting || isValidating}
              variant="outlined"
              
            onClick={() => {
              navigate("/LandingPage");
              }}>
              
            Cancel
          </LoadingButton>
        </form>
        )}
    </Formik>
      </main>
      </div>
  );
};

export default Login;