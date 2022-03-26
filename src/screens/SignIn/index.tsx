import React from 'react';
import AppleSVG from '../../assets/apple.svg';
import GoogleSVG from '../../assets/google.svg';
import LogoSVG from '../../assets/logo.svg';
import { SocialLoginButton } from '../../components/SocialLoginButton';
import {
  Container, Footer, Header,
  Logo, SocialLogin, SubTitle, Title
} from './styles';

export function SignIn() {
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
          />
          <SocialLoginButton
            title="Entrar com Apple"
            svg={AppleSVG}
          />
        </SocialLogin>
      </Footer>
    </Container>
  );
}