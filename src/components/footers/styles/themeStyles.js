import { StyleSheet} from 'react-native';
import { Colors } from '../../../global/colors.js'

export const whiteMode = {
    styles : StyleSheet.create({
        main_container:{
            backgroundColor:Colors.colorBack1,
            borderColor:Colors.colorBlue2
        },
        footer:{
            backgroundColor: Colors.colorBack1,
            borderColor: Colors.colorBlue2,
        },
        icons1_footer:{
            backgroundColor:Colors.colorBack1,
            borderColor:Colors.colorBlue1,
            borderWidth:0
        },
        icons2_footer:{
            backgroundColor:Colors.colorBack1,
            borderColor:Colors.colorBlue1,
            borderWidth:0
        }
    }),
}

export const darkMode = {
    styles : StyleSheet.create({
        main_container:{
            backgroundColor:Colors.colorBlue4,
            borderColor:Colors.colorBlue2
        },
        footer:{
            backgroundColor: Colors.colorBlue4,
            borderColor: Colors.colorBlue3,
        },
        icons1_footer:{
            borderWidth:0
        },
        icons2_footer:{
            borderWidth:0
        }
    }),
    
}

