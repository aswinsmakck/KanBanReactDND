import React from "react";
import {Link , withRouter} from 'react-router-dom';
import ModalWindow from './UI/ModalWindow'
import Button from './UI/Button'
import { RemoveCard, EditCardTitle , EditCardDescription, MoveCard, MoveCardToList} from '../Actions/CardActions'
import { connect } from 'react-redux'
import _ from 'lodash';
import { findDOMNode } from 'react-dom';
import { DropTarget , DragSource } from 'react-dnd';

const Types = {
    Card : 'card'
}

const dndSpecDropTrgt = {
    hover(props, monitor, component) {
        console.log("-----------------------------------------------hover--------------------------------",arguments);
        const dragIndex = monitor.getItem().index;
		const hoverIndex = props.index;
        const hoverCardId = props.card.id;
		const sourceListId = monitor.getItem().listId;	
        const dragCardId =monitor.getItem().card.id;
        console.log(hoverIndex);
		if (dragIndex === hoverIndex) {
			//return;
		}

		const hoverBoundingRect = component.myRef.current.getBoundingClientRect();
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
		const clientOffset = monitor.getClientOffset();
		const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            
        console.log(hoverClientY)

        console.log(hoverMiddleY)
        let isDownwards = false;
		
        
        console.log("can move", props.listId === sourceListId);
        console.log(props.listId);
        console.log(sourceListId);
        if ( props.listId === sourceListId ) {
            if (dragIndex < hoverIndex && hoverClientY > hoverMiddleY) {
                isDownwards = true;
            }
            else if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) {
            }
            else {
                return;
            }
            console.log("---------------------------------------------calling moving------------------------------------------------------");
			props.MoveCard(hoverCardId, dragCardId,sourceListId,isDownwards);
			monitor.getItem().index = hoverIndex;
		}
        else{
            console.log("*****************************************************************************************")
            props.MoveCardToList(dragCardId, sourceListId,  props.listId, hoverIndex);
            //props.MoveCard(hoverCardId, dragCardId,isDownwards);
            monitor.getItem().index = hoverIndex;
            monitor.getItem().listId = props.listId;
        }		
    }
}

const dndSpecDragSrc = {
    /*isDragging(props, monitor) {
        return monitor.getItem().id === props.id
    },*/
    
    beginDrag(props, monitor, component) {
    
    const item = {
        index: props.index,
        card: props.card,
        listId: props.listId,
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
    if(props.card.listId !== dropResult.listId){
        console.log("-------------------move moddu---------------------------------------", props.card.listId, dropResult.listId, item.card.id)


    }

    //CardActions.moveCardToList(item.id, dropResult.listId)

    }
}

function collect(connect, monitor) {
    console.log("connect",connect);
    return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    }
}

class Card extends React.Component{

    constructor(props){
       super(props);
       console.log("constructor",props);

       this.myRef = React.createRef();

       this.state = {
           toggleTextBox : false,
           textBoxVal : "",
           editDescription : false,
           textArea : "",
       };
    }
    static getDerivedStateFromProps(props, state){
        if(props.card.id === props.match.params.cardid){
            return {
                showCardModal : true,
            }
        }
        return {
            showCardModal : false,
        };
    }
    shouldComponentUpdate(nextProps, nextState){
        
            console.log("in card item comp should update", (!_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState)));
            console.log(this.props.card.title);
            console.log(nextProps);
            console.log(nextState);
            console.log(this.props);
            console.log(this.state);
        
