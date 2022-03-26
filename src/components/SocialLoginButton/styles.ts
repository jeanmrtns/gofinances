import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled(RectButton)`
  background-color: ${({theme}) => theme.colors.shape};
  margin-bottom: 16px;
  height: ${RFValue(56)}px;
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
  width: 100%;
`;

export const ImageContainer = styled.View`
  padding: 16px;
  border-right-width: 1px;
  border-right-color: ${({theme}) => theme.colors.background};
`;

export const TitleContainer = styled.View`
  align-items: center;
  width: 70%;
`;

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  text-align: center;
`;
