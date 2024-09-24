import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
  

const queryClient=new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // default: true
      },
    },
});

const QueryProvider = ({ children }: { children: React.ReactNode }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

export default QueryProvider;

