import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { Archive, House, Menu, Notebook, Settings } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  return (
    <>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: `${colorScheme === 'dark' ? '#F5F5F5' : '#1D1D1D'}`,
        tabBarInactiveTintColor: '#828282',
        tabBarStyle: { height: 80, paddingBottom: 10, position: 'absolute', backgroundColor: `${colorScheme === 'dark' ? '#232323' : '#F5F5F5'}` },
        tabBarLabelStyle: { fontSize: 12, fontWeight: 'medium' },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View
              className={focused
                ? 'absolute bottom-0 items-center justify-center rounded-full bg-primary p-4'
                : ''}>
              <House size={36} color={focused ? 'white' : color} />
            </View>
          ),
        }} />
      <Tabs.Screen
        name="product"
        options={{
          title: 'Produtos',
          tabBarIcon: ({ color, focused }) => (
            <View
              className={focused
                ? 'absolute bottom-0 items-center justify-center rounded-full bg-primary p-4'
                : ''}>
              <Notebook size={36} color={focused ? 'white' : color} />
            </View>
          ),
        }} />
      <Tabs.Screen
        name="stock"
        options={{
          title: 'Estoque',
          tabBarIcon: ({ color, focused }) => (
            <View
              className={focused
                ? 'absolute bottom-0 items-center justify-center rounded-full bg-primary p-4'
                : ''}>
              <Archive size={36} color={focused ? 'white' : color} />
            </View>
          ),
        }} />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Configurações',
          tabBarIcon: ({ color, focused }) => (
            <View
              className={focused
                ? 'absolute bottom-0 items-center justify-center rounded-full bg-primary p-4'
                : ''}>
              <Settings size={36} color={focused ? 'white' : color} />
            </View>
          ),
        }} />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarIcon: ({ color, focused }) => (
            <View
              className={focused
                ? 'absolute bottom-0 items-center justify-center rounded-full bg-primary p-4'
                : ''}>
              <Menu size={36} color={focused ? 'white' : color} />
            </View>
          ),
        }} />
    </Tabs></>
  );
}
