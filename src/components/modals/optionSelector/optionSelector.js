import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions, ScrollView } from "react-native";
import Modal from 'react-native-modal'
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from '@expo/vector-icons';

import { whiteMode, darkMode } from './styles/themeStyles';
import { themeStyleView } from '../../../global/variables';
import { Colors } from '../../../global/colors';

import BlueButton from '../../buttons/blueButton';
import RedButton from "../../buttons/redButton";

var gradientColorsTop = [Colors.colorBlue3,Colors.colorBlue2]
var gradientColorsBottom = [Colors.colorBlue3,Colors.colorBlue2]
var styleView = whiteMode
if(themeStyleView=="whiteMode"){
	styleView = whiteMode
	gradientColorsTop = [Colors.colorBlue3,Colors.colorBlue2]
	gradientColorsBottom = [Colors.colorBlue3,Colors.colorBlue2]
}else{
	styleView = darkMode
	gradientColorsTop = [Colors.colorBlue4,"transparent"]
	gradientColorsBottom = ["transparent", Colors.colorBlue4]
}



const OptionSelector = ({visibleFunction, visible, selectedOption, listOptions}) => {

	const [selectedStyles, setSelectedStyles] = useState([]);

	function changeOption(item, selectedOption){
		let list = [...selectedStyles];

		list[selectedOption.current] = Colors.colorBlue4;
		list[item] = Colors.colorBlue3;

		setSelectedStyles(list);
		selectedOption.current = item;

		//visibleFunction();
	}

	
	useEffect(() => {
		let auxList = []
		listOptions.forEach((option, index) => {
			if (index == selectedOption.current)
				auxList.push(Colors.colorBlue3);
			else auxList.push(Colors.colorBlue4);
			
		});
		setSelectedStyles(auxList)
	},[])
	


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
		<LinearGradient
				colors={gradientColorsTop}
				pointerEvents="none"
				style={[styles.shadow]}
				start={{x:0.5,y:0.5}}
				end={{x:0.5, y:1}}
			></LinearGradient>
			<LinearGradient
				colors={gradientColorsBottom}
				pointerEvents="none"
				style={[styles.shadow,styles.shadow_bottom]}
				start={{x:0.5,y:0.05}}
				end={{x:0.5, y:0.7}}
			></LinearGradient>
		<ScrollView style={{paddingTop:25}}>
			{listOptions.map((option, index) => (
				<TouchableOpacity 
					key={index}
					style={[styles.optionButton, { backgroundColor: selectedStyles[index] }]}
					onPress={() => changeOption(index, selectedOption)}
				>
					<Text style={styles.textOption}>{option}</Text>
				</TouchableOpacity>
			))}
			<View style={{height:30}}></View>
		</ScrollView>
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
		borderBottomWidth:0,
		flexDirection:"column",
		padding: 20,
		borderWidth:2,
	},
	optionButton:{
		backgroundColor:Colors.colorBlue4,
		padding:10,
	},
	optionButton_Selected:{
		backgroundColor:Colors.colorBlue3,
		padding:10,
	},
	textOption:{
		color:Colors.colorBack2,
		fontSize:20,
		fontWeight:"500",
		textAlign:"center"
	},
	shadow:{
		width:"100%",
		height:30,
		top:10,
		position:"absolute",
		zIndex:1,
		borderRadius:50,
		left:20
	},
	shadow_bottom:{
		bottom:0,
		top:null,
		left:20
	},
});

export default OptionSelector;