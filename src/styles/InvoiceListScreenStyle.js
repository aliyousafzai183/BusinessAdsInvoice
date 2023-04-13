import Theme from "../themes/AppTheme";
import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default styles = StyleSheet.create({
    container: {
        width: windowWidth * 0.9,
        height: windowHeight * 0.5,
      },
})