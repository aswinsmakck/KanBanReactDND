import { useHistory } from "react-router-dom";

export default function GoBack(props){
    useHistory().goBack();
}