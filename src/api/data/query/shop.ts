import axios from "axios";
import { host, port } from "../../../constants/host";
import { ShopResponse } from "../../response/ShopResponse";

async function getShopByAccountId(id: string): Promise<ShopResponse | null> {
  const accessToken = window.sessionStorage.getItem("accessToken");
  if (accessToken == null) {
    return null;
  }
  const session = JSON.parse(accessToken);

  try {
    const res = await axios({
      url: `/v1/shop/${id}`,
      baseURL: `http://${host}:${port}/api`,
      method: "get",
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });

    if (res.status === 200) {
      const shop: ShopResponse = res.data;
      return shop;
    }
    return null;
  } catch (error) {
    return null;
  }
}
export { getShopByAccountId };
