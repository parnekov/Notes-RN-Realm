
const NotesSchema = {
  name: 'Note',
  properties: {
    label: 'string',
    completed: {type: 'bool', default: false},
  }
};

// get notes from Realm
function initialState (){
  const arrayNotes = [];
  Realm.open({
    schema: [NotesSchema]
  }).then(realm => realm.objects('Note').forEach((note)=>{
    arrayNotes.push(note);
  }));
  return arrayNotes;
}

export default { NotesSchema, initialState };

