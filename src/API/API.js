import axios from "axios";

export default axios.create({
	baseURL: "https://ecom-api-v1.herokuapp.com/api/v1",
});
