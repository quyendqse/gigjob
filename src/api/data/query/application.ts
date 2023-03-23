import { ApplicationApplyRequest } from "../../request/ApplicationApplyRequest";
import { ApplicationResponse } from "../../response/ApplicationResponse";
import { host, port } from "../../../constants/host";

const connection = `http://${host}:${port}/api/v1/application`;

async function getApplicationsOfShop(
  id: string,
  accessToken: string
): Promise<ApplicationResponse[]> {
  const headers = {
    Authorization: "Bearer " + accessToken,
    Connection: "keep-alive",
    Accept: "*/*",
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

async function acceptApplication(
  worker: any,
  accessToken: string
): Promise<ApplicationResponse | null> {
  var request: ApplicationApplyRequest = {
    workerId: worker.workerId,
    jobId: worker.job.id,
    status: worker.status,
  };
  var res = await fetch(connection + "/accept", {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-type": "application/json; charset=UTF-8",
      Connection: "keep-alive",
      Accept: "*/*",
    },
    body: JSON.stringify(request),
  });
  if (res.ok) {
    return (await res.json()) as ApplicationResponse;
  }
  return null;
}

async function rejectApplication(
  worker: any,
  accessToken: string
): Promise<ApplicationResponse | null> {
  var request: ApplicationApplyRequest = {
    workerId: worker.workerId,
    jobId: worker.job.id,
    status: worker.status,
  };
  var res = await fetch(connection + "/reject", {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-type": "application/json; charset=UTF-8",
      Connection: "keep-alive",
      Accept: "*/*",
    },
    body: JSON.stringify(request),
  });
  if (res.ok) {
    return (await res.json()) as ApplicationResponse;
  }
  return null;
}

export { getApplicationsOfShop, acceptApplication, rejectApplication };
