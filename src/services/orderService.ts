import { useState, useEffect } from 'react';

// Define the Order interface with all fields
export interface Order {
  idOs: number;
  status: string;
  descricaoProduto: string;
  dataInicial: string;
  dataAtualizacao: string;
  // New fields
  dataFinal: string;
  garantia: string;
  defeito: string;
  observacoes: string;
  laudoTecnico: string;
  valorTotal: number | null;
  clientes_id: number;
  usuarios_id: number;
  lancamento: string | null;
  faturado: number;
  garantias_id: number | null;
}

export const useOrderData = (clientId?: string) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('jwt');
      const storedClientId = localStorage.getItem('clientId');
      const effectiveClientId = 36;
      //const effectiveClientId = clientId || storedClientId;

      if (!effectiveClientId) {
        setError('Cliente no disponible');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://api.taller.digicom.com.gt/api/v1/clientes/os/${effectiveClientId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Fallo al obtener las ordenes de servicio');
        }

        const data = await response.json();
        setOrders(data.result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'A ocurrido un error');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [clientId]);

  return { orders, loading, error };
};

// Add a new function to get a single order by ID
export const getOrderById = async (orderId: number): Promise<Order> => {
  const token = localStorage.getItem('jwt');

  if (!token) {
    throw new Error('Token de autoenticación no valido');
  }

  try {
    //const response = await fetch(`https://api.taller.digicom.com.gt/api/v1/os/${orderId}`, {
    const response = await fetch(`https://api.taller.digicom.com.gt/api/v1/os/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Fallo al obtener la orden de servicio');
    }

    const data = await response.json();
    return data.result;
  } catch (err) {
    console.error('Error al obtener:', err);
    throw err;
  }
};