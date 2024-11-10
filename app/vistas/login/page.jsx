'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import  logo  from '../../public/assets/sawa_logo.png';




const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #87CEEB 0%, #E0B0FF 100%);
`;

const Card = styled.div`
  background-color: white;
  padding: 2.5rem;
  width: 400px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 2rem;
`;

const Logo = styled.img`
  width: 120px;
  height: auto;
`;

const Form = styled.form`
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #fafafa;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #0070f3;
    background-color: white;
    box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0060df;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const ErrorMessage = styled.div`
  color: #ff4444;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 0.875rem;
`;

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const loginUser = async (email, password) => {
      // Aquí deberías implementar tu lógica de autenticación real
      // Este es solo un ejemplo
      if (true) {
        // Simular una verificación básica
        return Promise.resolve({ success: true });
      }
      throw new Error('Credenciales inválidas');
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //alert("hooal")
    setError('');
    try {
      console.log(email, password)
      // Aquí iría la lógica de autenticación, por ejemplo:
      const response = await loginUser(email, password);

      if (response.success) {
              // Almacenar el token o estado de autenticación si es necesario
              // localStorage.setItem('token', response.token);
              // Navegar al dashboard
              router.push('/dahsboard');
      }


    } catch (error) {
      console.error(error);
      setError('Error al iniciar sesión. Por favor, verifica tus credenciales.');
      // Manejo de error, por ejemplo, mostrar un mensaje al usuario
    }
  };



  return (
    <LoginContainer>
      <Card>
        <LogoContainer>
          <Logo src={logo.src} alt="SAWA Logo" />
        </LogoContainer>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Iniciar sesión</Button>
        </Form>
      </Card>
    </LoginContainer>
  );
};

export default LoginForm;
