import React from 'react';
import { Alert } from 'react-native';
import AppleSVG from '../../assets/apple.svg';
import GoogleSVG from '../../assets/google.svg';
import LogoSVG from '../../assets/logo.svg';
import { SocialLoginButton } from '../../components/SocialLoginButton';
import { useAuth } from '../../hooks/useAuth';
import {
  Container, Footer, Header,
  Logo, SocialLogin, SubTitle, Title
} from './styles';

export function SignIn() {

  const { signInWithGoogle, signInWithApple } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar a conta Google');
    }
  }

  async function handleSignInWithApple() {
    try {
      await signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar a conta Apple');
    }
  }

  return (
    <Container>
      <Header>
        <Logo>
          <LogoSVG />
        </Logo>

        <Title>
          Controle suas {'\n'}
          finanças de forma {'\n'}
          muito simples
        </Title>

        <SubTitle>
          Faça seu login com {'\n'}
          uma das contas abaixo
        </SubTitle>
      </Header>

      <Footer>
        <SocialLogin>
          <SocialLoginButton 
            title="Entrar com Google"
            svg={GoogleSVG}
            onPress={handleSignInWithGoogle}
          />
          <SocialLoginButton
            title="Entrar com Apple"
            svg={AppleSVG}
            onPress={handleSignInWithApple}
          />
        </SocialLogin>
      </Footer>
    </Container>
  );
}