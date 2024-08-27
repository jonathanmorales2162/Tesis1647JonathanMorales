import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import SignIn from './pages/Authentication/SignIn';
import Loader from './common/Loader';
import routes from './routes';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);

    // Verificar si el usuario está autenticado
    const token = localStorage.getItem('jwt');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Routes>
        <Route path="/auth/signin" element={<SignIn />} />

        <Route element={<DefaultLayout />}>
          {isAuthenticated ? (
            <>
              {/* Redirigir a ECommerce si está autenticado */}
              {routes.map((route, index) => {
                const { path, component: Component } = route;
                return (
                  <Route
                    key={index}
                    path={path}
                    element={
                      <Suspense fallback={<Loader />}>
                        <Component />
                      </Suspense>
                    }
                  />
                );
              })}
              {/* Por defecto, si está autenticado, redirige al Dashboard */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </>
          ) : (
            // Si no está autenticado, redirigir a SignIn
            <>
              <Route path="*" element={<Navigate to="/auth/signin" replace />} />
            </>
          )}
        </Route>
      </Routes>
    </>
  );
}

export default App;
