import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn, authError: signInErrors, isAuthenticated, admin } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signIn(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/admin");
  }, [isAuthenticated]);
  console.log(isAuthenticated);
  console.log(admin);
  return (
    <div>
      <div className="flex justify-center">
        <h1 className="text-2xl font-bold my-4">Ingresa al panel del administrador</h1>
      </div>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col items-center justify-center mt-6">
          <div className="flex flex-col items-center justify-center">
            <label htmlFor="email" className="text-gray-800 font-bold">
              Usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="border border-gray-400 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              {...register("username", {
                required: "El usuario es requerido",
              })}
            />
            {errors.username && (
              <span className="text-red-500 text-sm font-bold">
                {errors.username.message}
              </span>
            )}
          </div>
          <div className="flex flex-col items-center justify-center">
            <label htmlFor="password" className="text-gray-800 font-bold">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="border border-gray-400 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              {...register("password", {
                required: "La contraseña es requerida",
              })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm font-bold">
                {errors.password.message}
              </span>
            )}
          </div>
          {signInErrors.map((error, index) => (
          <div
            key={index}
            className="bg-red-500 p-2 text-white text-center m-2"
          >
            {error}
          </div>
        ))}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-4"
          >
            Ingresar
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
