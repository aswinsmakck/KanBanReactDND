import React from 'react';
import {DragLayer} from 'react-dnd';

const ItemTypes = {
  List : 'list',
}

const layerStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%'
  };

  const boxStyles = {
    width : '100px',
    height : '100px'
  }
  
  function getItemStyles (props) {
    const { initialOffset, currentOffset } = props;
    if (!initialOffset || !currentOffset) {
      return {
        display: 'none'
      };
    }
  
    // http://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/
    const { x, y } = currentOffset;
    const offsetX = parseInt(boxStyles.width.replace("px",""))/2;
    const offsetY = parseInt(boxStyles.height.replace("px",""))/2;
    var transform = `translate(${x-offsetX}px, ${y-offsetY}px)`;
  
    return {
      transform: transform,
      WebkitTransform: transform
    };
  }
  
 


  const collectDragLayer = (monitor) => {
    return {
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getClientOffset(),
      isDragging: monitor.isDragging()
    }
  }

  class CustomDragLayer extends React.Component {
    renderItem(type, item) {
      switch (type) {
        case ItemTypes.List:
          return <div style={{width: boxStyles.width, height:boxStyles.height, backgroundColor:"red"}}></div>;
        default:
          return null;
      }
    }
    
    render () {
      let coords = null;
      const { item, itemType, isDragging } = this.props;
  
      if (!isDragging) {
        return false;
      }
  
      return <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
          {this.renderItem(itemType, item)}
        </div>
      </div>
    }
  }

  export default  DragLayer(collectDragLayer)(CustomDragLayer)

  