        //return !_.isEqual(this.props.card, nextProps.card) || !_.isEqual(this.state, nextState)
        return true;
    }

    component

    toggleCardNameEdit(evt){
        this.setState({toggleTextBox : true})
    }

    cardNameEdit(evt){
        this.setState({textBoxVal : evt.target.value})
    }

    saveEditedCardName(evt){
        //if(this.props.textBoxVal.trim())
        this.props.EditCardTitle(this.props.card.id, this.state.textBoxVal)
        this.setState({textBoxVal:"",toggleTextBox : false})
    }

    toggleCardDescriptionEdit(evt){
        if(this.state.editDescription){
            this.setState({editDescription : false, textArea : ""})
        }
        else{
            this.setState({editDescription : true})
        }
    }

    cardDescChange(evt){
        this.setState({textArea : evt.target.value})
    }
    
    saveEditedCardDesc(evt){
        if(this.state.textArea.trim() === "") return;
        this.props.EditCardDescription(this.props.card.id,this.state.textArea)
        this.setState({textArea : "", editDescription : false});
    }

    closeCardModal(evt){
        this.props.history.goBack();
        this.setState({
            editDescription : false,
            textArea : "",
            showCardModal : false,
        })
        
    }

    render(){

        const { isDragging, connectDragSource, connectDropTarget } = this.props;
console.log("------------------------------ is dragging --------------------------------------",isDragging);

//if(isDragging) alert("poda");
        return connectDragSource(connectDropTarget(
            <div ref={this.myRef} className="card">
                <h4 className="card-details tempClass">
                    {
                        this.state.toggleTextBox ? 

                        <input 
                        autoFocus 
                        style={{margin: "7px 0", width:"80%"}} 
                        type="text" 
                        value={this.state.textBoxVal ? this.state.textBoxVal : ""}
                        onChange = {this.cardNameEdit.bind(this)}
                        onBlur={this.saveEditedCardName.bind(this)}
                        /> 

                        : 

                        <Link className="Link" onClick={(evt)=>this.setState({showCardModal : true})} style={{flex : "1 0 auto"}} to={{pathname : `/board/${this.props.match.params.id}/${this.props.listId}/${this.props.card.id}`}}>
                            <span>{this.props.card.title}</span>
                        </Link>
                     } 

                    {
                    this.state.toggleTextBox ?
                        <span style={{alignSelf:"center"}}>
                            <i onClick={this.saveEditedCardName.bind(this)} style={{color:"green"}} className="fas fa-check"></i>
                        </span>

                    :

                        <span>
                            <i onClick={this.toggleCardNameEdit.bind(this)} style={{fontWeight : "normal"}} className="fas fa-edit"></i>
                            <i onClick={(evt) => this.props.RemoveCard(this.props.card.id, this.props.listId)} style={{fontWeight : "normal", marginLeft:"5px"}} className="far fa-trash-alt"></i>
                        </span>

                    }
                </h4>
                {
                    this.state.showCardModal &&
                    <ModalWindow modalHeader="Card Details" onClose={this.closeCardModal.bind(this)}>
                        <div style={{alignSelf:"center", width:"100%"}}>
                            <h1>Card - {this.props.card.title}</h1>
                            <h4>Description</h4>
                            { this.state.editDescription ?
                                <div>
                                    <textarea className="card-edit-desc" onChange={this.cardDescChange.bind(this)} value={this.state.textArea ? this.state.textArea : ""} />

                                    <div style={{display:"flex"}}>
                                        <Button styleName="add-new-board" onClick={this.saveEditedCardDesc.bind(this)} style={{margin : "10px 20px 0 0"}}> Save </Button>
                                        <span onClick={this.toggleCardDescriptionEdit.bind(this)} style={{alignSelf : "center"}} className="close-button">&times;</span>
                                    </div>
                                </div>
                                :
                                <div className="card-description" onClick={this.toggleCardDescriptionEdit.bind(this)} >{this.props.card.desc && this.props.card.desc !== "" ? this.props.card.desc : "Add detailed description..."}</div>
                            }
                        </div>
                    </ModalWindow>
                }
            </div>
            ))
    }
}

Card = DragSource(Types.Card,dndSpecDragSrc,collect)(Card);

Card = DropTarget(Types.Card,dndSpecDropTrgt,connect => ({
    connectDropTarget: connect.dropTarget()
}))(Card);

export default connect(null, { RemoveCard, EditCardTitle, EditCardDescription, MoveCard, MoveCardToList })(withRouter(Card) );

/*export default connect(mapStateToProps, { RemoveCard, EditCardTitle, EditCardDescription, })(withRouter(_.flow([ 
    DropTarget(Types.Card,dndSpecDropTrgt,collect),
    DragSource(Types.Card,dndSpecDragSrc,collect),
]))(Card));*/