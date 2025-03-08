import axios from "axios";

const genUrl = (url: string) => {
  const q = `https://cors-anywhere.herokuapp.com/${encodeURIComponent(url)}`
  return q
}

export const fetchUsers = async ({ pageParam, limit, search, signal }: { pageParam: number; limit: number; search: string; signal?: AbortSignal}) => {
  console.log('fetchUsers', search)
  const res = await axios.get(
    genUrl(`https://api.github.com/search/users?page=${pageParam}&per_page=${limit}&q=${search}`), {
      // signal,
      headers: {
        // Accept: 'application/vnd.github+json',
        // "X-GitHub-Api-Version": "2022-11-28",
        // Authorization: `token ${process.env.gitToken}`,
        // withCredentials: true,
        // 'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
      }
    }
  );
  return { data: res.data?.items, nextPage: pageParam + 1 };
};

export const fetchRepos = async ({ search, signal }: { search: string; signal?: AbortSignal}) => {
  console.log('fetchRepos', search)
  const res = await axios.get(
    genUrl(`https://api.github.com/users/${search}/repos`), {
      // signal,
      headers: {
        // Accept: 'application/vnd.github+json',
        // "X-GitHub-Api-Version": "2022-11-28",
        // Authorization: `token ${process.env.gitToken}`,
        // withCredentials: true,
        // 'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
      }
    }
  );
  return res.data;
};
