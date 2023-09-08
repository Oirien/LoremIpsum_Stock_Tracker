import React from 'react';

// Compare function needed by the Sort component
const compare = (a, b) => {
    // you can access the relevant property like this a.props[by]
    // depending whether you are sorting by tilte or year, you can write a compare function here,
    console.log('a.props.item.name:', a.props.item.name);
    console.log('b.props.item.name', b.props.item.name);
    if (a.props.item.name > b.props.item.name) {
        return 1;
    } else if (a.props.item.name < b.props.item.name) {
        return -1;
    } else {
        return 0;
    }
};

const Sort = ({ children, by }) => {
    if (!by) {
        // If no 'sort by property' provided, return original list
        return children;
    }
    return React.Children.toArray(children).sort(compare);
};

export default Sort;
