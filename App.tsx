import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from './app/ui/container/home/Home';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View className="flex-1 px-4"> 
        <Home />
      </View>
    </SafeAreaView>
  );
}