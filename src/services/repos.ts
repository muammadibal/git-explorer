import axios from "axios";

export const fetchUsers = async ({ pageParam, limit, search, signal }: { pageParam: number; limit: number; search: string; signal?: AbortSignal}) => {
  console.log('fetchUsers', search)
  const res = await axios.get(
    `https://api.github.com/search/users?page=${pageParam}&per_page=${limit}&q=${search}`, {
      signal,
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    }
  );
  return { data: res.data?.items, nextPage: pageParam + 1 };
};

export const fetchRepos = async ({ search, signal }: { search: string; signal?: AbortSignal}) => {
  console.log('fetchRepos', search)
  const res = await axios.get(
    `https://api.github.com/users/${search}/repos`, {
      signal,
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    }
  );
  return res.data;
};
