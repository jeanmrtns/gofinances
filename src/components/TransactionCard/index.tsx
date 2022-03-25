import React from 'react';
import {
  Amount,
  Category,
  CategoryName,
  Container,
  Date,
  Footer,
  Icon,
  Title
} from "./styles";

interface CategoryData {
  icon: string;
  name: string;
};

export interface TransactionCardProps {
  type: 'income' | 'outcome';
  title: string;
  amount: string;
  category: CategoryData;
  date: string;
}

interface ITransactionCardProps {
  data: TransactionCardProps
}

export function TransactionCard({ data }: ITransactionCardProps) {
  return (
    <Container>
      <Title>{data.title}</Title>
      <Amount type={data.type}>
        {data.type === 'outcome' && '- '}
        {data.amount}
      </Amount>
      <Footer>
        <Category>
          <Icon name={data.category.icon} />
          <CategoryName>{data.category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  )
}