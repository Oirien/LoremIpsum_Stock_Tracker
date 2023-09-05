import React from 'react'
import styled from 'styled-components'

const HomeWrapper = styled.div`
    background-color: red;
`;



function HomeContainer() {
  return (
    <>
    <HomeWrapper>
        <div>
            Filter Area
        </div>

        <div>
            Stocks List
        </div>

        <div>
            Hidden
        </div>
    
    </HomeWrapper>
    
    </>
  )
}

export default HomeContainer