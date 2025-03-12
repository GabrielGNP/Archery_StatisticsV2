import { StyleSheet} from 'react-native';
import { Colors } from '../../../global/colors.js'

export const whiteMode = {
    styles : StyleSheet.create({
        Main_container:{
            backgroundColor: Colors.colorBack2,
        },
        option_text:{
            color:Colors.colorBack3, 
         },
         central_button:{
            backgroundColor:Colors.colorBlue1,
            borderColor:Colors.colorBlue2,
         },
         numeric_input:{
            backgroundColor:Colors.colorBlue1,
            borderColor:Colors.colorBlue2,
            color:Colors.colorBack3,
         }
    }),
}


export const darkMode = {
    styles : StyleSheet.create({
        Main_container:{
            backgroundColor: Colors.colorBack3,
        },
        option_text:{
            color:Colors.colorBlue1, 
         },
         central_button:{
            backgroundColor:Colors.colorBlue3,
            borderColor:Colors.colorBlue2,
         },
         numeric_input:{
            backgroundColor:Colors.colorBlue3,
            borderColor:Colors.colorBlue2,
            color:Colors.colorBlue1,
         }
    }),
}