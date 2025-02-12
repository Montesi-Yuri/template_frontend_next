import { useToast } from "@/hooks/use-toast"

export const useNotifications = () => {
  const { toast } = useToast();

  const handleSuccess = (message) => {
    toast({
      title: 'Successo',
      description: message,
      variant: 'success',
    });
  };

  return {
    handleSuccess,
  };
}; 