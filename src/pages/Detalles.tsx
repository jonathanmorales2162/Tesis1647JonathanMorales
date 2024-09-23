import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { getOrderById, Order } from '../services/orderService';

import userThree from '../images/user/user-03.png';
import fireToast from '../hooks/fireToast';

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
    return <div>Cargando detalle de la orden...</div>;
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Sin información';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <>
      <Breadcrumb pageName={`Detalle de la Orden #${order.idOs}`} />
          <p className="font-medium">Estado: {order.status}</p>
      <div id='datos_detalle' className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6.5">
        <div className="mb-5.5 flex flex-col gap-5.5">
          <div className="w-full">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="descricaoProduto">
              Descripción del Producto
            </label>
            <div className="relative">
              <label className="w-full rounded border  border-stroke bg-gray py-3 px-4.5 text-black whitespace-normal  break-words focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary" htmlFor="descricaoProduto">
                {order.descricaoProduto || 'Sin información'}
              </label>
            </div>
          </div>
        </div>
        <div className="mb-5.5 flex flex-col gap-5.5">
          <div className="w-full">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="defeito">
              Defecto
            </label>
            <div className="relative">
              <label className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary" htmlFor="defeito">
                {order.defeito || 'Sin información'}
              </label>
            </div>
          </div>
        </div>
        <div className="mb-5.5 flex flex-col gap-5.5">
          <div className="w-full">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="observacoes">
              Observaciones
            </label>
            <div className="relative">
              <label className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary" htmlFor="observacoes">
                {order.observacoes || 'Sin información'}
              </label>
            </div>
          </div>
        </div>
        <div className="mb-5.5 flex flex-col gap-5.5">
          <div className="w-full">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="laudoTecnico">
              Laudo Técnico
            </label>
            <div className="relative">
              <label className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary" htmlFor="laudoTecnico">
                {order.laudoTecnico || 'Sin información'}
              </label>
            </div>
          </div>
        </div>
        <div className="mb-5.5 flex flex-col gap-5.5">
          <div className="w-full">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="valorTotal">
              Valor Total
            </label>
            <div className="relative">
              <label className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary" htmlFor="valorTotal">
                {order.valorTotal !== null ? `$${order.valorTotal.toFixed(2)}` : 'Sin información'}
              </label>
            </div>
          </div>
        </div>
        <div className="mb-5.5 flex flex-col gap-5.5">
          <div className="w-full">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="lancamento">
              Lanzamiento
            </label>
            <div className="relative">
              <label className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary" htmlFor="lancamento">
                {order.lancamento || 'Sin información'}
              </label>
            </div>
          </div>
        </div>
        <div className="mb-5.5 flex flex-col gap-5.5">
          <div className="w-full">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="faturado">
              Facturado
            </label>
            <div className="relative">
              <label className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary" htmlFor="faturado">
                {order.faturado === 1 ? 'Sí' : 'No'}
              </label>
            </div>
          </div>
        </div>
        <div className="mb-5.5 flex flex-col gap-5.5">
          <div className="w-full">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="dataInicial">
              Fecha de Creación
            </label>
            <div className="relative">
              <label className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary" htmlFor="dataInicial">
                {formatDate(order.dataInicial)}
              </label>
            </div>
          </div>
        </div>
        <div className="mb-5.5 flex flex-col gap-5.5">
          <div className="w-full">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="dataFinal">
              Fecha Final
            </label>
            <div className="relative">
              <label className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary" htmlFor="dataFinal">
                {formatDate(order.dataFinal)}
              </label>
            </div>
          </div>
        </div>
        <div className="mb-5.5 flex flex-col gap-5.5">
          <div className="w-full">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="dataAtualizacao">
              Fecha de Actualización
            </label>
            <div className="relative">
              <label className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary" htmlFor="dataAtualizacao">
                {formatDate(order.dataAtualizacao)}
              </label>
            </div>
          </div>
        </div>
        <div className="mb-5.5 flex flex-col gap-5.5">
          <div className="w-full">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="garantia">
              Garantía
            </label>
            <div className="relative">
              <label className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary" htmlFor="garantia">
                {order.garantia || 'Sin información'}
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detalles;
