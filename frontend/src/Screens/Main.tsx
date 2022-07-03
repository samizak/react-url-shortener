import { useState } from "react";
import RecentHistoryTable from "../Components/RecentHistoryTable";
import RecentHistory from "../Types/RecentHistory";

export default function Main() {
  const [url, setUrl] = useState("");
  const [recentHistory, setRecentHistory] = useState<RecentHistory[]>([]);

  const [isError, setIsError] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    fetch("/api/url/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ longUrl: url }),
    })
      .then((response) => {
        if (response.status !== 200) {
          setIsError(true);
          throw new Error(response.statusText);
        }

        return response;
      })
      .then((response) => response.json())
      .then((response) => {
        setIsError(false);
        const _recentHistory: RecentHistory = {
          date: new Date(response.date).toISOString().split("T")[0],
          longURL: url,
          shortURL: response.shortUrl,
          clicks: response.views,
        };

        // Check if url already exists in array
        const alreadyExits = recentHistory.find(
          (c) => c.shortURL === _recentHistory.shortURL
        );

        let newArr: RecentHistory[] = [];
        if (!alreadyExits) {
          newArr = [...recentHistory, _recentHistory];
        } else {
          newArr = [...recentHistory];
          for (let i = 0; i < recentHistory.length; i++)
            if (recentHistory[i].shortURL === _recentHistory.shortURL)
              newArr[i] = _recentHistory;
        }

        setRecentHistory(newArr);
        e.target.reset();
      })
      .catch((e) => {});
  };

  return (
    <div className="mt-5">
      <h1>Short URL Generator</h1>
      <div>A cool little URL shortener!</div>

      <form className="row justify-content-center mt-5" onSubmit={handleSubmit}>
        <div className="col-md-3 col-auto">
          <input
            id="url-input"
            type="text"
            className={"form-control " + (isError ? "is-invalid" : "")}
            required
            placeholder="Place URL here"
            onChange={(e) => setUrl(e.target.value.trim())}
          />
          <div className="invalid-feedback">Invalid URL</div>
        </div>

        <div className="col-auto">
          <button
            id="shrink-btn"
            type="submit"
            className="btn btn-outline-primary"
          >
            Shrink
          </button>
        </div>
      </form>

      <h3 className="mt-5">Recent History</h3>
      <RecentHistoryTable recentHistory={recentHistory} />
    </div>
  );
}
