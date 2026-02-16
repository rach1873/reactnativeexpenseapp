import { View, Text, TextInput } from 'react-native';
import { useFonts } from 'expo-font';


export const Word = (props) => {

    const [loaded] = useFonts({
        'source': require('../assets/fonts/SourceCodePro-Black.ttf')
    });

    if (!loaded) {
        return null;
    }

    return (
        <Text style={{ fontFamily: 'source', fontSize: props.size, color: props.color }}>
            {props.children}
        </Text>
    );
};