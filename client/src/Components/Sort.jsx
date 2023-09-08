import React from 'react';

const compare = (a, b) => {
    if (a.props.item[a.props.by] > b.props.item[a.props.by]) {
        return a.props.isAsc ? 1 : -1;
    } else if (a.props.item[a.props.by] < b.props.item[a.props.by]) {
        return a.props.isAsc ? -1 : 1;
    } else {
        return 0;
    }
};

const Sort = ({ children, by }) => {
    if (!by) {
        console.warn('there is no by:', by);
        return children;
    }
    return React.Children.toArray(children).sort(compare);
};

export default Sort;
