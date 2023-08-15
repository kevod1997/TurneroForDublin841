import Contacto from "./Contacto";
import Servicios from "./Servicios";
import Turnos from "./Turnos";
import { useEffect } from 'react';

function Home() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <>
      <section id="turnos">
        <Turnos />
      </section>
      <section id="servicios">
        <Servicios />
      </section>
      <section id="contacto">
        <Contacto />
      </section>
    </>
  );
}

export default Home;
