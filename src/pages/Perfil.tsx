import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import fondo2 from '../images/cover/fondo2.png';
import userDefault from '../images/user/perfildefault.png';
import { useClientData } from '../services/clientService';

const Perfil: React.FC = () => {
  const { clientData, loading, error } = useClientData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!clientData) return <div>No client data available</div>;

  return (
    <>
      <Breadcrumb pageName="Perfil" />

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65">
          <img
            src={fondo2}
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          />
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative drop-shadow-2">
              <img src={userDefault} alt="profile" />
            </div>
          </div>
          
        </div>
      </div>

      {/* datos para el formulario en modo solo lectura */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Datos del Cliente</h3>
        </div>
        <div className="flex flex-col gap-5.5 p-6.5">
          <div>
            <label className="mb-3 block text-black dark:text-white">Nombre Completo</label>
            <input
              type="text"
              value={clientData.nomeCliente || 'No especificado'}
              readOnly
              className="w-full rounded-lg border-[1.5px] border-stroke bg-gray-100 py-3 px-5 font-medium outline-none focus:border-primary dark:bg-form-input dark:border-form-strokedark dark:focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-3 block text-black dark:text-white">Teléfono</label>
            <input
              type="text"
              value={clientData.telefone || 'No especificado'}
              readOnly
              className="w-full rounded-lg border-[1.5px] border-stroke bg-gray-100 py-3 px-5 font-medium outline-none focus:border-primary dark:bg-form-input dark:border-form-strokedark dark:focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-3 block text-black dark:text-white">Email</label>
            <input
              type="email"
              value={clientData.email || 'No especificado'}
              readOnly
              className="w-full rounded-lg border-[1.5px] border-stroke bg-gray-100 py-3 px-5 font-medium outline-none focus:border-primary dark:bg-form-input dark:border-form-strokedark dark:focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-3 block text-black dark:text-white">Dirección</label>
            <input
              type="text"
              value={`${clientData.rua} ${clientData.numero}, ${clientData.bairro}, ${clientData.cidade}, ${clientData.estado}, ${clientData.cep}` || 'No especificado'}
              readOnly
              className="w-full rounded-lg border-[1.5px] border-stroke bg-gray-100 py-3 px-5 font-medium outline-none focus:border-primary dark:bg-form-input dark:border-form-strokedark dark:focus:border-primary"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Perfil;
