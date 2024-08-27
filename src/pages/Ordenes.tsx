import Breadcrumb from '../components/Breadcrumb';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TableThree from '../components/TableThree';
import DatosOrdenes from '../components/DatosOrdenes';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import { handleApiError } from './Authentication/handleApiError'; // Ajusta la ruta según donde esté ubicada tu función

interface Order {
  idOs: number;
  status: string;
  descricaoProduto: string;
  // Agrega más campos aquí si es necesario
}

const Ordenes: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate(); // Usar el hook useNavigate dentro del componente

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);  // Iniciar el estado de carga
      setError('');  // Limpiar cualquier error previo
      const token = localStorage.getItem('jwt');  // Recuperar el token JWT desde el localStorage
      const clientId = localStorage.getItem('clientId');  // Recuperar el id cliente del localStorage
      // console.log(clientId);
      try {
        const response = await fetch(`https://api.taller.digicom.com.gt/api/v1/clientes/os/${clientId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          const data = await response.json();  // Parsear la respuesta JSON
          throw new Error(data.message || 'Error al obtener las órdenes');
        }

        const data = await response.json();  // Parsear la respuesta JSON si la respuesta es correcta
        setOrders(data.result);  // Guardar la respuesta de la API en el estado orders

      } catch (error: any) {
        handleApiError(error, navigate);  // Manejar el error utilizando la función handleApiError
        setError(error.message);  // Guardar cualquier error en el estado error
      } finally {
        setLoading(false);  // Terminar el estado de carga
      }
    };

    fetchOrders();  // Llamar a la función fetchOrders para iniciar la llamada a la API
  }, [navigate]);

  return (
    <>
      <Breadcrumb pageName="Ordenes" />
      <div className="flex flex-col gap-3">
        <DatosOrdenes ordersdata={orders} />
      </div>
    </>
  );
};

export default Ordenes;


