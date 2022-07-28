import { useState } from "react";

export default function CopyButton() {
  const [isCopied, setIsCopied] = useState(false);
  const [copyText, setCopyText] = useState("Copy");

  return (
    <>
      <button
        className={"btn btn-outline-" + (isCopied ? "success" : "primary")}
        onClick={(e) => {
          // Get the short URL
          const short_url = (
            e.currentTarget as HTMLElement
          ).parentElement?.children[0]?.children[0].getAttribute("href");

          // Copy to clipboard
          navigator.clipboard.writeText(short_url as string);

          setIsCopied(true);
          setCopyText("Copied!");

          setTimeout(() => {
            setIsCopied(false);
            setCopyText("Copy!");
          }, 3000);
        }}
      >
        {copyText}
      </button>
    </>
  );
}
