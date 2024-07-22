import { Moon, Sun } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { View, TouchableOpacity, Appearance } from 'react-native';

interface ThemeSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ value, onValueChange }) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  console.log(colorScheme)
  return (
    <TouchableOpacity
      className={`${value ? 'bg-slate-50' : 'bg-zinc-500'} h-8 w-16 rounded-full flex-row items-center justify-between shadow-lg shadow-black p-1`}
      onPress={() => {onValueChange(!value); toggleColorScheme()}}>
      <View className={` ${value ? 'h-7 w-7 rounded-full bg-zinc-600 absolute z-20 left-[2px]' : 'h-7 w-7 rounded-full bg-white absolute z-20 right-[2px]'}`} />
      <Sun size={20} color="white" />
      <Moon size={20} color="#4C4C4C" />
    </TouchableOpacity>
  );
};


export default ThemeSwitch;