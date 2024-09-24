import { useState, useEffect } from 'react';

interface ClientData {
  idClientes: number;
  nomeCliente: string;
  sexo: string | null;
  pessoa_fisica: number;
  documento: string;
  telefone: string;
  celular: string;
  email: string;
  senha: string;
  dataCadastro: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  contato: string;
  complemento: string;
  fornecedor: number;
}

export const useClientData = (clientId?: string) => {
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientData = async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('jwt');
      const storedClientId = localStorage.getItem('clientId');
      //const effectiveClientId = clientId || storedClientId;
      const effectiveClientId = 36;

      if (!effectiveClientId) {
        setError('No client ID available');
        setLoading(false);
        return;
      }

      try {
        //const response = await fetch(`https://api.taller.digicom.com.gt/api/v1/clientes/${effectiveClientId}`, {
        const response = await fetch(`https://api.taller.digicom.com.gt/api/v1/clientes/${effectiveClientId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch client data');
        }

        const data = await response.json();
        const { ordensServicos, ...clientInfo } = data.result;
        setClientData(clientInfo);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [clientId]);

  return { clientData, loading, error };
};