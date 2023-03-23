import { host, port } from "../../../constants/host";

const conn = `http://${host}:${port}/api/v1/account/avatar/`;
async function getAccountImage(
  id: string,
  accessToken: string
): Promise<string | null> {
  try {
    const res = await fetch(conn + id, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (res.ok) {
      return await res.text();
    } else return null;
  } catch (error) {
    return null;
  }
}

export { getAccountImage };
