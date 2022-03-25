import { Feather } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from "styled-components/native";

interface CategoryProps {
  isActive: boolean;
}

export const Container = styled(GestureHandlerRootView)`
  background-color: ${({theme}) => theme.colors.background};
  flex: 1;
`;

export const Header = styled.View`
  height: ${RFValue(90)}px;
  background-color: ${({theme}) => theme.colors.primary};
  align-items: center;
  justify-content: flex-end;
  padding-bottom: ${RFValue(19)}px;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.shape};
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
`;

export const Category = styled.TouchableOpacity<CategoryProps>`
  padding: 24px;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 16px 24px;
  ${({ theme, isActive }) => isActive && css`
    background-color: ${theme.colors.success_light};
  `}
`;

export const Icon = styled(Feather)<{color: string}>`
  margin-right: 16px;
  font-size: ${RFValue(20)}px;
  color: ${({color}) => color}
`;

export const CategoryName = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;

export const Footer = styled.View`
  padding: 24px;
`;

export const Separator = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${({theme}) => theme.colors.text};
`;