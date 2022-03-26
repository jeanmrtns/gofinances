import { TransactionsData } from "../screens/Dashboard";

export function getLastTransaction(
  array: TransactionsData[],
  transactionType: 'income' | 'outcome'
  ) {
  const date = new Date(
    Math.max.apply(Math,
      array.filter(transaction => transaction.type === transactionType)
      .map(transaction => new Date(transaction.date).getTime())
    )
  );
  
  return `${date.getDate()} de ${date.toLocaleString('pt-BR', { month: 'long'})}`;
}