import { useEffect, useState } from "react";
import ErrorMessage from "../Components/ErrorMessage/ErrorMessage";
import RecentHistory from "../Components/RecentHistory.tsx/RecentHistory";
import RecentHistoryType from "../Types/RecentHistoryType";

export default function Main() {
  const [url, setUrl] = useState("");
  const [recentHistory, setRecentHistory] = useState<RecentHistoryType[]>([]);
  const [isError, setIsError] = useState(false);

  // Hide error message when error is shown but user is typing again
  useEffect(() => setIsError(false), [url]);

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
        const _recentHistory: RecentHistoryType = {
          date: new Date(response.date).toISOString().split("T")[0],
          longURL: url,
          shortURL: response.shortUrl,
          clicks: response.views,
        };

        // Check if url already exists in array
        const alreadyExits = recentHistory.find(
          (c) => c.shortURL === _recentHistory.shortURL
        );

        let newArr: RecentHistoryType[] = [];
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
    <div className="container">
      <h1>Short URL Generator</h1>
      <div>A cool little URL shortener!</div>
      <br></br>
      <br></br>

      <form onSubmit={handleSubmit}>
        <div className="form-inline">
          <input
            className={"col-12 form-control" + (isError ? " is-invalid" : "")}
            id="url-input"
            type="text"
            name="url"
            placeholder="http(s)://my.url/to/be/shortened"
            onChange={(e) => setUrl(e.target.value.trim())}
          />
          <button className="col-12 btn btn-primary" type="submit">
            Shorten URL
          </button>
        </div>
      </form>

      <ErrorMessage isError={isError} />

      <RecentHistory recentHistory={recentHistory} />
    </div>
  );
}
