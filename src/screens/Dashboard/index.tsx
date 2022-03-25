import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';
import {
  Container,
  Greetings,
  Header,
  HighlightCards,
  Icon,
  LogoutButton,
  Title,
  Transactions,
  TransactionsList,
  User,
  UserInfo,
  UserName,
  UserPhoto,
  UserWrapper
} from './styles';

export interface TransactionsData extends TransactionCardProps {
  id: string;
}

export function Dashboard() {

  const transactions: TransactionsData[] = [
    {
      id: '1',
      type: 'income',
      title: 'Desenvolvimento de site',
      amount: 'R$ 12.000,00',
      category: {
        name: 'Vendas',
        icon: 'dollar-sign'
      },
      date: '13/04/2020'
    },
    {
      id: '2',
      type: 'outcome',
      title: 'Hamburgueria Pizzy',
      amount: 'R$ 59,00',
      category: {
        name: 'Alimentação',
        icon: 'coffee'
      },
      date: '13/04/2020'
    },
  ]

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <UserPhoto source={{ uri: "https://github.com/jeanmrtns.png"}} />
            <User>
              <Greetings>Olá,</Greetings>
              <UserName>Jean</UserName>
            </User>
          </UserInfo>
          <LogoutButton onPress={() => {}}>
            <Icon name='power' />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCards
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24 }}
      >
        <HighlightCard title='Entradas' amount='R$ 17.400,00' lastTransaction='Última entrada dia 13 de abril' type='up' />
        <HighlightCard title='Saídas' amount='R$ 1.259,00' lastTransaction='Última saída dia 03 de abril' type='down' />
        <HighlightCard title='Total' amount='R$ 16.141,00' lastTransaction='01 à 16 de abril' type='total' />
      </HighlightCards>

      <Transactions>
        <Title>Transações</Title>

        <TransactionsList 
          data={transactions}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />

      </Transactions>
    </Container>
  );
}
