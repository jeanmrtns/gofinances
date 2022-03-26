import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.primary};
`;

export const Header = styled.View`
  height: 70%;
  width: 100%;
  justify-content: flex-end;
`;

export const Logo = styled.View`
  align-items: center;
`;

export const Title = styled.Text`
  margin-top: 40px;
  font-size: ${RFValue(30)}px;
  font-family: ${({theme}) => theme.fonts.medium};
  color: ${({theme}) => theme.colors.shape};
  text-align: center;
  margin-bottom: 80px;
`;

export const SubTitle = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  color: ${({theme}) => theme.colors.shape};
  text-align: center;
  margin-bottom: 80px;
`;

export const Footer = styled.View`
  height: 30%;
  background-color: ${({theme}) => theme.colors.secondary};
  width: 100%;
`;

export const SocialLogin = styled.View`
  margin-top: ${RFPercentage(-8)}px;
  padding: 32px;
`;