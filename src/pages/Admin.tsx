import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Trash2, Send } from 'lucide-react'; // Iconos
import Modal from '../components/Modal';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const generateCodigo = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

interface Invitado {
  id: number;
  nombre: string;
  cantidad: number;
  codigo: string;
  confirmado: RSVPStatus;
  plural: boolean;
  parte: 'Novio' | 'Novia' | 'Ana';
}

enum RSVPStatus {
  attending = 'Si',
  pending = 'Pendiente',
  notAttending = 'No',
}

const AdminPage: React.FC = () => {
  const [invitados, setInvitados] = useState<Invitado[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'todos' | RSVPStatus>('todos');
  const [filterParte, setFilterParte] = useState<'Todos' | 'Novio' | 'Novia' | 'Ana' >('Todos');
  const [newInvitado, setNewInvitado] = useState({ nombre: '', cantidad: 1, plural: false, codigo: generateCodigo(), confirmado: RSVPStatus.pending, parte: 'Novio' });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [showModalAgregar, setShowModalAgregar] = useState(false);
  const [showModalEliminar, setShowModalEliminar] = useState<{ show: boolean; id: number | null }>({ show: false, id: null });
  const [showModalWhatsApp, setShowModalWhatsApp] = useState<{ show: boolean; invitado: Invitado | null }>({ show: false, invitado: null });
  const [editingValues, setEditingValues] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const fetchInvitados = async () => {
      const { data, error } = await supabase.from('invitados').select('*');

      if (error) {
        setError('Error al cargar las invitaciones');
      } else {
        setInvitados(data as Invitado[]);
      }
      setLoading(false);
    };

    fetchInvitados();
  }, []);

  // Crear nueva invitación
  const handleAddInvitado = async () => { 
    const { data, error } = await supabase
      .from('invitados')
      .insert([{ 
        nombre: newInvitado.nombre, 
        cantidad: newInvitado.cantidad, 
        confirmado: newInvitado.confirmado, 
        plural: newInvitado.plural, 
        codigo: newInvitado.codigo, 
        parte: newInvitado.parte 
      }])
      .select('*'); // Esto asegura que Supabase devuelva el nuevo registro insertado
  
    if (error) {
      console.error('Error al crear invitación:', error);
    } else if (data && data.length > 0) {
      setInvitados((prev) => [...prev, data[0]]);
      setShowModalAgregar(false);
      setNewInvitado({ 
        nombre: '', 
        cantidad: 1, 
        plural: false, 
        codigo: generateCodigo(), 
        confirmado: RSVPStatus.pending, 
        parte: 'Novio' 
      });
    } else {
      console.error('Error: No se devolvió ningún dato después de la inserción');
    }
  };  
  
  // Actualizar invitación
  const handleUpdateInvitado = async (id: number, updatedData: Partial<Invitado>) => {
    const { data, error } = await supabase
      .from('invitados')
      .update(updatedData)
      .eq('id', id);

    if (error) {
      console.error('Error al actualizar invitación:', error);
    } else {
      setInvitados((prev) => prev.map((invitado) => (invitado.id === id ? { ...invitado, ...updatedData } : invitado)));
    }
  };

  // Confirmar eliminación
  const handleDeleteInvitado = async (id: number) => {
    const { error } = await supabase.from('invitados').delete().eq('id', id);

    if (error) {
      console.error('Error al eliminar invitación:', error);
    } else {
      setInvitados((prev) => prev.filter((invitado) => invitado.id !== id));
      setShowModalEliminar({ show: false, id: null });
    }
  };

  // Link para compartir sin formato de WhatsApp
  const handleShareLink = (codigo: string) => {
    return `https://angelyely.com/invitado/${codigo}`;
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  // Filtrar invitaciones según el filtro seleccionado
  const filteredInvitados = invitados.filter((invitado) => {
    const matchesStatus = 
      filter === 'todos' ||
      (filter === RSVPStatus.attending && invitado.confirmado === RSVPStatus.attending) ||
      (filter === RSVPStatus.pending && invitado.confirmado === RSVPStatus.pending) ||
      (filter === RSVPStatus.notAttending && invitado.confirmado === RSVPStatus.notAttending);
      
    const matchesParte = filterParte === 'Todos' || invitado.parte === filterParte;
  
    return matchesStatus && matchesParte;
  });
  

// Cantidad total de personas y de invitaciones considerando los filtros activos
  const totalInvitaciones = invitados
  .filter((i) => filterParte === 'Todos' || i.parte === filterParte).length;

  const totalPersonas = invitados
  .filter((i) => filterParte === 'Todos' || i.parte === filterParte)
  .reduce((acc, curr) => acc + curr.cantidad, 0);

  // Totales para cada estado de invitaciones y personas, considerando filtros de estado y parte
  const totalConfirmadosInvitaciones = invitados
    .filter((i) => i.confirmado === RSVPStatus.attending && (filterParte === 'Todos' || i.parte === filterParte)).length;
  const totalConfirmadosPersonas = invitados
    .filter((i) => i.confirmado === RSVPStatus.attending && (filterParte === 'Todos' || i.parte === filterParte))
    .reduce((acc, curr) => acc + curr.cantidad, 0);

  const totalPendientesInvitaciones = invitados
    .filter((i) => i.confirmado === RSVPStatus.pending && (filterParte === 'Todos' || i.parte === filterParte)).length;
  const totalPendientesPersonas = invitados
    .filter((i) => i.confirmado === RSVPStatus.pending && (filterParte === 'Todos' || i.parte === filterParte))
    .reduce((acc, curr) => acc + curr.cantidad, 0);

  const totalNoConfirmadosInvitaciones = invitados
    .filter((i) => i.confirmado === RSVPStatus.notAttending && (filterParte === 'Todos' || i.parte === filterParte)).length;
  const totalNoConfirmadosPersonas = invitados
    .filter((i) => i.confirmado === RSVPStatus.notAttending && (filterParte === 'Todos' || i.parte === filterParte))
    .reduce((acc, curr) => acc + curr.cantidad, 0);


  const handleChangeNombre = (id: number, nombre: string) => {
    setEditingValues((prev) => ({ ...prev, [id]: nombre }));
  };

  const handleBlurNombre = (id: number) => {
    const nombre = editingValues[id];
    if (nombre !== undefined) {
      handleUpdateInvitado(id, { nombre });
    }
  };
    
  const handlePrintReport = () => {
    // Filtrar los invitados confirmados o pendientes según la parte seleccionada
    const filteredForPrint = invitados.filter(
      (invitado) =>
        (invitado.confirmado === RSVPStatus.attending || invitado.confirmado === RSVPStatus.pending) &&
        (filterParte === 'Todos' || invitado.parte === filterParte)
    );
  
    // Ordenar los invitados por nombre alfabéticamente
    const sortedInvitados = [...filteredForPrint].sort((a, b) =>
      a.nombre.localeCompare(b.nombre)
    );
  
    // Crear el contenido HTML del reporte
    const reportContent = `
      <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="margin: 0;">Lista de Invitados</h2>
        <p style="margin: 5px 0;">De: ${filterParte === 'Todos' ? 'Todos' : filterParte}</p>
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 12px; font-family: Arial, sans-serif;">
        <thead>
          <tr>
            <th style="border: 1px solid #000; padding: 5px;">#</th>
            <th style="border: 1px solid #000; padding: 5px;">Nombre</th>
            <th style="border: 1px solid #000; padding: 5px;">Cantidad</th>
            <th style="border: 1px solid #000; padding: 5px;">Confirmado</th>
            <th style="border: 1px solid #000; padding: 5px;">Mesa</th>
            <th style="border: 1px solid #000; padding: 5px;">Asistencia</th>
          </tr>
        </thead>
        <tbody>
          ${sortedInvitados
            .map(
              (invitado, index) => `
            <tr>
              <td style="border: 1px solid #000; padding: 5px; text-align: center;">${index + 1}</td>
              <td style="border: 1px solid #000; padding: 5px;">${invitado.nombre}</td>
              <td style="border: 1px solid #000; padding: 5px; text-align: center;">${invitado.cantidad}</td>
              <td style="border: 1px solid #000; padding: 5px; text-align: center;">${invitado.confirmado}</td>
              <td style="border: 1px solid #000; padding: 5px;"></td>
              <td style="border: 1px solid #000; padding: 5px;"></td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
    `;
  
    // Mostrar el reporte en el contenedor para impresión
    const reportContainer = document.getElementById('printable-report');
    if (reportContainer) {
      reportContainer.innerHTML = reportContent;
      reportContainer.style.display = 'block';
      window.print();
      reportContainer.style.display = 'none'; // Ocultar el contenedor después de imprimir
    } else {
      console.error("No se encontró el contenedor de reporte.");
    }
  };   
    
  return (
    <div className="container mx-auto px-4 py-8">
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            #printable-report, #printable-report * {
              visibility: visible;
            }
            #printable-report {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
            }
          }
        `}
      </style>
      <h1 className="text-3xl font-semibold mb-4">Administrar Invitaciones</h1>

      {/* Botones de filtro */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
      {/* Botones de filtro de estado */}
      <button
        className={`w-full px-4 py-2 rounded ${filter === 'todos' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        onClick={() => setFilter('todos')}
      >
        Todas las invitaciones ({totalInvitaciones}), Personas: {totalPersonas}
      </button>
      <button
        className={`w-full px-4 py-2 rounded ${filter === RSVPStatus.attending ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
        onClick={() => setFilter(RSVPStatus.attending)}
      >
        Asistirán ({totalConfirmadosInvitaciones}), Personas: {totalConfirmadosPersonas}
      </button>
      <button
        className={`w-full px-4 py-2 rounded ${filter === RSVPStatus.pending ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
        onClick={() => setFilter(RSVPStatus.pending)}
      >
        Pendientes ({totalPendientesInvitaciones}), Personas: {totalPendientesPersonas}
      </button>
      <button
        className={`w-full px-4 py-2 rounded ${filter === RSVPStatus.notAttending ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
        onClick={() => setFilter(RSVPStatus.notAttending)}
      >
        No Asistirán ({totalNoConfirmadosInvitaciones}), Personas: {totalNoConfirmadosPersonas}
      </button>

      {/* Filtro de invitador */}
      <div className="mt-4 md:mt-0">
        <label className="block text-sm font-medium text-gray-700">Invitado por</label>
        <select
          className="border px-4 py-2 rounded w-full"
          onChange={(e) => setFilterParte(e.target.value)}
          defaultValue="Todos"
        >
          <option value="Todos">Todos</option>
          <option value="Novio">Novio</option>
          <option value="Novia">Novia</option>
          <option value="Ana">Ana</option>
        </select>
      </div>

      <button
        onClick={handlePrintReport}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4"
      >
        Check Imprimible
      </button>
    </div>


      <div className="flex items-center justify-between mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={modoEdicion}
            onChange={(e) => setModoEdicion(e.target.checked)}
            className="mr-2"
          />
          <span>Modo Edición</span>
        </label>

        <button
          onClick={() => setShowModalAgregar(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Agregar Invitación
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">#</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Parte</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Nombre</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Cantidad</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Confirmado</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Plural</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Código</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvitados.map((invitado) => (
              <tr key={invitado.id}>
                <td className="border border-gray-300 px-4 py-2">{invitado.id}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {modoEdicion ? (
                    <select
                      value={invitado.parte}
                      onChange={(e) => handleUpdateInvitado(invitado.id, { parte: e.target.value as 'Novio' | 'Novia' | 'Ana' })}
                      className="border px-2 py-1 w-full"
                    >
                      <option value="Novio">Novio</option>
                      <option value="Novia">Novia</option>
                      <option value="Ana">Ana</option>
                    </select>
                  ) : (
                    invitado.parte
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {modoEdicion ? (
                    <input
                      type="text"
                      value={editingValues[invitado.id] || invitado.nombre}
                      onChange={(e) => handleChangeNombre(invitado.id, e.target.value)}
                      onBlur={() => handleBlurNombre(invitado.id)}
                      className="border px-2 py-1 w-full"
                    />
                  ) : (
                    invitado.nombre
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {modoEdicion ? (
                    <input
                      type="number"
                      value={invitado.cantidad}
                      onChange={(e) => handleUpdateInvitado(invitado.id, { cantidad: parseInt(e.target.value) })}
                      className="border px-2 py-1 w-full"
                    />
                  ) : (
                    invitado.cantidad
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {modoEdicion ? (
                    <select
                      value={invitado.confirmado}
                      onChange={(e) => handleUpdateInvitado(invitado.id, { confirmado: e.target.value as RSVPStatus })}
                      className="border px-2 py-1 w-full"
                    >
                      <option value={RSVPStatus.attending}>Si</option>
                      <option value={RSVPStatus.pending}>Pendiente</option>
                      <option value={RSVPStatus.notAttending}>No</option>
                    </select>
                  ) : (
                    invitado.confirmado
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {modoEdicion ? (
                    <input
                      type="checkbox"
                      checked={invitado.plural}
                      onChange={(e) => handleUpdateInvitado(invitado.id, { plural: e.target.checked })}
                    />
                  ) : (
                    invitado.plural ? 'Sí' : 'No'
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">{invitado.codigo}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button className="text-red-500 mr-4" onClick={() => setShowModalEliminar({ show: true, id: invitado.id })}>
                    <Trash2 size={20} />
                  </button>
                  <button className="text-blue-500" onClick={() => setShowModalWhatsApp({ show: true, invitado })}>
                    <Send size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModalAgregar && (
        <Modal onClose={() => setShowModalAgregar(false)}>
          <h2 className="text-2xl mb-2">Agregar Nueva Invitación</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="nombreInvitado" className="block text-sm font-medium text-gray-700">Nombre del Invitado</label>
              <input
                id="nombreInvitado"
                type="text"
                className="border px-4 py-2 rounded w-full"
                value={newInvitado.nombre}
                onChange={(e) => setNewInvitado({ ...newInvitado, nombre: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="cantidadInvitados" className="block text-sm font-medium text-gray-700">Cantidad</label>
              <input
                id="cantidadInvitados"
                type="number"
                className="border px-4 py-2 rounded w-full"
                value={newInvitado.cantidad}
                onChange={(e) => setNewInvitado({ ...newInvitado, cantidad: parseInt(e.target.value) })}
              />
            </div>
            <div>
              <label htmlFor="codigoInvitado" className="block text-sm font-medium text-gray-700">Código</label>
              <input
                id="codigoInvitado"
                type="text"
                className="border px-4 py-2 rounded w-full bg-gray-100"
                value={newInvitado.codigo}
                disabled
              />
            </div>
            <div className="flex items-center">
              <input
                id="pluralInvitado"
                type="checkbox"
                className="mr-2"
                checked={newInvitado.plural}
                onChange={(e) => setNewInvitado({ ...newInvitado, plural: e.target.checked })}
              />
              <label htmlFor="pluralInvitado" className="text-sm font-medium text-gray-700">¿Plural?</label>
            </div>
            <div>
              <label htmlFor="parteInvitado" className="block text-sm font-medium text-gray-700">Parte</label>
              <select
                id="parteInvitado"
                className="border px-4 py-2 rounded w-full"
                value={newInvitado.parte}
                onChange={(e) => setNewInvitado({ ...newInvitado, parte: e.target.value as 'Novio' | 'Novia' | 'Ana' })}
              >
                <option value="Novio">Novio</option>
                <option value="Novia">Novia</option>
                <option value="Ana">Ana</option>
              </select>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full" onClick={handleAddInvitado}>
              Guardar Invitación
            </button>
          </div>
        </Modal>
      )}

      {showModalEliminar.show && (
        <Modal onClose={() => setShowModalEliminar({ show: false, id: null })}>
          <h2 className="text-2xl mb-2">Confirmar Eliminación</h2>
          <p>¿Estás seguro de que deseas eliminar esta invitación?</p>
          <div className="flex justify-end mt-4">
            <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={() => handleDeleteInvitado(showModalEliminar.id!)}>
              Confirmar
            </button>
            <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setShowModalEliminar({ show: false, id: null })}>
              Cancelar
            </button>
          </div>
        </Modal>
      )}

      {showModalWhatsApp.show && (
        <Modal onClose={() => setShowModalWhatsApp({ show: false, invitado: null })}>
          <h2 className="text-2xl mb-2">Copiar Enlace</h2>
          <p>Invitación para: {showModalWhatsApp.invitado?.nombre}</p>
          <input
            type="text"
            className="border px-4 py-2 rounded bg-gray-100 w-full mt-4"
            value={handleShareLink(showModalWhatsApp.invitado!.codigo)}
            readOnly
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full"
            onClick={() => {
              navigator.clipboard.writeText(handleShareLink(showModalWhatsApp.invitado!.codigo));
            }}
          >
            Copiar Enlace
          </button>
        </Modal>
      )}

      <div style={{ display: 'none' }} id="printable-report"></div>

    </div>
  );
};

export default AdminPage;
