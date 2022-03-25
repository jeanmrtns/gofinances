import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from "styled-components/native";

interface TransactionCardProps {
  type: 'income' | 'outcome'
}

export const Container = styled.View`
  background-color: ${({theme}) => theme.colors.shape};
  border-radius: 5px;
  padding: 18px 24px;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.title};
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.regular};
`;

export const Amount = styled.Text<TransactionCardProps>`
  color: ${({theme, type}) => type === 'income' ? theme.colors.success : theme.colors.warning};
  font-size: ${RFValue(20)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  margin-top: ${RFValue(2)}px;
`;

export const Footer = styled.View`
  margin-top: ${RFValue(19)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Category = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({theme}) => theme.colors.text};
`;

export const CategoryName = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  color: ${({theme}) => theme.colors.text};
  margin-left: ${RFValue(17)}px;
`;

export const Date = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  color: ${({theme}) => theme.colors.text};
`;
