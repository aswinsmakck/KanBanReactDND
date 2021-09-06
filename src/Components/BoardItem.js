import React from 'react';
import Column from './UI/Column'
import Card from './Card'
import { connect } from 'react-redux'
import {EditListName, MoveList } from '../Actions/ListActions'
import { AddCardAndRef } from '../Actions/CardActions'
import _,{pickBy} from 'lodash';
import { DragSource,DropTarget,DragLayer } from 'react-dnd';
import {getEmptyImage} from 'react-dnd-html5-backend'
import CustomeDrag from './CustomDragLayer'

const Types = {
    Card : 'card',
    List : 'list',
}


const dndSpecDragSrc = {
    /*isDragging(props, monitor) {
        return monitor.getItem().id === props.id
    },*/
    
    beginDrag(props, monitor, component) {
    
    const item = {
        index: props.index,
        list: props.list
    }
    
    return item
    },

    endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
        // You can check whether the drop was successful
        // or if the drag ended but nobody handled the drop
        return
    }

    const item = monitor.getItem()

    const dropResult = monitor.getDropResult()
    console.log("-------------------------------------------------------------------drop result--------------------------------------", dropResult);
    // This is a good place to call some Flux action
    
    }
}

const specDropTarget = {

    hover(props, monitor, component) {

        if(monitor.getItemType() !== Types.List){console.log("**************************** return not list tyoe*******************************"); return;}
        
        let dragIndex = monitor.getItem().index;
        let hoverIndex = props.index;
        console.log("****************************** list drag index *********************************",dragIndex);
        console.log(arguments)
        const hoverBoundingRect = component.myRef.current.getBoundingClientRect();
		const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
		const clientOffset = monitor.getClientOffset();
		const hoverClientX = clientOffset.x - hoverBoundingRect.left;

        if(dragIndex < hoverIndex && hoverClientX > hoverMiddleX) {
            console.log("********************************************** veezhvenendru ninaithayo ******************************************");
            props.MoveList(monitor.getItem().list.id,props.list.id,props.boardId,true);
            monitor.getItem().index = hoverIndex;
        }
        else if(dragIndex > hoverIndex && hoverClientX < hoverMiddleX){
            props.MoveList(monitor.getItem().list.id,props.list.id,props.boardId,false);
            monitor.getItem().index = hoverIndex;
        }
    },
        
    drop(props, monitor, component ) {
		const id = props.list.id;
		const sourceObj = monitor.getItem();		
		if ( id !== sourceObj.listId ) console.log("----------------------------list item drop------------------------",sourceObj.card); //component.pushCard(sourceObj.card);
		return {
			listId: id
		};
	}
}

function collectDrag(connect, monitor) {
    console.log("connect",connect);
    return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
      connectDragPreview: connect.dragPreview()
    }
}

function collect(connect, monitor) {
    return {
      // Call this function inside render()
      // to let React DnD handle the drag events:
      connectDropTarget: connect.dropTarget(),
      // You can ask the monitor about the current drag state:
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
      itemType: monitor.getItemType()
    }
  }

