import React, {useEffect, useState} from 'react'
import {getClassStudents, getSubjectDetails} from '../../../redux/sclassRelated/sclassHandle';
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Box, Tab, Container, Typography, BottomNavigation, BottomNavigationAction, Paper} from '@mui/material';
import {BlueButton, GreenButton, PurpleButton} from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

const ViewSubject = () => {
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch();
    const {subloading, subjectDetails, sclassStudents, getresponse, error} = useSelector((state) => state.sclass);

    const {classID, subjectID} = params

    useEffect(() => {
        dispatch(getSubjectDetails(subjectID, "Subject"));
        dispatch(getClassStudents(classID));
    }, [dispatch, subjectID, classID]);

    if (error) {
        console.log(error)
    }

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [selectedSection, setSelectedSection] = useState('attendance');
    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    const studentColumns = [
        {id: 'rollNum', label: 'Номер зачетки', minWidth: 100},
        {id: 'name', label: 'Имя', minWidth: 170},
    ]

    const studentRows = sclassStudents.map((student) => {
        return {
            rollNum: student.rollNum,
            name: student.name,
            id: student._id,
        };
    })

    const StudentsAttendanceButtonHaver = ({row}) => {
        return (
            <>
                <BlueButton
                    variant="contained"
                    onClick={() => navigate("/Admin/students/student/" + row.id)}
                >
                    Просмотр
                </BlueButton>
                <PurpleButton
                    variant="contained"
                    onClick={() =>
                        navigate(`/Admin/subject/student/attendance/${row.id}/${subjectID}`)
                    }
                >
                    Принять посещаемость
                </PurpleButton>
            </>
        );
    };

    const StudentsMarksButtonHaver = ({row}) => {
        return (
            <>
                <BlueButton
                    variant="contained"
                    onClick={() => navigate("/Admin/students/student/" + row.id)}
                >
                    Просмотр
                </BlueButton>
                <PurpleButton variant="contained"
                              onClick={() => navigate(`/Admin/subject/student/marks/${row.id}/${subjectID}`)}>
                    Ввести оценки
                </PurpleButton>
            </>
        );
    };

    const SubjectStudentsSection = () => {
        return (
            <>
                {getresponse ? (
                    <>
                        <Box sx={{display: 'flex', justifyContent: 'flex-end', marginTop: '16px'}}>
                            <GreenButton
                                variant="contained"
                                onClick={() => navigate("/Admin/class/addstudents/" + classID)}
                            >
                                Добавить студентов
                            </GreenButton>
                        </Box>
                    </>
                ) : (
                    <>
                        <Typography variant="h5" gutterBottom>
                            Список студентов:
                        </Typography>

                        {selectedSection === 'attendance' &&
                            <TableTemplate buttonHaver={StudentsAttendanceButtonHaver} columns={studentColumns}
                                           rows={studentRows}/>
                        }
                        {selectedSection === 'marks' &&
                            <TableTemplate buttonHaver={StudentsMarksButtonHaver} columns={studentColumns}
                                           rows={studentRows}/>
                        }

                        <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
                            <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
                                <BottomNavigationAction
                                    label="Посещаемость"
                                    value="attendance"
                                    icon={selectedSection === 'attendance' ? <TableChartIcon/> :
                                        <TableChartOutlinedIcon/>}
                                />
                                <BottomNavigationAction
                                    label="Оценки"
                                    value="marks"
                                    icon={selectedSection === 'marks' ? <InsertChartIcon/> : <InsertChartOutlinedIcon/>}
                                />
                            </BottomNavigation>
                        </Paper>

                    </>
                )}
            </>
        )
    }

    const SubjectDetailsSection = () => {
        const numberOfStudents = sclassStudents.length;

        return (
            <>
                <Typography variant="h4" align="center" gutterBottom>
                    Детали предмета
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Название предмета: {subjectDetails && subjectDetails.subName}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Код предмета: {subjectDetails && subjectDetails.subCode}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Сеансы предмета: {subjectDetails && subjectDetails.sessions}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Количество студентов: {numberOfStudents}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Название
                    класса: {subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName.sclassName}
                </Typography>
                {subjectDetails && subjectDetails.teacher ?
                    <Typography variant="h6" gutterBottom>
                        Имя ментора: {subjectDetails.teacher.name}
                    </Typography>
                    :
                    <GreenButton variant="contained"
                                 onClick={() => navigate("/Admin/teachers/addteacher/" + subjectDetails._id)}>
                        Добавить преподавателя предмета:
                    </GreenButton>
                }
            </>
        );
    }

    return (
        <>
            {subloading ?
                < div> Загрузка...</div>
                :
                <>
                    <Box sx={{width: '100%', typography: 'body1',}}>
                        <TabContext value={value}>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <TabList onChange={handleChange} sx={{
                                    position: 'fixed',
                                    width: '100%',
                                    bgcolor: 'background.paper',
                                    zIndex: 1
                                }}>
                                    <Tab label="Details" value="1"/>
                                    <Tab label="Students" value="2"/>
                                </TabList>
                            </Box>
                            <Container sx={{marginTop: "3rem", marginBottom: "4rem"}}>
                                <TabPanel value="1">
                                    <SubjectDetailsSection/>
                                </TabPanel>
                                <TabPanel value="2">
                                    <SubjectStudentsSection/>
                                </TabPanel>
                            </Container>
                        </TabContext>
                    </Box>
                </>
            }
        </>
    )
}

export default ViewSubject