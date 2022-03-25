import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from "styled-components/native";

interface TypeButtonProps {
  type: 'income' | 'outcome';
  isActive: boolean;
}

interface TitleProps {
  isActive: boolean;
}

export const Container = styled.View<TypeButtonProps>`
  border: 1px solid ${({theme}) => theme.colors.text};
  width: 49%;
  border-radius: 5px;
  
  ${({theme, isActive, type}) => isActive && type === 'income' && css`
    background-color: ${theme.colors.success_light};
    border: 0;
    `}

    ${({theme, isActive, type}) => isActive && type === 'outcome' && css`
    background-color: ${theme.colors.warning_light};
    border: 0;
    `}
    `;

export const Button = styled(RectButton)`
  padding: 16px 35px;
  flex-direction: row;  
  align-items: center;
`;

export const Icon = styled(Feather)<TypeButtonProps>`
  margin-right: 12px;
  font-size: ${RFValue(24)}px;
  color: ${({type, theme}) => type === 'income' ? theme.colors.success : theme.colors.warning };
`;

export const Title = styled.Text<TitleProps>`
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  color: ${({theme, isActive}) => isActive ? theme.colors.title: theme.colors.text};
`;