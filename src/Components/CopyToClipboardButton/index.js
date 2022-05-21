import { useState, useEffect } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Button, Tooltip } from "@mui/material";

function CopyToClipboardButton({ linkURL }) {
  const [copiedText, setCopiedText] = useState("");
  // copiedText needs to be reset after user copies to Clipboard, in case they wish to copy the link again from same cast
  // added artificial delay so it does not reset right away and user can be told "Link Copied!"
  useEffect(() => {
    setTimeout(() => {
      setCopiedText("");
    }, 2000);
  }, [copiedText]);

  return (
    <CopyToClipboard text={linkURL} onCopy={() => setCopiedText(linkURL)}>
      <Tooltip
        title={copiedText === linkURL ? "Link Copied!" : linkURL}
        placement="bottom"
      >
        <Button variant="contained" size="small">
          Copy Link
        </Button>
      </Tooltip>
    </CopyToClipboard>
  );
}

export default CopyToClipboardButton;
