import { StyleSheet} from 'react-native';
import { Colors } from '../../../../global/colors';



export const whiteMode = {
    styles : StyleSheet.create({
        container_modal:{
            backgroundColor:"white",
        },
        
      
    }),
}


export const darkMode = {
    styles : StyleSheet.create({
        container_modal:{
            backgroundColor:Colors.colorBlue4,
            borderColor:Colors.colorBlue2
        },
        
        
    }),
}