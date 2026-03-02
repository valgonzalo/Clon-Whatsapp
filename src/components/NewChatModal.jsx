import { useState } from 'react';
import { X, UserPlus } from 'lucide-react';

export default function NewChatModal({ isOpen, onClose, onAdd }) {
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name);
      setName('');
      onClose();
    }
  };

  return (
    <div className="modal-overlay fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="modal-contenido bg-white rounded-lg w-full max-w-md shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="modal-header bg-[#00a884] p-4 flex justify-between items-center text-white">
          <h3 className="titulo-modal text-lg font-medium flex items-center gap-2">
            <UserPlus size={20} />
            Nuevo Contacto
          </h3>
          <button onClick={onClose} className="boton-cerrar hover:bg-white/10 p-1 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="formulario-contacto p-6">
          <div className="mb-4">
            <label className="label-nombre block text-sm font-medium text-gray-700 mb-1">
              Nombre del contacto
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-nombre w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00a884] focus:border-transparent"
              placeholder="Ej: Juan Pérez"
              autoFocus
            />
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="boton-cancelar px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="boton-guardar px-4 py-2 text-sm font-medium text-white bg-[#00a884] hover:bg-[#008f6f] rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Guardar Contacto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
