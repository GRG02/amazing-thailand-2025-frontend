import React, { useState, useEffect } from 'react';
import { Avatar, Box, Button, Container, TextField, Typography } from '@mui/material';
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';

function EditProfile() {
    const [userImage, setUserImage] = useState(null);
    const [userData, setUserData] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (!storedUserData) {
            alert('กรุณาเข้าสู่ระบบก่อน');
            navigate('/login');
        } else {
            setUserData(JSON.parse(storedUserData));
        }

        const handleStorageChange = () => {
            const newUserData = localStorage.getItem('userData');
            setUserData(newUserData ? JSON.parse(newUserData) : null);
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    console.log(userData);

    const validationSchema = Yup.object({
        userName: Yup.string()
            .matches(/^[a-zA-Z0-9]*$/, 'ชื่อผู้ใช้สามารถพิมพ์ได้แค่พยัญชนะภาษาอังกฤษและตัวเลขเท่านั้น')
            .required('กรุณาใส่ชื่อผู้ใช้...'),
        userEmail: Yup.string()
            .email('อีเมลไม่ถูกต้อง')
            .matches(/^[^'";]*$/, 'อีเมลมีอัครพิเศษที่ไม่ได้รับอนุญาต')
            .required('กรุณาใส่อีเมล...'),
        userPassword: Yup.string()
            .nullable()
            .notRequired()
            .test(
                'password-validation',
                'รหัสผ่านต้องมีอย่างน้อย 6 ตัว และไม่มีอักขระพิเศษที่ไม่ได้รับอนุญาต',
                (value) => {
                    if (!value) return true;
                    const isValidLength = value.length >= 6;
                    const isValidChars = /^[a-zA-Z0-9^'";]*$/.test(value);
                    return isValidLength && isValidChars;
                }
            ),

        //userPasswordConfirm: Yup.string()
            //.oneOf([Yup.ref('userPassword'), null], 'รหัสผ่านไม่ตรงกัน'),
        const passwordConfirmSchema = Yup.string()
  .oneOf([Yup.ref('userPassword')], 'รหัสผ่านไม่ตรงกัน')
  .required('กรุณายืนยันรหัสผ่าน');

userPasswordConfirm: Yup.string().when('userPassword', {
  is: (val) => val && val.length > 0,
  then: passwordConfirmSchema,
  otherwise: Yup.string().notRequired()
});



    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
        if (userData) {
            reset({
                userName: userData.userName || '',
                userEmail: userData.userEmail || '',
            });
        }
    }, [userData, reset]);

    const onSubmit = async (data) => {

        if (!isDirty && !userImage) {
            alert('ยังไม่มีการแก้ไขข้อมูล');
            return;
        }


        const formData = new FormData();
        formData.append('userName', data.userName);
        formData.append('userEmail', data.userEmail);
        if (data.userPassword && data.userPassword.trim() !== '') {
            formData.append('userPassword', data.userPassword);
        }
        if (userImage) {
            formData.append('userImage', userImage);
            formData.append('oldImage', userData.userImage);
        }else{
            formData.append('userImage', userData.userImage);
        }

        try {
            const response = await axios.post(
                `https://n8n-bb7z.onrender.com/webhook/c502a429-0ea4-4c9f-a86d-5bc928db036d/at/user/${userData.userId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            // console.log(response.data);
            localStorage.setItem('userData', JSON.stringify(response.data));
            window.dispatchEvent(new Event('storage'));
            alert('แก้ไขข้อมูลสําเร็จ');
            navigate('/');
        } catch (error) {
            alert('เกิดข้อผิดพลาดในการส่งข้อมูล');
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUserImage(file);
        }
    };

    const SelectFileBt = styled("input")({
        clip: "rect(0 0 0 0)",
        clipPath: "inset(50%)",
        height: 1,
        overflow: "hidden",
        position: "absolute",
        bottom: 0,
        left: 0,
        whiteSpace: "nowrap",
        width: 1,
    });

    return (
        <Box sx={{ backgroundColor: '#f2f2f2', minHeight: '100vh', py: 8, backgroundImage: 'url("https://www.transparenttextures.com/patterns/diamond-upholstery.png")', }}>
            <Container maxWidth="lg">
                <Box
                    sx={{
                        backgroundColor: '#f57c00',
                        borderRadius: 6,
                        p: 5,
                        boxShadow: 6,
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: '#fff',
                            borderRadius: 5,
                            p: 5,
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            alignItems: 'center',
                            gap: 6,
                        }}
                    >
                        {/* รูปโปรไฟล์ */}
                        <Box textAlign="center">
                            <Avatar
                                src={
                                    userImage
                                        ? URL.createObjectURL(userImage)
                                        : (userData && userData.userImage)
                                            ? `https://yxkmuhpwtkslojxocvxo.supabase.co/storage/v1/object/public/atimage/user/${userData.userImage}`
                                            : 'https://cdn-icons-png.flaticon.com/512/847/847969.png'
                                }
                                alt="profile"
                                sx={{
                                    width: 300,
                                    height: 300,
                                    margin: '0 auto',
                                    border: '8px solid #f57c00',
                                }}
                            />

                            <Button
                                component="label"
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    fontSize: '1rem',
                                    px: 4,
                                    py: 1.5,
                                    backgroundColor: '#f57c00',
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        backgroundColor: '#e07000',
                                    },
                                }}
                            >
                                เปลี่ยนรูปโปรไฟล์
                                <SelectFileBt
                                    type="file"
                                    hidden
                                    accept="image/png, image/jpeg"
                                    onChange={handleImageChange}
                                />
                            </Button>
                        </Box>

                        {/* ฟอร์มข้อมูล */}
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
                                แก้ไขโปรไฟล์
                            </Typography>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <TextField
                                    label="ชื่อผู้ใช้"
                                    variant="outlined"
                                    fullWidth
                                    size="large"
                                    sx={{ mb: 2, fontSize: '1.2rem' }}
                                    {...register('userName')}
                                    error={!!errors.userName}
                                    helperText={errors.userName?.message}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <TextField
                                    label="อีเมล"
                                    type="email"
                                    variant="outlined"
                                    fullWidth
                                    size="large"
                                    sx={{ mb: 2 }}
                                    {...register('userEmail')}
                                    error={!!errors.userEmail}
                                    helperText={errors.userEmail?.message}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <TextField
                                    label="รหัสผ่าน"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    size="large"
                                    sx={{ mb: 2 }}
                                    {...register('userPassword')}
                                    error={!!errors.userPassword}
                                    helperText={errors.userPassword?.message}
                                />
                                <TextField
                                    label="ยืนยันรหัสผ่าน"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    size="large"
                                    sx={{ mb: 2 }}
                                    {...register('userPasswordConfirm')}
                                    error={!!errors.userPasswordConfirm}
                                    helperText={errors.userPasswordConfirm?.message}
                                />
                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        fontSize: '1.3rem',
                                        py: 2,
                                        backgroundColor: '#f57c00',
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        '&:hover': {
                                            backgroundColor: '#e07000',
                                        },
                                    }}
                                    type="submit"
                                >
                                    บันทึกข้อมูล
                                </Button>
                            </form>

                            <Box sx={{ mt: 3, textAlign: 'center' }}>
                                <Link
                                    to="/"
                                    style={{
                                        color: '#f57c00',
                                        fontWeight: 'bold',
                                        fontSize: '1.1rem',
                                        textDecoration: 'none',
                                    }}
                                >
                                    ← กลับหน้าหลัก
                                </Link>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default EditProfile;
