import { useEffect, useState } from "react";
import { type Candidate, type Job, getCandidateByEmail } from "./services/api";
import { getJobs } from "./services/api";
import JobList from "./components/JobList";

function App() {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobsError, setJobsError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getCandidateByEmail("mmollerach98@gmail.com");
        setCandidate(data);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
        return;
      }

      try {
        const jobsData = await getJobs();
        setJobs(jobsData);
      } catch (err) {
        setJobsError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return <p style={{ padding: 24 }}>Loading candidate data…</p>;
  }

  if (error) {
    return <p style={{ padding: 24, color: "red" }}>{error}</p>;
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Nimble Gravity Job Application</h1>

      {candidate && (
        <p>
          Candidate: {candidate.firstName} {candidate.lastName}
        </p>
      )}

      <h2>Open Positions</h2>

      {jobsError && <p style={{ color: "red" }}>{jobsError}</p>}

      {jobs.length > 0 && candidate ? (
        <JobList jobs={jobs} candidate={candidate} />
      ) : (
        <p>No positions available</p>
      )}
    </div>
  );
}

export default App;
