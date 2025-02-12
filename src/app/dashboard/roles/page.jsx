'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useError } from '@/providers/ErrorProvider';
import { useNotifications } from '@/hooks/useNotifications';
import axios from '@/lib/axios';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { routes } from '@/config/routes';
import { Home, Shield, Plus, MoreHorizontal, PenSquare, Trash2 } from 'lucide-react';
import { DeleteRoleDialog } from './delete-role-dialog';
import { useToast } from "@/hooks/use-toast";

export default function RolesPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState({});
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [filters, setFilters] = useState({
    name: '',
    description: '',
    tenant: ''
  });
  const { handleError } = useError();
  const { handleSuccess } = useNotifications();

  const filteredRoles = roles.filter(role => {
    const nameMatch = role.name.toLowerCase().includes(filters.name.toLowerCase());
    const descriptionMatch = role.description?.toLowerCase().includes(filters.description.toLowerCase()) ?? true;
    const tenantMatch = !filters.tenant || 
      (role.tenant?.company_name?.toLowerCase().includes(filters.tenant.toLowerCase()) ?? false);
    return nameMatch && descriptionMatch && tenantMatch;
  });

  const fetchRoles = async () => {
    try {
      const response = await axios.get('/api/roles');
      setRoles(response.data);
    } catch (error) {
      toast({
        title: "Errore",
        description: error.response?.data?.message || "Si è verificato un errore durante il caricamento dei ruoli",
        variant: "destructive",
      });
    }
  };

  const fetchPermissions = async () => {
    try {
      const response = await axios.get('/api/permissions');
      setPermissions(response.data);
    } catch (error) {
      toast({
        title: "Errore",
        description: error.response?.data?.message || "Si è verificato un errore durante il caricamento dei permessi",
        variant: "destructive",
      });
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchRoles(), fetchPermissions()]);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeleteClick = (role) => {
    setSelectedRole(role);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/roles/${selectedRole.id}`);
      await fetchRoles();
      handleSuccess('Ruolo eliminato con successo');
    } catch (error) {
      toast({
        title: "Errore",
        description: error.response?.data?.message || "Si è verificato un errore durante l'eliminazione del ruolo",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Caricamento ruoli..." fullScreen={true} />;
  }

  const breadcrumbItems = [
    { href: routes.roles.index, label: 'Gestione Ruoli', icon: Shield, current: true }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />

      <div className="bg-white/90 dark:bg-prussian-darker/90 backdrop-blur-sm rounded-xl shadow-lg p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-ash-darker dark:text-ash">Gestione Ruoli</h1>
          <Button
            onClick={() => router.push('/dashboard/roles/new')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Nuovo Ruolo
          </Button>
        </div>
      </div>

      <div className="bg-white/90 dark:bg-prussian-darker/90 backdrop-blur-sm rounded-xl shadow-lg p-4 mt-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-ash-darker dark:text-ash">
            Ricerca Ruoli
          </h2>
          {(filters.name || filters.description || filters.tenant) && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFilters({ name: '', description: '', tenant: '' })}
              className="text-gray-600 hover:text-gray-800"
            >
              Resetta Filtri
            </Button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            id="name-filter"
            placeholder="Filtra per nome..."
            value={filters.name}
            onChange={(e) => setFilters(prev => ({ ...prev, name: e.target.value }))}
            className="w-full"
          />
          <Input
            id="description-filter"
            placeholder="Filtra per descrizione..."
            value={filters.description}
            onChange={(e) => setFilters(prev => ({ ...prev, description: e.target.value }))}
            className="w-full"
          />
          <Input
            id="tenant-filter"
            placeholder="Filtra per tenant..."
            value={filters.tenant}
            onChange={(e) => setFilters(prev => ({ ...prev, tenant: e.target.value }))}
            className="w-full"
          />
        </div>
      </div>

      <div className="bg-white/90 dark:bg-prussian-darker/90 backdrop-blur-sm rounded-xl shadow-lg p-4 mt-4">
        <h2 className="text-xl font-bold text-ash-darker dark:text-ash mb-4">
          Lista Ruoli
        </h2>
        <div className="overflow-x-auto rounded-xl">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100 dark:bg-prussian-light/10">
                  <TableHead className="font-semibold">Nome</TableHead>
                  <TableHead className="font-semibold">Descrizione</TableHead>
                  <TableHead className="font-semibold">Tenant</TableHead>
                  <TableHead className="font-semibold">Permessi</TableHead>
                  <TableHead className="w-[60px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRoles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan="5" className="text-center h-24">
                      Nessun ruolo trovato
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRoles.map((role, index) => (
                    <TableRow 
                      key={role.id}
                      className={index % 2 === 0 ? 'bg-white dark:bg-prussian-darker' : 'bg-gray-50 dark:bg-prussian-light/5'}
                    >
                      <TableCell className="font-medium">{role.name}</TableCell>
                      <TableCell>{role.description}</TableCell>
                      <TableCell>{role.tenant?.company_name || 'Globale'}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {role.permissions?.map((permission) => {
                            const permissionGroup = Object.values(permissions).find(group => 
                              group.some(p => p.name === permission)
                            );
                            const permissionDetails = permissionGroup?.find(p => p.name === permission);
                            
                            return (
                              <Badge 
                                key={`${role.id}-${permission}`} 
                                variant="secondary"
                              >
                                {permissionDetails?.display_name || permission}
                              </Badge>
                            );
                          })}
                        </div>
                      </TableCell>
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
                              onClick={() => router.push(`/dashboard/roles/${role.id}`)}
                              className="cursor-pointer flex items-center py-2.5 px-3 my-1 rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400 focus:bg-emerald-50 dark:focus:bg-emerald-900/20 focus:text-emerald-600 dark:focus:text-emerald-400 focus:outline-none transition-all"
                            >
                              <PenSquare className="mr-2 h-4 w-4" />
                              <span>Modifica</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteClick(role)}
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
        </div>
      </div>

      <DeleteRoleDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        role={selectedRole}
      />
    </div>
  );
} 