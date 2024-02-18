import React from 'react';
import {Link} from 'react-router-dom';
import {Container, Grid, Box, Button} from '@mui/material';
import styled from 'styled-components';
import Students from "../assets/students.svg";
import {LightPurpleButton} from '../components/buttonStyles';

const Homepage = () => {
  return (
    <StyledContainer>
      <Grid container spacing={0}>
        <Grid item xs={12} md={6}>
          <img src={Students} alt="students" style={{width: '100%'}}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper elevation={3}>
            <StyledTitle>
              Добро пожаловать
              <br/>
              в школу обучения
              <br/>
              Риэлторов
            </StyledTitle>
            <StyledText>
              Оптимизируйте управление командой, организацию обучения, а также добавление риэлторов и менторов. Без
              проблем отслеживайте посещаемость, оценивайте прогресс и предоставляйте обратную связь. Получайте
              доступ к записям, просматривайте оценки и легко общайтесь.
            </StyledText>
            <StyledBox>
              <StyledLink to="/choose">
                <LightPurpleButton variant="contained" fullWidth>
                  Войти
                </LightPurpleButton>
              </StyledLink>
              <StyledLink to="/chooseasguest">
                <Button variant="outlined" fullWidth
                        sx={{mt: 2, mb: 3, color: "#660513", borderColor: "#660513"}}
                >
                  Войти как гость
                </Button>
              </StyledLink>
              <StyledText>
                Нет акаунта?{' '}
                <Link to="/Adminregister" style={{color: "#660513"}}>
                  Зарегистрироваться
                </Link>
              </StyledText>
            </StyledBox>
          </StyledPaper>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default Homepage;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledPaper = styled.div`
  padding: 24px;
  height: 100vh;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
  color: #252525;
  /* font-family: "Manrope"; */
  font-weight: bold;
  padding-top: 0;
  letter-spacing: normal;
  line-height: normal;
`;

const StyledText = styled.p`
  margin-top: 30px;
  margin-bottom: 30px;
  letter-spacing: normal;
  line-height: normal;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
