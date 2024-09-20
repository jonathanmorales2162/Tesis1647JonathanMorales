import { useState, useEffect } from 'react';

// Define the Order interface
export interface Order {
  idOs: number;
  status: string;
  descricaoProduto: string;
  dataInicial: string;
  dataAtualizacao: string;
  // Add other fields as needed
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
      const effectiveClientId = clientId || storedClientId;

      if (!effectiveClientId) {
        setError('No client ID available');
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
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        setOrders(data.result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [clientId]);

  return { orders, loading, error };
};