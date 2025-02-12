import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { ScrollArea } from '@/components/ui/scroll-area';

const formSchema = z.object({
  roles: z.array(z.number()).min(1, 'Seleziona almeno un ruolo'),
});

export default function UserRolesDialog({ open, onOpenChange, user, roles, onSave }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roles: [],
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        roles: user.roles || [],
      });
    } else {
      form.reset({
        roles: [],
      });
    }
  }, [user, form]);

  const onSubmit = (data) => {
    onSave(user.id, data.roles);
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            Gestione Ruoli - {user.name}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="roles"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ruoli</FormLabel>
                  <FormDescription>
                    Seleziona i ruoli da assegnare all'utente
                  </FormDescription>
                  <ScrollArea className="h-[300px] rounded-md border p-4">
                    <div className="space-y-4">
                      {roles.map((role) => (
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
                  </ScrollArea>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Annulla
              </Button>
              <Button type="submit">Salva</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 