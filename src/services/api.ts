const BASE_URL =
  "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";

export interface Candidate {
  uuid: string;
  candidateId: string;
  applicationId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Job {
  id: string;
  title: string;
}

export interface ApplyPayload {
  uuid: string;
  applicationId: string;
  jobId: string;
  candidateId: string;
  repoUrl: string;
}

export async function getCandidateByEmail(email: string): Promise<Candidate> {
  const res = await fetch(
    `${BASE_URL}/api/candidate/get-by-email?email=${email}`,
  );

  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody?.message || "Failed to fetch candidate");
  }

  return res.json();
}

export async function getJobs(): Promise<Job[]> {
  const res = await fetch(`${BASE_URL}/api/jobs/get-list`);

  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody?.message || "Failed to fetch jobs");
  }

  return res.json();
}

export async function applyToJob(payload: ApplyPayload) {
  const res = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody?.message || "Failed to apply");
  }

  return res.json();
}
