import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface HistoryCardProps {
  color: string;
}

export const Container = styled.View<HistoryCardProps>`
  background-color: ${({theme}) => theme.colors.shape};
  padding: 24px 13px;
  border-radius: 5px;
  border-left-width: 4px;
  border-left-color: ${({color}) => color};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({theme}) => theme.fonts.regular};
`;

export const Amount = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({theme}) => theme.fonts.bold};
`;