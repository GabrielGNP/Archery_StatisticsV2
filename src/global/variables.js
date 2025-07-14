import { darkMode } from "../screens/logIn/styles/themeStyles"

export var configBasic = {
    userID : -1,
    darkMode : false,
    modelViewSesions : "medium" //"long", "medium", "short"
}
// ========================= 
//whiteMode = false
//darkMode = true
export function switchStyleMode(){
    if(configBasic.darkMode == true)
        configBasic.darkMode = false
    else
        configBasic.darkMode = true
}

export var exampleListSessions =[
    {
        date:new Date(2024,8,9),
        bow: "Recurvo",
        pound: 45,
        distance: 70,
        setsList:[["8","7","8","6","9","8"],["7","8","8","7","9","9"],["7","8","8","10","9","X"]],
        record:"second",
        typeSession:0
    },
    {
        date:new Date(2024,8,10),
        bow: "Recurvo",
        pound: 45,
        distance: 70,
        setsList:[["8","7","7","8","6","7"],["5","7","7","7","8","7"],["9","8","9","8","8","7"]],
        record:"thirt",
        typeSession:0
    },
    {
        date:new Date(2025,2,18),
        bow: "Recurvo",
        pound: 45,
        distance: 70,
        setsList:[["8","7","9","9","8","8"],["9","9","8","8","9","8"],["10","10","8","7","9","8"]],
        record:"first",
        typeSession:0
    }, 
    {
        date:new Date(2025,7,5),
        bow: "Recurvo",
        pound: 45,
        distance: 70,
        setsList:[["X","-","+"],["✓","✓","+"],["-","✓","_"]],
        record:"",
        typeSession:1
    }, 
]

export var typeSesionsList = [
    {
        id:1,
        name:"Clásico",
        points:["0","1","2","3","4","5","6","7","8","9","10","X"],
        values:[0,1,2,3,4,5,6,7,8,9,10,10]
    },
    {
        id:2,
        name:"4 puntos",
        points:["X","-","+","✓"],
        values:[0,1,2,3],
    }
]