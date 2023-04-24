/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react";
import Navbar from "../components/Navbar";
import UpdateSection from "../components/UpdateSection";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;

const Update = () => {
  return (
    <>
      <Navbar />
      <Wrapper>
        <UpdateSection />
      </Wrapper>
    </>
  );
};

export default Update;
