import Reaect from "react"
import { StyleSheet } from "react-native"
import { Colors } from "../../../global/colors"


export const whiteMode = {
    styles : StyleSheet.create({
        main_container:{
            backgroundColor:Colors.colorBack1,
            borderColor:Colors.colorBlue2,
        },
        number_button:{
            backgroundColor:Colors.colorBlue1,
            borderColor:Colors.colorBlue2,
        },
        text_number_button:{
            color:Colors.colorBlue2,
        },
        points_container:{
            borderColor:Colors.colorBlue2, 
        },
        text:{
            color:Colors.colorBlack,
        },
        text_total_points:{
            color:Colors.colorBlack,
        },
    }),
}


export const darkMode = {
    styles : StyleSheet.create({
        main_container:{
            backgroundColor:Colors.colorBlue4,
            borderColor:Colors.colorBlue2,
        },
        number_button:{
            backgroundColor:Colors.colorBlue3,
            borderColor:Colors.colorBlue2,
        },
        text_number_button:{
            color:Colors.colorBlue1,
        },
        points_container:{
            borderColor:Colors.colorBlue2, 
        },
        text:{
            color:"white",
        },
        text_total_points:{
            color:"white",
        },
    }),
}