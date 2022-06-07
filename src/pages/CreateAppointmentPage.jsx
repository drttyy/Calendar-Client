import React from "react";
import styled from "styled-components";
import Appbar from "../components/Appbar";

const StyledPage = styled.div`
  display: flex;
  height: 100vh;
  margin: 0;
  background-color: #010d77;
  flex-direction: column;
  align-items: center;
`;

function CreateAppointmentPage() {
  return (
    <StyledPage>
      <h1>Create an Appointment</h1>

      <div>
        <StyledForms onSubmit={handleSubmit}>
          <img src={image} alt="Profile picture" />
          <input type="file" name="image" />

          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="Jonh"
            value={title}
            name="firstName"
            onChange={handleFirstName}
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            placeholder="Cena"
            value={lastName}
            name="lastName"
            onChange={handleLastName}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="example@email.com"
            value={email}
            name="email"
            onChange={handleEmail}
          />

          <label htmlFor="phonenumber">Phonenumber</label>
          <input
            type="number"
            placeholder="910000000"
            value={phonenumber}
            name="phonenumber"
            onChange={handlePhonenumber}
          />
        </StyledForms>
      </div>

      <Appbar />
    </StyledPage>
  );
}

export default CreateAppointmentPage;
