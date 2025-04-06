import React, { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
    InputAdornment,
    IconButton,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import {
    Email as EmailIcon,
    Visibility,
    VisibilityOff,
    LockOutlined as LockIcon
} from '@mui/icons-material';
import {useNavigate} from "react-router-dom";

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (errors[name as keyof typeof errors]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const validateForm = (): boolean => {
        let isValid = true;
        const newErrors = { ...errors };

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
            isValid = false;
        } else {
            newErrors.email = '';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        } else {
            newErrors.password = '';
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            alert('Login Successful');
            navigate('/dashboard');
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                padding: 2,
                backgroundColor: '#f5f5f5'
            }}
        >
            <Card
                elevation={4}
                sx={{
                    maxWidth: 450,
                    width: '100%',
                    borderRadius: 2
                }}
            >
                <CardContent sx={{ padding: 4 }}>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3
                        }}
                    >
                        <Box sx={{ textAlign: 'center', mb: 2 }}>
                            <Typography variant="h4" component="h1" gutterBottom>
                                Sign In
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Enter your credentials to access your account
                            </Typography>
                        </Box>

                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            variant="outlined"
                            value={formData.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            value={formData.password}
                            onChange={handleChange}
                            error={!!errors.password}
                            helperText={errors.password}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon color="action" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleTogglePasswordVisibility}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <FormControlLabel
                                control={<Checkbox size="small" />}
                                label={<Typography variant="body2">Remember me</Typography>}
                            />
                            <Typography
                                variant="body2"
                                color="primary"
                                sx={{ cursor: 'pointer' }}
                            >
                                Forgot password?
                            </Typography>
                        </Box>

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            sx={{
                                mt: 2,
                                py: 1.5,
                                textTransform: 'none',
                                fontSize: '1rem'
                            }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};