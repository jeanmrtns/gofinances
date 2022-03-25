import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from "styled-components/native";

interface HighlightCardProps {
  type: 'up' | 'down' | 'total';
}

export const Container = styled.View<HighlightCardProps>`
  ${({type}) => type === 'total' ? css`
    background-color: ${({theme}) => theme.colors.secondary};
  ` : css`
    background-color: ${({theme}) => theme.colors.shape};
  `};
  width: ${RFValue(300)}px;
  border-radius: 5px;
  padding: 19px 23px;
  padding-bottom: ${RFValue(42)}px;
  margin-right: 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<HighlightCardProps>`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  ${({type}) => type === 'total' ? css`
    color: ${({theme}) => theme.colors.shape};
  ` : css`
    color: ${({theme}) => theme.colors.title};
  `};
`;

export const Icon = styled(Feather)<HighlightCardProps>`
  ${({type}) => type === 'up' && css`
    color: ${({ theme }) => theme.colors.success};
  `};

  ${({type}) => type === 'down' && css`
    color: ${({ theme }) => theme.colors.warning};
  `};

  ${({type}) => type === 'total' && css`
    color: ${({ theme }) => theme.colors.shape};
  `};
  font-size: ${RFValue(40)}px;
`;

export const Footer = styled.View`
  margin-top: ${RFValue(20)}px;
`;

export const Amount = styled.Text<HighlightCardProps>`
  font-family: ${({theme}) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;
  ${({type}) => type === 'total' ? css`
    color: ${({theme}) => theme.colors.shape};
  ` : css`
    color: ${({theme}) => theme.colors.title};
  `};
`;

export const LastTransaction = styled.Text<HighlightCardProps>`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  ${({type}) => type === 'total' ? css`
    color: ${({theme}) => theme.colors.shape};
  ` : css`
    color: ${({theme}) => theme.colors.text};
  `};
`;
