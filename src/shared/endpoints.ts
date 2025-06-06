const API_URL: string = "http://localhost:8080/api/v1";

export const API_ENDPOINTS = {
  //tasks
  GET_TASKS: API_URL + "/tasks",
  CREATE_TASK: API_URL + "/tasks/create",
  EDIT_TASK: API_URL + "/tasks/update",
  EDIT_TASK_STATUS: API_URL + "/tasks/updateStatus",
  GET_TASK: API_URL + "/tasks",
  //boards
  GET_BOARDS: API_URL + "/boards",
  GET_BOARD_TASKS: API_URL + "/boards",
  //users
  GET_USERS: API_URL + "/users",
};
