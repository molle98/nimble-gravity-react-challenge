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
