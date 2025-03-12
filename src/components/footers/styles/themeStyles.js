import { StyleSheet} from 'react-native';
import { Colors } from '../../../global/colors.js'

export const whiteMode = {
    styles : StyleSheet.create({
        footer:{
            backgroundColor: Colors.colorBlue1,
            borderColor: Colors.colorBlue2,
        },
        icons1_footer:{
            backgroundColor:Colors.colorBack1,
            borderColor:Colors.colorBlue1,
        },
        icons2_footer:{
            backgroundColor:Colors.colorBack1,
            borderColor:Colors.colorBlue1,
        }
    }),
}

export const darkMode = {
    styles : StyleSheet.create({
        footer:{
            backgroundColor: Colors.colorBack3,
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

