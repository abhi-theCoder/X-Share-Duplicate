import axios from '../api';

interface VerifyTokenResponse {
  valid: boolean;
}

export const verifyToken = async (token: string | null): Promise<boolean> => {
  if (!token) return false;

  try {
    const response = await axios.post<VerifyTokenResponse>('/api/verifyToken', {},{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data.valid === true;
  } catch (error) {
    console.error('Token verification failed:', error);
    return false;
  }
};

export default verifyToken;