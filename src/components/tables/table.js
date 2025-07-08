import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function Table(prop) {
    const { titles, data , stylesTable={}, selected} = prop
    //styles.table
    //  son los estilos de la tabla general
    //
    //styles.titles_row
    //  son los estilos de la linea de los títulos
    //
    //styles.title
    //  son los estilos de la celda de título
    //
    //styles.data_row
    //  son los estilos de la linea de los datos
    //
    //styles.data_row_selected
    //  Son los estilos de la linea de los datos remarcada o seleccionada
    //
    //styles.data
    //  son los estilos de la celda de datos

    var titles_cells = []
    var datas_rows = []

    titles.forEach(title => {
        titles_cells.push(<Text key={title} style={[stylesBasic.title, stylesTable.title]}>{title}</Text>)
    });
    
    var countRow = 0;
    
    function buildRow(dataRow, selected){
        var data_row = []
        var count = 0
        dataRow.forEach( data => {
            if(selected == true)
            {
                data_row.push(<Text key={countRow+"_"+count} style={[stylesBasic.data_selected, stylesTable.data_selected]}>{data}</Text>)
            }
            else
                data_row.push(<Text key={countRow+"_"+count} style={[stylesBasic.data, stylesTable.data]}>{data}</Text>)
            count++
        })
        return data_row;
    }

    if(typeof(selected)=="number")
        data.forEach(dataRow => {
            var data_row;
            if(countRow==selected)
            {
                data_row = buildRow(dataRow, true)
                datas_rows.push(<View key={countRow} style={[stylesBasic.data_row_selected, stylesTable.data_row_selected]}>{data_row}</View>)
            }else{
                data_row = buildRow(dataRow, false)
                datas_rows.push(<View key={countRow} style={[stylesBasic.data_row, stylesTable.data_row]}>{data_row}</View>)
            }              
            countRow++;
        })

    if(typeof(selected)=="object")
        data.forEach(dataRow => {
            var data_row;
     
            if(selected.includes(countRow))
            {
                data_row = buildRow(dataRow, true)
                datas_rows.push(<View key={countRow} style={[stylesBasic.data_row_selected, stylesTable.data_row_selected]}>{data_row}</View>)
            }else{
                data_row = buildRow(dataRow, false)
                datas_rows.push(<View key={countRow} style={[stylesBasic.data_row, stylesTable.data_row]}>{data_row}</View>)
            }
            countRow++;
        })

    if(typeof(selected)!="object" && typeof(selected)!="number")
        data.forEach(dataRow => {
            var data_row;
            
            data_row = buildRow(dataRow, false)
            datas_rows.push(<View key={countRow} style={[stylesBasic.data_row, stylesTable.data_row]}>{data_row}</View>)
            
            countRow++;
        })


    return ( 
        <View style={[stylesBasic.table, stylesTable.table]}>
            <View style={[stylesBasic.titles_row, stylesTable.titles_row]}>
                {titles_cells}
            </View>
            <View style={[stylesBasic.container_rows,stylesTable.container_rows]}/*container de rows de datos*/>
                {datas_rows}
            </View>
        </View>
)}


const stylesBasic = StyleSheet.create({
    table:{
        width: "100%",
        elevation:10
    },
    titles_row:{
        flexDirection:"row",
        borderBottomColor: "white",
        borderBottomWidth: 1,
    },
    title:{
        flex: 1,
        textAlign: "center",
        fontSize:20,
    },

    container_rows:{
        flexDirection: "column"
    },
    data_row:{
        flexDirection: "row",
        paddingTop:3,
        paddingBottom: 3,
    },
    data_row_selected:{
        flexDirection: "row",
        paddingTop:3,
        paddingBottom: 3,
    },
    data:{
        flex: 1,
        textAlign: "center",
        maxWidth: "33%",
        fontSize: 18
    },
    data_selected:{
        flex: 1,
        textAlign: "center",
        maxWidth: "33%",
        fontSize: 18,
        fontWeight:"600"
    }
})