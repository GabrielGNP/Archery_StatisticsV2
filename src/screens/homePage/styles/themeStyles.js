import { StyleSheet} from 'react-native';
import { Colors } from '../../../global/colors.js'

export const whiteMode = {
    styles : StyleSheet.create({
        Main_container:{
            backgroundColor: Colors.colorBack2
        },
        segment_view_2:{
            backgroundColor:Colors.colorBack1,
            borderColor: Colors.colorBlue2,
        },
        segment_text_view:{
            borderColor: Colors.colorBack2,
        },
        title_segment:{
            color: Colors.colorBack3
        },
        data_segment:{
            color: Colors.colorBlue2
        },
    }),
}


export const darkMode = {
    styles : StyleSheet.create({
        Main_container:{
            backgroundColor: Colors.colorBack3
        },
        segment_view_2:{
            backgroundColor:Colors.colorBlue4,
            borderColor: Colors.colorBlue2,
        },
        segment_text_view:{
            borderColor: Colors.colorBlue3,
        },
        title_segment:{
            color: Colors.colorBlue1
        },
        data_segment:{
            color: Colors.colorBlue2
        },
    }),
}

export const table_whiteMode = {
    styles : StyleSheet.create({
        table:{
            backgroundColor: Colors.colorBack1,
            borderColor: Colors.colorBlue2,
            borderWidth: 2,
            borderRadius: 25
        },
        title:{
            color: Colors.colorBlue2,
            fontWeight: "500",
        },
        titles_row:{
            borderBottomColor: "transparent",
        },
        data_row_selected:{
            backgroundColor:Colors.colorBlue1,
            borderColor: Colors.colorBlue2,
            borderTopWidth: 1,
            borderBottomWidth: 1
        },
        data:{
            color: Colors.colorBlue3
        },
        data_selected:{
            color: Colors.colorBlue3
        },

    }),
}

export const table_darkMode = {
    styles : StyleSheet.create({
        table:{
            backgroundColor: Colors.colorBlue4,
            borderColor: Colors.colorBlue2,
            borderWidth: 2,
            borderRadius: 25
        },
        title:{
            color: Colors.colorBlue1,
            fontWeight: "500",
        },
        titles_row:{
            borderBottomColor: "transparent",
        },
        data_row_selected:{
            backgroundColor:Colors.colorBlue3,
            borderColor: Colors.colorBlue2,
            borderTopWidth: 1,
            borderBottomWidth: 1
        },
        data:{
            color: Colors.colorBlue2
        },
        data_selected:{
            color: Colors.colorBlue1
        },

    }),
}