import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Container,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import {AccountCircle, School, Group} from '@mui/icons-material';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const ChooseUser = ({visitor}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const password = "zxc"

  const {status, currentUser, currentRole} = useSelector(state => state.user);

  const [loader, setLoader] = useState(false)
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    if (user === "Admin") {
      if (visitor === "guest") {
        const email = "yogendra@12"
        const fields = {email, password}
        setLoader(true)
        dispatch(loginUser(fields, user))
      } else {
        navigate('/Adminlogin');
      }
    } else if (user === "Student") {
      if (visitor === "guest") {
        const rollNum = "1"
        const studentName = "Dipesh Awasthi"
        const fields = {rollNum, studentName, password}
        setLoader(true)
        dispatch(loginUser(fields, user))
      } else {
        navigate('/Studentlogin');
      }
    } else if (user === "Teacher") {
      if (visitor === "guest") {
        const email = "tony@12"
        const fields = {email, password}
        setLoader(true)
        dispatch(loginUser(fields, user))
      } else {
        navigate('/Teacherlogin');
      }
    }
  }

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        navigate('/Admin/dashboard');
      } else if (currentRole === 'Student') {
        navigate('/Student/dashboard');
      } else if (currentRole === 'Teacher') {
        navigate('/Teacher/dashboard');
      }
    } else if (status === 'error') {
      setLoader(false)
      setMessage("Ошибка сети")
      setShowPopup(true)
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <StyledContainer>
      <Container>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <div onClick={() => navigateHandler("Admin")}>
              <StyledPaper elevation={3}>
                <Box mb={2}>
                  <AccountCircle fontSize="large"/>
                </Box>
                <StyledTypography>
                  Администратор
                </StyledTypography>
                Войдите как администратор, чтобы получить доступ к панели управления для управления данными приложения
              </StyledPaper>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledPaper elevation={3}>
              <div onClick={() => navigateHandler("Student")}>
                <Box mb={2}>
                  <School fontSize="large"/>
                </Box>
                <StyledTypography>
                  Риэлтор
                </StyledTypography>
                Войдите как риэлтор, чтобы изучать учебные материалы и задания.
              </div>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledPaper elevation={3}>
              <div onClick={() => navigateHandler("Teacher")}>
                <Box mb={2}>
                  <Group fontSize="large"/>
                </Box>
                <StyledTypography>
                  Ментор
                </StyledTypography>
                Войдите как ментор, чтобы создавать курсы, задания и отслеживать прогресс студентов.
              </div>
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
      <Backdrop
        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
        open={loader}
      >
        <CircularProgress color="inherit"/>
        Пожалуйста, подождите
      </Backdrop>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup}/>
    </StyledContainer>
  );
};

export default ChooseUser;

const StyledContainer = styled.div`
  background: var(--color-main-linear);
  height: 120vh;
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

const StyledPaper = styled.div`
  padding: 20px;
  text-align: center;
  cursor: pointer;
  background-color: white;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--color-primary-variant);
    color: white;
  }
`;

const StyledTypography = styled.h2`
  margin-bottom: 10px;
`;