import React from "react";
import styled from "styled-components";

const InputTag = styled.div`
  border-radius: 15px;
  height: 2em;
`;

function Input(props) {
  return (
    <InputTag
      type={props.type}
      className="Input"
      value={props.value}
      onChange={(e) => props.updateFuncion(e.target.value)}
    />
  );
}

export default Input;
