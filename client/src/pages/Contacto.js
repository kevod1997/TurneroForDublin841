import React from "react";
import { BsInstagram, BsWhatsapp } from "react-icons/bs";

function Contacto() {
  return (
    <>
      <h1 className="text-center mr-4 ml-4">CONTACTANOS A TRAVES DE NUESTRAS REDES</h1>
      <div className="2xl:container 2xl:mx-auto lg:px-20 md:py-12 md:px-6 py-9 px-4">
        <div className=" grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-8 gap-6 ">
          {/* Safe Shopping Grid Card */}
          <div className=" p-6 bg-gray-50">
            <BsInstagram />

            <p className=" text-xl text-gray-800 font-semibold leading-5 mt-6">
              Instagram
            </p>
            <p className=" font-normal text-base leading-6 text-gray-600 my-4">
              Seguinos para enterarte de nuestras ultimas novedades
            </p>
            <a className=" cursor-pointer text-base leading-4 font-medium text-gray-800 border-b-2 border-gray-800 hover:text-gray-600 ">
              Seguinos
            </a>
          </div>

          {/* Personal Shopping Grid Card */}
          <div className=" p-6 bg-gray-50">
            <BsWhatsapp />
            <p className=" text-xl text-gray-800 font-semibold leading-5 mt-6">
              Whatsapp
            </p>
            <p className=" font-normal text-base leading-6 text-gray-600 my-4">
              Ante cualquier inquietud podes contactarnos.
            </p>
            <a className=" cursor-pointer text-base leading-4 font-medium text-gray-800 border-b-2 border-gray-800 hover:text-gray-600 ">
              Contacto
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contacto;
