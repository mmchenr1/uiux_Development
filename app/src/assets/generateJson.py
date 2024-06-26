import sys
import requests
import json
import time
import base64

def get_access_token(client_id, client_secret):
    url = 'https://accounts.spotify.com/api/token'
    headers = {'Authorization': 'Basic ' + base64.b64encode(f"{client_id}:{client_secret}".encode()).decode()}
    payload = {'grant_type': 'client_credentials'}
    response = requests.post(url, headers=headers, data=payload)
    return response.json()['access_token']

def get_song_data(access_token, song_id):
    url = f'https://api.spotify.com/v1/tracks/{song_id}'
    headers = {'Authorization': 'Bearer ' + access_token}
    response = requests.get(url, headers=headers)
    return response.json()

def get_audio_features(access_token, song_id):
    url = f'https://api.spotify.com/v1/audio-features/{song_id}'
    headers = {'Authorization': 'Bearer ' + access_token}
    try:
        response = requests.get(url, headers=headers)
        if response.status_code == 429:  # Too Many Requests
            retry_after = int(response.headers.get('Retry-After', 0))
            print(f"Rate limit exceeded. Retrying after {retry_after + 1} seconds.")
            time.sleep(retry_after + 1)  # Adding 1 second buffer
            return get_audio_features(access_token, song_id)  # Retry the request
        response.raise_for_status()  # Raise an exception for other status codes
        return response.json()
    except requests.exceptions.HTTPError as e:
        print("Error fetching from Spotify API")
        print("Status Code:", e.response.status_code)
        sys.exit(1)

def generate_json(song_ids, client_id, client_secret):
    access_token = get_access_token(client_id, client_secret)
    song_data_list = []
    for song_id in song_ids:
        song_data = get_song_data(access_token, song_id)
        time.sleep(1)  # Introduce a delay to avoid hitting rate limits
        audio_features = get_audio_features(access_token, song_id)
        time.sleep(1)  # Introduce a delay to avoid hitting rate limits

        # Check if 'genres' key exists in the artist data
        artist_genres = song_data['artists'][0].get('genres', [])
        formatted_output = {
            "name": song_data['name'],
            "artist": song_data['artists'][0]['name'],
            "year": song_data['album']['release_date'],
            "image": song_data['album']['images'][0]['url'],
            "genre": artist_genres,
            "length": song_data['duration_ms'],
            "energy": audio_features['energy'],
            "tempo": audio_features['tempo'],
            "danceability": audio_features['danceability'],
            "popularity": song_data['popularity']
        }
        song_data_list.append(formatted_output)
    
    with open('song_data.json', 'w') as json_file:
        json.dump(song_data_list, json_file, indent=4)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: ./generateJson SPOTIFY_CLIENT_ID SPOTIFY_CLIENT_SECRET")
        sys.exit(1)
    
    client_id = sys.argv[1]
    client_secret = sys.argv[2]
    
    songIds = ['0QQgM0bkR3myEAEE7QNOaS', '6oJxv5MlE0dOfFShVhE4aI', '2Xxh2rUEtoEouNW8rxzEoT', 
                '4IadxL6BUymXlh8RCJJu7T', '7o67roCVsFiCt7Cf0ZLOJq', '2gx8U4Ujtk3UL94tv8r8io', 
                '1ShRHPAiiIrh0arZbSFmx1', '4LmOmWpjCQbC1VZvUuwPQu', '2M1E9WjycB1iFLA9yc6IMW', 
                '38OvTFIg5ZYRow2sA1jgKo', '21lfQ6cXJF15ubyPLB6qHz', '4cgjA7B4fJBHyB9Ya2bu0t', 
                '2hKnW3SMsVWhXoSYLXn01G', '4PXjrpBSAXim7Zm0W3yVjQ', '3nFJbZCHP4d9vduKjJLdBL', 
                '77evpfqHmmSklsFpo8wLCB', '4Y273Gix47holXvTP9hGpj', '6PmbpHTKSmKP3FuMIbjttI', 
                '418gyIJdAZSZisVdzDXLNc', '7MI12qNsacindN65MWoMYR', '0rUIff1QHd5zlOBtlHVqd9', 
                '1PZhJNvdDjpsjZWrkfgff4', '6xTp4nC8NBRSYMxGqIikSh', '2TSl9k48kkiAWYosgEMb3s', 
                '12oxsGACfwMozi4nK9noGQ']
    
    generate_json(songIds, client_id, client_secret) 