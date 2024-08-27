// handleApiError.tsx
import { useNavigate } from 'react-router-dom';

export function handleApiError(response: Response) {
    const navigate = useNavigate();

    if (response.status === 401) {
        // Si la respuesta es 401, redirigir al login y limpiar localStorage
        localStorage.clear();
        navigate('/auth/signin');
        return; // Detenemos aquí porque no necesitamos más procesamiento
    }

    return response.text().then(text => {
        try {
            // Intentar parsear el texto como JSON
            return JSON.parse(text);
        } catch (error) {
            // Si el texto no es JSON, devolver el texto original
            throw new Error(text);
        }
    });
}


export default handleApiError;
