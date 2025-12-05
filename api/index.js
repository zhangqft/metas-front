// api/menu.js
import request from "@/utils/request.js";


export function getIndex(data) {
	return request.get(`index`, data);
}