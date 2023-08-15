import React from "react";
import "pure-react-carousel/dist/react-carousel.es.css";
import HeaderTitle from "./HeaderTitle";

function Carrousel() {
  return (
    <>
    <div className="p-4 bg-gradient-to-t from-gray-200 via-gray-400 to-gray-600 ">
     <HeaderTitle />

    {/* <h1 className="carouselTitle sm:text-center sm:font-bold sm:text-4xl border-gray-800 sm:border-b-2 sm:mr-5 sm:ml-5 sm:mt-3 md:ml-16 md:mr-16 lg:mr-4 lg:ml-4">Dublin 841</h1> */}
  <div className="flex items-center justify-center ">
    <div className="container">
      <div className="mt-8 grid grid-cols-2 gap-2 rounded-xl bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r p-2 md:grid-cols-4 w-full h-full">
        <div className="group relative overflow-hidden rounded-xl">
          <div className="absolute inset-0 h-full w-full group-hover:bg-rose-400/20"></div>

          <img src="https://i.ibb.co/p0260z3/47585089-372855590141574-5924061720092632660-n.jpg" className="h-full w-full" alt="Nasi lemak cover" />
        </div>
        <div className="group relative overflow-hidden rounded-xl">
          <div className="absolute inset-0 h-full w-full group-hover:bg-rose-400/20"></div>

          <img src="https://i.ibb.co/jGsjw23/42561253-672453366473594-1212826202992126390-n.jpg" className="h-full w-full" alt="Nasi lemak cover" />
        </div>
        <div className="group relative overflow-hidden rounded-xl">
          <div className="absolute inset-0 h-full w-full group-hover:bg-rose-400/20"></div>

          <img src="https://i.ibb.co/bX6G6WY/43914638-176150079961613-2039580422113879951-n.jpg" className="h-full w-full" alt="Nasi lemak cover" />
        </div>
        <div className="group relative overflow-hidden rounded-xl">
          <div className="absolute inset-0 h-full w-full group-hover:bg-rose-400/20"></div>

          <img src="https://i.ibb.co/0tstcrv/41510345-322778174968785-3880681171817292685-n.jpg" className="h-full w-full" alt="Nasi lemak cover" />
        </div>
      </div>
    </div>
  </div>
</div>
{/* <div id="carouselExampleCaptions" className="carousel slide relative" data-bs-ride="carousel">
  <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
    <button
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide-to="0"
      className="active"
      aria-current="true"
      aria-label="Slide 1"
    ></button>
    <button
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide-to="1"
      aria-label="Slide 2"
    ></button>
    <button
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide-to="2"
      aria-label="Slide 3"
    ></button>
  </div>
  <div className="carousel-inner relative w-full overflow-hidden">
    <div className="carousel-item active relative float-left w-full">
      <img
        src="https://www.simpleimageresizer.com/_uploads/photos/b6e57176/42561253_672453366473594_1212826202992126390_n_3_900x1000.jpg"
        className="block h-64 sm:h-64 md:h-72 lg:h-96 w-full object-fit"
        alt="..."
      />
      <div className="carousel-caption  md:block absolute text-center">
        <h5 className="text-sm sm:text-xl md:text-3xl opacity-50">Dublin 841</h5>
      </div>
    </div>
    <div className="carousel-item relative float-left w-full">
      <img
        src="https://www.simpleimageresizer.com/_uploads/photos/b6e57176/43914638_176150079961613_2039580422113879951_n_900x1000.jpg"
        className="block h-64 sm:h-64 md:h-72 lg:h-96 w-full object-fit"
        alt="..."
      />
      <div className="carousel-caption  md:block absolute text-center">
        <h5 className="text-sm sm:text-xl md:text-3xl opacity-50">Dublin 841</h5>
      </div>
    </div>
    <div className="carousel-item relative float-left w-full">
      <img
        src="https://i.ibb.co/p0260z3/47585089-372855590141574-5924061720092632660-n.jpg"
        className="block h-64 sm:h-64 md:h-72 lg:h-96 w-full object-fit"
        alt="..."
      />
      <div className="carousel-caption  md:block absolute text-center">
        <h5 className="text-sm sm:text-xl md:text-3xl opacity-50">Dublin 841</h5>
      </div>
    </div>
  </div>
  <button
    className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
    type="button"
    data-bs-target="#carouselExampleCaptions"
    data-bs-slide="prev"
  >
    <span className="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button
    className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
    type="button"
    data-bs-target="#carouselExampleCaptions"
    data-bs-slide="next"
  >
    <span className="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div> */}
    </>
  )
}

export default Carrousel