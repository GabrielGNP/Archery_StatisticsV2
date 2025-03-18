
//whiteMode
//darkMode
export var themeStyleView = "darkMode"

export function switchStyleMode(){
    if(themeStyleView == "whiteMode")
    {
        themeStyleView = "darkMode"
    }
    else
    {
        themeStyleView = "whiteMode"
    }
        
}



export var exampleListSessions =[
    {
        date:new Date(2024,8,9),
        bow: "Recurvo",
        pound: 45,
        distance: 70,
        setsList:[[8,7,8,6,9,8],[7,8,8,7,9,9],[7,8,8,10,9,"X"]],
        record:"second",
    },
    {
        date:new Date(2024,8,10),
        bow: "Recurvo",
        pound: 45,
        distance: 70,
        setsList:[[8,7,7,8,6,7],[5,7,7,7,8,7],[9,8,9,8,8,7]],
        record:"thirt"
    },
    {
        date:new Date(2025,2,18),
        bow: "Recurvo",
        pound: 45,
        distance: 70,
        setsList:[[8,7,9,9,8,8],[9,9,8,8,9,8],[10,10,8,7,9,8]],
        record:"first"
    }, 
]
