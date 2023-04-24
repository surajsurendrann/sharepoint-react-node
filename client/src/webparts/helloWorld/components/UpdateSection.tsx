/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from "react";
import { useState, useContext, ChangeEvent } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./userContext";
// import { sp } from "./spauth";

const UpdateSection = () => {
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);
  const [Id] = useState<null>(null);
  const [name, setName] = useState<string>();
  const [designation, setDesignation] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [place, setPlace] = useState<string>();

  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files && e.target.files[0];
    setImage(selectedImage);
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newUser = {
      Id,
      Title: name,
      Email: email,
      Designation: designation,
      Place: place,
      image: image,
    };

    updateUser(newUser);

    setName("");
    setDesignation("");
    setEmail("");
    setPlace("");
    setImage(null);
    alert("successfull");
    navigate("/");
  }

  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit}>
          <>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label>Designation</label>
            <input
              type="text"
              value={designation}
              onChange={(e) => {
                setDesignation(e.target.value);
              }}
            />
            <label>Place</label>
            <input
              type="text"
              value={place}
              onChange={(e) => {
                setPlace(e.target.value);
              }}
              required
            />
            <br />

            {image && (
              <img
                style={{ width: "150px" }}
                src={URL.createObjectURL(image)}
              />
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button type="submit">Update</button>
          </>
        </Form>
      </Container>
    </>
  );
};

export default UpdateSection;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
