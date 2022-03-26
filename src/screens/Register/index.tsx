import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Keyboard, Modal } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';
import * as yup from "yup";
import { Button } from '../../components/Form/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { ControlledInput } from '../../components/Form/ControlledInput';
import { TypeButton } from '../../components/Form/TypeButton';
import { Category, CategorySelect } from '../CategorySelect';
import {
  Container,
  Form,
  Header,
  InputArea,
  Title,
  TypeButtons
} from './styles';

type TransactionType = 'income' | 'outcome';

interface FormData {
  [name: string]: any;
}

const schema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  amount: yup.number().typeError('Informe um valor numérico').positive('O valor não pode ser negativo').required('O valor é obrigatório')
});

export function Register() {
  const [transactionType, setTransactionType] = useState<TransactionType>('income');
  const [isCategorySelectModalOpen, setIsCategorySelectModalOpen] = useState(false);
  const [category, setCategory] = useState({} as Category);
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const dataKey = 'gofinances:transactions';

  const {
    control,
    handleSubmit,
    reset,
    formState: {
      errors
    }
  } = useForm({
    resolver: yupResolver(schema)
  });

  function handleTransactionType(type: TransactionType) {
    setTransactionType(type);
  }

  function handleOpenCategoryModal() {
    setIsCategorySelectModalOpen(true);
  }

  function handleCloseCategoryModal() {
    setIsCategorySelectModalOpen(false);
  }

  async function handleRegister(form: FormData) {

    if (!category.key)
      return Alert.alert('Você deve informar uma categoria.');

    if (!transactionType)
      return Alert.alert('Você deve informar o tipo da transação');

    const transaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date()
    };

    try {
      const data = await AsyncStorage.getItem(dataKey);

      const currentData = data ? JSON.parse(data) : [];

      const formattedData = [
        ...currentData,
        transaction
      ]

      await AsyncStorage.setItem(dataKey, JSON.stringify(formattedData));

      reset();
      setCategory({} as Category);
      setTransactionType('income');
      navigation.navigate('Listagem');
    } catch (error) {
      console.log(error);
      Alert.alert('Erro ao salvar os dados');
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{flex: 1}} containerStyle={{flex: 1}} >
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <InputArea>
            <ControlledInput
              control={control}
              name="name"
              placeholder='Nome'
              autoCapitalize='sentences'
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <ControlledInput
              control={control}
              name="amount"
              placeholder='Valor'
              keyboardType='numeric'
              error={errors.amount && errors.amount.message}
            />
            <TypeButtons>
              <TypeButton
                title='Entradas'
                type='income'
                onPress={() => handleTransactionType('income')}
                isActive={transactionType === 'income'}
              />
              <TypeButton
                title='Saídas'
                type='outcome'
                onPress={() => handleTransactionType('outcome')}
                isActive={transactionType === 'outcome'}
              />
            </TypeButtons>

            <CategorySelectButton
              title={!category.name ? 'Categorias' : category.name}
              onPress={handleOpenCategoryModal}
            />
          </InputArea>

          <Button
            title="Enviar"
            onPress={handleSubmit(handleRegister)}
          />
        </Form>

        <Modal visible={isCategorySelectModalOpen}>
          <CategorySelect category={category} onClose={handleCloseCategoryModal} setCategory={setCategory} />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  )
}