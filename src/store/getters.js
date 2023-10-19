const mapObject = (list, object, key, map = null) => {
    if(list[key]){
        let data = list[key].map(id => {
            let assign = object[id]? object[id]: object[key + '_' + id];
            if(assign){
                if(map === null){
                    return Object.assign(assign, {id: id});
                }else{
                    return Object.assign(assign, map[id]);
                }
            }
        });
      
        return data.filter(filter => filter !== undefined);
    }

    return null;
}

export default {
    currentPage: (state) => {
        return state.PAGE[state.CURRENT_PAGE.id];
    },
    currentLayout: (state) => {
        return state.LAYOUT[state.CURRENT_LAYOUT.id];
    },
    currentTheme: (state) => {
        return state.THEME[state.CURRENT_THEME.id];
    },
    positions:(state)=> (layout_id) =>{
        return mapObject(state.LAYOUT_POSITION, state.POSITION, layout_id);
    },
    modules:(state) => (page_id, postion_module_id) =>{
        return mapObject(state.POSITION_MODULE, state.MODULE, page_id + '_' + postion_module_id);
    },
    moduleOptions:(state) => (page_id, postion_module_id) =>{
        return state.PAGE_POSITION_MODULE_OPTION[page_id + '_' + postion_module_id];
    },
    positionOptions:(state) => (page_id, postion_id) =>{
        return state.PAGE_POSITION_OPTION[page_id + '_' + postion_id];
    },
    modulesDefault:(state) => ( postion_module_id) =>{
        return mapObject(state.POSITION_MODULE, state.MODULE, postion_module_id);
    },
    moduleOptionsDefault:(state) => (postion_module_id) =>{
        return state.POSITION_MODULE_OPTION[postion_module_id];
    },
    positionOptionsDefault:(state) => (postion_id) =>{
        return state.POSITION_OPTION[postion_id];
    },
    currentRoom: (state) => {
        return state.ROOM[state.CURRENT_ROOM.id];
    },
    currentUser: (state) => {
        return state.USER[state.CURRENT_USER.id];
    },
    currentMember: (state) => {
        return state.MEMBER[state.CURRENT_ROOM.id + '_' + state.CURRENT_USER.id];
    },
    members: (state) => {
        return mapObject(state.ROOM_MEMBER, state.USER, state.CURRENT_ROOM.id, state.MEMBER);
    },
    users: (state) =>  {
        return mapObject(state.MY_USER, state.USER, state.CURRENT_USER.id);
    },
    rooms: (state) => {
        return mapObject(state.MY_ROOM, state.ROOM, state.CURRENT_USER.id);
    },
    roomFiles: (state) => {
        return mapObject(state.ROOM_FILE, state.FILE, state.CURRENT_ROOM.id);
    },
    messages: (state) => {
        return mapObject(state.ROOM_MESSAGE, state.MESSAGE, state.CURRENT_ROOM.id);
    },
    navigators: (state)=>{
        return mapObject(state.MY_NAVIGATOR, state.NAVIGATOR, state.CURRENT_USER.id);
    },
    getKey:(state) => (key) =>{
        return state[key];
    },
};
