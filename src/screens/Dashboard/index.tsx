import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';
import { useAuth } from '../../hooks/useAuth';
import { formatAmount } from '../../utils/formatAmount';
import { getLastTransaction } from '../../utils/getLastTransaction';
import {
  ClearButton,
  ClearButtonText,
  Container,
  Greetings,
  Header,
  HighlightCards,
  Icon,
  LoadingContainer,
  LogoutButton,
  Title,
  TitleText,
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

interface HighLightCardData {
  total: {
    totalSum: string;
    lastTransaction: string;
  };
  income: {
    incomesSum: string;
    lastTransaction: string;
  },
  outcome: {
    outcomesSum: string;
    lastTransaction: string;
  }
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<TransactionsData[]>([]);
  const [highLightCardData, setHighLightCardData] = useState<HighLightCardData>({} as HighLightCardData);
  const theme = useTheme();
  const { logOut, user } = useAuth();
  const dataKey = `gofinances:transactions:user=${user.id}`;

  async function loadTransactions() {
    const response = await AsyncStorage.getItem(dataKey);
    const data = response ? JSON.parse(response) : [];
    let incomesSum = 0;
    let outcomesSum = 0;

    const formattedTransactions = data.map((item: TransactionsData) => {

      if (item.type === 'income') {
        incomesSum += Number(item.amount);
      } else {
        outcomesSum += Number(item.amount);
      }

      const date = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).format(new Date(item.date));

      const amount = formatAmount(Number(item.amount));

      return {
        id: item.id,
        date,
        amount,
        type: item.type,
        name: item.name,
        category: item.category
      }
    });

    const lastIncomeTransactionDate = getLastTransaction(data, 'income');
    const lastOutcomeTransactionDate = getLastTransaction(data, 'outcome');
    
    const existsIncomes = lastIncomeTransactionDate != 'NaN de Invalid Date';
    const existsOutcomes = lastOutcomeTransactionDate != 'NaN de Invalid Date';
    const totalInterval = existsOutcomes ? `01 a ${lastOutcomeTransactionDate}` : `01 a ${lastIncomeTransactionDate}`;

    setTransactions(formattedTransactions);
    setHighLightCardData({
      income: {
        incomesSum: formatAmount(incomesSum),
        lastTransaction: existsIncomes ? `??ltima entrada dia ${lastIncomeTransactionDate}` : 'N??o h?? registro de entradas'
      },
      outcome: {
        outcomesSum: formatAmount(outcomesSum),
        lastTransaction: existsOutcomes ? `??ltima sa??da dia ${lastOutcomeTransactionDate}` : 'N??o h?? registro de sa??das'
      },
      total: {
        totalSum: formatAmount(incomesSum - outcomesSum),
        lastTransaction: existsOutcomes || existsIncomes ? totalInterval : 'N??o h?? registro',
      }
    });
    setIsLoading(false);
  }

  async function clear() {
    await AsyncStorage.removeItem(dataKey);
    loadTransactions();
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, [])
  );

  return (
    <Container>
      {
        isLoading ? 
        <LoadingContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadingContainer>
          :
          <>
            <Header>
              <UserWrapper>
                <UserInfo>
                  <UserPhoto source={{ uri: user.picture }} />
                  <User>
                    <Greetings>Ol??,</Greetings>
                    <UserName>{user.name}</UserName>
                  </User>
                </UserInfo>
                <LogoutButton onPress={logOut}>
                  <Icon name='power' />
                </LogoutButton>
              </UserWrapper>
            </Header>

            <HighlightCards
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 24 }}
            >
              <HighlightCard
                title='Entradas'
                amount={highLightCardData.income.incomesSum}
                lastTransaction={highLightCardData.income.lastTransaction}
                type='up'
              />

              <HighlightCard
                title='Sa??das'
                amount={highLightCardData.outcome.outcomesSum}
                lastTransaction={highLightCardData.outcome.lastTransaction}
                type='down'
              />
              
              <HighlightCard
                title='Total'
                amount={highLightCardData.total.totalSum}
                lastTransaction={highLightCardData.total.lastTransaction}
                type='total'
              />
            </HighlightCards>

            <Transactions>
              <Title>
                <TitleText>Transa????es</TitleText>
                <ClearButton onPress={clear}>
                  <ClearButtonText>Limpar</ClearButtonText>
                </ClearButton>
              </Title>

              <TransactionsList
                data={transactions}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <TransactionCard data={item} />}
              />

            </Transactions>
          </>
      }
    </Container>
  );
}
