import { ApplicationApplyRequest } from "../../request/applicationAppy";
import { ApplicationResponse } from "../../response/ApplicationResponse";
import { host, port } from "../../../constants/host";

const connection = `http://${host}:${port}/api/v1/application`;

async function getApplicationsOfShop(
  id: string
): Promise<ApplicationResponse[]> {
  const headers = {
    Authorization:
      "Bearer " + sessionStorage.getItem("accessToken")?.replaceAll('"', ""),
    Connection: "keep-alive",
    Accept: "*/*",
    referer: `http://${host}:${port}`,
  };
  var res = await fetch(connection + "/shop/" + id, {
    headers: headers,
  });
  if (res.status === 200) {
    var data: ApplicationResponse[] = await res.json();
    return data;
  } else {
    return [];
  }
}

async function acceptApplication(worker: any) {
  var request: ApplicationApplyRequest = {
    workerId: worker.id,
    jobId: worker.job.id,
    status: worker.status,
  };
  await fetch(connection + "/accept", {
    method: "PATCH",
    headers: {
      Authorization:
        "Bearer " + sessionStorage.getItem("accessToken")?.replaceAll('"', ""),
      "Content-type": "application/json; charset=UTF-8",
      Connection: "keep-alive",
      Accept: "*/*",
    },
    body: JSON.stringify(request),
  });
}

async function rejectApplication(worker: any) {
  var request: ApplicationApplyRequest = {
    workerId: worker.id,
    jobId: worker.job.id,
    status: worker.status,
  };
  await fetch(connection + "/reject", {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      "Content-type": "application/json; charset=UTF-8",
      Connection: "keep-alive",
      Accept: "*/*",
    },
    body: JSON.stringify(request),
  });
}

export { getApplicationsOfShop, acceptApplication, rejectApplication };
