import { Feather } from '@expo/vector-icons';
import { BorderlessButton, ScrollView } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface ContentProps {
  bottomTabHeight: number;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;

export const Header = styled.View`
  height: ${RFValue(113)}px;
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

export const Content = styled(ScrollView).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingHorizontal: 24,
  }
})<ContentProps>`
  width: 100%;
  flex: 1;
`;

export const Chart = styled.View`
  align-items: center;
`;

export const MonthFilter = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin-top: 24px;
`;

export const MonthFilterButton = styled(BorderlessButton)``;

export const MonthFilterIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
`;

export const Month = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({theme}) => theme.fonts.regular};
`;

export const EmptyData = styled.Text`
  font-size: ${RFValue(20)}px;
  text-align: center;
  font-family: ${({theme}) => theme.fonts.regular};
  margin-top: 48px;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
`;
