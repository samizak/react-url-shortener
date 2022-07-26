import "./RecentHistory.css";
import RecentHistoryType from "../../Types/RecentHistoryType";
import { Fragment } from "react";

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
              title="Shortened URL for http://twitter.com/"
            >
              {short_url}
            </a>
          </span>

          <button className="btn btn-outline-primary">Copy</button>
        </span>
      </li>
    );
  };
  return (
    <>
      {props.recentHistory.length > 0 && (
        <ul className="recent_history">
          {GetRecentLink(
            "https://www.google.co.uk/search?q=cool+cats&amp;source=lnms&amp;tbm=isch&amp;sa=X&amp;ved=2ahUKEwihi7eYj5f5AhWJRsAKHUnLBaQQ_AUoAXoECAIQAw&amp;biw=2560&amp;bih=1293&amp;dpr=1#imgrc=6MOXW3PKfvpzqM",
            "https://bit.ly/3OvxYZu"
          )}

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
