import "./RecentHistory.css";
import RecentHistoryType from "../../Types/RecentHistoryType";
import { Fragment } from "react";
import CopyButton from "./CopyButton";

export default function RecentHistory(props: {
  recentHistory: RecentHistoryType[];
}) {
  const GetRecentLink = (long_url: string, short_url: string) => {
    return (
      <li className="url-result">
        <span className="long-link">{long_url}</span>
        <span className="short-link-container">
          <span className="short-link">
            <a
              href={short_url}
              target="_blank"
              rel="noreferrer"
              title={"Shortened URL for " + long_url}
            >
              {short_url}
            </a>
          </span>

          <CopyButton />
        </span>
      </li>
    );
  };
  return (
    <>
      {props.recentHistory.length > 0 && (
        <ul className="recent_history">
          {
            <Fragment key={"first-element-url"}>
              {GetRecentLink(
                props.recentHistory[0].longURL,
                props.recentHistory[0].shortURL
              )}
            </Fragment>
          }

          {props.recentHistory.length > 1 && (
            <>
              <h5>Recent History</h5>

              {props.recentHistory
                .slice(1) // Skip first element
                .map((e: RecentHistoryType, index: number) => {
                  return (
                    <Fragment key={index}>
                      {GetRecentLink(e.longURL, e.shortURL)}
                    </Fragment>
                  );
                })}
            </>
          )}
        </ul>
      )}
    </>
  );
}
