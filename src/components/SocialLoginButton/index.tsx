import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { SvgProps } from 'react-native-svg';
import {
  Container,
  ImageContainer,
  Title,
  TitleContainer
} from './styles';

interface SocialLoginButtonProps extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>
}

export function SocialLoginButton({
  title,
  svg: Svg,
  ...rest
}: SocialLoginButtonProps) {
  return (
    <Container {...rest}>
      <ImageContainer>
        <Svg height={RFValue(24)} width={RFValue(24)} />
      </ImageContainer>
      
      <TitleContainer>
        <Title>{title}</Title>
      </TitleContainer>
    </Container>
  )
}