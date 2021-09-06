const Utils = {

    showModal : function(evt) {
        let requiredStateModal = true
        this.setState({...this.state, Modal : {...this.state.Modal, show : requiredStateModal}});
    },

    modalCloseHandler : function(){
        console.log(this);
        this.setState({...this.state, textBoxVal:"",boardItemTextBoxVal:"", Modal : { show : false}});
    },
    changeTextBoxValHandler : function (evt){
        console.log(this)
        console.log(evt.target)
        console.log(evt.target.value)
        let textBoxVal = evt.target.value;
        this.setState({...this.state, textBoxVal : textBoxVal})
    },
    changeboardItemTextBoxValHandler : function (evt){
        console.log(evt)
        console.log(evt.target)
        console.log(evt.target.value)
        let textBoxVal = evt.target.value;
        this.setState({...this.state, boardItemTextBoxVal : textBoxVal})
    },
    test1 : function(){
        Utils.test2()
    },
    test2 : function(){
        console.log("test2")
    }
}

export default Utils;