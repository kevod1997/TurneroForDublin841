// const socketHandler = (io) => {
//     io.on("connection", (socket) => {
//         console.log("Usuario conectado");
      
//         socket.on("disconnect", () => {
//           console.log("Usuario desconectado");
//         });
      
//         socket.on('createTurn', (newTurn) => {
//             console.log('Nuevo turno creado', newTurn);
//           // Aquí puedes guardar el turno en la base de datos y obtener su ID
//           const newTurnId = '...'; // ID del nuevo turno
          
//           // Emitir el evento newTurnCreated con los datos del nuevo turno
//           io.emit('newTurnCreated', { ...newTurn, _id: newTurnId });
//         });
//       });
//   };
  
//   export default socketHandler;