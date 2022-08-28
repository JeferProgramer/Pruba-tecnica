import React, { useState, useEffect } from "react";
import "./Login.css";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import NavBar from "../Nav/Nav";
import NavbarHome from "../NavHome/Navhome";
import Swal from "sweetalert2";
import axios from "axios";
import { loginClient } from "../../redux/Actions";
const baseURL = process.env.REACT_APP_API || 'http://localhost:3000';


function LoginForm() {
  const dispatch = useDispatch();

  const [userClientBtn, setUserClientBtn] = useState(true);

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [signinForm, setSigninForm] = useState({
    email: "",
    password: "",
  });
  /*------------------validaciones----------------*/
  const validate = (signinForm) => {
    let errors = {};
    if (!signinForm.email) {
      errors.email = "Inserte su email";
    }
    if (
      signinForm.email &&
      !signinForm.email.match(
        /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
      )
    ) {
      errors.email = "Email inválido";
    }
    if (!signinForm.password) {
      errors.password = "Inserte su contraseña";
    }
    return errors;
  };
  const [formErrors, setFormErrors] = useState({});
  /*------------------fin-validaciones----------------*/

  const handleinputChange = (e) => {
    setSigninForm({
      ...signinForm,
      [e.target.name]: e.target.value,
    });
  };


  const [isSubmit, setIsSubmit] = useState(false);

  const handleinputSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(signinForm));
    setIsSubmit(true);
  };

  const afterSubmit = async () => {
    if (Object.keys(formErrors).length === 0 && userClientBtn) {
      let response;
      try {
        response = await axios.post(
          `${baseURL}/userclient/client/login`,
          signinForm
        );
        const token = response.data.token;
        window.localStorage.setItem("tokenClient", token);
        if (response.status === 200) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Bienvenido",
            showConfirmbutton: false,
            timer: 3000,
          });
        }
      } catch (error) {
        setIsSubmit(false);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Datos incorrectos",
          showConfirmbutton: false,
          timer: 3000,
        });
      }
    }else {
      setIsSubmit(false);
    }
  };

  if (isSubmit) {
    afterSubmit();
  }

  const tokenClient = window.localStorage.getItem("tokenClient");

  return (
    <div className="background">
      {tokenClient  ? <NavbarHome /> : <NavBar />}
      <div
        height="inherit"
        padding="2em"
        zIndex="1"
        pb="10%"
        centerContent
      >
        {tokenClient  ? (
          <div height="inherit">
            <div
              minWidth="div.sm"
              bg="green.100"
              color="#262626"
              borderRadius="1em"
              paddingTop="2em"
              paddingBottom="2em"
              align="center"
            >
              <h1 fontSize="2xl" color={"#285e61"} marginBottom="1em">
                Ya has iniciado sesión
              </h1>
              <Link to="/home">
                <button
                  type="submit"
                  bg={"#63caa7"}
                  color="white"
                  variant="solid"
                  _hover={[{ color: "#63caa7" }, { bg: "white" }]}
                >
                  Ir al home
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <h1 fontSize="2xl" color={"#285e61"} marginBottom="1em">
              Inicia sesión
            </h1>

            <div minWidth="div.sm" direction="row" align="center">
              <button
                bg={userClientBtn ? "green.100" : "blackAlpha.200"}
                variant="solid"
                width="50%"
                color="teal.800"
                onClick={() => setUserClientBtn(true)}
              >
                Usuario
              </button>
            </div>

            <div
              minWidth="div.sm"
              bg="green.100"
              color="#262626"
              borderBottomRadius="1em"
              paddingTop="0"
              paddingBottom="2em"
              align="center"
            >
              <div direction="column" align="center" width="60%">
                <form onSubmit={handleinputSubmit}>
                  <input
                    name="email"
                    variant="flushed"
                    placeholder=" Email"
                    bg="white"
                    marginTop="3em"
                    onChange={handleinputChange}
                  />
                  {formErrors.email && (
                    <h1 fontSize="sm" color="teal.500">
                      {formErrors.email}
                    </h1>
                  )}

                  <inputGroup
                    variant="flushed"
                    size="md"
                    bg="white"
                    marginTop="2em"
                  >
                    <input
                      name="password"
                      pr="4.5rem"
                      type={show ? "h1" : "password"}
                      placeholder=" Contraseña"
                      onChange={handleinputChange}
                    />
                    <inputRightElement width="4.5rem">
                      <button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </button>
                    </inputRightElement>
                  </inputGroup>
                  {formErrors.password && (
                    <h1 fontSize="sm" color="teal.500">
                      {formErrors.password}
                    </h1>
                  )}


                  <div direction="column" justifyContent={'center'} mt='2em' mb='1em' align='center' width='inherit'>
                    <button
                      type="submit"
                      bg={"#63caa7"}
                      color="white"
                      variant="solid"
                      _hover={[{ color: "#63caa7" }, { bg: "white" }]}
                      display={'flex'}
                    >
                      Iniciar sesión
                    </button>
                  </div>                  

                  <div >
                    <button
                      bg="green.100"
                      color={"#285e61"}
                      onClick={() => <Link to={'/registro'}/>}
                    >
                      ¿Aún no tienes una cuenta?
                    </button>
                  </div>

                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginForm;