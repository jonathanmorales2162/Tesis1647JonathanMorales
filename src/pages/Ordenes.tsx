import Breadcrumb from '../components/Breadcrumb';
import React from 'react';
import DatosOrdenes from '../components/DatosOrdenes';
import { useOrderData } from '../services/orderService';

const Ordenes: React.FC = () => {
  const { orders, loading, error } = useOrderData();

  return (
    <>
      <Breadcrumb pageName="Ordenes" />
      <div className="flex flex-col gap-3">
        {loading && <p>Cargando...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && <DatosOrdenes ordersdata={orders} />}
      </div>
    </>
  );
};

export default Ordenes;
