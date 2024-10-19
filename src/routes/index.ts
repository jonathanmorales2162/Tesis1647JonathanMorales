import { lazy } from 'react';

const SignIn = lazy(() => import('../pages/Authentication/SignIn'));
const Perfil = lazy(() => import('../pages/Perfil'));
const Ordenes = lazy(() => import ('../pages/Ordenes'));
const Detalles = lazy(() => import ('../pages/Detalles'));
 

const coreRoutes = [
 
  {
    path: '/login',
    title: 'Login',
    component: SignIn,
  },
  {
    path: '/perfil',
    title: 'Perfil',
    component: Perfil,
  },
  {
    path: '/ordenes',
    title: 'Ordenes',
    component: Ordenes,
  },
  {
    path: '/ordenes/detalle/:id',
    title: 'Detalles',
    component: Detalles,
  } 
];

const routes = [...coreRoutes];
export default routes;
