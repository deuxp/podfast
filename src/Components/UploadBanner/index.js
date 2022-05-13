import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
// import "./UploadBanner.scss";

function UploadBanner({ setBanner }) {
  const [files, setFiles] = useState([]);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      // const preview = {
      //   ...acceptedFiles[0],
      //   preview: URL.createObjectURL(acceptedFiles[0]),
      // };
      setBanner(acceptedFiles[0]);
      // setFiles(preview);
    },
  });

  const bgPreview = {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    padding: "10px",
    borderWidth: "2px",
    borderRadius: "12px",
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundImage: `url(${files.preview})`,
    color: "#e9ddad",
    outline: "none",
    transition: "border .24s ease-in-out",
    margin: "0.5rem",
  };

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [setBanner]);

  return (
    <section
      className="container"
      // onLoad={() => URL.revokeObjectURL(acceptedFiles[0])}
    >
      <div {...getRootProps({ style: bgPreview })}>
        <input {...getInputProps()} />
        {<p>Drag in your wallpaper image or click here</p>}
      </div>
    </section>
  );
}

export default UploadBanner;
