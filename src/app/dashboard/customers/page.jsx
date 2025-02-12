'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, MoreHorizontal } from 'lucide-react';
import axios from '@/lib/axios';
import { useError } from '@/providers/ErrorProvider';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, PenSquare, Trash2 } from 'lucide-react';
import { ConfirmDeleteModal } from '@/components/ui/confirm-delete-modal';
import { Pagination } from "@/components/ui/pagination";

export default function CustomersPage() {
    const [customers, setCustomers] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);
    const [searchLoading, setSearchLoading] = useState(false);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        lastPage: 1,
        perPage: 10,
        total: 0
    });
    const [filters, setFilters] = useState({
        search: '',
        city: '',
        country: ''
    });
    const router = useRouter();
    const { handleError } = useError();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState(null);

    const fetchCustomers = async (params = {}) => {
        try {
            if (!pageLoading) {
                setSearchLoading(true);
            }
            
            const queryParams = new URLSearchParams();
            
            if (params.search) queryParams.append('search', params.search);
            if (params.city) queryParams.append('city', params.city);
            if (params.country) queryParams.append('country', params.country);
            if (params.page) queryParams.append('page', params.page);

            const response = await axios.get(`/api/customers?${queryParams.toString()}`);
            const { data, current_page, last_page, per_page, total } = response.data.data;
            
            // Aggiungiamo un delay minimo di 300ms prima di mostrare i risultati
            await new Promise(resolve => setTimeout(resolve, 300));
            
            setCustomers(data);
            setPagination({
                currentPage: current_page,
                lastPage: last_page,
                perPage: per_page,
                total: total
            });
        } catch (error) {
            handleError(error);
            setCustomers([]);
        } finally {
            setPageLoading(false);
            setSearchLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleFilterChange = (field, value) => {
        const newFilters = { ...filters, [field]: value };
        setFilters(newFilters);
        fetchCustomers(newFilters);
    };

    const resetFilters = () => {
        setFilters({
            search: '',
            city: '',
            country: ''
        });
        fetchCustomers({});
    };

    const handleDeleteClick = (customer) => {
        setCustomerToDelete(customer);
        setDeleteModalOpen(true);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/customers/${customerToDelete.id}`);
            setCustomers(customers.filter(customer => customer.id !== customerToDelete.id));
            setDeleteModalOpen(false);
        } catch (error) {
            handleError(error);
        }
    };

    const handlePageChange = (page) => {
        fetchCustomers({ ...filters, page });
    };

    const breadcrumbItems = [
        { label: 'Clienti' } // Ultimo elemento senza href perché è la pagina corrente
    ];

    if (pageLoading) {
        return (
            <div className="fixed inset-0 bg-white/80 dark:bg-prussian/80 backdrop-blur-sm">
                <LoadingSpinner message="Caricamento clienti..." />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumb items={breadcrumbItems} />

            <div className="bg-white/90 dark:bg-prussian-darker/90 backdrop-blur-sm rounded-xl shadow-lg p-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-ash-darker dark:text-ash">Gestione Clienti</h1>
                    <Button
                        onClick={() => router.push('/dashboard/customers/new')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
                    >
                        <Plus className="h-5 w-5" />
                        Nuovo Cliente
                    </Button>
                </div>
            </div>

            <div className="bg-white/90 dark:bg-prussian-darker/90 backdrop-blur-sm rounded-xl shadow-lg p-4 mt-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-ash-darker dark:text-ash">
                        Ricerca Clienti
                    </h2>
                    {(filters.search || filters.city || filters.country) && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={resetFilters}
                            className="text-gray-600 hover:text-gray-800"
                        >
                            Resetta Filtri
                        </Button>
                    )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                        type="text"
                        placeholder="Cerca per nome, email..."
                        value={filters.search}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                        className="w-full"
                    />
                    <Select 
                        value={filters.city}
                        onChange={(e) => handleFilterChange('city', e.target.value)}
                        placeholder="Filtra per città"
                    >
                        <option value="">Tutte le città</option>
                        <option value="milano">Milano</option>
                        <option value="roma">Roma</option>
                        <option value="napoli">Napoli</option>
                        <option value="torino">Torino</option>
                        <option value="london">London</option>
                        <option value="berlin">Berlin</option>
                    </Select>
                    <Select
                        value={filters.country}
                        onChange={(e) => handleFilterChange('country', e.target.value)}
                        placeholder="Filtra per paese"
                    >
                        <option value="">Tutti i paesi</option>
                        <option value="IT">Italia</option>
                        <option value="UK">Regno Unito</option>
                        <option value="DE">Germania</option>
                    </Select>
                </div>
            </div>

            <div className="bg-white/90 dark:bg-prussian-darker/90 backdrop-blur-sm rounded-xl shadow-lg p-4 mt-4">
                <h2 className="text-xl font-bold text-ash-darker dark:text-ash mb-4">
                    Lista Clienti
                </h2>
                <div className="overflow-x-auto rounded-xl">
                    {searchLoading ? (
                        <div className="flex justify-center items-center py-8">
                            <LoadingSpinner size="md" message="Ricerca in corso..." />
                        </div>
                    ) : (
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-100 dark:bg-prussian-light/10">
                                        <TableHead className="font-semibold">Nome</TableHead>
                                        <TableHead className="font-semibold hidden md:table-cell">P.IVA</TableHead>
                                        <TableHead className="font-semibold hidden lg:table-cell">Indirizzo</TableHead>
                                        <TableHead className="font-semibold hidden md:table-cell">Email</TableHead>
                                        <TableHead className="font-semibold hidden lg:table-cell">Telefono</TableHead>
                                        <TableHead className="w-[60px]"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {customers.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan="6" className="text-center h-24">
                                                Nessun cliente trovato
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        customers.map((customer, index) => (
                                            <TableRow 
                                                key={customer.id}
                                                className={index % 2 === 0 ? 'bg-white dark:bg-prussian-darker' : 'bg-gray-50 dark:bg-prussian-light/5'}
                                            >
                                                <TableCell>
                                                    <div>
                                                        <div className="font-medium">{customer.company_name}</div>
                                                        <div className="text-sm text-muted-foreground md:hidden">
                                                            {customer.vat_number}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">{customer.vat_number}</TableCell>
                                                <TableCell className="hidden lg:table-cell">
                                                    {[
                                                        customer.address,
                                                        customer.city,
                                                        customer.postal_code
                                                    ].filter(Boolean).join(', ')}
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">{customer.email}</TableCell>
                                                <TableCell className="hidden lg:table-cell">{customer.phone}</TableCell>
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                                <span className="sr-only">Apri menu</span>
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent 
                                                            align="end"
                                                            className="bg-white dark:bg-prussian border border-gray-200 dark:border-prussian-light/20 w-52 p-2"
                                                        >
                                                            <DropdownMenuLabel className="font-semibold px-2 py-1.5">Azioni</DropdownMenuLabel>
                                                            <DropdownMenuItem 
                                                                onClick={() => router.push(`/dashboard/customers/${customer.id}`)}
                                                                className="cursor-pointer flex items-center py-2.5 px-3 my-1 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 focus:bg-indigo-50 dark:focus:bg-indigo-900/20 focus:text-indigo-600 dark:focus:text-indigo-400 focus:outline-none transition-all"
                                                            >
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                <span>Dettagli</span>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem 
                                                                onClick={() => router.push(`/dashboard/customers/${customer.id}/edit`)}
                                                                className="cursor-pointer flex items-center py-2.5 px-3 my-1 rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400 focus:bg-emerald-50 dark:focus:bg-emerald-900/20 focus:text-emerald-600 dark:focus:text-emerald-400 focus:outline-none transition-all"
                                                            >
                                                                <PenSquare className="mr-2 h-4 w-4" />
                                                                <span>Modifica</span>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem 
                                                                onClick={() => handleDeleteClick(customer)}
                                                                className="cursor-pointer flex items-center py-2.5 px-3 my-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 focus:bg-red-50 dark:focus:bg-red-900/20 focus:text-red-600 dark:focus:text-red-400 focus:outline-none transition-all"
                                                            >
                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                <span>Elimina</span>
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </div>
            </div>

            {customers.length > 0 && (
                <div className="mt-4 flex justify-center bg-white/90 dark:bg-prussian-darker/90 backdrop-blur-sm rounded-xl shadow-lg p-4">
                    <Pagination
                        currentPage={pagination.currentPage}
                        totalPages={pagination.lastPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}

            <ConfirmDeleteModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleDelete}
                title="Elimina Cliente"
                message={`Sei sicuro di voler eliminare il cliente ${customerToDelete?.company_name}? Questa azione non può essere annullata.`}
            />
        </div>
    );
} 