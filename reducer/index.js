import Realm from 'realm';

const NotesSchema = {
  name: 'Note',
  properties: {
    label: 'string',
    completed: {type: 'bool', default: false},
  }
};

// get notes from Realm
export const  getDataFromDatabase = () => {
  const allNotes = [];
  Realm.open({ schema: [NotesSchema] }).then(realm => {
    realm.objects('Note').forEach((note)=>{
    allNotes.push({label: note.label,
                  completed: note.completed})
    });            
  });
  return {items: allNotes };
}

// update list of notes
export const updateDatabase = (array) =>{
  Realm.open({
    schema: [NotesSchema]
  }).then(realm => {      
    realm.write(() => {
        realm.delete(realm.objects('Note'));
        array.forEach((note)=>{
          realm.create('Note', note);
        });
    });
  });
}


export const reducer = (state = getDataFromDatabase(), action) => {
  switch (action.type) {
    case 'ADD_ITEM':
    return {
      ...state,
      items: [{ label: action.payload, completed: false }, ...state.items],
    };
    case 'REMOVE_ITEM': 
    return {
        ...state,
        items: state.items.filter((item, i) => i !== action.payload),
      };
    case 'ITEM_COMPLETED': 
    return {
        ...state,
        items: state.items.map((item, i) => {
          if (i === action.payload) {
            return {label: item.label, completed: !item.completed}
          }
          return item
        }),
      }
    case 'REMOVE_COMPLETED': 
    return {
        ...state,
        items: state.items.filter((item) => !item.completed)
    }
    case 'RETRIEVE_REALM': 
      return {
        ...state,
        items: action.payload,
      };
    case 'UPDATE_DATABASE': 
      updateDatabase(state.items);
      return state;
    default: 
    return state;
  }
}