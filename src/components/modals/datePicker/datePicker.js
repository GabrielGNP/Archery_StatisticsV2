import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions } from "react-native";
import Modal from 'react-native-modal'
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from '@expo/vector-icons';

import { whiteMode, darkMode } from './styles/themeStyles';
import { configBasic } from '../../../global/variables';
import { Colors } from '../../../global/colors';

import BlueButton from '../../buttons/blueButton';
import RedButton from "../../buttons/redButton";

var gradientColorsTop = [Colors.colorBlue3,Colors.colorBlue2]
var gradientColorsBottom = [Colors.colorBlue3,Colors.colorBlue2]
var styleView = whiteMode
if(configBasic.darkMode==false){
	styleView = whiteMode
	gradientColorsTop = [Colors.colorBlue3,Colors.colorBlue2]
	gradientColorsBottom = [Colors.colorBlue3,Colors.colorBlue2]
}else{
	styleView = darkMode
	gradientColorsTop = [Colors.colorBlue4,"transparent"]
	gradientColorsBottom = ["transparent", Colors.colorBlue4]
}
const { width, height } = Dimensions.get("window");
// Constantes ajustadas para mostrar exactamente 5 elementos
const ITEM_WIDTH = 40; // Ancho de cada elemento
const ITEMS_TO_SHOW = 5; // Número de elementos visibles
const VIEWPORT_WIDTH = ITEM_WIDTH * ITEMS_TO_SHOW; // Ancho total basado en 5 elementos

