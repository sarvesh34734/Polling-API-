# Polling-API-
A basic polling api used to create questions and options for a poll using node express and mongoDB
## Getting started
* run npm install to install all dependencies.
* run nodemon app.js to start app on port 8000
## Routes
* Create a question by: URL:"localhost:8000/api/v1/questions/create", Method:"POST", and pass request body as raw json file
of form {"title":"Who is your favourite football player?"}. The output of the following is given below:
```
{
    "success": true,
    "message": "Question created successfully",
    "question": "Who is your favourite football player?"
}
```
* create options for a particular question by : URL:"localhost:8000/api/v1/questions/:questionId/options/create", Method:"POST"
and pass request body as raw json file {"options":[{"text":"Ronaldo"},{"text":"Messi"},{"text":"Neymar"}]}. The output of the
following is given below:
```
{
    "success": true,
    "message": "options added successfully"
}
```
* Delete a question by: URL:"localhost:8000/api/v1/questions/:questionId/delete", Method:DELETE. The output of the
following is given below:
```
{
    "success": true,
    "message": "Question deleted successfully"
}
```
* Delete an option by: URL:"localhost:8000/api/v1/options/:optionId/delete", method:DELETE. The output of the
following is given below:
```
{
    "success": true,
    "message": "Object with id 5eaa1899c821dc39496b2ad2 successfully deleted"
}
```
* Add vote to a particular option using: URL: "localhost:8000/api/v1/options/:optionId/add_vote", method:POST. The output
of the following is given below:
```
{
    "success": true,
    "message": "You have successfully voted for Messi"
}
```
* To view a particular question use : URL:"localhost:8000/api/v1/questions/:questionId", Method:GET. The output
of the following is given below:
```
{
    "success": true,
    "question": {
        "options": [
            {
                "_id": "5ea9f4a6c01c391726556d2f",
                "text": "Messi",
                "votes": 2,
                "link_to_vote": "http://localhost:8000/api/v1/options/5ea9f4a6c01c391726556d2f/add_vote"
            },
            {
                "_id": "5ea9f4a6c01c391726556d30",
                "text": "Neymar",
                "votes": 1,
                "link_to_vote": "http://localhost:8000/api/v1/options/5ea9f4a6c01c391726556d30/add_vote"
            }
        ],
        "_id": "5ea9f3b6c01c391726556d2d"
    }
}
```
