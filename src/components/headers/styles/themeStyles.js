import { StyleSheet} from 'react-native';
import { Colors } from '../../../global/colors.js'



export const whiteMode = {
    styles : StyleSheet.create({
        header:{
            backgroundColor: Colors.colorBlue2,
        },
        title:{
            color: Colors.colorBack3,
            fontWeight: "800",
            
        },
        userIcon:{
            backgroundColor: Colors.colorBack1
        },        
    }),
    icon_menu_color: Colors.colorBack1
}


export const darkMode = {
    styles : StyleSheet.create({

        header:{
            backgroundColor: Colors.colorBlue4,
        },
        title:{
            color: Colors.colorBlue1,
            
        },
        userIcon:{
            backgroundColor: Colors.colorBack2
        },
    }),
    icon_menu_color: Colors.colorBlue2
}