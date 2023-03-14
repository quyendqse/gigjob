import { host, port } from "../../../constants/host";
import { ShopResponse } from "../../response/ShopResponse";

const conn = `http://${host}:${port}/api/v1/shop/`;

async function getShopByAccountId(id: string): Promise<ShopResponse | null> {
  const accessToken = window.sessionStorage
    .getItem("accessToken")
    ?.replaceAll('"', "");
  if (accessToken == null) {
    return null;
  }
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-type": "application/json; charset=UTF-8",
    Connection: "keep-alive",
    Accept: "*/*",
  };
  var res = await fetch(conn + id, { headers: headers });
  if (res.status === 200) {
    return (await res.json()) as ShopResponse;
  }
  return null;
}
export { getShopByAccountId };
