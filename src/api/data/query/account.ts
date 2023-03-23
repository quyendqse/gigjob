import { host, port } from "../../../constants/host";

const conn = `http://${host}:${port}/api/v1/account/avatar/`;
async function getAccountImage(id: string): Promise<string | null> {
  try {
    const res = await fetch(conn + id);
    if (res.ok) {
      return await res.text();
    } else return null;
  } catch (error) {
    return null;
  }
}

export { getAccountImage };
