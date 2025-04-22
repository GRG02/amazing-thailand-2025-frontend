import React from 'react'
import { Box, TextField, Typography, Link, Paper, Stack, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        userEmail: Yup.string()
            .email('อีเมลไม่ถูกต้อง')
            .matches(/^[^'";]*$/, 'อีเมลมีอัครพิเศษที่ไม่ได้รับอนุญาต')
            .required('กรุณาใส่อีเมล...'),
        userPassword: Yup.string()
            .matches(/^[a-zA-Z0-9^'";]*$/, 'รหัสผ่านมีภาษาหรืออักขระพิเศษที่ไม่ได้รับอนุญาต')
            .required('กรุณาใส่รหัสผ่าน...'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data) => {
        const { userEmail, userPassword } = data;
        try {

            const response = await axios.get(`https://n8n-bb7z.onrender.com/webhook/c502a429-0ea4-4c9f-a86d-5bc928db036d/at/user/${userEmail}/${userPassword}`);

            if (response.status === 200) {

                // console.log(response.data);

                // Save userData ลง localStorage
                localStorage.setItem('userData', JSON.stringify(response.data));

                // Dispatch Event บอก App.jsx ว่า userData เปลี่ยนแล้ว
                window.dispatchEvent(new Event('storage'));

                alert('เข้าสู่ระบบสําเร็จ');

                // ไปหน้า homepage โดยไม่ reload
                navigate('/');
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    alert('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
                } else if (error.response.status === 500) {
                    alert('ไม่สามารถติดต่อกับเซิร์ฟเวอร์ได้');
                } else {
                    alert('ติดต่อกับฐานข้อมูลไม่สำเร็จ');
                }
            } else {
                alert('เกิดข้อผิดพลาดในการส่งข้อมูล');
            }
        }
    };

    return (
        <Box
            sx={{
                backgroundColor: "#E98410",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box sx={{
                backgroundColor: "#E98410",
                width: "100%",
                maxWidth: 1500,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Paper elevation={4} sx={{ padding: 4, borderRadius: 4, height: 'auto', width: 750, textAlign: "center" }}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        เข้าสู่ระบบ
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={2}>
                            <TextField
                                variant="filled"
                                label="อีเมล..."
                                fullWidth
                                {...register('userEmail')}
                                error={!!errors.userEmail}
                                helperText={errors.userEmail?.message}
                            />
                            <TextField
                                variant="filled"
                                label="รหัสผ่าน..."
                                type="password"
                                fullWidth
                                {...register('userPassword')}
                                error={!!errors.userPassword}
                                helperText={errors.userPassword?.message}
                            />
                            <Button variant="contained" fullWidth sx={{ mt: 4, py: 2, backgroundColor: "#0080FF" }} type="submit">
                                เข้าสู่ระบบ
                            </Button>
                        </Stack>
                    </form>

                    <Typography variant="body2" mt={3}>
                        ยังไม่มีบัญชี?{" "}
                        <Link href="/register" underline="none" fontWeight="bold" color="primary">
                            สร้างบัญชี
                        </Link>
                    </Typography>
                </Paper>
            </Box>
        </Box>
    )
}

export default Login
