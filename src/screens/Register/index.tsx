import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Keyboard, Modal } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
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

  const {
    control,
    handleSubmit,
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

  function handleRegister(form: FormData) {

    if (!category.key)
      return Alert.alert('Você deve informar uma categoria.');

    if (!transactionType)
      return Alert.alert('Você deve informar o tipo da transação');

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    };

    console.log(data)
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