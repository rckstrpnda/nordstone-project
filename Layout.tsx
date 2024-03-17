import {View} from 'react-native';
import theme from './styles/theme';

const Layout = ({children}) => {
  return (
    <View
      style={{
        backgroundColor: theme.color.white,
        height: '100%',
        width: '100%',
      }}>
      {children}
    </View>
  );
};

export default Layout;
