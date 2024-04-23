
function getCookie(name) {
	const cookieString = document.cookie;
	const cookies = cookieString.split(";");
  
	for (let i = 0; i < cookies.length; i++) {
	  const cookie = cookies[i].trim();
	  const [cookieName, cookieValue] = cookie.split("=");
  
	  if (cookieName === name) {
		return cookieValue;
	  }
	}
  
	return null;
  }

  export default getCookie;