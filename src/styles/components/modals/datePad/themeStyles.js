import { StyleSheet} from 'react-native';
import { Colors } from '../../../colors';



export const whiteMode = {
    styles : StyleSheet.create({
        container_modal:{
            backgroundColor:"white",
        },
        
        date_in_scroll:{
            backgroundColor:"blue",
            color:"white"
        },
    
        central_button:{
            backgroundColor:"red",
        },      
    }),
}


export const darkMode = {
    styles : StyleSheet.create({
        container_modal:{
            backgroundColor:Colors.colorBlue4,
            borderColor:Colors.colorBlue2
        },
        
        date_in_scroll:{
            backgroundColor:Colors.colorBlue3,
            color:Colors.colorBlue1,
            borderColor:Colors.colorBlue2
        },
    
        central_button:{
            backgroundColor:"red",
        },    
    }),
}