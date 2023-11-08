
import { StyleSheet, Dimensions } from 'react-native';
import { Color, FontFamily, Border, FontSize } from '../styles/GlobalStyles';

const { width } = Dimensions.get('window');
const scaleSize = (size: number) => (width / 375) * size;

export default StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center', 
    backgroundColor: '#d1dee4',
    paddingTop: 20, // Add some padding at the top
    


  },
  mainContainer: {
    flex: 1, // Takes up all available space
  },
  
  logo: {
    width: scaleSize(172),
    height: scaleSize(167),
    marginBottom: scaleSize(20),
  },
  signInHeader: {
    fontSize: FontSize.size_large,
    color: Color.colorDarkSlateGray,
    fontFamily: FontFamily.interBold,
    marginBottom: scaleSize(20),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color.colorGray,
    paddingHorizontal: scaleSize(10),
    paddingVertical: scaleSize(5),
    backgroundColor: Color.colorWhite,
    marginHorizontal: scaleSize(20),
    marginBottom: scaleSize(20),
    borderRadius: Border.brMini,
  },
  inputIcon: {
    width: scaleSize(20),
    height: scaleSize(20),
  },
  input: {
    flex: 1,
    paddingHorizontal: scaleSize(10),
    color: Color.colorDarkSlateGray,
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.sizeMedium,
    width: width * 0.7,
  },
  eyeIcon: {
    marginLeft: 'auto',
    marginRight: scaleSize(10),
  },
  signInButton: {
    backgroundColor: Color.colorLightSlateGray,
    paddingVertical: scaleSize(10),
    borderRadius: Border.brMini,
    marginBottom: scaleSize(20),
    width: width * 0.9,
    alignSelf: 'center',
  },
  signInButtonText: {
    color: Color.colorWhite,
    fontFamily: FontFamily.interBold,
    fontSize: FontSize.sizeMedium,
    textAlign: 'center',
  },
  forgetPasswordText: {
    color: Color.colorDarkSlateGray,
    fontFamily: FontFamily.interBold,
    marginBottom: scaleSize(20),
  },
  socialLinksContainer: {
    flexDirection: 'row',
    marginBottom: scaleSize(20),
  },
  socialIcon: {
    marginHorizontal: scaleSize(5),
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUpText: {
    color: Color.colorDarkSlateGray,
    fontFamily: FontFamily.interRegular,
  },
  signUpButtonText: {
    color: Color.colorRoyalBlue,
    fontFamily: FontFamily.interBold,
  },
});
