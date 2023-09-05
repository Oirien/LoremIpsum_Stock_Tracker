import React from 'react';
import styled from "styled-components";
import Marquee from "react-fast-marquee";



const NavBar = styled.nav`
/* background-color: red; */
border:1px solid black;
list-style: none;
display: flex;
justify-content: space-evenly;
align-items: center;
min-height: 2rem;
width: 80%;
`;


const HeaderWrapper = styled.div`
display: flex;
flex-flow: column;
/* border:1px solid black; */
align-items: center;
`;

const Li = styled.li`
border: 1px solid black;
background-color: yellow;
padding: 5px 20px;
`;

function Header() {

    const testArrayOne = ["George","Rob", "John"]


  return (
    <HeaderWrapper>
         <Marquee pauseOnHover gradient style={{height:30}}>
            {testArrayOne.map((item,index) => <div key={index}>{item} &ensp; &emsp; </div> )}
        </Marquee>
        <Marquee pauseOnHover delay={0.3} gradient style={{height:50}} className='Marquee-styling'>
        {testArrayOne.map((item,index) => <div key={index}>{item} &ensp; &emsp; </div> )}
        </Marquee>
        <NavBar>
            <Li>Home</Li>
            <Li>Portfolio</Li>
            <Li>Something</Li>
            <Li>Else</Li>
        </NavBar>
       
    </HeaderWrapper>
  )
}

export default Header