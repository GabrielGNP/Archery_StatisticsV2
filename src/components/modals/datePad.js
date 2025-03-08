import React, {useRef, useState, useEffect} from 'react';
import { StyleSheet, Text, View,TouchableOpacity, FlatList, Dimensions } from 'react-native';
import Modal from 'react-native-modal'
import { infoDate } from '../../global/variables';
import { whiteMode, darkMode } from '../../styles/components/modals/datePad/themeStyles';
import { themeStyleView } from '../../global/variables';
import { Colors } from '../../styles/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import CustomDatePicker from './CustomDatePicker';

export default function DatePad({ visible, visibleFunction }) {

    var gradientColorsTop = [Colors.colorBack2,Colors.colorBlue2]
    var gradientColorsBottom = [Colors.colorBack2,Colors.colorBlue2]
    var styleView = whiteMode
    if(themeStyleView=="whiteMode"){
        styleView = whiteMode
        gradientColorsTop = [Colors.colorBack2,Colors.colorBlue2]
        gradientColorsBottom = [Colors.colorBack2,Colors.colorBlue2]
    }else{
        styleView = darkMode
        gradientColorsTop = [Colors.colorBack3,"transparent"]
        gradientColorsBottom = ["transparent", Colors.colorBack3]
    }
    
    const { width, height } = Dimensions.get("window");
    
    const flatListRef = useRef(null);

    const obtenerFecha = () => {
        const fecha = new Date();
        const dia = fecha.getDate();
        const mes = fecha.getMonth() + 1;
        const año = fecha.getFullYear();
        return {day:dia, month:mes, year:año};
      };
    
    var actualDate = obtenerFecha();
    console.log(actualDate.day+" "+actualDate.month+" "+actualDate.year)
    
    

    var generateDaysList = () => {
        var daysInMonth = actualDate.month.toString()
        if(actualDate.month==2){
            bisiesto = actualDate.year % 4
            if(bisiesto==0){
                daysInMonth = "2B"
            }
        }
        return infoDate[daysInMonth]
    }
    var days = generateDaysList()
    var daysList = [...days,...days,...days]
    // Posición inicial en la parte central del array triplicado
    const posicionInicial = days.length;

    useEffect(() => {
        setTimeout(() => {
          flatListRef.current?.scrollToIndex({
            index: posicionInicial,
            animated: false,
          });
        }, 100);
      }, []);

    const handleScrollEnd = (event) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / 50);

        setDiaSeleccionado(datosDuplicados[index % days.length]);

        // Si llegamos cerca del inicio o final, saltamos al centro
        if (index < days.length || index >= days.length * 2) {
            setTimeout(() => {
            flatListRef.current?.scrollToIndex({
                index: posicionInicial,
                animated: false,
            });
            setDiaSeleccionado(days[0]);
            }, 100);
        }
    };
    

    const [date, setDate] = useState(new Date());

    return(
        <Modal 
            isVisible={visible}
            onBackdropPress={visibleFunction}
            backdropOpacity={0.4}
            animationInTiming={400}
            animationOutTiming={400}
            style={{margin:0}}
        >
            <View style={[styles.container_modal,styleView.styles.container_modal]}>
                <View style={{flexDirection:"row",justifyContent:"space-evenly",}}>
                    <Text style={{color:Colors.colorBlue1, fontSize:18}}>Día</Text>
                    <Text style={{color:Colors.colorBlue1, fontSize:18}}>Mes</Text>
                    <Text style={{color:Colors.colorBlue1, fontSize:18}}>Año</Text>
                </View>
                <View style={styles.container_scrolls}>
                    <View style={[styles.container_scroll]}>
                        <LinearGradient
                            colors={gradientColorsTop}
                            style={[styles.shadow]}
                            start={{x:0.5,y:0.05}}
                            end={{x:0.5, y:1}}
                        ></LinearGradient>
                        <LinearGradient
                            colors={gradientColorsBottom}
                            style={[styles.shadow,styles.shadow_bottom]}
                            start={{x:0.5,y:0.05}}
                            end={{x:0.5, y:1}}
                        ></LinearGradient>
                        <View style={[styles.indicator_container,{top:(((height*0.45)-40)*0.40)-20}]}>
                            <Feather name="chevron-left" size={35} color={Colors.colorBlue2} style={styles.indicator}/>
                        </View>
                        <FlatList
                            ref={flatListRef}
                            data={daysList}
                            keyExtractor={(item) => item.toString()}
                            showsHorizontalScrollIndicator={false}
                            initialScrollIndex={(daysList.length/3)+ actualDate.day - 1}
                            getItemLayout={(data, index) => ({
                                length: 20, // Ancho de cada item (ajustar si es necesario)
                                offset: 20 * index,
                                index,
                            })}
                            renderItem={({ item }) => (
                                <Text style={[styles.date_in_scroll,styleView.styles.date_in_scroll]}>{item}</Text>
                            )}
                        />
                    </View>
                    <View style={[styles.container_scroll]}>
                        <LinearGradient
                            colors={gradientColorsTop}
                            style={[styles.shadow]}
                            start={{x:0.5,y:0.05}}
                            end={{x:0.5, y:1}}
                        ></LinearGradient>
                        <LinearGradient
                            colors={gradientColorsBottom}
                            style={[styles.shadow,styles.shadow_bottom]}
                            start={{x:0.5,y:0.05}}
                            end={{x:0.5, y:1}}
                        ></LinearGradient>
                        <View style={[styles.indicator_container,{top:(((height*0.45)-40)*0.40)-20}]}>
                            <Feather name="chevron-left" size={35} color={Colors.colorBlue2} style={styles.indicator}/>
                        </View>
                        <FlatList
                            ref={flatListRef}
                            data={Array.from({ length: 12 }, (_, i) => i + 1)}
                            keyExtractor={(item) => item.toString()}
                            showsHorizontalScrollIndicator={false}
                            initialScrollIndex={actualDate.month - 1}
                            getItemLayout={(data, index) => ({
                                length: 20, // Ancho de cada item (ajustar si es necesario)
                                offset: 20 * index,
                                index,
                            })}
                            renderItem={({ item }) => (
                                <Text style={[styles.date_in_scroll,styleView.styles.date_in_scroll]}>{item}</Text>
                            )}
                        />
                    </View>
                    <View style={[styles.container_scroll]}>
                        <LinearGradient
                            colors={gradientColorsTop}
                            style={[styles.shadow]}
                            start={{x:0.5,y:0.05}}
                            end={{x:0.5, y:1}}
                        ></LinearGradient>
                        <LinearGradient
                            colors={gradientColorsBottom}
                            style={[styles.shadow,styles.shadow_bottom]}
                            start={{x:0.5,y:0.05}}
                            end={{x:0.5, y:1}}
                        ></LinearGradient>
                        <View style={[styles.indicator_container,{top:(((height*0.45)-40)*0.40)-20}]}>
                            <Feather name="chevron-left" size={35} color={Colors.colorBlue2} style={styles.indicator}/>
                        </View>
                        <FlatList
                            ref={flatListRef}
                            data={daysList}
                            keyExtractor={(item) => item.toString()}
                            showsHorizontalScrollIndicator={false}
                            initialScrollIndex={actualDate.day - 1}
                            getItemLayout={(data, index) => ({
                                length: 20, // Ancho de cada item (ajustar si es necesario)
                                offset: 20 * index,
                                index,
                            })}
                            renderItem={({ item }) => (
                                <Text style={[styles.date_in_scroll,styleView.styles.date_in_scroll]}>{item}</Text>
                            )}
                        />
                    </View>
                </View>
                <TouchableOpacity 
                        style={[styles.central_button,styleView.styles.central_button]}
                        onPress={visibleFunction}
                    >
                        <Text style={{}}>HOla</Text>
                </TouchableOpacity>
        
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    container_modal:{
        position:"absolute",
        bottom:"0",
        height:"45%",
        width:"100%",
        borderStartStartRadius:50,
        borderEndStartRadius:50,
        borderRadius:50,
        flexDirection:"column",
        padding: 20,
        borderWidth:2,
    },
    container_scrolls:{
        height:"80%",
        flexDirection:"row",
        justifyContent:"space-evenly",
    },
    container_scroll:{
        width:50,
        // height:55
    },
    shadow:{
        width:"100%",
        height:20,
        position:"absolute",
        zIndex:1,
        display:"none"
    },
    shadow_bottom:{
        bottom:0
    },
    indicator_container:{
        position:"absolute",
        zIndex:2,
        // backgroundColor:"#C1D3F755",
        width:"100%",
        height:50,
        borderRadius:15,
        justifyContent:"center"
    },
    indicator:{
        width:38,
        height:38,
        right:-30,
        backgroundColor:Colors.colorBlue3,
        borderRadius:30,
        borderColor:Colors.colorBlue1,
        borderWidth:1,
        alignSelf:"center",
    },
    date_in_scroll:{
        width: 50, 
        height: 50, 
        textAlign:"center",
        textAlignVertical:"center",
        alignSelf:"center",
        marginHorizontal: 5, 
        borderRadius: 15,
        margin:1,
        fontSize:25,
        fontWeight:"bold",
        borderWidth:1
    },



    central_button:{
        height:30,
        width:"100%",
        marginTop:10
    },
    


})