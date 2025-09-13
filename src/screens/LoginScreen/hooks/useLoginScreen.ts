import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../contexts/AuthContext';
import { useState } from 'react';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

export const useLoginScreen = () => {
  const { signIn } = useAuth();
  const navigation = useNavigation<LoginScreenProps['navigation']>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      await signIn({ email, password });
    } catch (err) {
      setError('Email ou senha inválidos');
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToRegister = () => {
    navigation.navigate('Register');
  };

  return {
    email,
    password,
    loading,
    error,
    setEmail,
    setPassword,
    handleLogin,
    handleNavigateToRegister,
  };
  
}
