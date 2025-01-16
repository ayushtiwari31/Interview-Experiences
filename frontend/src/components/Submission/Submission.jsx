import React, { useState } from "react";
import axios from "axios";
import { API_ENDPOINT } from '../../../Constant.js';
import { useUser } from "../../UserContext.jsx";
import { useNavigate } from "react-router-dom";

function SubmissionForm() {
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    company: "",
    questions: [""],
  });

  const { user} = useUser();
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index] = value;
    setFormData({ ...formData, questions: updatedQuestions });
  };
  
  const addQuestion = () => {
    setFormData({ ...formData, questions: [...formData.questions, ""] });
  };
  
  const removeQuestion = (index) => {
    if (formData.questions.length > 1) {
      setFormData({
        ...formData,
        questions: formData.questions.filter((_, i) => i !== index),
      });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(formData)
      await axios.post(`${API_ENDPOINT}/api/users/submission`, formData,
        {
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.accessToken}`, 
          }
        }
      );
      alert("Submission successful!");
      // console.log(formData)
      setFormData({ name: "", country: "", company: "", questions: [""] });
      navigate("/")

    } catch (error) {
      alert("Error submitting experience.");
    }
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "16px",
        borderRadius:"10px",boxShadow:"-20px 20px 40px rgba(0,0,0,0.8)",padding:"30px",
        paddingRight:"60px"
    }}>
      <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>
        Submit Interview Experience
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          style={{
            display: "block",
            padding: "15px",
            width: "100%",
            marginBottom: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
          required
        />
        {/* <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="Country"
          style={{
            display: "block",
            padding: "15px",
            width: "100%",
            marginBottom: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
          required
        /> */}

<select
  name="country"
  value={formData.country}
  onChange={handleChange}
  style={{
    display: "block",
    padding: "15px",
    width: "103%",
    marginBottom: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  }}
  required
>
  <option value="" disabled>Select your country</option>
  <option value="Afghanistan">Afghanistan</option>
  <option value="Albania">Albania</option>
  <option value="Algeria">Algeria</option>
  <option value="Andorra">Andorra</option>
  <option value="Angola">Angola</option>
  <option value="Antigua and Barbuda">Antigua and Barbuda</option>
  <option value="Argentina">Argentina</option>
  <option value="Armenia">Armenia</option>
  <option value="Australia">Australia</option>
  <option value="Austria">Austria</option>
  <option value="Azerbaijan">Azerbaijan</option>
  <option value="Bahamas">Bahamas</option>
  <option value="Bahrain">Bahrain</option>
  <option value="Bangladesh">Bangladesh</option>
  <option value="Barbados">Barbados</option>
  <option value="Belarus">Belarus</option>
  <option value="Belgium">Belgium</option>
  <option value="Belize">Belize</option>
  <option value="Benin">Benin</option>
  <option value="Bhutan">Bhutan</option>
  <option value="Bolivia">Bolivia</option>
  <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
  <option value="Botswana">Botswana</option>
  <option value="Brazil">Brazil</option>
  <option value="Brunei">Brunei</option>
  <option value="Bulgaria">Bulgaria</option>
  <option value="Burkina Faso">Burkina Faso</option>
  <option value="Burundi">Burundi</option>
  <option value="Cabo Verde">Cabo Verde</option>
  <option value="Cambodia">Cambodia</option>
  <option value="Cameroon">Cameroon</option>
  <option value="Canada">Canada</option>
  <option value="Central African Republic">Central African Republic</option>
  <option value="Chad">Chad</option>
  <option value="Chile">Chile</option>
  <option value="China">China</option>
  <option value="Colombia">Colombia</option>
  <option value="Comoros">Comoros</option>
  <option value="Congo (Congo-Brazzaville)">Congo (Congo-Brazzaville)</option>
  <option value="Costa Rica">Costa Rica</option>
  <option value="Croatia">Croatia</option>
  <option value="Cuba">Cuba</option>
  <option value="Cyprus">Cyprus</option>
  <option value="Czechia (Czech Republic)">Czechia (Czech Republic)</option>
  <option value="Denmark">Denmark</option>
  <option value="Djibouti">Djibouti</option>
  <option value="Dominica">Dominica</option>
  <option value="Dominican Republic">Dominican Republic</option>
  <option value="Ecuador">Ecuador</option>
  <option value="Egypt">Egypt</option>
  <option value="El Salvador">El Salvador</option>
  <option value="Equatorial Guinea">Equatorial Guinea</option>
  <option value="Eritrea">Eritrea</option>
  <option value="Estonia">Estonia</option>
  <option value="Eswatini (fmr. Swaziland)">Eswatini (fmr. Swaziland)</option>
  <option value="Ethiopia">Ethiopia</option>
  <option value="Fiji">Fiji</option>
  <option value="Finland">Finland</option>
  <option value="France">France</option>
  <option value="Gabon">Gabon</option>
  <option value="Gambia">Gambia</option>
  <option value="Georgia">Georgia</option>
  <option value="Germany">Germany</option>
  <option value="Ghana">Ghana</option>
  <option value="Greece">Greece</option>
  <option value="Grenada">Grenada</option>
  <option value="Guatemala">Guatemala</option>
  <option value="Guinea">Guinea</option>
  <option value="Guinea-Bissau">Guinea-Bissau</option>
  <option value="Guyana">Guyana</option>
  <option value="Haiti">Haiti</option>
  <option value="Holy See">Holy See</option>
  <option value="Honduras">Honduras</option>
  <option value="Hungary">Hungary</option>
  <option value="Iceland">Iceland</option>
  <option value="India">India</option>
  <option value="Indonesia">Indonesia</option>
  <option value="Iran">Iran</option>
  <option value="Iraq">Iraq</option>
  <option value="Ireland">Ireland</option>
  <option value="Israel">Israel</option>
  <option value="Italy">Italy</option>
  <option value="Jamaica">Jamaica</option>
  <option value="Japan">Japan</option>
  <option value="Jordan">Jordan</option>
  <option value="Kazakhstan">Kazakhstan</option>
  <option value="Kenya">Kenya</option>
  <option value="Kiribati">Kiribati</option>
  <option value="Korea (North)">Korea (North)</option>
  <option value="Korea (South)">Korea (South)</option>
  <option value="Kuwait">Kuwait</option>
  <option value="Kyrgyzstan">Kyrgyzstan</option>
  <option value="Laos">Laos</option>
  <option value="Latvia">Latvia</option>
  <option value="Lebanon">Lebanon</option>
  <option value="Lesotho">Lesotho</option>
  <option value="Liberia">Liberia</option>
  <option value="Libya">Libya</option>
  <option value="Liechtenstein">Liechtenstein</option>
  <option value="Lithuania">Lithuania</option>
  <option value="Luxembourg">Luxembourg</option>
  <option value="Madagascar">Madagascar</option>
  <option value="Malawi">Malawi</option>
  <option value="Malaysia">Malaysia</option>
  <option value="Maldives">Maldives</option>
  <option value="Mali">Mali</option>
  <option value="Malta">Malta</option>
  <option value="Marshall Islands">Marshall Islands</option>
  <option value="Mauritania">Mauritania</option>
  <option value="Mauritius">Mauritius</option>
  <option value="Mexico">Mexico</option>
  <option value="Micronesia">Micronesia</option>
  <option value="Moldova">Moldova</option>
  <option value="Monaco">Monaco</option>
  <option value="Mongolia">Mongolia</option>
  <option value="Montenegro">Montenegro</option>
  <option value="Morocco">Morocco</option>
  <option value="Mozambique">Mozambique</option>
  <option value="Myanmar (Burma)">Myanmar (Burma)</option>
  <option value="Namibia">Namibia</option>
  <option value="Nauru">Nauru</option>
  <option value="Nepal">Nepal</option>
  <option value="Netherlands">Netherlands</option>
  <option value="New Zealand">New Zealand</option>
  <option value="Nicaragua">Nicaragua</option>
  <option value="Niger">Niger</option>
  <option value="Nigeria">Nigeria</option>
  <option value="North Macedonia">North Macedonia</option>
  <option value="Norway">Norway</option>
  <option value="Oman">Oman</option>
  <option value="Pakistan">Pakistan</option>
  <option value="Palau">Palau</option>
  <option value="Palestine">Palestine</option>
  <option value="Panama">Panama</option>
  <option value="Papua New Guinea">Papua New Guinea</option>
  <option value="Paraguay">Paraguay</option>
  <option value="Peru">Peru</option>
  <option value="Philippines">Philippines</option>
  <option value="Poland">Poland</option>
  <option value="Portugal">Portugal</option>
  <option value="Qatar">Qatar</option>
  <option value="Romania">Romania</option>
  <option value="Russia">Russia</option>
  <option value="Rwanda">Rwanda</option>
  <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
  <option value="Saint Lucia">Saint Lucia</option>
  <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
  <option value="Samoa">Samoa</option>
  <option value="San Marino">San Marino</option>
  <option value="Sao Tome and Principe">Sao Tome and Principe</option>
  <option value="Saudi Arabia">Saudi Arabia</option>
  <option value="Senegal">Senegal</option>
  <option value="Serbia">Serbia</option>
  <option value="Seychelles">Seychelles</option>
  <option value="Sierra Leone">Sierra Leone</option>
  <option value="Singapore">Singapore</option>
  <option value="Slovakia">Slovakia</option>
  <option value="United Arab Emirates">United Arab Emirates</option>
  <option value="United Kingdom">United Kingdom</option>
  {/* Add more countries here */}
</select>


        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company"
          style={{
            display: "block",
            padding: "15px",
            width: "100%",
            marginBottom: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
          required
        />

        <label style={{ fontWeight: "bold", display: "block", marginBottom: "8px" }}>
          Interview Questions:
        </label>
        {formData.questions.map((question, index) => (
  <div key={index} style={{ marginBottom: "8px", display: "flex" }}>
    <input
      type="text"
      value={question}
      onChange={(e) => handleQuestionChange(index, e.target.value)}
      placeholder={`Question ${index + 1}`}
      style={{
        flex: "1",
        padding: "15px",
        border: "1px solid #ccc",
        borderRadius: "4px",
      }}
      required
    />
    <button
      type="button"
      onClick={addQuestion}
      style={{ marginLeft: "8px", backgroundColor: "#1D4ED8", color: "white" }}
    >
      +
    </button>
    {formData.questions.length > 1 && (
      <button
        type="button"
        onClick={() => removeQuestion(index)}
        style={{ marginLeft: "8px", backgroundColor: "red", color: "white" }}
      >
        -
      </button>
    )}
  </div>
))}

        <button
          type="submit"
          style={{
            backgroundColor: "#1D4ED8",
            color: "white",
            padding: "8px 16px",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default SubmissionForm;
