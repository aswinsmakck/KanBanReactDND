export default function Row(props){
    return (
        <div className="column" style={props.columnStyle}>
            <div className="column-inner">
                {props.children}
            </div>
        </div>
    )
}