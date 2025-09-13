import React from 'react';
import { Input, Button, Text } from 'react-native-elements';
import { ViewStyle } from 'react-native';
import { styles, Container, Title, ErrorText } from './styles';
import { useLoginScreen } from './hooks/useLoginScreen';

const LoginScreen: React.FC = () => {
 const {
    email,
    password,
    loading,
    error,
    setEmail,
    setPassword,
    handleLogin,
    handleNavigateToRegister,
  } = useLoginScreen();


  return (
    <Container>
      <Title>App Marcação de Consultas</Title>
      
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        containerStyle={styles.input}
      />

      <Input
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        containerStyle={styles.input}
      />

      {error ? <ErrorText>{error}</ErrorText> : null}

      <Button
        title="Entrar"
        onPress={handleLogin}
        loading={loading}
        containerStyle={styles.button as ViewStyle}
        buttonStyle={styles.buttonStyle}
      />

      <Button
        title="Cadastrar Novo Usuário"
        onPress={handleNavigateToRegister}
        containerStyle={styles.registerButton as ViewStyle}
        buttonStyle={styles.registerButtonStyle}
      />

      <Text style={styles.hint}>
        Primeiro acesso? Cadastre-se como Admin ou Paciente.
      </Text>
    </Container>
  );
};


export default LoginScreen; 