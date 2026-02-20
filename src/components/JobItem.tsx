import { useState } from "react";
import { applyToJob } from "../services/api";
import { type Job, type Candidate } from "../services/api";

interface JobItemProps {
  job: Job;
  candidate: Candidate;
}

function JobItem({ job, candidate }: JobItemProps) {
  const [repoUrl, setRepoUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit() {
    if (!repoUrl) {
      setError("Please enter a repository URL");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await applyToJob({
        uuid: candidate.uuid,
        applicationId: candidate.applicationId,
        candidateId: candidate.candidateId,
        jobId: job.id,
        repoUrl,
      });
      setSuccess(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <li
      style={{
        listStyle: "none",
        border: "1px solid #ddd",
        padding: 16,
        marginBottom: 12,
      }}
    >
      <strong style={{ display: "block", marginBottom: 8 }}>{job.title}</strong>

      <div style={{ marginTop: 8, marginBottom: 8 }}>
        <input
          type="text"
          placeholder="https://github.com/username/repo"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
          disabled={submitting || success}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={submitting || success}
        style={{ marginTop: 8 }}
      >
        {submitting ? "Submitting..." : success ? "Submitted" : "Submit"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Application sent</p>}
    </li>
  );
}

export default JobItem;
