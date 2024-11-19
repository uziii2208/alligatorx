import { StyleSheet, Text, TextInput, View, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import React, { useState, useRef } from 'react';
import { useRouter } from 'expo-router';

const OTPScreen: React.FC = () => {
    const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
    const inputRefs = useRef<(TextInput | null)[]>([]);
    const correctOtp = "111111";
    const router = useRouter();

    const handleChange = (text: string, index: number) => {
        const newOtp = [...otp];
        
        if (text === '') {
            // Clear all OTP inputs if any input field is cleared
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        } else {
            // Update OTP array with the entered text
            newOtp[index] = text;
            setOtp(newOtp);

            // Move to the next input if a digit is entered and it's not the last input
            if (index < otp.length - 1) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleSubmit = () => {
        if (otp.join('') === correctOtp) {
            console.log("OTP Submitted: ", otp.join(''));
            router.push('/funtions');
        } else {
            console.log("Incorrect OTP. Please try again.");
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.title}>Enter OTP</Text>
                <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            value={digit}
                            onChangeText={(text) => handleChange(text, index)}
                            keyboardType="number-pad"
                            maxLength={1}
                            style={styles.otpInput}
                            placeholder="0"
                            placeholderTextColor="#888"
                        />
                    ))}
                </View>
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default OTPScreen;

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#083D27', // Updated background color
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 40,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 20,
    },
    otpInput: {
        width: '14%',
        paddingVertical: 15,
        backgroundColor: '#2E2E2E',
        borderRadius: 10,
        color: '#FFFFFF',
        fontSize: 24,
        textAlign: 'center',
    },
    submitButton: {
        width: '80%',
        paddingVertical: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#1A1A1A',
        fontSize: 16,
        fontWeight: '600',
    },
});
