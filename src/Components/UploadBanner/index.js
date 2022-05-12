import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import "./UploadBanner.scss";

function UploadBanner({ setBanner }) {
  const [files, setFiles] = useState([]);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setBanner(acceptedFiles[0]);
    },
  });

  //TODO conditional render for accepted files/path ? set bg of recorder to img

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {<p>Drag 'n' drop your banner file here</p>}
      </div>
    </section>
  );
}

export default UploadBanner;
