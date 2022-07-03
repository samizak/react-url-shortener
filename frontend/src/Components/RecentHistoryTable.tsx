import { Table } from "react-bootstrap";
import RecentHistory from "../Types/RecentHistory";

export default function RecentHistoryTable(props: {
  recentHistory: RecentHistory[];
}) {
  console.log();
  return (
    <>
      <Table
        className="w-25 mx-auto mt-2 text-truncate"
        hover
        responsive
        striped
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Full URL</th>
            <th>Short URL</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {props.recentHistory.map((item, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{item.date}</td>
                <td>{item.longURL}</td>
                <td>
                  <a
                    href={item.shortURL}
                    target="_blank"
                    rel="noreferrer"
                    title="Shortened URL"
                  >
                    {item.shortURL}
                  </a>
                </td>
                <td>{item.clicks}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
