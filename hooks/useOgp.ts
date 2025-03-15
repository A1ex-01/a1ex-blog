import { useRequest } from "ahooks";

export function useOgp(url: string) {
  async function getOgp() {
    const res = await fetch(`/api/getOgp?url=${url}`);
    return res.json();
  }
  const { data, error, loading } = useRequest(getOgp, {
    loadingDelay: 0
  });
  return { data, error, loading };
}
