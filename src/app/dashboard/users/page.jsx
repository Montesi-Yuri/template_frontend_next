'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useError } from '@/providers/ErrorProvider';
import axios from '@/lib/axios';
import UserRolesDialog from './user-roles-dialog';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Input } from '@/components/ui/input';
import { Select } from "@/components/ui/select";
import { 
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from '@/components/ui/table';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { routes } from '@/config/routes';
import { Home, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filters, setFilters] = useState({
    name: '',
    email: '',
    role: ''
  });
  const { handleError, handleSuccess } = useError();
  const router = useRouter();

  const filteredUsers = users.filter(user => {
    const nameMatch = user.name.toLowerCase().includes(filters.name.toLowerCase());
    const emailMatch = user.email.toLowerCase().includes(filters.email.toLowerCase());
    const roleMatch = !filters.role || user.roles?.some(role => role.id === filters.role);
    return nameMatch && emailMatch && roleMatch;
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get('/api/roles');
      setRoles(response.data);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    Promise.all([fetchUsers(), fetchRoles()]);
  }, []);

  const handleEditRoles = (user) => {
    router.push(`/dashboard/users/${user.id}/roles`);
  };

  if (loading) {
    return <LoadingSpinner message="Caricamento utenti..." fullScreen={true} />;
  }

  const breadcrumbItems = [
    { href: routes.users.index, label: 'Gestione Utenti', icon: Users, current: true }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <Breadcrumb items={breadcrumbItems} />
      
      <Card className="mt-6 bg-white">
        <CardHeader>
          <CardTitle>Gestione Utenti</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 grid gap-4 md:grid-cols-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="name-filter">Nome</label>
              <Input
                id="name-filter"
                placeholder="Filtra per nome..."
                value={filters.name}
                onChange={(e) => setFilters(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email-filter">Email</label>
              <Input
                id="email-filter"
                placeholder="Filtra per email..."
                value={filters.email}
                onChange={(e) => setFilters(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="role-filter">Ruolo</label>
              <Select
                id="role-filter"
                value={filters.role}
                onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value }))}
                placeholder="Seleziona ruolo"
              >
                <option value="">Tutti</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.display_name}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="rounded-md border ">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Ruoli</TableHead>
                  <TableHead>Azioni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {user.roles?.map((role) => (
                          <Badge key={role.id} variant="secondary">
                            {role.display_name}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditRoles(user)}
                      >
                        Gestisci Ruoli
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <UserRolesDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        user={selectedUser}
        roles={roles}
      />
    </div>
  );
} 