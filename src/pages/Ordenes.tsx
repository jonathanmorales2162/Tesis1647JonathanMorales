import Breadcrumb from '../components/Breadcrumb';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TableThree from '../components/TableThree';
import DatosOrdenes from '../components/DatosOrdenes';

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

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);  // Iniciar el estado de carga
      setError('');  // Limpiar cualquier error previo
      const token = localStorage.getItem('jwt');  // Recuperar el token JWT desde el localStorage
      const clientId = localStorage.getItem('clientId');  // Recuperar el id cliente del localStorage
      //const clientId = 33;
      //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMsImVtYWlsIjoiZGF2aWQubW9udGVycm9zb0BhZG1pbi5jb20iLCJyb2wiOiJjbGllbnRlIiwiaWF0IjoxNzI0NTM3MDY5LCJleHAiOjE3MjQ1NDA2Njl9.njoayEGuBCnF8ft8CT-UiMh-GCdbaIGgk4bPGE4GJz0';
      console.log(clientId);
      try {
        const response = await fetch(`http://api.taller.digicom.com.gt/api/v1/clientes/os/${clientId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();  // Parsear la respuesta JSON

        if (!response.ok) {
          throw new Error(data.message || 'Error al obtener las órdenes');
        }

        setOrders(data.result);  // Guardar la respuesta de la API en el estado orders

      } catch (error: any) {
        setError(error.message);  // Guardar cualquier error en el estado error
      } finally {
        setLoading(false);  // Terminar el estado de carga
      }
    };

    fetchOrders();  // Llamar a la función fetchOrders para iniciar la llamada a la API
  }, []);
  <Breadcrumb pageName="Ordenes" />

  return (
    <div className="flex flex-col gap-3">
        <DatosOrdenes ordersdata ={orders} />
    
    </div>
    // <TableThree />
    //<TableThree />
    // <div className="container mt-3 p-3 bg-dark text-light">
    //   <h1>Órdenes de Servicio</h1>
    //   {error && <div className="alert alert-danger">{error}</div>}
    //   {loading && <p className="text-white">Cargando...</p>}
    //   {orders.length > 0 ? (
    //     orders.map(order => (
    //       <div key={order.idOs} className="card text-light bg-secondary mb-3">
    //         <div className="card-header">Orden #{order.idOs}</div>
    //         <div className="card-body">
    //           <h5 className="card-title">Estatus: {order.status}</h5>
    //           <p className="card-text">
    //             Descripción: <span dangerouslySetInnerHTML={{ __html: order.descricaoProduto }}></span>
    //           </p>
    //           <Link to={`/orders/${order.idOs}`} className="btn btn-primary">Ver Detalles</Link>
    //         </div>
    //       </div>
    //     ))
    //   ) : (
    //     !loading && <p className="text-white">No hay órdenes disponibles.</p>
    //   )}
    // </div>
  );
};

export default Ordenes;
