import JobItem from "./JobItem";
import { type Job, type Candidate } from "../services/api";

interface JobListProps {
  jobs: Job[];
  candidate: Candidate;
}

function JobList({ jobs, candidate }: JobListProps) {
  return (
    <ul style={{ padding: 0 }}>
      {jobs.map((job) => (
        <JobItem key={job.id} job={job} candidate={candidate} />
      ))}
    </ul>
  );
}

export default JobList;
