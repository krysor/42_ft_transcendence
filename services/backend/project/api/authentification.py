from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.http import JsonResponse

class FortyTwoAuthentication(BaseAuthentication):
	def authenticate(self, request):
		# Get token from request headers or query parameters
		token = request.headers.get('Authorization')
		if not token:
			return None

		try:
			response = request.get('https://api.intra.42.fr/v2/me', headers={'Authorization': token})
			response.raise_for_status()
			user_data = response.json()
			user_id = user_data['id']
			return (user_id, None)
		except Exception as e:
			raise AuthenticationFailed('Invalid or expired token')

	def as_view():
		data = JsonResponse({"answer": 42})
		data['Access-Control-Allow-Origin'] = '*'
		data['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE'
		data['Access-Control-Allow-Headers'] = 'Content-Type'
		return data