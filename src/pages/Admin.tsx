import React, { useEffect, useState } from 'react';
import { Trash2, Send } from 'lucide-react';
import Modal from '../components/Modal';
import { supabase } from '../lib/supabase';
import type { Invitado } from '../types';
import { RSVPStatus } from '../types';
import { generateCodigo } from '../lib/utils';

const AdminPage: React.FC = () => {
  const [invitados, setInvitados] = useState<Invitado[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'todos' | RSVPStatus>('todos');
  const [filterParte, setFilterParte] = useState<'Todos' | 'Marcelo' | 'Marcela' | 'Mama'>('Todos');
  const [newInvitado, setNewInvitado] = useState({
    nombre: '',
    cantidad: 1,
    plural: false,
    codigo: generateCodigo(),
    confirmado: RSVPStatus.pending,
    parte: 'Marcelo' as 'Marcelo' | 'Marcela',
  });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [showModalAgregar, setShowModalAgregar] = useState(false);
  const [showModalEliminar, setShowModalEliminar] = useState<{ show: boolean; id: number | null }>({
    show: false,
    id: null,
  });
  const [showModalWhatsApp, setShowModalWhatsApp] = useState<{
    show: boolean;
    invitado: Invitado | null;
  }>({ show: false, invitado: null });
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

  const handleAddInvitado = async () => {
    const { data, error } = await supabase
      .from('invitados')
      .insert([
        {
          nombre: newInvitado.nombre,
          cantidad: newInvitado.cantidad,
          confirmado: newInvitado.confirmado,
          plural: newInvitado.plural,
          codigo: newInvitado.codigo,
          parte: newInvitado.parte,
        },
      ])
      .select('*');

    if (error) {
      console.error('Error al crear invitación:', error);
    } else if (data && data.length > 0) {
      setInvitados((prev) => [...prev, data[0] as Invitado]);
      setShowModalAgregar(false);
      setNewInvitado({
        nombre: '',
        cantidad: 1,
        plural: false,
        codigo: generateCodigo(),
        confirmado: RSVPStatus.pending,
        parte: 'Marcelo',
      });
    }
  };

  const handleUpdateInvitado = async (id: number, updatedData: Partial<Invitado>) => {
    const { error } = await supabase.from('invitados').update(updatedData).eq('id', id);

    if (error) {
      console.error('Error al actualizar invitación:', error);
    } else {
      setInvitados((prev) =>
        prev.map((invitado) => (invitado.id === id ? { ...invitado, ...updatedData } : invitado))
      );
    }
  };

  const handleDeleteInvitado = async (id: number) => {
    const { error } = await supabase.from('invitados').delete().eq('id', id);

    if (error) {
      console.error('Error al eliminar invitación:', error);
    } else {
      setInvitados((prev) => prev.filter((invitado) => invitado.id !== id));
      setShowModalEliminar({ show: false, id: null });
    }
  };

  const handleShareLink = (codigo: string) => {
    return `${window.location.origin}/invitado/${codigo}`;
  };

  if (loading) return <p className="text-center p-8">Cargando...</p>;
  if (error) return <p className="text-red-600 text-center p-8">{error}</p>;

  const filteredInvitados = invitados.filter((invitado) => {
    const matchesStatus =
      filter === 'todos' ||
      (filter === RSVPStatus.attending && invitado.confirmado === RSVPStatus.attending) ||
      (filter === RSVPStatus.pending && invitado.confirmado === RSVPStatus.pending) ||
      (filter === RSVPStatus.notAttending && invitado.confirmado === RSVPStatus.notAttending);

    const matchesParte = filterParte === 'Todos' || invitado.parte === filterParte;

    return matchesStatus && matchesParte;
  });

  const totalInvitaciones = invitados.filter((i) => filterParte === 'Todos' || i.parte === filterParte).length;
  const totalPersonas = invitados
    .filter((i) => filterParte === 'Todos' || i.parte === filterParte)
    .reduce((acc, curr) => acc + curr.cantidad, 0);

  const totalConfirmadosInvitaciones = invitados.filter(
    (i) => i.confirmado === RSVPStatus.attending && (filterParte === 'Todos' || i.parte === filterParte)
  ).length;
  const totalConfirmadosPersonas = invitados
    .filter((i) => i.confirmado === RSVPStatus.attending && (filterParte === 'Todos' || i.parte === filterParte))
    .reduce((acc, curr) => acc + curr.cantidad, 0);

  const totalPendientesInvitaciones = invitados.filter(
    (i) => i.confirmado === RSVPStatus.pending && (filterParte === 'Todos' || i.parte === filterParte)
  ).length;
  const totalPendientesPersonas = invitados
    .filter((i) => i.confirmado === RSVPStatus.pending && (filterParte === 'Todos' || i.parte === filterParte))
    .reduce((acc, curr) => acc + curr.cantidad, 0);

  const totalNoConfirmadosInvitaciones = invitados.filter(
    (i) => i.confirmado === RSVPStatus.notAttending && (filterParte === 'Todos' || i.parte === filterParte)
  ).length;
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
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gold-50">
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
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-script text-purple-600 mb-2 font-bold">
          Administrador de Invitaciones
        </h1>
        <p className="text-gray-600 font-serif">XV Años - Marcelo & Marcela</p>
      </div>

      {/* Botones de filtro */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <button
          className={`px-4 py-3 rounded-lg font-medium transition-all ${
            filter === 'todos' ? 'bg-purple-600 text-white shadow-lg' : 'bg-white border-2 border-purple-300'
          }`}
          onClick={() => setFilter('todos')}
        >
          Todas ({totalInvitaciones}) <br />
          <span className="text-sm">Personas: {totalPersonas}</span>
        </button>
        <button
          className={`px-4 py-3 rounded-lg font-medium transition-all ${
            filter === RSVPStatus.attending ? 'bg-green-600 text-white shadow-lg' : 'bg-white border-2 border-green-300'
          }`}
          onClick={() => setFilter(RSVPStatus.attending)}
        >
          Confirmados ({totalConfirmadosInvitaciones}) <br />
          <span className="text-sm">Personas: {totalConfirmadosPersonas}</span>
        </button>
        <button
          className={`px-4 py-3 rounded-lg font-medium transition-all ${
            filter === RSVPStatus.pending ? 'bg-yellow-500 text-white shadow-lg' : 'bg-white border-2 border-yellow-300'
          }`}
          onClick={() => setFilter(RSVPStatus.pending)}
        >
          Pendientes ({totalPendientesInvitaciones}) <br />
          <span className="text-sm">Personas: {totalPendientesPersonas}</span>
        </button>
        <button
          className={`px-4 py-3 rounded-lg font-medium transition-all ${
            filter === RSVPStatus.notAttending ? 'bg-red-500 text-white shadow-lg' : 'bg-white border-2 border-red-300'
          }`}
          onClick={() => setFilter(RSVPStatus.notAttending)}
        >
          No Asisten ({totalNoConfirmadosInvitaciones}) <br />
          <span className="text-sm">Personas: {totalNoConfirmadosPersonas}</span>
        </button>

        <div className="md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">Filtrar por:</label>
          <select
            className="border-2 border-gold-300 px-4 py-2 rounded-lg w-full md:w-auto"
            onChange={(e) => setFilterParte(e.target.value as 'Todos' | 'Marcelo' | 'Marcela' | 'Mama')}
            value={filterParte}
          >
            <option value="Todos">Todos</option>
            <option value="Marcelo">Invitados de Marcelo</option>
            <option value="Marcela">Invitados de Marcela</option>
            <option value="Mama">Invitados de Mama</option>
          </select>
        </div>

        <div className="md:col-span-1 flex items-end">
          <button
            onClick={handlePrintReport}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium shadow w-full"
          >
            📋 Imprimir Lista
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={modoEdicion}
            onChange={(e) => setModoEdicion(e.target.checked)}
            className="mr-2 w-5 h-5"
          />
          <span className="font-medium">Modo Edición</span>
        </label>

        <button
          onClick={() => setShowModalAgregar(true)}
          className="bg-gold-500 text-white px-6 py-2 rounded-lg hover:bg-gold-600 transition-colors font-medium shadow"
        >
          + Agregar Invitación
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full table-auto border-collapse text-sm">
          <thead className="bg-gradient-to-r from-purple-100 to-gold-100">
            <tr>
              <th className="border border-gray-300 px-4 py-3 text-left">#</th>
              <th className="border border-gray-300 px-4 py-3 text-center">Parte</th>
              <th className="border border-gray-300 px-4 py-3 text-left">Nombre</th>
              <th className="border border-gray-300 px-4 py-3 text-center">Cantidad</th>
              <th className="border border-gray-300 px-4 py-3 text-center">Estado</th>
              <th className="border border-gray-300 px-4 py-3 text-center">Plural</th>
              <th className="border border-gray-300 px-4 py-3 text-center">Código</th>
              <th className="border border-gray-300 px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvitados.map((invitado) => (
              <tr key={invitado.id} className="hover:bg-gold-50">
                <td className="border border-gray-300 px-4 py-2">{invitado.id}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {modoEdicion ? (
                    <select
                      value={invitado.parte}
                      onChange={(e) =>
                        handleUpdateInvitado(invitado.id, { parte: e.target.value as 'Marcelo' | 'Marcela' })
                      }
                      className="border px-2 py-1 w-full rounded"
                    >
                      <option value="Marcelo">Marcelo</option>
                      <option value="Marcela">Marcela</option>
                      <option value="Mama">Mama</option>
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
                      className="border px-2 py-1 w-full rounded"
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
                      className="border px-2 py-1 w-full rounded"
                    />
                  ) : (
                    invitado.cantidad
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {modoEdicion ? (
                    <select
                      value={invitado.confirmado}
                      onChange={(e) =>
                        handleUpdateInvitado(invitado.id, { confirmado: e.target.value as RSVPStatus })
                      }
                      className="border px-2 py-1 w-full rounded"
                    >
                      <option value={RSVPStatus.attending}>Sí</option>
                      <option value={RSVPStatus.pending}>Pendiente</option>
                      <option value={RSVPStatus.notAttending}>No</option>
                    </select>
                  ) : (
                    <span
                      className={`px-2 py-1 rounded ${
                        invitado.confirmado === RSVPStatus.attending
                          ? 'bg-green-100 text-green-800'
                          : invitado.confirmado === RSVPStatus.pending
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {invitado.confirmado}
                    </span>
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {modoEdicion ? (
                    <input
                      type="checkbox"
                      checked={invitado.plural}
                      onChange={(e) => handleUpdateInvitado(invitado.id, { plural: e.target.checked })}
                    />
                  ) : invitado.plural ? (
                    'Sí'
                  ) : (
                    'No'
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-mono">{invitado.codigo}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    className="text-red-500 hover:text-red-700 mr-4"
                    onClick={() => setShowModalEliminar({ show: true, id: invitado.id })}
                  >
                    <Trash2 size={20} />
                  </button>
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => setShowModalWhatsApp({ show: true, invitado })}
                  >
                    <Send size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Agregar */}
      {showModalAgregar && (
        <Modal onClose={() => setShowModalAgregar(false)}>
          <h2 className="text-2xl font-script text-purple-600 mb-6">Agregar Nueva Invitación</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input
                type="text"
                className="border-2 border-gold-300 px-4 py-2 rounded w-full"
                value={newInvitado.nombre}
                onChange={(e) => setNewInvitado({ ...newInvitado, nombre: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
                <input
                  type="number"
                  className="border-2 border-gold-300 px-4 py-2 rounded w-full"
                  value={newInvitado.cantidad}
                  onChange={(e) => setNewInvitado({ ...newInvitado, cantidad: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Código</label>
                <input
                  type="text"
                  className="border-2 border-gold-300 px-4 py-2 rounded w-full bg-gray-100"
                  value={newInvitado.codigo}
                  disabled
                />
              </div>
              <div className="flex items-end">
                <label className="flex items-center cursor-pointer h-[42px]">
                  <input
                    type="checkbox"
                    className="mr-2 w-5 h-5"
                    checked={newInvitado.plural}
                    onChange={(e) => setNewInvitado({ ...newInvitado, plural: e.target.checked })}
                  />
                  <span className="text-sm font-medium text-gray-700">¿Plural?</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Parte</label>
                <select
                  className="border-2 border-gold-300 px-4 py-2 rounded w-full"
                  value={newInvitado.parte}
                  onChange={(e) => setNewInvitado({ ...newInvitado, parte: e.target.value as 'Marcelo' | 'Marcela' })}
                >
                  <option value="Marcelo">Marcelo</option>
                  <option value="Marcela">Marcela</option>
                  <option value="Mama">Mama</option>
                </select>
              </div>

              <div className="flex items-end justify-end">
                <button
                  className="bg-gold-500 text-white px-6 py-2 rounded hover:bg-gold-600 font-medium shadow-md hover:shadow-lg transition-all w-full sm:w-auto"
                  onClick={handleAddInvitado}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal Eliminar */}
      {showModalEliminar.show && (
        <Modal onClose={() => setShowModalEliminar({ show: false, id: null })}>
          <h2 className="text-2xl font-script text-red-600 mb-4">Confirmar Eliminación</h2>
          <p className="mb-6">¿Estás seguro de que deseas eliminar esta invitación?</p>
          <div className="flex justify-end gap-4">
            <button
              className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
              onClick={() => handleDeleteInvitado(showModalEliminar.id!)}
            >
              Eliminar
            </button>
            <button
              className="bg-gray-300 px-6 py-2 rounded hover:bg-gray-400"
              onClick={() => setShowModalEliminar({ show: false, id: null })}
            >
              Cancelar
            </button>
          </div>
        </Modal>
      )}

      {/* Modal Compartir Link */}
      {showModalWhatsApp.show && (
        <Modal onClose={() => setShowModalWhatsApp({ show: false, invitado: null })}>
          <h2 className="text-2xl font-script text-purple-600 mb-4">Copiar Enlace</h2>
          <p className="mb-4">
            Invitación para: <strong>{showModalWhatsApp.invitado?.nombre}</strong>
          </p>
          <input
            type="text"
            className="border-2 border-gold-300 px-4 py-2 rounded bg-gray-100 w-full mb-4"
            value={handleShareLink(showModalWhatsApp.invitado!.codigo)}
            readOnly
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
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
