import { fetchRepos, fetchUsers } from "@/services/repos"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"

export const usersRequest = (limit: number, search: string) => useInfiniteQuery({
    queryKey: ['users'],
    queryFn: ({pageParam, signal}) => fetchUsers({pageParam, limit, search, signal}),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => lastPage?.nextPage,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 10000,
    enabled: false,
})

export const reposRequest = (search: string) => useQuery({
    queryKey: [`repos-${search}`, search],
    queryFn: ({signal}) => fetchRepos({search, signal}),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 10000,
    enabled: !!search,
})