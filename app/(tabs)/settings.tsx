import { Stack } from 'expo-router';
import { View, Switch, Text, TouchableOpacity } from 'react-native';
import { Settings } from 'lucide-react-native';
import { useState } from 'react';
import ThemeSwitch from '~/components/ToggleTheme';


export default function SettingsScreen() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleThemeChange = (value: boolean) => {
    setIsDarkTheme(value);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => <Settings size={28} color={'white'} style={{ marginLeft: 16 }} />,
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
      <View className="flex-1 items-center bg-background p-4">
        <View className="w-full flex-row items-center justify-between rounded-lg p-4 shadow-md bg-bgsecondary">
          <Text className='text-foreground'>Trocar tema</Text>
          <ThemeSwitch value={isDarkTheme} onValueChange={handleThemeChange} />
        </View>
      </View>
    </>
  );
}
