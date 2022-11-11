import { useFirebase } from "../../contexts/FirebaseConnector";
import "../../styles/signup.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { AuthPage } from "../features/AuthPage";
import { useNavigate } from "react-router-dom";
import { SingleAlertMessage } from '../molecules/SingleAlertMessage';
import { useGlobalContext } from "../../contexts/GlobalContext";

const MIN_PASSWORD_CHARACTERS = 8;

interface SignUpFormValues {
  email: string;
  password: string;
}

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Revise correo").required(),
  password: Yup.string()
    .required()
    .matches(
      new RegExp(
        `^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{${MIN_PASSWORD_CHARACTERS},})`
      ),
      "La contraseña debe tener 8 caracteres"
    ),
});

export const SignUp = () => {
  const { register, firebaseUser, authStateChanged } = useFirebase();
  const navigate = useNavigate();
  const { showMessage, setShowMessage } = useGlobalContext();
  let submitAction: string | undefined = undefined;

  const handleRegister = async (values: SignUpFormValues) => {
    try {
      const result = await register(values.email, values.password);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthPage>
      {showMessage?.show ? <SingleAlertMessage message={showMessage.message} type={showMessage.type} show={showMessage.show} /> : <></>}
      <main>
        <Formik<SignUpFormValues>
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={SignUpSchema}
          onSubmit={(values, { setSubmitting }) => {
            if (submitAction === "register") {
              handleRegister(values);
              setSubmitting(false);
            }
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
            <form onSubmit={handleSubmit}>
              <Typography variant="h2" component="h1">
                Formulario de registro
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
                onClick={() => {
                  submitAction = "register";
                  handleSubmit();
                  }}>
                SignUp
              </LoadingButton>

              <LoadingButton
                loading={isSubmitting || isValidating}
                  variant="outlined"
                  
                onClick={() => {
                  navigate("/Login");
                  }}>
                  
                Login
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
    </AuthPage>
  );
};