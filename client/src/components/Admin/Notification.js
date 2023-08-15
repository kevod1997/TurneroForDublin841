import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { useTurns } from '../../context/TurnContext';

const Notification = () => {
  const { createTurn } = useTurns();

  useEffect(() => {
      const socket = io('http://localhost:4000');

      socket.on('connect', () => {
        console.log('Admin conectado');
      });

      socket.on('newTurnCreated', (newTurn) => {
        // Aquí puedes mostrar una notificación o actualizar la lista de turnos
        console.log('Nuevo turno creado:', newTurn);
      });

      return () => {
        socket.disconnect();
      };

  }, [createTurn]);

  return (
    <div>
      
    </div>

  );
};

export default Notification;
