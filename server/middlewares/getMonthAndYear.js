// import { getTurnsByMonth } from "../controllers/turnos.controllers.js";


// export default async (req, res, next) => {
//     try {
//       const year = parseInt(req.params.year); // Extraer el año de los parámetros de la URL y convertirlo a número entero
//       const month = parseInt(req.params.month); // Extraer el mes de los parámetros de la URL y convertirlo a número entero
//       const turns = await getTurnsByMonth(year, month);
//       res.locals.turns = turns; // Almacenar los turnos en res.locals para que estén disponibles en los siguientes middlewares o rutas
//     next();
//     } catch (error) {
//       return res.status(500).json({ message: error.message });
//     }
//   };