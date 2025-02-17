import React from 'react';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import Clock from '../Clock/Clock';
import Globe from '../Globe/Globe';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #fdfbf6;
  border-bottom: 1px solid #e0e0e0;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 2rem;
  border-bottom: 1px solid #e0e0e0;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CityTime = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const CityTimeItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #333;
  height: 20px;
`;

const Logo = styled.div`
  text-align: center;
  padding: 1rem 0;
  font-size: 2.5rem;
  font-weight: bold;
  letter-spacing: 2px;
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 0.5rem 0;
`;

const NavLink = styled.a`
  color: #333;
  text-decoration: none;
  font-size: 1rem;
  padding: 0.5rem;
  
  &:hover {
    color: #000;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const TimeWithGlobe = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 20px;
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <TopBar>
        <LeftSection>
          <ActionButtons>
            <Button variant="text" color="inherit" size="small">Events</Button>
            <Button variant="text" color="inherit" size="small">Newsletters</Button>
          </ActionButtons>
        </LeftSection>
        <CityTime>
          <CityTimeItem>
            <TimeWithGlobe>
              <Globe />
              <Clock timezone="America/New_York" label="D.C." />
            </TimeWithGlobe>
          </CityTimeItem>
          <CityTimeItem>
            <Clock timezone="Asia/Dubai" label="DUBAI" />
          </CityTimeItem>
          <CityTimeItem>
            <Clock timezone="Africa/Lagos" label="LAGOS" />
          </CityTimeItem>
          <CityTimeItem>
            <Clock timezone="Asia/Shanghai" label="BEIJING" />
          </CityTimeItem>
        </CityTime>
        <RightSection>
          <Button variant="contained" color="primary" size="small">
            SIGN IN
          </Button>
        </RightSection>
      </TopBar>

      <Logo>SEMAFOR</Logo>

      <Navigation>
        <NavLink href="#">Home</NavLink>
        <NavLink href="#">Politics</NavLink>
        <NavLink href="#">Business</NavLink>
        <NavLink href="#">Technology</NavLink>
        <NavLink href="#">Net Zero</NavLink>
        <NavLink href="#">Gulf</NavLink>
        <NavLink href="#">Africa</NavLink>
        <NavLink href="#">Security</NavLink>
        <NavLink href="#">Media</NavLink>
        <NavLink href="#">The CEO Signal</NavLink>
      </Navigation>
    </HeaderContainer>
  );
};

export default Header; 