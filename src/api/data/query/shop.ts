import { ShopResponse } from "../../response/ShopResponse";

const host = "http://54.179.205.85:8080/api/v1/shop/";

async function getShopByAccountId(id: string) {
  var res = await fetch(host + id, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      Connection: "keep-alive",
      Accept: "*/*",
    },
  });
  var data: ShopResponse = await res.json();

  return data;
}
export { getShopByAccountId };
