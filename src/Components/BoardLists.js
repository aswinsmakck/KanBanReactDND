import Section from './UI/Section'
import Button from './UI/Button'
import React from 'react';
import ModalWindow from './UI/ModalWindow'
import BoardItem from './BoardItem'
import Row from './UI/Row'
import Column from './UI/Column'
import {connect} from 'react-redux'
import { AddListAndRef } from '../Actions/ListActions'
import _,{pickBy} from 'lodash';
import { DropTarget } from 'react-dnd'
import CustomeDrag from './CustomDragLayer'


class BoardLists extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            Modal : {
                show : false,
            },
            boardItemTextBoxVal : "",
        };
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log("in list render comp upd");
        return !_.isEqual(this.props.lists, nextProps.lists) || !_.isEqual(this.state, nextState)
    }

    modalCloseHandler(){
        console.log(this);
        this.setState({...this.state, boardItemTextBoxVal:"", Modal : { show : false}});
    }

    showModal(evt) {
        let requiredStateModal = true
        this.setState({...this.state, Modal : {...this.state.Modal, show : requiredStateModal}});
    }

    changeboardItemTextBoxValHandler(evt){
        let textBoxVal = evt.target.value;
        this.setState({...this.state, boardItemTextBoxVal : textBoxVal})
    }

    addBoardItemHandler(evt){
        if(this.state.boardItemTextBoxVal.trim() === "") return;
        this.props.AddListAndRef(this.props.board.id,this.state.boardItemTextBoxVal);
        this.setState({
            boardItemTextBoxVal : "",
            Modal : { show : false},
        })
    }

    renderExistingLists (board){
        console.log(board)
        let lists = this.props.lists;//Object.values(this.props.lists.byId)
        //let lists = [];
        //let propLists = this.props.lists.byId

        return ( 
            ( lists && lists.length > 0 )  
                
                        ?

                        <Row rowInnerStyle={{flexWrap:"nowrap",overflowX:"auto"}}>
                            
                            {
                                lists.map( (list, index) => <BoardItem key={list.id} list={list} index={index} boardId={this.props.board.id} /> )                                
                            }
                            
                        </Row>
                        
                        :

                        <div>
                            <h1>No Lists !!!!</h1> 
                        </div>
        )
    }

    render(){
        console.log("in render", this.props.board)
        if(!this.props.board) return <h1>Invalid Board !!!</h1>
        let Modal = this.state.Modal
        console.log("In lists",this.props)
        return (
            <Section>
                <Row>
                    <Column>
                        {this.renderExistingLists(this.props.board)}
                        {
                            Modal.show && 
                            <ModalWindow modalHeader="Add New List" onClose={this.modalCloseHandler.bind(this)}>
                                <div style={{alignSelf:"center"}}>
                                    <input type="text" className="textbox" value={this.state.boardItemTextBoxVal} onChange={this.changeboardItemTextBoxValHandler.bind(this)} />
                                    <Button styleName="add-new-board" onClick={this.addBoardItemHandler.bind(this)} style={{ margin: "0 20px"}}> Add </Button>
                                </div>
                            </ModalWindow>
                        }
                        <Button styleName="add-new-board" onClick={this.showModal.bind(this)}>
                            Add New List
                        </Button>
                    </Column>
                </Row>
            </Section>
        )
    }
}

const mapStateToProps = (state, ownProps) => {

    console.log(ownProps)
    let board = state.boards.byId[ownProps.match.params.id] //this.props.boards.find((board) => board.id === props.match.params.id)
    if(!board) return {}
    console.log(state);
    /*let lists = _.pickBy(state.lists.byId, (value, key)=> {
        console.log("key",key)
        console.log(value)
        return value.boardId === board?.id
    })*/
    let lists = board.lists.map(listId => {
        return state.lists.byId[listId]
    })
    console.log("filtered lists", lists)
    return {lists,board};
    //return { lists : { byId : {...lists} }, board, allIds : board?.lists || [] }
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

export default DropTarget('list',{},collect)(connect(mapStateToProps , { AddListAndRef } )(BoardLists));