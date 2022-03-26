import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import { addMonths, format, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { VictoryPie } from 'victory-native';
import { HistoryCard } from '../../components/HistoryCard';
import { TransactionCardProps } from '../../components/TransactionCard';
import { useAuth } from '../../hooks/useAuth';
import { categories } from '../../utils/categories';
import { formatAmount } from '../../utils/formatAmount';
import {
  Chart, Container, Content, EmptyData, Header, LoadingContainer, Month,
  MonthFilter,
  MonthFilterButton,
  MonthFilterIcon,
  Title
} from './styles';

interface TransactionsData extends TransactionCardProps {
  id: string;
}

interface TotalByCategory {
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  id: string;
  percent: string;
}

export function Resume() {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<TotalByCategory[]>([]);
  const theme = useTheme();

  async function handleChangeDate(option: 'prev' | 'next') {
    if (option === 'prev') {
      const newDate = subMonths(selectedDate, 1);
      setSelectedDate(newDate);
    } else {
      const newDate = addMonths(selectedDate, 1)
      setSelectedDate(newDate);
    }
  }

  async function loadTransactions() {
    setIsLoading(true);
    const dataKey = `gofinances:transactions:user=${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const data = response ? JSON.parse(response) : [];
    const outcomes = data.filter((transaction: TransactionsData) => {
      return transaction.type === 'outcome' &&
        new Date(transaction.date).getFullYear() === selectedDate.getFullYear() &&
        new Date(transaction.date).getMonth() === selectedDate.getMonth()
    });
    const totalByCategory: TotalByCategory[] = [];
    const outcomesTotal = outcomes.reduce((acc: number, item: TransactionsData) => {
      return acc + Number(item.amount)
    }, 0);

    categories.forEach((category) => {
      let sum = 0;

      outcomes.forEach((transaction: TransactionsData) => {
        if (transaction.category === category.key) {
          sum += +transaction.amount;
        }
      });

      if (sum > 0) {
        totalByCategory.push({
          name: category.name,
          total: sum,
          totalFormatted: formatAmount(sum),
          color: category.color,
          id: category.key,
          percent: `${(sum / outcomesTotal * 100).toFixed(0)}%`
        });

      }
    });

    setTotalByCategories(totalByCategory);
    setIsLoading(false);
  }

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, [selectedDate]));

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content bottomTabHeight={useBottomTabBarHeight()}>
        <MonthFilter>
          <MonthFilterButton onPress={() => handleChangeDate('prev')}>
            <MonthFilterIcon name="chevron-left" />
          </MonthFilterButton>

          <Month>{format(selectedDate, 'MMMM, yyyy', {
            locale: ptBR
          })}</Month>

          <MonthFilterButton onPress={() => handleChangeDate('next')}>
            <MonthFilterIcon name="chevron-right" />
          </MonthFilterButton>
        </MonthFilter>

        {isLoading ?
          <LoadingContainer>
            <ActivityIndicator color={theme.colors.primary} size="large" />
          </LoadingContainer> :

          <>
            {
              totalByCategories.length > 0 ? (
                <>
                  <Chart>
                    <VictoryPie
                      data={totalByCategories}
                      colorScale={totalByCategories.map(category => category.color)}
                      style={{
                        labels: {
                          fontSize: RFValue(18),
                          fontWeight: 'bold',
                          fontFamily: theme.fonts.regular,
                          fill: theme.colors.shape
                        }
                      }}
                      labelRadius={50}
                      x="percent"
                      y="total"
                    />
                  </Chart>

                  {
                    totalByCategories.map(data => (
                      <HistoryCard
                        key={data.id}
                        color={data.color}
                        amount={data.totalFormatted}
                        title={data.name}
                      />
                    ))
                  }
                </>
              ) : <EmptyData>Nenhum dado encontrado</EmptyData>
            }
          </>
        }
      </Content>
    </Container>
  )
}