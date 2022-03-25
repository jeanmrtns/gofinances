import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { Button, Container, Icon, Title } from "./styles";

interface TypeButtonProps extends RectButtonProps {
  type: 'income' | 'outcome';
  title: string;
  isActive: boolean;
}

const icons = {
  income: 'arrow-up-circle',
  outcome: 'arrow-down-circle'
}

export function TypeButton({isActive, title, type, ...rest}: TypeButtonProps) {
  return (
    <Container isActive={isActive} type={type}>
      <Button {...rest}>
        <Icon name={icons[type]} type={type} />
        <Title isActive={isActive}>{title}</Title>
      </Button>
    </Container>
  )
}