import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

function MyCompanies() {
    const [companies, setCompanies] = useState([]);
  
    const getCompanies = async () => {
      try {
        const storedToken = localStorage.getItem("authToken");
  
        let response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        setCompanies(response.data.createdCompany);
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      getCompanies();
    }, []);

  return (
      <>
    <div>MyCompanies</div>
    {companies && 
    companies.map(company => {
        return (
            <Link key={company._id} to={`/company/${company._id}`}>
                <div>{company.name}</div>   
            </Link>
        )
    })
    }
    </>
  )
}

export default MyCompanies