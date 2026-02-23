import { createContext,useEffect,useState } from "react";
import {properties} from '../assets/assets.js'

export const DataContext=createContext()

const DataContextProvider = (props) =>{
    const LOCATIONS = [
    "Visakhapatnam",
    'Hyderabad',
    "Bangalore",
    "Vijayawada"
];
    const [selectedLocation, setSelectedLocation] = useState("");
    const currency='₹';
    const [savedProperty,setSavedProperty]=useState({});

    const saveProperty = async (propertyId) =>{
        let savedData= structuredClone(savedProperty);

        if(savedData[propertyId]) {
           delete savedData[propertyId]
        }
        else{
            savedData[propertyId]=true;
        }
        setSavedProperty(savedData);
    }

    useEffect(()=>{

    },[savedProperty])

   const data={
    properties, LOCATIONS,selectedLocation,setSelectedLocation,currency,saveProperty,savedProperty
    
}

    return (
        <DataContext.Provider value={data}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataContextProvider;