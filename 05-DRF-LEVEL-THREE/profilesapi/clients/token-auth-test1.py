import requests
def client():
    token_h = 'Token 203f11f063dd8e055d5c822a1e8c9fc2df67e6bd'
    # credentials = {"username": "admin","password": "admin"}

    # response = requests.post("http://127.0.0.1:8000/api/rest-auth/login/",data=credentials)

    headers = {"Authorization": token_h}
    response = requests.get("http://127.0.0.1:8000/api/profiles/", headers = headers)
    print("Status Code: " , response.status_code)
    response_data = response.json()
    print(response_data)


if __name__ == "__main__":

    client()