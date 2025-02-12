'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import React from 'react';
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
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useError } from '@/providers/ErrorProvider';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CheckCircle2 } from "lucide-react";
import axios from '@/lib/axios';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { routes } from '@/config/routes';
import { Home, Shield } from 'lucide-react';


const formSchema = z.object({
  name: z.string().min(1, 'Il nome è obbligatorio'),
  display_name: z.string().min(1, 'Il nome visualizzato è obbligatorio'),
  description: z.string().optional(),
  is_default: z.boolean().default(false),
  permissions: z.array(z.string()).min(1, 'Seleziona almeno un permesso'),
});

export default function EditRolePage() {
  const params = useParams();
  const router = useRouter();
  const { handleError } = useError();
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const [permissions, setPermissions] = useState({});
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      display_name: '',
      description: '',
      is_default: false,
      permissions: [],
    },
  });

  const fetchRole = async () => {
    try {
      const response = await axios.get(`/api/roles/${params.id}`);
      setRole(response.data);
      form.reset({
        name: response.data.name,
        display_name: response.data.display_name,
        description: response.data.description || '',
        is_default: response.data.is_default,
        permissions: response.data.permissions || [],
      });
    } catch (error) {
      handleError(error);
      router.push(routes.roles.index);
    }
  };

  const fetchPermissions = async () => {
    try {
      const response = await axios.get('/api/permissions');
      setPermissions(response.data);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    Promise.all([fetchRole(), fetchPermissions()]).finally(() => {
      setLoading(false);
    });
  }, []);

  const onSubmit = async (data) => {
    try {
      await axios.put(`/api/roles/${params.id}`, data);
      setShowSuccessDialog(true);
      
      setTimeout(() => {
        router.push(routes.roles.index);
      }, 2000);
    } catch (error) {
      handleError(error);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Caricamento ruolo..." fullScreen={true} />;
  }

  const breadcrumbItems = [
    { href: routes.dashboard, label: 'Dashboard', icon: Home },
    { href: routes.roles.index, label: 'Gestione Ruoli', icon: Shield },
    { label: 'Modifica Ruolo', current: true }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />

      <div className="bg-white/90 dark:bg-prussian-darker/90 backdrop-blur-sm rounded-xl shadow-lg p-4 mt-6">
        <h1 className="text-2xl font-bold text-ash-darker dark:text-ash">
          Modifica Ruolo: {role?.display_name}
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
                  Salva
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>

      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className="bg-white dark:bg-prussian-darker max-w-[400px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center flex flex-col items-center gap-2">
              <CheckCircle2 className="h-12 w-12 text-emerald-500" />
              Operazione completata
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-base">
              Ruolo aggiornato con successo
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 