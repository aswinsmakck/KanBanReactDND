export default function Row(props){
    return (
        <div className="row row-wrap">
            <div className="row-inner" style={props.rowInnerStyle}>
                {props.children}
            </div>
        </div>
    )
}