# qa-assessment

The Super Secure Bank is not working very well.
We need to add some tests in order to understand what is not working.

# setup
- fork the project
- run 'nvm use'
- run 'npm install'
- run 'npm test' 

Feel free to add any other module that you feel it could be needed.

You can find the frontend here: https://github.com/nicolo-riboni-sp/qa-app-ui
And the backend here: https://github.com/nicolo-riboni-sp/qa-app-api

When ready submit a Pull Request.

# Note from David Capuano

In order to be as clear as possible, I am using this README to write down every anomaly I've seen during this test:

- Foreach user is shown a list of transactions that will show user's transactions ONLY. In reality there is a problem with this list because there are shown all the
transactions made by users. Maybe the error is located at line 91 in src\components\UsersList.vue.
- Add Balance thrwon an error even when the operation is successful. The return code is 400 Bad Request on PUT method. This error is caught on both frontend and backend sides.
- After an Add Balance operation, there is not hint on frotend side that tell us which is the outcome.
- Make Transfer functionality allows users to transfer more money than they can afford. No error are thrown on backend side and there is no error displayed on frontend side, instead is always shown a success message on video.
- Make Transfer functionality allows users to transfer a negative amount of money. This leads to a wrong behaviour.