const DatePicker = ({ date = new Date(), onConfirm, onCancel, visible, visibleFunction}) => {
	const [selectedDay, setSelectedDay] = useState(date.getDate());
	const [selectedMonth, setSelectedMonth] = useState(date.getMonth() + 1);
	const [selectedYear, setSelectedYear] = useState(date.getFullYear());

  const generateDaysArray = () => {
	const daysArray = Array.from({ length: 31 }, (_, i) => i + 1);
	
	return ["", "", ...daysArray, "", ""];
  };
  var numberYears = new Date().getFullYear() - 1950 + 1;
  const generateYearsArray = () => {
	const yearsArray = Array.from({ length: numberYears }, (_, i) => 1950 + i);
	return ["", "", ...yearsArray, "", ""];
  };

  const days = generateDaysArray();
  const months = ["", "", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
	"Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre", "", ""];
  const years = generateYearsArray();
  const monthNumbers = ["", "", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, "", ""];

  // Referencias para los FlatLists
  const dayRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);

  // Función actualizada para manejar el desplazamiento y selección
  const handleScrollEnd = (event, setFunction, data) => {
	const offsetY = event.nativeEvent.contentOffset.y;
	
	// Calculamos el índice del elemento central
	const index = Math.round(offsetY / ITEM_WIDTH) + 2; // +2 porque añadimos 2 elementos fantasma al principio
	
	// Verificar límites
	if (index >= 2 && index < data.length - 2) { // Ignoramos los elementos fantasma
	  setFunction(data[index]);
	}
  };

  // Función para desplazar los FlatLists a la posición inicial correcta
  const scrollToInitialPositions = () => {
	if (!visible) return;
	
	// Calcular las posiciones iniciales (ajustadas por los elementos fantasma)
	const dayIndex = days.findIndex(d => d === selectedDay);
	const monthIndex = monthNumbers.findIndex(m => m === selectedMonth);
	const yearIndex = years.findIndex(y => y === selectedYear);
	
	// Añadir un pequeño retraso para asegurar que los FlatLists estén renderizados
	setTimeout(() => {
	  if (dayRef.current && dayIndex !== -1) {
		// Calculamos el offset teniendo en cuenta que queremos que el elemento seleccionado
		// esté en la posición central (posición 2 de 5)
		const offset = Math.max(0, (dayIndex - 2) * ITEM_WIDTH);
		dayRef.current.scrollToOffset({ offset, animated: false });
	  }
	  
	  if (monthRef.current && monthIndex !== -1) {
		const offset = Math.max(0, (monthIndex - 2) * ITEM_WIDTH);
		monthRef.current.scrollToOffset({ offset, animated: false });
	  }
	  
	  if (yearRef.current && yearIndex !== -1) {
		const offset = Math.max(0, (yearIndex - 2) * ITEM_WIDTH);
		yearRef.current.scrollToOffset({ offset, animated: false });
	  }
	}, 10);
  };

  // Efecto para inicializar los scrolls cuando se abre el modal
  useEffect(() => {
	scrollToInitialPositions();
  }, [visible]);

  // Función para renderizar elementos
  const renderItem = (item, isSelected, isMonth) => (
	<View style={[
	  styles.item,
	  isSelected && styles.selected,
	  isMonth && styles.item_month,
	  item ==="" && styles.item_empty
	]}>
	  <Text style={[isSelected ? styles.selectedText : styles.itemText ]}>
		{item}
	  </Text>
	</View>
  );

  // Función para formatear la fecha como texto
  const formatSelectedDate = () => {
	const monthName = months.find((_, index) => monthNumbers[index] === selectedMonth) || "";
	return `${selectedDay} de ${monthName} ${selectedYear}`;
  };

  return (
	<Modal 
		isVisible={visible}
		onBackdropPress={visibleFunction}
		backdropOpacity={0.4}
		animationInTiming={400}
		animationOutTiming={400}
		style={{margin:0}}
	>
	  <View style={[styles.container_modal,styleView.styles.container_modal]}>
		<View style={{flexDirection:"row", width:"100%"}}>
		  <Text style={{flex:1, textAlign:"center",fontSize:20,color:Colors.colorBlue1}}>Día</Text>
		  <Text style={{flex:1.4, textAlign:"center",fontSize:20,color:Colors.colorBlue1}}>Mes</Text>
		  <Text style={{flex:1, textAlign:"center",fontSize:20,color:Colors.colorBlue1}}>Año</Text>
		</View>
		<View style={[styles.indicator_container]}>
			  <Feather name="chevron-left" size={35} color={Colors.colorBlue2} style={[styles.indicator,{right:-20,alignSelf:"flex-end"}]}/>
			  <Feather name="chevron-right" size={35} color={Colors.colorBlue2} style={[styles.indicator,{left:-20,alignSelf:"flex-start"}]}/>
		</View>
		<View style={styles.pickerContainer}> 
		   <LinearGradient
			  colors={gradientColorsTop}
			  pointerEvents="none"
			  style={[styles.shadow]}
			  start={{x:0.5,y:0.05}}
			  end={{x:0.5, y:1}}
		  ></LinearGradient>
		  <LinearGradient
			  colors={gradientColorsBottom}
			  pointerEvents="none"
			  style={[styles.shadow,styles.shadow_bottom]}
			  start={{x:0.5,y:0.05}}
			  end={{x:0.5, y:1}}
		  ></LinearGradient>
		  {/* Día */}
		  <FlatList
			ref={dayRef}
			data={days}
			keyExtractor={(item, index) => `day-${index}`}
			vertical
			showsVerticalScrollIndicator={false}
			snapToInterval={ITEM_WIDTH}
			decelerationRate="fast"
			onMomentumScrollEnd={(event) => handleScrollEnd(event, setSelectedDay, days)}
			getItemLayout={(data, index) => ({
			  length: ITEM_WIDTH,
			  offset: ITEM_WIDTH * index,
			  index,
			})}
			renderItem={({ item }) => renderItem(item, selectedDay === item, false)}
			style={[styles.list]}
		  />

		  {/* Mes */}
		  <FlatList
			ref={monthRef}
			data={months}
			keyExtractor={(item, index) => `month-${index}`}
			vertical
			showsVerticalScrollIndicator={false}
			snapToInterval={ITEM_WIDTH}
			decelerationRate="fast"
			onMomentumScrollEnd={(event) => {
			  const offsetY = event.nativeEvent.contentOffset.y;
			  const index = Math.round(offsetY / ITEM_WIDTH) + 2;
			  if (index >= 2 && index < monthNumbers.length - 2) {
				setSelectedMonth(monthNumbers[index]);
			  }
			}}
			getItemLayout={(data, index) => ({
			  length: ITEM_WIDTH,
			  offset: ITEM_WIDTH * index,
			  index,
			})}
			renderItem={({ item, index }) => renderItem(item, selectedMonth === monthNumbers[index], true)}
			style={[styles.list]}
		  />

		  {/* Año */}
		  <FlatList
			ref={yearRef}
			data={years}
			keyExtractor={(item, index) => `year-${index}`}
			vertical
			showsVerticalScrollIndicator={false}
			snapToInterval={ITEM_WIDTH}
			decelerationRate="fast"
			onMomentumScrollEnd={(event) => handleScrollEnd(event, setSelectedYear, years, false)}
			getItemLayout={(data, index) => ({
			  length: ITEM_WIDTH,
			  offset: ITEM_WIDTH * index,
			  index,
			})}
			renderItem={({ item }) => renderItem(item, selectedYear === item)}
			style={[styles.list]}
		  />
		</View>

		<View style={styles.buttonContainer}>
		  <RedButton
		  text="Cancelar"
		  style={{width:150}}
		  textSize={20}
		  onPress={() => {
			visibleFunction();
			  if (onCancel) onCancel();
		  }}
		  ></RedButton>
		  <BlueButton 
			text="Confirmar"
			style={{width:150}}
			textSize={20} 
			onPress={() => {
			  
			  const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
			  const validDay = Math.min(selectedDay, daysInMonth);
			  var dateConfirmed = new Date()
			  dateConfirmed.setFullYear(selectedYear)
			  dateConfirmed.setDate(validDay)
			  dateConfirmed.setMonth(selectedMonth - 1)
			  onConfirm(dateConfirmed);
			  visibleFunction();
			}}></BlueButton>
		</View>

	  </View>
	</Modal>

  );
};

