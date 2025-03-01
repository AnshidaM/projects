import { uiActions } from "./ui-slice";
import { todoActions } from "./todos-slice";
import { useEffect } from "react";
let toDoDatas = [];
export const fetchTodoData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      dispatch(uiActions.setTodosLoadingStatus("Loading todo datas . . . ."));
      const response = await fetch(
        "https://todo-app-2625-default-rtdb.firebaseio.com/data.json",     {
         
        
          
 }
      );

      if (!response.ok) {
        throw new Error("Could not fetch todos data!");
      }

      const data = await response.json();
      
      return data;
    };

    try {
      const todoArray = [];
      toDoDatas = await fetchData();
     
      for (const key in toDoDatas) {
        todoArray.push(toDoDatas[key]);
      }
      
      if (toDoDatas === null) {
        dispatch(uiActions.setTodosLoadingStatus("Empty todo List"));
        // throw new Error("Empty todo List");
      } else {
        dispatch(uiActions.setTodosLoadingStatus("Loaded"));
      }
      
      dispatch(
        todoActions.replaceTodos({
          items: todoArray || [],
        })
      );
    } catch (error) {
      // dispatch(
      dispatch(
        uiActions.setTodosLoadingStatus(
          "Error in Loading todos List .Could not fetch data "
        )
      );
    }
  };
};

export const sendTodoData = async (todo) => {

  const sendRequest = async (todo) => {

    const response = await fetch(
      "https://todo-app-2625-default-rtdb.firebaseio.com/data.json",
      {
        // mode: "no-cors",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo),
      }
    );
    if (!response.ok) {
      throw new Error("Updating todo data failed.");
    }
  };
  try {
    await sendRequest(todo);
    return "success";
  } catch (error) {
  
  }
};

export const updateTodoData = async (id) => {
  const updateRequest = async (id) => {
    let newItem = {};
    let index = null;
    for (const key in toDoDatas) {
      if (toDoDatas[key].id === id) {
        index = key;
        newItem = {
          id: id,
          checked: !toDoDatas[key].checked,
          title: toDoDatas[key].title,
        };
      }
    }
   
    if (index === null) {
      throw new Error("Updating todo data failed.");
    }
    const response = await fetch(
      `https://todo-app-2625-default-rtdb.firebaseio.com/data/${index}.json`,
      {
        method: "PUT",
        body: JSON.stringify(newItem),
      }
    );
    if (!response.ok) {
      throw new Error("Updating todo data failed.");
    }
  };
  try {
    await updateRequest(id);
    return "success";
  } catch (error) {
    
  }
};

export const deleteTodoData = async (id) => {

  const deleteRequest = async (id) => {
    let index = null;
    for (const key in toDoDatas) {
      if (toDoDatas[key].id === id) {
        index = key;
      }
    }
    
    if (index === null) {
      throw new Error("Removing todo data failed.");
    }

    const response = await fetch(
      `https://todo-app-2625-default-rtdb.firebaseio.com/data/${index}.json`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Deleting todo data failed.");
    }
  };
  try {
    await deleteRequest(id);
    return "success";
  } catch (error) {
   
  }
};
