import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { getOrderById, Order } from '../services/orderService';

const Detalles: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        // First, try to get the order from localStorage
        const storedOrder = localStorage.getItem(`order_${id}`);
        if (storedOrder) {
          setOrder(JSON.parse(storedOrder));
        } else {
          // If not in localStorage, fetch from API
          const fetchedOrder = await getOrderById(Number(id));
          setOrder(fetchedOrder);
          // Store the fetched order in localStorage
          localStorage.setItem(`order_${id}`, JSON.stringify(fetchedOrder));
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder();
  }, [id]);

  if (!order) {
    return <div>Cargando detalles de la orden...</div>;
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Sin información';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const renderField = (label: string, value: string | number | null) => (
    <div className="mb-4">
      <h4 className="font-semibold text-black dark:text-white">{label}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {value !== null && value !== '' ? value : 'Sin información'}
      </p>
    </div>
  );

  return (
    <>
      <Breadcrumb pageName={`Detalles de la Orden #${order.idOs}`} />

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
            Orden #{order.idOs}
          </h3>
          <p className="font-medium">Estado: {order.status}</p>
          
          <div className="mt-4.5 mb-5.5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {renderField('Descripción del Producto', order.descricaoProduto)}
            {renderField('Defecto', order.defeito)}
            {renderField('Observaciones', order.observacoes)}
            {renderField('Laudo Técnico', order.laudoTecnico)}
            {renderField('Valor Total', order.valorTotal !== null ? `$${order.valorTotal.toFixed(2)}` : null)}

            {renderField('Lanzamiento', order.lancamento)}
            {renderField('Facturado', order.faturado === 1 ? 'Sí' : 'No')}
            {renderField('Fecha de Creación', formatDate(order.dataInicial))}
            {renderField('Fecha Final', formatDate(order.dataFinal))}
            {renderField('Fecha de Actualización', formatDate(order.dataAtualizacao))}
            {renderField('Garantía', order.garantia)}

          </div>
        </div>
      </div>
    </>
  );
};

export default Detalles;
