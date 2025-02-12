'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axios';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Save, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { ErrorDisplay } from '@/components/ui/error-display';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useError } from '@/providers/ErrorProvider';
import { Button } from '@/components/ui/button';
import { ConfirmDeleteModal } from '@/components/ui/confirm-delete-modal';

export default function EditCustomerPage({ params }) {
  const id = use(params).id;
  const router = useRouter();
  const { handleError } = useError();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    birth_date: '',
    gender: '',
    is_individual: false,
    is_company: false,
    company_name: '',
    vat_number: '',
    fiscal_code: '',
    sdi_code: '',
    is_private: true,
    is_public: false,
    email: '',
    address: '',
    city: '',
    postal_code: '',
    country: '',
    phone: '',
    website: '',
    notes: ''
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`/api/customers/${id}`);
        setFormData(response.data.data);
      } catch (error) {
        handleError(error);
        router.push('/dashboard/customers');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      console.log('Sending data:', formData);
      await axios.put(`/api/customers/${id}`, formData);
      router.push(`/dashboard/customers/${id}`);
    } catch (error) {
      setError(error.response?.data || { message: 'Errore durante il salvataggio del cliente' });
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/customers/${id}`);
      router.push('/dashboard/customers');
    } catch (error) {
      handleError(error);
    }
  };

  const breadcrumbItems = [
    { label: 'Clienti', href: '/dashboard/customers' },
    { label: formData.is_individual ? `${formData.first_name} ${formData.last_name}` : formData.company_name, href: `/dashboard/customers/${id}` },
    { label: 'Modifica' }
  ];

  if (loading || saving) {
    return (
      <div className="fixed inset-0 bg-white/80 dark:bg-prussian/80 backdrop-blur-sm">
        <LoadingSpinner message={saving ? "Salvataggio in corso..." : "Caricamento dati..."} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ErrorDisplay error={error} onClose={() => setError(null)} />
      
      <Breadcrumb items={breadcrumbItems} />

      <div className="bg-white/90 dark:bg-prussian-darker/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Modifica Cliente</h1>
          <Button
            variant="outline"
            onClick={() => setDeleteModalOpen(true)}
            className="text-red-600 hover:text-red-700"
          >
            <X className="h-5 w-5 mr-2" />
            Elimina Cliente
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tipo Cliente */}
          <div className="bg-gray-50 dark:bg-prussian-dark p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Tipo Cliente</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_individual"
                  checked={formData.is_individual}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      is_individual: e.target.checked,
                      is_company: e.target.checked ? false : formData.is_company
                    });
                  }}
                  className="rounded border-gray-300"
                />
                <label htmlFor="is_individual">Persona Fisica</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_company"
                  checked={formData.is_company}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      is_company: e.target.checked,
                      is_individual: e.target.checked ? false : formData.is_individual
                    });
                  }}
                  className="rounded border-gray-300"
                />
                <label htmlFor="is_company">Persona Giuridica</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_private"
                  checked={formData.is_private}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      is_private: e.target.checked,
                      is_public: e.target.checked ? false : formData.is_public
                    });
                  }}
                  className="rounded border-gray-300"
                />
                <label htmlFor="is_private">Ente Privato</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_public"
                  checked={formData.is_public}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      is_public: e.target.checked,
                      is_private: e.target.checked ? false : formData.is_private
                    });
                  }}
                  className="rounded border-gray-300"
                />
                <label htmlFor="is_public">Ente Pubblico</label>
              </div>
            </div>
          </div>

          {/* Dati Personali - mostrati solo se è persona fisica */}
          {formData.is_individual && (
            <div className="bg-gray-50 dark:bg-prussian-dark p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Dati Personali</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nome *</label>
                  <Input
                    type="text"
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    required={formData.is_individual}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Cognome *</label>
                  <Input
                    type="text"
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    required={formData.is_individual}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Data di Nascita</label>
                  <Input
                    type="date"
                    value={formData.birth_date}
                    onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Genere</label>
                  <Select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  >
                    <option value="">Seleziona genere</option>
                    <option value="M">Maschio</option>
                    <option value="F">Femmina</option>
                    <option value="O">Altro</option>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Codice Fiscale *</label>
                  <Input
                    type="text"
                    value={formData.fiscal_code}
                    onChange={(e) => setFormData({ ...formData, fiscal_code: e.target.value })}
                    required={formData.is_individual}
                    maxLength={16}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Dati Aziendali - mostrati solo se è persona giuridica */}
          {formData.is_company && (
            <div className="bg-gray-50 dark:bg-prussian-dark p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Dati Aziendali</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Ragione Sociale *</label>
                  <Input
                    type="text"
                    value={formData.company_name}
                    onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                    required={formData.is_company}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Partita IVA *</label>
                  <Input
                    type="text"
                    value={formData.vat_number}
                    onChange={(e) => setFormData({ ...formData, vat_number: e.target.value })}
                    required={formData.is_company}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Codice SDI</label>
                  <Input
                    type="text"
                    value={formData.sdi_code}
                    onChange={(e) => setFormData({ ...formData, sdi_code: e.target.value })}
                    maxLength={7}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Contatti */}
          <div className="bg-gray-50 dark:bg-prussian-dark p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Contatti</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Telefono</label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Sito Web</label>
                <Input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Indirizzo */}
          <div className="bg-gray-50 dark:bg-prussian-dark p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Indirizzo</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Indirizzo</label>
                <Input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Città</label>
                <Input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">CAP</label>
                <Input
                  type="text"
                  value={formData.postal_code}
                  onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Paese</label>
                <Select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                >
                  <option value="">Seleziona un paese</option>
                  <option value="IT">Italia</option>
                  <option value="FR">Francia</option>
                  <option value="DE">Germania</option>
                  <option value="ES">Spagna</option>
                  <option value="UK">Regno Unito</option>
                </Select>
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="bg-gray-50 dark:bg-prussian-dark p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Note</h2>
            <div>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full h-32 px-3 py-2 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-800"
            >
              <X className="h-5 w-5 mr-2" />
              Annulla
            </Button>
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Save className="h-5 w-5 mr-2" />
              Salva Modifiche
            </Button>
          </div>
        </form>
      </div>

      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Elimina Cliente"
        message={`Sei sicuro di voler eliminare il cliente ${formData.is_individual ? `${formData.first_name} ${formData.last_name}` : formData.company_name}? Questa azione non può essere annullata.`}
      />
    </div>
  );
} 