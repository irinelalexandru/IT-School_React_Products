// In reducer definim state-ul initial 
export const initialState = {
    // initial tema este deschisa/light
    theme: "light"
}

// Definim reducer-ul - exte cel care o sa modifice state-ul global
// Reducer-ul va primi ca si parametri state-ul curent si actiunea
export function themeReducer(state, action){
    // returnam un nou state
    switch (action.type){
        case "LIGHT": {
            return {
                theme: "light"
            }
        }
        case "DARK": {
            return {
                theme: "dark"
            }
        }
        default : {
            return state;
        }
    }
}