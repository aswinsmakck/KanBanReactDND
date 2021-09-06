import React from 'react';
import Section from './UI/Section';
import Row from './UI/Row';
import Column from './UI/Column'
import Button from './UI/Button';
import ModalWindow from './UI/ModalWindow'
import { connect } from 'react-redux'
import { AddBoard } from '../Actions/BoardActions'
import {Link} from 'react-router-dom';
import Board from './Board';
import _ from 'lodash';

class HomePage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            Modal : {
                show : false,
            },
            textBoxVal:"",
        }
    }

    shouldComponentUpdate(nextProps, nextState){

        return !_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState)
    }

    modalCloseHandler(){
        console.log(this);
        this.setState({...this.state, textBoxVal:"", Modal : { show : false}});
    }

    showModal(evt) {
        let requiredStateModal = true
        this.setState({...this.state, Modal : {...this.state.Modal, show : requiredStateModal}});
    }

    changeTextBoxValHandler(evt){
        let textBoxVal = evt.target.value;
        this.setState({...this.state, textBoxVal : textBoxVal})
    }

    addBoardClickHandler(evt){
        if(this.state.textBoxVal.trim() === "") return;
        this.props.AddBoard(this.state.textBoxVal);
        this.setState({
            textBoxVal : "",
            Modal : { show : false},
        });
        
    }

    renderExistingBoards(){
        let boardIds = this.props.boards.allIds;//Object.values(this.props.boards.byId)

        return boardIds.map((boardId,index) =>{
            let board = this.props.boards.byId[boardId];
            return (
                <Link className="Link" key={index} to={{pathname : `/board/${board.id}`}}>
                    <Board data={board} />
                </Link>
            )
        });
    }

    render(){
        
        let boards = this.renderExistingBoards();
        let Modal = this.state.Modal

        return(
            <Section>
                <Row>
                    <Column>
                        {boards.length > 0 ? <Row>{boards}</Row> : <h1>No Boards to display !!!!</h1>}
                        <Button styleName="add-new-board" onClick={this.showModal.bind(this)}>
                            Add New Board
                        </Button>
                        {
                            Modal.show && 
                            
                            <ModalWindow modalHeader="Add New Board" onClose={this.modalCloseHandler.bind(this)}>
                                <div style={{alignSelf:"center"}}>
                                    <input type="text" className="textbox" value={this.state.textBoxVal} onChange={this.changeTextBoxValHandler.bind(this)} />
                                    <Button styleName="add-new-board" onClick={this.addBoardClickHandler.bind(this)} style={{ margin: "0 20px"}}> Add </Button>
                                </div>
                            </ModalWindow>
                        }
                    </Column>
                </Row>
            </Section>
        )
    }
}

const mapStateToProps = (state) => {
    return { boards : state.boards }
}

export default connect( mapStateToProps, { AddBoard } )( HomePage );