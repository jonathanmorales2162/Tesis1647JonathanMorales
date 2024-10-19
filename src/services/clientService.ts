import { useState, useEffect } from 'react';
import axios from 'axios';

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
      const effectiveClientId = clientId || storedClientId;
 
      if (!effectiveClientId) {
        setError('Cliente no disponible');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://api.taller.digicom.com.gt/api/v1/clientes/${effectiveClientId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const { ordensServicos, ...clientInfo } = response.data.result;
        setClientData(clientInfo);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'A ocurrido un error');
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [clientId]);

  return { clientData, loading, error };
};
