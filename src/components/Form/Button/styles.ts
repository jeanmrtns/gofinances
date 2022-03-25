import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled(RectButton)`
  width: 100%;
  background-color: ${({theme}) => theme.colors.secondary};
  border-radius: 5px;
`;

export const Title = styled.Text`
  text-align: center;
  padding: 17px 0;
  color: ${({theme}) => theme.colors.shape};
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.medium};
`;