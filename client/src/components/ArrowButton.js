import { FaArrowUp } from "react-icons/fa";

const ArrowButton = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      };
    
      return (
        <button
          className="fixed bottom-8 right-8 bg-gray-600 rounded-full p-3 shadow-lg text-white z-50 hover:bg-gray-500 transition duration-300 ease-in-out"
          onClick={scrollToTop}
        >
          <FaArrowUp size={20} />
        </button>
      );
}

export default ArrowButton