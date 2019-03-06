export const addNote = (item)=>{
    return {
        type: 'ADD_ITEM', 
        payload: item
    }
};

export const removeItem = (index) => {
    return {
        type: 'REMOVE_ITEM', 
        payload: index
    }
};

export const itemCompleted = (index) => {
    return {
        type: 'ITEM_COMPLETED', 
        payload: index
    }
};

export const removeCompleted = (item) => {
    return {
        type: 'REMOVE_COMPLETED', 
        payload: item
    }
};

export const removeAll = () => {
    return {
        type: 'REMOVE_ALL'
    }
};

export const retrieveRealmData = (array)=>{
    return {
        type: 'RETRIEVE_REALM',
        payload: array 
    }
};

export const updateDatabase = ()=>{
    return {
        type: 'UPDATE_DATABASE' 
    }
};
