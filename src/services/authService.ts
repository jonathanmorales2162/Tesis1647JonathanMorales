import axios from 'axios';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  cliente: {
    id: number;
    email: string;
    rol: string;
  };
}

export const login = async (credentials: LoginCredentials): Promise<{ data: LoginResponse; statusCode: number }> => {
  try {
    const response = await axios.post('https://api.taller.digicom.com.gt/api/v1/clientes/login', credentials);
    
    // Guardar el código de respuesta HTTP en una variable y mostrarlo en la consola
    const httpStatusCode = response.status;
    console.log('Código de respuesta HTTP:', httpStatusCode);

    return { data: response.data, statusCode: httpStatusCode };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Capturar y mostrar el código de error HTTP si la solicitud falla
      const httpErrorCode = error.response?.status;
      console.log('Código de error HTTP:', httpErrorCode);
      throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
    }
    throw error;
  }
};
