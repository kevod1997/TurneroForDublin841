import React from 'react'

function Servicios() {
  return (
    <div className="2xl:container 2xl:mx-auto">
    <div className="lg:px-20 md:px-6 px-4 md:py-12 py-8">
        {/* <div>
            <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800 text-center border-b-slate-700 border-b-2 pb-1">PELUQUERIA</h1>
        </div> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-8 md:mt-10">
            <div className="bg-gray-50 p-8">
                <div className="">
                    <h2 className="text-xl text-gray-600">Corte</h2>
                    <p className="text-xl font-semibold text-gray-800 mt-2">$1200</p>
                </div>
                <div className="flex justify-center items-center mt-8 md:mt-24">
                    <img className="" src="https://i.ibb.co/djFZ41S/Corte.jpg" alt="A chair with designed back" />
                </div>

            </div>
            <div className="bg-gray-50 p-8">
                <div className="">
                    <h2 className="text-xl text-gray-600">Barba</h2>
                    <p className="text-xl font-semibold text-gray-800 mt-2">$1200</p>
                </div>
                <div className="flex justify-center items-center mt-8 md:mt-24">
                    <img className="" src="https://i.ibb.co/JjgbRp9/Barba.jpg" alt="A chair with wooden legs" />
                </div>

            </div>
            <div className="bg-gray-50 p-8">
                <div className="">
                    <h2 className="text-xl text-gray-600">Corte+Barba</h2>
                    <p className="text-xl font-semibold text-gray-800 mt-2">$1200</p>
                </div>
                <div className="flex justify-center items-center mt-8 md:mt-24">
                    <img className="" src="https://i.ibb.co/6N7mQzY/Pelo-barba.jpg" alt="A sofa chair with wooden legs" />
                </div>

            </div>
        </div>

    </div>
</div>
  )
}

export default Servicios