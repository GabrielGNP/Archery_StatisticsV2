import { StyleSheet} from 'react-native';
import { Colors } from '../../../global/colors.js'

export const whiteMode = {
    styles : StyleSheet.create({
        container:{
            backgroundColor: Colors.colorBack1,
            borderColor: Colors.colorBlue2,
        },
        title:{
            color: Colors.colorBack3,
            fontWeight:"800",
        },
        title_2:{
            color: Colors.colorBack3,
            fontWeight:"800",
        },
        day:{
            color: Colors.colorBack3,
        },
        data:{
            color: Colors.colorBlue2,
            fontWeight:"800"
        }
    }),

}


export const darkMode = {
    styles : StyleSheet.create({
        container:{
            backgroundColor: Colors.colorBlue4,
            borderColor: Colors.colorBlue2,
        },
        title:{
            color: Colors.colorBlue1,
        },
        title_2:{
            color: Colors.colorBlue1,
        },
        day:{
            color: Colors.colorBlue1,
        },
        data:{
            color: Colors.colorBlue2,
        }
    }),
}