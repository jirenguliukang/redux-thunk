
import {createStore,applyMiddleware} from "./redux"
// ReactDOM.render(<App />, document.getElementById('root'));
 let counter=(state=1,action)=>{
     if(action){
        switch (action.type){
            case "ADD":
            return state+1
            case "SUB":
            return state-1
            default:
            return state
        }
     }
    else{
        return state
    }
 }


 let logger=store=>next=>action=>{
    console.log("1",store.getState());
    console.log(action);
    next(action);
    console.log("2",store.getState());
}

// let logger=function(store){
//     return function(next){ //next =dispatch
//        return function(action){

//        }
//     } 
// }


//  let finalCreateStore=applyMiddleware(logger);
//  let store = createStore(counter);
//  console.log(store.getState());
//  store.dispatch({"type":"ADD"});

let thunk = store => next => action =>{
    if(typeof action == "function"){
         return action(next);
    } 
    return next(action);
}


let store = applyMiddleware(thunk)(createStore)(counter);
store.subscribe(function(){
    console.log(store.getState());
});
store.dispatch(function(dispatch){
    setTimeout(function(){
        dispatch({"type":"ADD"});
    }, 3000);
})