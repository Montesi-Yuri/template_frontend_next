'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { useError } from '@/providers/ErrorProvider';
import { useToast } from "@/hooks/use-toast";
import axios from '@/lib/axios';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { routes } from '@/config/routes';
import { Home, Users, CheckCircle2 } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';

const formSchema = z.object({
  roles: z.array(z.number()).min(1, 'Seleziona almeno un ruolo'),
});

export default function UserRolesPage() {
  const params = useParams();
  const router = useRouter();
  const { handleError } = useError();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [availableRoles, setAvailableRoles] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roles: [],
    },
  });

  const fetchUser = async () => {
    try {
      const response = await axios.get(`/api/users/${params.id}/roles`);
      setUser(response.data);
      setAvailableRoles(response.data.available_roles);
      form.reset({
        roles: response.data.roles.map(role => role.id),
      });
    } catch (error) {
      handleError(error);
      router.push(routes.users.index);
    }
  };

  useEffect(() => {
    fetchUser().finally(() => {
      setLoading(false);
    });
  }, []);

  const onSubmit = async (data) => {
    try {
      await axios.put(`/api/users/${params.id}/roles`, data);
      toast({
        title: "Operazione completata",
        description: "Ruoli aggiornati con successo",
        variant: "success",
        className: "bg-white dark:bg-prussian border-green-500 border",
        duration: 1500,
      });
      setTimeout(() => {
        router.push(routes.users.index);
      }, 1500);
    } catch (error) {
      handleError(error);
    }
  };

  // Raggruppa i ruoli per tenant
  const rolesByTenant = availableRoles.reduce((acc, role) => {
    const tenantId = role.tenant?.id;
    const tenantName = role.tenant?.name;

    // Se il ruolo non ha un tenant, lo mettiamo in un gruppo speciale
    const groupKey = tenantId || 'global';
    const groupName = tenantName || 'Ruoli Globali';

    if (!acc[groupKey]) {
      acc[groupKey] = {
        tenant: role.tenant,
        name: groupName,
        roles: []
      };
    }
    acc[groupKey].roles.push(role);
    return acc;
  }, {});

  if (loading) {
    return <LoadingSpinner message="Caricamento ruoli..." fullScreen={true} />;
  }

  const breadcrumbItems = [
    { href: routes.users.index, label: 'Lista Utenti', icon: Users },
    { label: 'Gestione Ruoli', current: true }
  ];


  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />

      <div className="bg-white/90 dark:bg-prussian-darker/90 backdrop-blur-sm rounded-xl shadow-lg p-4 mt-6">
        <h1 className="text-2xl font-bold text-ash-darker dark:text-ash">
          Gestione Ruoli - {user?.name}
        </h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
          <div className="bg-white/90 dark:bg-prussian-darker/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="roles"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">Ruoli</FormLabel>
                    <FormDescription className="mt-1 mb-6">
                      Seleziona i ruoli da assegnare all'utente
                    </FormDescription>
                    <div className="space-y-8">
                      {Object.values(rolesByTenant).map((group) => (
                        <div key={group.tenant?.id || 'global'} className="space-y-4">
                          <h3 className="font-medium text-lg text-gray-700 dark:text-gray-300">
                            {group.name}
                          </h3>
                          <div className="space-y-4 ml-4">
                            {group.roles.map((role) => (
                              <FormItem
                                key={role.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(role.id)}
                                    onCheckedChange={(checked) => {
                                      const value = field.value || [];
                                      if (checked) {
                                        field.onChange([...value, role.id]);
                                      } else {
                                        field.onChange(
                                          value.filter((val) => val !== role.id)
                                        );
                                      }
                                    }}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="font-normal">
                                    {role.display_name}
                                  </FormLabel>
                                  {role.description && (
                                    <FormDescription>
                                      {role.description}
                                    </FormDescription>
                                  )}
                                </div>
                              </FormItem>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push(routes.users.index)}
                >
                  Annulla
                </Button>
                <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                  Salva
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
      <Toaster 
        position="top-center"
        toastOptions={{
          className: 'bg-white dark:bg-prussian border border-gray-200 dark:border-prussian-light/20',
          duration: 1500,
        }}
      />
    </div>
  );
} 