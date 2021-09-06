import Column from './UI/Column'

export default function Board(props){
    return (
        <Column>
            <div className="board">{props.data.name}</div>
        </Column>
    )
}