import { useEffect, useState } from "react";
import { type Candidate, getCandidateByEmail } from "./services/api";

function App() {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCandidate() {
      try {
        const data = await getCandidateByEmail("mmollerach98@gmail.com");
        setCandidate(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    loadCandidate();
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
      <p>
        Candidate loaded: {candidate?.firstName} {candidate?.lastName}
      </p>
    </div>
  );
}

export default App;
