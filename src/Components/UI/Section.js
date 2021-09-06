
export default function Section(props){
    return(
        <section className="App-Section" style={props.sectionStyle}>
            {props.children}
        </section>
    )
}