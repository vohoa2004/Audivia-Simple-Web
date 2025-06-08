import apiClient from "../../utils/apiClient";

export const verifyEmail = async (token: string) => {
    try {
        const response = await apiClient.post('/auth/verify-email', { token });
        return response.data;
    } catch (error) {
        console.log("Error during verifying email", error)
    }
};
