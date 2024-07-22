import { Stack } from 'expo-router';
import { collection, DocumentData, onSnapshot, QuerySnapshot } from 'firebase/firestore';
import { Notebook, SquarePlus } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { View, TouchableOpacity, FlatList, Text } from 'react-native';
import CardProduct from '~/components/CardProduct';
import ModalProduct, { Product } from '~/components/ModalProduct';
import { db } from '~/firebase/firebaseConfig';

export default function ProductScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);


  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'products'),
      (snapshot: QuerySnapshot<DocumentData>) => {
        const updatedProducts: Product[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setProducts(updatedProducts);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => {setModalVisible(true); setEditing([])}}>
              <SquarePlus size={28} color={'white'} style={{ marginRight: 16 }} />
            </TouchableOpacity>
          ),
          headerLeft: () => <Notebook size={28} color={'white'} style={{ marginLeft: 16 }} />,
          headerStyle: {
            height: 137,
            backgroundColor: '#7652DB',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
          },
        }}
      />

      <View className="flex flex-1 gap-4 bg-background p-4">
        <ModalProduct visible={modalVisible} onClose={() => setModalVisible(false)} editing={editing} />
        {products.length === 0 ? (
          <View className="flex-1 items-center justify-center">
          <Text className="text-center text-foreground">Nenhum produto encontrado</Text>
        </View>
        ) : (
          <FlatList
            data={products}
            renderItem={({ item }) => <CardProduct product={item} edit={() => {setModalVisible(true); setEditing([item])}}/>}
            contentContainerStyle={{ gap: 16, paddingBottom: 80 }}
          />
        )}
      </View>
    </>
  );
}