class BoardItem extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isActive : false,
            textBoxVal : "",
            toggleTextBox : false,
            listNameTextBoxVal : "",
        }
        this.myRef = React.createRef();
    }

    componentDidMount(){
        this.props.connectDragPreview(getEmptyImage(),{});//<div>HI Hello</div>, {captureDraggingState:true, offsetX:100, offsetY:100});//getEmptyImage(), {});
        //this.props.connectDragPreview(<div>HI Hello</div>, {offsetX:100, offsetY:100});//getEmptyImage(), {});
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log("in board item comp should update", (!_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState)));
        console.log(nextProps);
        console.log(nextState);
        console.log(this.props);
        console.log("list name",this.props.list.name);
        console.log(this.state);
        //return !_.isEqual(this.props.cards, nextProps.cards) || !_.isEqual(this.state, nextState)
        return true;
    }

    showAddNewCardForm(evt){
        this.setState({isActive : true});
    }

    changeCardTextBoxValHandler(evt){
        this.setState({textBoxVal : evt.target.value});
    }

    closeForm(evt){
        this.setState({textBoxVal : "",isActive : false});
    }

    addNewCard(evt){
        if(this.state.textBoxVal.trim() === "") return;
        this.props.AddCardAndRef(this.props.list.id,this.state.textBoxVal)
        this.setState({
            isActive : false,
            textBoxVal : "",
        })
    }

    listNameChange(evt) {
        this.setState({listNameTextBoxVal : evt.target.value})
    }

    toggleListNameEdit(evt){
        
        this.setState({toggleTextBox : true})
    }

    saveEditedListName(evt){
        //if(this.state.listNameTextBoxVal.trim() === "") return;
        this.props.EditListName(this.props.list.id, this.state.listNameTextBoxVal)
        this.setState({toggleTextBox : false, listNameTextBoxVal : ""})
    }

    getCoords(evt){
        console.log("+++++++++++++++++++++++++++++++++++++++++ event +++++++++++++++++++++++++++++++++++++++",evt)
    }

    render(){
        console.log("board item rendered");
        let cards = this.props.cards;//Object.values(this.props.cards.byId);
        console.log(cards);
        const { isOver, canDrop, isDragging, connectDropTarget, connectDragSource, connectDragPreview } = this.props

        //if(isDragging) return <div style={{width:"100px",height:"100px",backgroundColor:"red"}} > </div>
        //this.props.connectDragPreview(getEmptyImage(), {captureDraggingState:true, offsetX : 100, offsetY : 100})
        return (
            <Column>
                {
                
                connectDragSource(connectDropTarget(
                
                <div ref={this.myRef} className="board-item">
                    <div className="board-item-header" style={{textAlign : "center", border : "1px solid grey"}}>
                        { this.state.toggleTextBox ? 
                            <input 
                                autoFocus 
                                style={{margin: "7px 0"}} 
                                type="text" 
                                value={this.state.listNameTextBoxVal ? this.state.listNameTextBoxVal : "" } 
                                onChange={this.listNameChange.bind(this)} 
                                onBlur={this.saveEditedListName.bind(this)} /> 
                            :
                            <h3 style={{margin : "5px 0"}} ><span onClick={this.toggleListNameEdit.bind(this)}>{this.props.list.name}</span></h3>}
                    </div>
                    <div className="cards" style={{border : "1px solid grey", borderTop:0,padding : "10px 5px"}}>
                        {
                            cards.map((card, index) => <Card card={card} listId={this.props.list.id} key={card.id} index={index} /> )
                        }
                        {   
                            this.state.isActive ? 
                                <div style={{marginTop : "8px"}}>
                                    <input type="text" value={this.state.textBoxVal ? this.state.textBoxVal : "" } onChange={this.changeCardTextBoxValHandler.bind(this)} style={{padding : "5px 0"}} /> 
                                    <button className="add-new-board" onClick={this.addNewCard.bind(this)} style={{marginTop : "10px", padding : "6px 20px",backgroundColor : "black"}}>Add</button>
                                    <span className="close-button" onClick={this.closeForm.bind(this)}>&times;</span>
                                </div>

                                :
                                
                                <button className="Add-Card" style={{marginTop : "8px"}} onClick={this.showAddNewCardForm.bind(this)}>Add Card</button> 
                        }
                    </div>
                </div>
                ))
                    } 
                    <CustomeDrag />
            </Column>
        )    
    }
}

const mapStateToProps = (state, ownProps) => {
    //console.log("---------------- cards complete --------", state.cards.byId)
    //let cards = //_.pickBy(state.cards.byId, (value, key)=> value.listId === ownProps.list.id) //Object.values(state.cards.byId).filter(card => card.listId === ownProps.list.id);
    //let cards = state.lists)
    console.log(ownProps)
    let list = state.lists.byId[ownProps.list.id] 
    console.log("*********************************************in render card***********************************",state);
    console.log("*********************************************in render card***********************************",list.cards);
    console.log("*********************************************in render card***********************************",state.cards.byId);
    let cards = list.cards.map(cardId => {
        return state.cards.byId[cardId]
    })
    console.log("filtered cards", cards)
    return {cards};
    //return { cards : {byId : {...cards} } , allIds : state.cards.allIds };
}

BoardItem = DragSource(Types.List,dndSpecDragSrc,collectDrag)(BoardItem);

BoardItem = DropTarget([Types.Card,Types.List],specDropTarget,collect)(BoardItem);


function collectDragLayer(monitor) {
    return {
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging()
    }
  }

export default connect(mapStateToProps, { EditListName, AddCardAndRef, MoveList })(BoardItem);

/*export default function BoardItem(props){
    return (<div>Hi</div>)
}*/