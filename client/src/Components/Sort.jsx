import React from 'react';

// Compare function needed by the Sort component
const compare = (a, b) => {
    // you can access the relevant property like this a.props[by]
    // depending whether you are sorting by tilte or year, you can write a compare function here,
    console.log('a.props.by', a.props.by);
    if (a.props.item[a.props.by] > b.props.item[a.props.by]) {
        return 1;
    } else if (a.props.item[a.props.by] < b.props.item[a.props.by]) {
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
