/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Tabs from "../components/Tabs";
import { sp } from "../components/spauth";
import styled from "styled-components";
import SourceIcon from "@mui/icons-material/Source";

interface Document {
  UniqueId: string;
  Name: string;
  ServerRelativeUrl: string;
}

const Documents: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [files, setFiles] = useState<Document[]>([]);
  const [uploadFile, setUploadFile] = useState<File>();

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    const fileName = `${uploadFile.name}`;

    if (uploadFile.size <= 10485760) {
      // small upload
      await sp.web
        .getFolderByServerRelativePath(`test/${userId}`)
        .files.addUsingPath(fileName, uploadFile, { Overwrite: true });
    } else {
      // large upload
      await sp.web
        .getFolderByServerRelativePath(`test/${userId}`)
        .files.addChunked(
          fileName,
          uploadFile,
          (data) => {
            console.log(`progress`);
          },
          true
        );
    }
  };

  useEffect(() => {
    const files: any = sp.web
      .getFolderByServerRelativePath(`test/${userId}`)
      .files()
      .then(setFiles);

    console.log(files);
  }, []);

  return (
    <>
      <Navbar />
      <Tabs userId={userId} />
      <Container>
        <input type="file" onChange={handleFileSelect} />
        <button onClick={handleUpload}>Upload</button>

        {files.map((file) => (
          <>
            <p key={file.UniqueId}>
              <SourceIcon /> {file.Name} :
              <a href={file.ServerRelativeUrl}>Download</a> <hr />
            </p>
          </>
        ))}
      </Container>
    </>
  );
};

export default Documents;

const Container = styled.div`
  height: 100vh;
`;