const styles = StyleSheet.create({

  buttonText: {
	color: "white",
	fontWeight: "bold",
  },
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
  modalContainer: {
	flex: 1,
	justifyContent: "center",
	alignItems: "center",
	backgroundColor: "rgba(0,0,0,0.5)",
  },
  
  title: {
	fontSize: 18,
	fontWeight: "bold",
	marginBottom: 20,
  },
  pickerContainer: {
	flexDirection:"row",
	position: "relative",
	height: VIEWPORT_WIDTH,
	width: "100%",
	alignItems: "center",
	
  },
  list: {
	height: VIEWPORT_WIDTH,
	// height: 150,
	marginVertical: 5,
	
	padding:0
  },
  item: {
	width: 80,
	justifyContent: "center",
	alignItems: "center",
	alignSelf:"center",
	height: ITEM_WIDTH,
	// borderRadius:20,
	borderBottomWidth:2,
	borderColor:Colors.colorBlue2,
	// backgroundColor: Colors.colorBlue3,
  },
  item_month: {
	width: 120,
  },
  item_empty:{
	borderBottomWidth:0,
	backgroundColor: Colors.colorBlue4,
  },
  selected: {
	backgroundColor: Colors.colorBlue3,
	
  },
  itemText: {
	color:Colors.colorBlue1,
	fontSize:17
  },
  selectedText: {
	color:Colors.colorBlue1,
	fontWeight: "bold",
	fontSize:20
  },
  centerIndicator: {
	position: "absolute",
	top: "50%",
	width: ITEM_WIDTH + 4,
	height: 50,
	marginTop: -25,
	borderWidth: 2,
	borderColor: "#007AFF",
	borderRadius: 5,
	backgroundColor: "transparent",
	zIndex: -1,
  },
  buttonContainer: {
	flexDirection: "row",
	marginTop: 15,
	justifyContent: "space-between",
	width: "100%",
  },
  cancelButton: {
	padding: 10,
	borderRadius: 5,
	borderWidth: 1,
	borderColor: "#ccc",
	minWidth: 100,
	alignItems: "center",
  },
  confirmButton: {
	backgroundColor: "#007AFF",
	padding: 10,
	borderRadius: 5,
	minWidth: 100,
	alignItems: "center",
  },

  shadow:{
	width:"100%",
	height:40,
	top:0,
	position:"absolute",
	zIndex:1,
  },
  shadow_bottom:{
	bottom:0,
	top:null
  },

  indicator_container:{
	position:"absolute",
	zIndex:2,
	width:"100%",
	marginLeft:20,
	height:50,
	top:"43.6%",
	borderRadius:15,
	justifyContent:"center",
  },
  indicator:{
	position:"absolute",
	width:38,
	height:38,
	backgroundColor:Colors.colorBlue3,
	borderRadius:30,
	borderColor:Colors.colorBlue1,
	borderWidth:1,
	right:-20,
	alignSelf:"flex-end",
  },
});

export default DatePicker;