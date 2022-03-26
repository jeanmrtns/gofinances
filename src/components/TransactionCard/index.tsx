import React from 'react';
import { categories } from '../../utils/categories';
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

export interface TransactionCardProps {
  type: 'income' | 'outcome';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface ITransactionCardProps {
  data: TransactionCardProps
}

export function TransactionCard({ data }: ITransactionCardProps) {
  const [ category ] = categories.filter(c => c.key === data.category);

  return (
    <Container>
      <Title>{data.name}</Title>
      <Amount type={data.type}>
        {data.type === 'outcome' && '- '}
        {data.amount}
      </Amount>
      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  )
}