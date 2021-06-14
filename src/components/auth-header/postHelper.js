import axios from 'axios';
import { useHistory } from 'react-router-dom';
const access_token = process.env.REACT_APP_TOKEN

const handleSubmit = (answer) => {
            let payload = {
                  answers:
                        answer
                  }

            const headers = {
                  'Authorization': `Token ${access_token}`,
                  'Content-Type': 'application/json',
            }

            axios.post(
                  `https://sv-survey.herokuapp.com/api/responses/`,
                  JSON.stringify(payload),
                  {headers: headers}
      )
                  .then((res) => {
                        alert("Submit successfully. Data stored in DB. Page will redirect to answer Page !!")

                  })
                  .catch(({ response }) => {
                        console.log("🚀 ~ file: questions.jsx ~ line 84 ~ data: ", response.data)
                        console.log("🚀 ~ file: questions.jsx ~ line 84 ~ status: ", response.status)
                        console.log("🚀 ~ file: questions.jsx ~ line 84 ~ headers: ", response.headers)
                         alert("Network error")

                  })

                  // !! redirect to answer Page




      }

export default handleSubmit;