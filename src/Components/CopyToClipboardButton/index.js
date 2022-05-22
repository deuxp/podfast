import { useState, useEffect } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Button, Tooltip, Box } from "@mui/material";
import CopyAllIcon from "@mui/icons-material/CopyAll";

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
        <Box
          sx={{
            color: "rgba(255,255,255, 1)",
            display: "flex",
            backgroundColor: "rgba(104,17,216, .9)",
            padding: "0.3rem",
            borderRadius: "10px",
            border: "2px solid rgb(226,165,254)",
            transition: "0.2s",
            "&:hover": { transform: "scale(1.3)" },
          }}
        >
          <CopyAllIcon />
        </Box>
      </Tooltip>
    </CopyToClipboard>
  );
}

export default CopyToClipboardButton;
