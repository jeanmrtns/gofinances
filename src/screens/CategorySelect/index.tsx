import React from 'react';
import { FlatList } from "react-native";
import { Button } from "../../components/Form/Button";
import { categories } from "../../utils/categories";
import {
  Category,
  CategoryName,
  Container,
  Footer,
  Header,
  Icon, Separator, Title
} from './styles';

export interface Category {
  key: string;
  name: string;
}

interface CategorySelectProps {
  onClose: () => void;
  setCategory: (category: Category) => void;
  category: Category;
}

export function CategorySelect({ onClose, setCategory, category }: CategorySelectProps) {

  function handleSelectCategory(category: Category) {
    setCategory(category);
  }

  return (
    <Container>
      <Header>
        <Title>Categorias</Title>
      </Header>

      <FlatList
        data={categories}
        keyExtractor={item => item.key}
        renderItem={({item}) => (
          <Category
            onPress={() => handleSelectCategory(item)} 
            isActive={item.key === category.key}
          >
            <Icon name={item.icon} color={item.color} />
            <CategoryName>
              {item.name}
            </CategoryName>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <Button title="Selecionar" onPress={onClose} />
      </Footer>
    </Container>
  )
}