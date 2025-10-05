import React, { useState } from 'react';
import { X, Copy } from 'lucide-react'; // Importamos solo el ícono de copiar

const AccountModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState<{ tarjeta: boolean; cuenta: boolean }>({
    tarjeta: false,
    cuenta: false,
  });

  // Datos de cuenta y tarjeta
  const accountNumber = "4154 3143 3637 1235"; // Número de tarjeta
  const accountName = "Sergio Ángel Dévora Cuéllar"; // Nombre del titular
  const bankName = "BBVA"; // Nombre del banco
  const cuentaBancaria = "012 760 01559632967 3"; // Número de cuenta bancaria
  const concepto = "Presente de boda"; // Concepto de la transferencia

  // Función para copiar el número al portapapeles
  const copyToClipboard = (text: string, type: 'tarjeta' | 'cuenta') => {
    navigator.clipboard.writeText(text);
    setCopied((prev) => ({ ...prev, [type]: true }));

    // Volver a poner el estado en "no copiado" después de 3 segundos
    setTimeout(() => {
      setCopied((prev) => ({ ...prev, [type]: false }));
    }, 3000);
  };

  // Abrir y cerrar el modal
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {/* Botón que abre el modal */}
      <button
        onClick={openModal}
        className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 transition-colors flex items-center justify-center space-x-2"
      >
        <span>Transferir Regalo</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div
            className="relative w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()} // Evita que el clic dentro del modal lo cierre
          >
            {/* Botón de cerrar */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <X size={24} />
            </button>

            {/* Contenedor principal centrado */}
            <div className="flex flex-col items-center text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Detalles para Transferencia
              </h2>

              {/* Información del titular */}
              <div className="bg-gray-50 py-2 px-4 rounded-lg w-full text-left mb-4 shadow-sm">
                <p className="text-lg font-semibold text-gray-800">A nombre de:</p>
                <p className="text-lg text-gray-700">{accountName}</p>
              </div>

              {/* Información del banco */}
              <div className="bg-gray-50 py-2 px-4 rounded-lg w-full text-left mb-4 shadow-sm">
                <p className="text-lg font-semibold text-gray-800">Banco:</p>
                <p className="text-lg text-gray-700">{bankName}</p>
              </div>

              {/* Concepto de la transferencia */}
              <div className="bg-gray-50 py-2 px-4 rounded-lg w-full text-left mb-4 shadow-sm">
                <p className="text-lg font-semibold text-gray-800">Concepto:</p>
                <p className="text-lg text-gray-700">{concepto}</p>
              </div>

              {/* Número de tarjeta + botón copiar */}
              <div className="bg-gray-50 py-2 px-4 rounded-lg w-full text-left mb-4 shadow-sm">
                <p className="text-lg font-semibold text-gray-800">Tarjeta:</p>
                <div className="flex justify-between items-center">
                  <p className="text-lg text-gray-700">{accountNumber}</p> {/* Número de tarjeta */}
                  <button onClick={() => copyToClipboard(accountNumber, 'tarjeta')} className="ml-2">
                    <Copy size={20} className="text-gray-500 hover:text-gray-700" />
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 py-2 px-4 rounded-lg w-full text-left mb-4 shadow-sm">
                <p className="text-lg font-semibold text-gray-800">Cuenta CLABE:</p>
                <div className="flex justify-between items-center">
                  <p className="text-lg text-gray-700">{cuentaBancaria}</p> {/* Número de cuenta bancaria */}
                  <button onClick={() => copyToClipboard(cuentaBancaria, 'cuenta')} className="ml-2">
                    <Copy size={20} className="text-gray-500 hover:text-gray-700" />
                  </button>
                </div>
              </div>


              {/* Indicador de copiado */}
              <p className="text-sm mt-2 text-gray-500">
                {copied.tarjeta ? '¡Número de tarjeta copiado!' : copied.cuenta ? '¡Número de cuenta copiado!' : ''}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountModal;
