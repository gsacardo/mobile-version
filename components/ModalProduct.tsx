import { Upload } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Button, Modal, Text, TextInput, TouchableOpacity, View, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import post_base from '~/firebase/postProduct';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '~/firebase/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

interface ProductFormModalProps {
  visible: boolean;
  onClose: () => void;
  editing: Product[];
}

export interface Product {
  id: string;
  name: string;
  notes: string;
  price: number;
  quantity: number;
  date: number;
  photo: string | null;
}

export default function ModalProduct({ visible, onClose, editing }: ProductFormModalProps) {
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editing.length > 0) {
      setName(editing[0].name);
      setNotes(editing[0].notes);
      setPrice(editing[0].price.toString());
      setQuantity(editing[0].quantity.toString());
      setPhoto(editing[0].photo);
      setImageUri(editing[0].photo);
    }
  }, [editing]);

  const uploadImage = async (): Promise<string> => {
    if (!imageUri) throw new Error('No image URI provided');

    const response = await fetch(imageUri);
    const blob = await response.blob();

    const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
    const storageRef = ref(storage, `images/${filename}`);

    const uploadTask = uploadBytes(storageRef, blob);

    await uploadTask;

    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const handleSave = async () => {
    const isAllFieldsEmpty = [name, notes, price, quantity].some((field) => !field);
    if (isAllFieldsEmpty || !imageUri) {
      const errorMessage = isAllFieldsEmpty ? 'Preencha todos os campos' : 'Selecione uma imagem';
      alert(errorMessage);
      return;
    }

    try {
      setLoading(true);
      const photoUrl = await uploadImage();
      const date = Date.now();

      const product = {
        name,
        notes,
        price: parseFloat(price.replace(',', '.')),
        quantity: parseInt(quantity),
        date,
        photo: photoUrl,
      };

      if (editing.length > 0) {
        await setDoc(doc(db, 'products', editing[0].id), product);
      } else {
        await post_base('products', product);
      }

      alert('Produto salvo com sucesso');
      resetProductData();
      onClose();
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar o produto. Por favor, tente novamente.');
    }
  };

  const resetProductData = () => {
    setName('');
    setNotes('');
    setPrice('');
    setQuantity('');
    setImageUri(null);
  };

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      {loading ? (
        <View className="flex-1 items-center justify-center bg-black/70 p-4">
          <Text className="text-2xl font-bold text-foreground">Salvando...</Text>
        </View>
      ) : (
      <View className="flex-1 items-center justify-center bg-black/70 p-4">
        <View className="w-full rounded-lg bg-bgsecondary p-6">
          <View className="mb-4 border-b border-foreground">
            <Text className="text-2xl font-bold text-foreground">Cadastro de Produto</Text>
          </View>

          <View className="mb-4">
            <Text className="text-foreground">Nome do Produto</Text>
            <TextInput
              className="rounded-md border border-foreground p-2"
              value={name}
              onChangeText={setName}
              style={{ color: '#828282' }}
            />
          </View>

          <View className="mb-4">
            <Text className="text-foreground">Observações</Text>
            <TextInput
              className="rounded-md border border-foreground p-2"
              value={notes}
              onChangeText={setNotes}
              maxLength={100}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              style={{ color: '#828282' }}
            />
            <Text className="absolute bottom-0 right-1 text-right text-foreground">
              {notes.length}/100
            </Text>
          </View>

          <View className="mb-4">
            <Text className="text-foreground">Valor</Text>
            <TextInput
              className="rounded-md border border-foreground p-2"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              style={{ color: '#828282' }}
            />
          </View>

          <View className="mb-4">
            <Text className="text-foreground">Quantidade</Text>
            <TextInput
              className="rounded-md border border-foreground p-2"
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
              style={{ color: '#828282' }}
            />
          </View>
          <View className="mb-4 flex">
            <Text className="text-foreground">Foto do Produto</Text>
            {imageUri && <Image source={{ uri: imageUri }} className="mb-4 h-40 w-40" />}
            <TouchableOpacity
              className="mb-4 flex-row flex self-center items-center rounded bg-primary p-2"
              onPress={handlePickImage}>
              <Upload size={28} color="white" />
              <Text className="flex-1 text-center text-white">
                Selecione um arquivo
              </Text>
            </TouchableOpacity>

          </View>
          <View className="mb-4 border-b border-foreground"></View>

          <View className="flex-row justify-end gap-3">
            <Button
              title="Voltar"
              color={'#656565'}
              onPress={() => {
                resetProductData();
                onClose();
              }}
            />
            <Button title="Salvar" color={'#7652DB'} onPress={handleSave} />
          </View>
        </View>
      </View>
      )}
    </Modal>
  );
}
