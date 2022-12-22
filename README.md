## Server address and endpoints
Server address: 172.16.7.237  
Frontend: http://172.16.7.237:8080/  
Server end-points:
-  list:
    - GET: http://172.16.7.237:4040/api/v1/task/list
    - GET: http://172.16.7.237:4040/api/v1/task/list/default
    - GET: http://172.16.7.237:4040/api/v1/task/list/id
    - POST: http://172.16.7.237:4040/api/v1/task/list
    - PUT: http://172.16.7.237:4040/api/v1/task/list/id
    - DELETE: http://172.16.7.237:4040/api/v1/task/list/id
-  tasks: 
    - GET: http://172.16.7.237:4040/api/v1/tasks
    - GET: http://172.16.7.237:4040/api/v1/tasks/tocomplete
    - GET: http://172.16.7.237:4040/api/v1/tasks/id
    - POST: http://172.16.7.237:4040/api/v1/tasks
    - UPDATE: http://172.16.7.237:4040/api/v1/tasks/id
    - DELETE: http://172.16.7.237:4040/api/v1/tasks/id

## Team members
- Prithviraj Kalburgi
- Innokentii Kozlov

## Instructions for running the application locally
### Run all together
```
docker compose up -d
```

### Run separately
- run backend:
```
npm run dev
```

- run frontend:
```
npm start
```


## Completed Phases
- [x] Backend and frontend applications are working.
- [x] Innitial commit.
- [x] All team members have working connection to the remote Git repository in GitLab.
- [x] Both backend and frontend are running in Docker and you can access them by localhost.
- [x] README is updated with instructions for running the code locally.
- [x] Remote server is taken into use.
- [x] All pipelines complete successfully.
- [x] Remote server/virtual machine is hosting the application correctly.
    - [x] App is available through the URL.
    - [x] Correct URL for frontend and backend is in the README.
- [x] Backend returns 3 pre defined todo-tasks from the ```/api/v1/tasks/``` endpoint.
- [x] Backend returns 3 pre defined todo-tasks from the /api/v1/tasks/ endpoint.
- [x] Frontend lists the 3 tasks in a simple todo-list UI.
    - [x] Each item in the list has a text field that describes the task, and a checkbox to mark the item done.
    - [x] User can add, delete and mark tasks done on the Frontend only
- [x] Backend: 5 tests for /api/v1/task/list enpoints, 3 test /api/v1/tasks endpoints, 1 general test for /api/v1 endpoint. Frontend: 1 test.
- [x] Working database
- [x] New backend endpoints:
    - [x] ```POST /api/v1/task/list```
    - [x] ```GET /api/v1/task/list/:id```
    - [x] ```PUT /api/v1/task/list/:id```
- [x] Frontend functionality:
    - [x] "Save new" button to save the current TODO list using the backend.
    - [x] "Load" button that is used to load saved lists from the backend.
    - [x] Update" button to overwrite existing list with what is currently active in the UI.

## Expected project grade and the reasoning behind it
Expected grade is 5.  
Reasons:
- Completed all phases in time
- Managed to fulfill all given requirements
- Completed the tasks with bare minimum issues 
- Completed all weekly course tasks on time which helped us to gain knowledge for this project 
