import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { Container, Icon, Title } from './styles';

interface CategorySelectButtonProps extends RectButtonProps {
  title: string;
  onPress: () => void;
}

export function CategorySelectButton({title, ...rest}: CategorySelectButtonProps) {
  return (
    <Container {...rest}>
        <Title>{title}</Title>
        <Icon name="chevron-down" />
    </Container>
  )
}