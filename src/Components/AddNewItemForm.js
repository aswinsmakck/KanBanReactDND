import Button from './UI/Button'

export default function AddNewItemForm(props){
    return (
    <div style={{alignSelf:"center"}}>
        <input type="text" className="textbox" value={props.boardName} onChange={props.onChange} />
        <Button styleName="add-new-board" onClick={(evt)=>props.onSubmit(evt)} style={{ margin: "0 20px"}}> Add </Button>
    </div>)
}