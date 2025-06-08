const API_URL: string = "http://localhost:8080/api/v1";

export const API_ENDPOINTS = {
    /** Url на получение всех задач */
    GET_TASKS: API_URL + "/tasks",
    /** Url на создание задачи */
    CREATE_TASK: API_URL + "/tasks/create",
    /** Url на изменение задачи по id */
    EDIT_TASK: API_URL + "/tasks/update",
    /** Url на изменение статуса заадчи по id */
    EDIT_TASK_STATUS: API_URL + "/tasks/updateStatus",
    /** Url на получение всей информации по задаче по id */
    GET_TASK: API_URL + "/tasks",
    /** Url на получение всех проектов */
    GET_BOARDS: API_URL + "/boards",
    /** Url на получение всех задач конкретного проекта по id */
    GET_BOARD_TASKS: API_URL + "/boards",
    /** Url на получение всех пользователей */
    GET_USERS: API_URL + "/users",
};
