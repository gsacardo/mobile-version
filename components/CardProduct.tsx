import { EllipsisVertical } from 'lucide-react-native';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { Product } from './ModalProduct';
import { useState } from 'react';
import delProduct from '~/firebase/delProduct';

export default function CardProduct({ product, edit }: { product: Product, edit: (item: Product) => void }) {
  const [options, setOptions] = useState(false);

  const convertTimestampToDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDelete = () => {
    setOptions(false);
    Alert.alert(
      'Excluir Produto',
      'Tem certeza que deseja excluir esse produto?',
      [
        {
          text: 'Voltar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => delProduct(product.id),
        },
      ],
      { cancelable: false }
    )
  };

  return (
    <View className="flex h-[120px] w-full flex-col rounded-xl bg-bgsecondary p-2 shadow-md">
      <View className="flex-row">
        <View className="h-24 w-24 overflow-hidden rounded-lg">
          <Image className="h-full w-full" src={`${product.photo}`} resizeMode="cover" />
        </View>
        <View className="mx-2 flex-1">
          <View className="flex-row items-baseline justify-between gap-2">
            <Text className="text-[14px] font-bold text-foreground">{product.name}</Text>
            <View
              className={`absolute right-0 top-0 z-50 bg-background rounded-md border border-foreground items-center justify-center ${options ? '' : 'hidden'}`}>
              <TouchableOpacity onPress={() => edit(product)}>
                <Text className="text-foreground px-4 py-2">Editar</Text>
              </TouchableOpacity>
              <View className="border-b border-foreground w-full"></View>
              <TouchableOpacity onPress={handleDelete}>
                <Text className="text-foreground px-4 py-2">Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex-1">
            <Text className="line-clamp-3 text-[12px] text-foreground">{product.notes}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-[12px] font-bold text-foreground">
              Valor: {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </Text>
            <Text className="text-[12px] font-bold text-foreground">
              Quantidade: {product.quantity}
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={() => setOptions(!options)} className='text-foreground'>
            <EllipsisVertical size={20} color="#525457" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="mt-2 items-end border-t border-foreground">
        <Text className="text-[10px] text-foreground">Data de Cadastro: {convertTimestampToDate(product.date)}</Text>
      </View>
    </View>
  );
}
