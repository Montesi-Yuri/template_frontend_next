'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axios';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { PenSquare, Trash2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useError } from '@/providers/ErrorProvider';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ConfirmDeleteModal } from '@/components/ui/confirm-delete-modal';

export default function CustomerDetailsPage({ params }) {
  const id = use(params).id;
  const router = useRouter();
  const { handleError } = useError();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`/api/customers/${id}`);
        setCustomer(response.data.data);
      } catch (error) {
        handleError(error);
        if (error.response?.status === 401) {
          // Redirect to login if unauthorized
          router.push('/login');
        } else {
          router.push('/dashboard/customers');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/customers/${id}`);
      router.push('/dashboard/customers');
    } catch (error) {
      handleError(error);
    }
  };

  const getCustomerDisplayName = () => {
    if (!customer) return 'Dettaglio Cliente';
    return customer.is_individual 
      ? `${customer.first_name} ${customer.last_name}`
      : customer.company_name;
  };

  const breadcrumbItems = [
    { label: 'Clienti', href: '/dashboard/customers' },
    { label: getCustomerDisplayName() }
  ];

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white/80 dark:bg-prussian/80 backdrop-blur-sm">
        <LoadingSpinner message="Caricamento dettagli cliente..." />
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white/90 dark:bg-prussian-darker/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
          <p className="text-center text-gray-600">Cliente non trovato</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />

      <div className="bg-white/90 dark:bg-prussian-darker/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.back()}
              className="text-gray-600 hover:bg-gray-600/70 hover:text-white"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Indietro
            </Button>
            <h1 className="text-2xl font-bold me-3">{getCustomerDisplayName()}</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => router.push(`/dashboard/customers/${id}/edit`)}
              className="text-green-600 hover:bg-green-600/70 hover:text-white"
            >
              <PenSquare className="h-5 w-5 mr-2" />
              Modifica
            </Button>
            <Button
              variant="outline"
              onClick={() => setDeleteModalOpen(true)}
              className="text-red-600 hover:bg-red-600/70 hover:text-white"
            >
              <Trash2 className="h-5 w-5 mr-2" />
              Elimina
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tipo Cliente */}
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">Tipo Cliente</h2>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Tipo:</span>{' '}
                  {customer.is_individual ? 'Persona Fisica' : 'Persona Giuridica'}
                </p>
                <p>
                  <span className="font-medium">Categoria:</span>{' '}
                  {customer.is_private ? 'Ente Privato' : 'Ente Pubblico'}
                </p>
              </div>
            </div>
          </div>

          {/* Dati Personali o Aziendali */}
          <div className="space-y-4">
            {customer.is_individual ? (
              <div>
                <h2 className="text-lg font-semibold mb-2">Dati Personali</h2>
                <div className="space-y-2">
                  <p><span className="font-medium">Nome:</span> {customer.first_name}</p>
                  <p><span className="font-medium">Cognome:</span> {customer.last_name}</p>
                  <p><span className="font-medium">Codice Fiscale:</span> {customer.fiscal_code}</p>
                  {customer.birth_date && (
                    <p><span className="font-medium">Data di Nascita:</span> {new Date(customer.birth_date).toLocaleDateString()}</p>
                  )}
                  {customer.gender && (
                    <p>
                      <span className="font-medium">Genere:</span>{' '}
                      {customer.gender === 'M' ? 'Maschio' : customer.gender === 'F' ? 'Femmina' : 'Altro'}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-lg font-semibold mb-2">Dati Aziendali</h2>
                <div className="space-y-2">
                  <p><span className="font-medium">Ragione Sociale:</span> {customer.company_name}</p>
                  <p><span className="font-medium">Partita IVA:</span> {customer.vat_number}</p>
                  {customer.sdi_code && (
                    <p><span className="font-medium">Codice SDI:</span> {customer.sdi_code}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Contatti */}
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">Contatti</h2>
              <div className="space-y-2">
                <p><span className="font-medium">Email:</span> {customer.email}</p>
                {customer.phone && (
                  <p><span className="font-medium">Telefono:</span> {customer.phone}</p>
                )}
                {customer.website && (
                  <p>
                    <span className="font-medium">Sito Web:</span>{' '}
                    <a href={customer.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {customer.website}
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Indirizzo */}
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">Indirizzo</h2>
              <div className="space-y-2">
                {customer.address && (
                  <p><span className="font-medium">Via:</span> {customer.address}</p>
                )}
                {customer.city && (
                  <p><span className="font-medium">Città:</span> {customer.city}</p>
                )}
                {customer.postal_code && (
                  <p><span className="font-medium">CAP:</span> {customer.postal_code}</p>
                )}
                {customer.country && (
                  <p><span className="font-medium">Paese:</span> {customer.country}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {customer.notes && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Note</h2>
            <p className="whitespace-pre-wrap">{customer.notes}</p>
          </div>
        )}
      </div>

      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Elimina Cliente"
        message={`Sei sicuro di voler eliminare il cliente ${getCustomerDisplayName()}? Questa azione non può essere annullata.`}
      />
    </div>
  );
} 