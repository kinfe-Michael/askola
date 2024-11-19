"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useRouter } from "next/navigation";
export default function Provider({children}:Readonly<{
    children: React.ReactNode;
  }>) {
    const router = useRouter()
    const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
          },
        },
      });
  return <QueryClientProvider client={queryClient}>
    {children}
          <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>;
}
