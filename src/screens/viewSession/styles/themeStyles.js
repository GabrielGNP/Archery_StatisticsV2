import { StyleSheet} from 'react-native';
import { Colors } from '../../../global/colors.js'

export const whiteMode = {
    styles : StyleSheet.create({
        main_container:{
            backgroundColor: Colors.colorBack2,
        },
        date_container:{
            backgroundColor:Colors.colorBack1,
            borderColor:Colors.colorBlue2,
        },
        date_text:{
            color:Colors.colorBlue2,
        },
        info_data:{
            color:Colors.colorBlack,
        },
        data_text:{
            color:Colors.colorBlue2,
        },
    }),
}

export const darkMode = {
    styles : StyleSheet.create({
        main_container:{
            backgroundColor: Colors.colorBack3,
        },
        date_container:{
            backgroundColor:Colors.colorBlue4,
            borderColor:Colors.colorBlue2,
        },
        date_text:{
            color:Colors.colorBlue1,
        },
        info_data:{
            color:Colors.colorBlue1,
        },
        data_text:{
            color:Colors.colorBlue2,
        },
    })
}
