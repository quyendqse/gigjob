import { ApplicationApplyRequest } from "../../request/applicationAppy";
import { ApplicationResponse } from "../../response/ApplicationResponse";

const host = "http://54.179.205.85:8080/api/v1/application";

async function getApplicationsOfShop(
  id: string
): Promise<ApplicationResponse[]> {
  var res = await fetch(host + "/shop/" + id, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      Connection: "keep-alive",
      Accept: "*/*",
    },
  });
  var data: ApplicationResponse[] = await res.json();
  return data;
}

async function acceptApplication(worker: any) {
  var request: ApplicationApplyRequest = {
    workerId: worker.id,
    jobId: worker.job.id,
    status: worker.status,
  };
  await fetch(host + "/accept", {
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

async function rejectApplication(worker: any) {
  var request: ApplicationApplyRequest = {
    workerId: worker.id,
    jobId: worker.job.id,
    status: worker.status,
  };
  await fetch(host + "/reject", {
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
