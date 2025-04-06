import {
    Box, Button, Card,
    CardContent,
    TextField,
    Typography
} from "@mui/material";
import React, {useState} from "react";
import {Data} from "./Data";

interface AddAgentProps {
    index: number;
    onSubmit(data: Data): void;
    onDiscard(): void;
}

export const AddAgents = (addAgentProps: AddAgentProps) => {
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        // Update form data
        setFormData({
            ...formData,
            [name]: value
        });

        // Validate field in real-time
        const errorMessage = validateField(name, value);
        setErrors({
            ...errors,
            [name]: errorMessage
        });
    };


    const handleSubmit = () => {
         addAgentProps.onSubmit({
                id: addAgentProps.index + 1,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password
         });
    }

    const validateField = (name: any, value: any) => {
        switch (name) {
            case 'name':
                return !value.trim() ? 'Name is required' : '';
            case 'email':
                return !value.trim()
                    ? 'Email is required'
                    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                        ? 'Please enter a valid email address'
                        : '';
            case 'phone':
                return !value.trim()
                    ? 'Phone number is required'
                    : !/^\d{12}$/.test(value.replace(/\D/g, ''))
                        ? 'Please enter a valid phone number with country code'
                        : '';
            case 'password':
                return !value
                    ? 'Password is required'
                    : value.length < 6
                        ? 'Password must be at least 6 characters'
                        : '';
            default:
                return '';
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
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 10,
                background: 'rgba(0, 0, 0, 0.3)',
            }}
        >
            <Card
                elevation={10}
                sx={{
                    maxWidth: 450,
                    width: '100%',
                    borderRadius: 2
                }}
            >
                <CardContent sx={{ padding: 4 }}>
                    <Box
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3
                        }}
                    >
                        <Box sx={{ textAlign: 'center', mb: 2 }}>
                            <Typography variant="h4" component="h1" gutterBottom>
                                Add Agents 🙎🏻‍♂️
                            </Typography>
                        </Box>

                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Name"
                            variant="outlined"
                            value={formData.name}
                            onChange={handleChange}
                            error={!!errors.name}
                            helperText={errors.name}
                        />

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
                        />

                        <TextField
                            fullWidth
                            id="phone"
                            name="phone"
                            label="Phone"
                            variant="outlined"
                            value={formData.phone}
                            onChange={handleChange}
                            error={!!errors.phone}
                            helperText={errors.phone}
                        />

                        <TextField
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={formData.password}
                            onChange={handleChange}
                            error={!!errors.password}
                            helperText={errors.password}
                        />

                        <Box display="flex" gap={2} >
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                size="large"
                                onClick={handleSubmit}
                                sx={{
                                    mt: 2,
                                    py: 1.5,
                                    textTransform: 'none',
                                    fontSize: '1rem'
                                }}
                            >
                                Submit
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                size="large"
                                onClick={addAgentProps.onDiscard}
                                sx={{
                                    mt: 2,
                                    py: 1.5,
                                    backgroundColor:'red',
                                    textTransform: 'none',
                                    fontSize: '1rem'
                                }}
                            >
                                Discard
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}