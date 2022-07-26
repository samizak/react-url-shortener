import "./ErrorMessage.css";

export default function ErrorMessage(props: { isError: boolean }) {
  return (
    <>
      <div
        className={
          "card p-4 mt-2 box-shadow flex-element " +
          (props.isError ? "visible" : "hidden")
        }
        id="output-error"
      >
        <div className="card-body flex-element">
          <h3 className="text-danger">Oops!</h3>
          <p>
            The URL entered doesn't have the required format.
            <br></br>
            <br></br>
            Please, try again with the correct format:
            <br></br>
            <code>e.g.: http(s)://the.url/and/path</code>
          </p>
        </div>
      </div>
    </>
  );
}
