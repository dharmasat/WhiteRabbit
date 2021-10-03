import { Image } from "react-native";
const EmpHeader = () => {
    return (
      <Image
        style={{ width: 50, height: 50 }}
        source={require('@expo/snack-static/react-native-logo.png')}
      />
    );
  }

export default EmpHeader;