"use client"
import { useThemeStore } from '@/store/theme';
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
})

export default function Layout({ children }: React.PropsWithChildren) {
    const { theme } = useThemeStore();

    useEffect(() => {
      document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);
    console.log("process.env.gitToken", process.env.gitToken);

    return (
      <main className="bg-[#B34B4BFF] min-h-screen">
        <QueryClientProvider client={queryClient}>
          <AntdRegistry>{children}</AntdRegistry>
        </QueryClientProvider>
        <ToastContainer />
      </main>
    )
}
