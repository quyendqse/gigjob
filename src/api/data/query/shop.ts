import axios from "axios";
import { host, port } from "../../../constants/host";
import { ShopResponse } from "../../response/ShopResponse";

async function getShopByAccountId(
  id: string,
  accessToken: string
): Promise<ShopResponse | null> {
  try {
    const res = await axios({
      url: `/v1/shop/${id}`,
      baseURL: `http://${host}:${port}/api`,
      method: "get",
      headers: {
        Authorization: `Bearer ${accessToken}`,
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
