import {useState} from "react";

function categoryButton({list, currState, setState}){

    const handleStyle = (cat) =>{
        return currState.includes(cat) ? true : false;
    
    }

    const handleOnClick = (e) => {
        let selectedValue= e.target.value;
        if(currState.includes(selectedValue)){
            setState(currState.filter(item => item !== selectedValue))
        }else{
            setState([...currState, selectedValue])
        }
    }
    return(
        <div>
            {list.map(category => <button style={handleStyle(category) ? {color:"red"} : {color:''}}
            key={category} value={category} onClick={handleOnClick}>{category}</button>)}
        </div>
    )
}
export default categoryButton