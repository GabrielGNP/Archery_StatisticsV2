import { StyleSheet} from 'react-native';
import { Colors } from '../../colors.js'

export const whiteMode = {
    styles : StyleSheet.create({
        Main_container: {
            backgroundColor: Colors.colorBack2,
        },
        top_View: {
            backgroundColor: Colors.colorBlue2,
        },
        icon_settings:{
             backgroundColor: Colors.colorBlue2
        },
        icon_settings_background:{
            backgroundColor: Colors.colorBlue2
        },  
        title:{
            color: Colors.colorBlack,
        },
        info_Input:{
            color: Colors.colorBlack,
            
        }
    }),
    icon_settings_color : Colors.colorBack3
}

export const darkMode = {
    styles : StyleSheet.create({
        Main_container: {
            backgroundColor: Colors.colorBack3,
        },
        top_View: {
            backgroundColor: Colors.colorBack3,
        },
        icon_settings:{
            backgroundColor: Colors.colorBack3
       },
        icon_settings_background:{
            backgroundColor: Colors.colorBack3
        },  
        title:{
            color: Colors.colorBlue1,
        },
        info_Input:{
            color: Colors.colorBlue1,
            fontWeight:"bold",
            fontSize: 15
        }
    }),
    icon_settings_color: Colors.colorBlue2

} 