'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { useError } from '@/providers/ErrorProvider';
import { useNotifications } from '@/hooks/useNotifications';
import axios from '@/lib/axios';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { routes } from '@/config/routes';
import { Shield } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(1, 'Il nome è obbligatorio'),
  display_name: z.string().min(1, 'Il nome visualizzato è obbligatorio'),
  description: z.string().optional(),
  is_default: z.boolean().default(false),
  permissions: z.array(z.string()).min(1, 'Seleziona almeno un permesso'),
  tenant_id: z.string().nullable()
});

export default function NewRolePage() {
  const router = useRouter();
  const { handleError } = useError();
  const { handleSuccess } = useNotifications();
  const [loading, setLoading] = useState(true);
  const [permissions, setPermissions] = useState({});
  const [tenants, setTenants] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      display_name: '',
      description: '',
      is_default: false,
      permissions: [],
      tenant_id: null
    },
  });

  const fetchData = async () => {
    try {
      const [permissionsResponse, tenantsResponse] = await Promise.all([
        axios.get('/api/permissions'),
        axios.get('/api/roles/available-tenants')
      ]);
      setPermissions(permissionsResponse.data);
      setTenants(tenantsResponse.data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    try {
      await axios.post('/api/roles', data);
      handleSuccess('Ruolo creato con successo');
      router.push(routes.roles.index);
    } catch (error) {
      handleError(error);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Caricamento permessi..." fullScreen={true} />;
  }

  const breadcrumbItems = [
    { href: routes.roles.index, label: 'Gestione Ruoli', icon: Shield },
    { label: 'Nuovo Ruolo', current: true }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />

      <div className="bg-white/90 dark:bg-prussian-darker/90 backdrop-blur-sm rounded-xl shadow-lg p-4 mt-6">
        <h1 className="text-2xl font-bold text-ash-darker dark:text-ash">
          Nuovo Ruolo
        </h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
          <div className="bg-white/90 dark:bg-prussian-darker/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">Nome Tecnico</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Nome univoco utilizzato internamente (es. manager)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="display_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">Nome Visualizzato</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Nome mostrato nell'interfaccia (es. Manager)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">Descrizione</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Breve descrizione del ruolo
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tenant_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">Tenant</FormLabel>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={field.value || ''}
                      onChange={(e) => field.onChange(e.target.value || null)}
                    >
                      <option value="">Ruolo Globale</option>
                      {tenants.map((tenant) => (
                        <option key={tenant.id} value={tenant.id}>
                          {tenant.company_name}
                        </option>
                      ))}
                    </select>
                    <FormDescription>
                      Seleziona il tenant a cui appartiene il ruolo o lascia vuoto per un ruolo globale
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              <FormField
                control={form.control}
                name="is_default"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-base font-semibold">
                        Ruolo Predefinito
                      </FormLabel>
                      <FormDescription>
                        Assegna automaticamente questo ruolo ai nuovi utenti
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <Separator />

              <div>
                <FormLabel className="text-base font-semibold">Permessi</FormLabel>
                <FormDescription className="mt-1 mb-6">
                  Seleziona i permessi da assegnare a questo ruolo
                </FormDescription>

                <div className="space-y-6">
                  {Object.entries(permissions).map(([group, perms]) => (
                    <div key={group}>
                      <h4 className="font-medium capitalize mb-3 text-lg">{group}</h4>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {perms.map((permission) => (
                          <FormField
                            key={permission.name}
                            control={form.control}
                            name="permissions"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(permission.name)}
                                    onCheckedChange={(checked) => {
                                      const value = field.value || [];
                                      if (checked) {
                                        field.onChange([...value, permission.name]);
                                      } else {
                                        field.onChange(
                                          value.filter((val) => val !== permission.name)
                                        );
                                      }
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {permission.display_name}
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      {group !== Object.keys(permissions).slice(-1)[0] && <Separator />}
                    </div>
                  ))}
                </div>
                <FormMessage>{form.formState.errors.permissions?.message}</FormMessage>
              </div>

              <Separator />

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push(routes.roles.index)}
                >
                  Annulla
                </Button>
                <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                  Crea
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
} 