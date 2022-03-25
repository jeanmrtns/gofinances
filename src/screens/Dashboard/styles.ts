
import { Feather } from '@expo/vector-icons';
import { FlatList, FlatListProps } from 'react-native';
import { BorderlessButton, GestureHandlerRootView } from 'react-native-gesture-handler';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from "styled-components/native";
import { TransactionsData } from '.';

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  height: ${RFPercentage(42)}px;
  align-items: center;
`;

export const UserWrapper = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 0 24px;
  margin-top: ${getStatusBarHeight() + 28}px;
  width: 100%;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const UserPhoto = styled.Image`
  height: ${RFValue(48)}px;
  width: ${RFValue(48)}px;
  border-radius: 10px;
`;

export const User = styled.View`
  margin-left: 16px;
`;

export const Greetings = styled.Text`
  color: ${({theme}) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${({theme}) => theme.fonts.regular};
`;

export const UserName = styled.Text`
  color: ${({theme}) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${({theme}) => theme.fonts.bold};
`;

export const LogoutButton = styled(BorderlessButton)``;

export const Icon = styled(Feather)`
  font-size: ${RFValue(24)}px;
  color: ${({theme}) => theme.colors.secondary};
`;

export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingHorizontal: 24
  }
})`
  margin-top: ${RFPercentage(20)}px;
  width: 100%;
  position: absolute;
`;

export const Transactions = styled.View`
  padding: 0 24px;
  margin-top: ${RFPercentage(8)}px;
  flex: 1;
`;

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.medium};
  font-size: ${RFValue(18)}px;
  margin-bottom: ${RFValue(16)}px;
  color: ${({theme}) => theme.colors.text_dark};
`;

export const TransactionsList = styled(
  FlatList as new (props: FlatListProps<TransactionsData>) => FlatList<TransactionsData>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace()
  },
})``;