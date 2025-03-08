import axios from "axios";
const key = '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'

export const fetchUsers = async ({ pageParam, limit, search, signal }: { pageParam: number; limit: number; search: string; signal?: AbortSignal}) => {
  console.log('fetchUsers', search)
  const res = await axios.get(
    `https://api.github.com/search/users?page=${pageParam}&per_page=${limit}&q=${search}`, {
      // signal,
      headers: {
        Accept: 'application/vnd.github+json',
        "X-GitHub-Api-Version": "2022-11-28",
        Authorization: `Bearer ${key}`,
      }
    }
  );
  return { data: res.data?.items, nextPage: pageParam + 1 };
};

export const fetchRepos = async ({ search, signal }: { search: string; signal?: AbortSignal}) => {
  console.log('fetchRepos', search)
  const res = await axios.get(
    `https://api.github.com/users/${search}/repos`, {
      // signal,
      headers: {
        Accept: 'application/vnd.github+json',
        "X-GitHub-Api-Version": "2022-11-28",
        Authorization: `Bearer ${key}`,
      }
    }
  );
  return res.data;
};
