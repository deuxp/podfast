import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import "./UploadBanner.scss";

function UploadBanner({ banner, setBanner }) {
  const [files, setFiles] = useState([]);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map(
          (
            file //TODO refactor to sperad once working
          ) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
        )
      );
    },
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {<p>Drag 'n' drop your banner file here</p>}
        {/* {files && <p>{files}</p>} */}
      </div>
    </section>
  );
}

export default UploadBanner;

// function Dropzone({ banner, setBanner }) {
//   const onDrop = useCallback((acceptedFiles) => {
//     // save the file
//     const file = new File(acceptedFiles[0], "banner.jpg", {
//       type: acceptedFiles[0].type,
//       lastModified: Date.now(),
//     });
//   }, []);
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   return <div>Dropzone</div>;
// }

// export default Dropzone;
