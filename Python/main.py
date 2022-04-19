# %%
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt


# %%
from sklearn.model_selection import train_test_split, StratifiedKFold, GridSearchCV, RandomizedSearchCV
from sklearn.metrics import classification_report

# %%
import spotipy 
from spotipy.oauth2 import SpotifyOAuth
from spotipy.oauth2 import SpotifyClientCredentials

# %%
scope = "user-library-read user-follow-read user-top-read playlist-read-private"

sp = spotipy.Spotify(auth_manager=SpotifyOAuth(
    client_id='5e6b0010b34447459153368afadff90b',
    client_secret='72a9dbfd368a45509e7836165713434f',
    redirect_uri='http://localhost:8888/callback/',
    scope=scope,
))



# %%
def getPlaylistTracks(sp, playlistCall):
    
    results = playlistCall['tracks']
    if 'items' not in results.keys():
        results = results['artists']
    data = results['items']
    while results['next']:
        results = sp.next(results)
        if 'items' not in results.keys():
            results = results['artists']
        data.extend(results['items'])
    
   
    tracks = pd.DataFrame(data)
    
    if 'track' in tracks.columns.tolist():
        tracks = tracks.drop('track', 1).assign(**tracks['track'].apply(pd.Series))
   
    
    
  
    tracks['artist_id'] = tracks['artists'].apply(lambda x: x[0]['id'])
    
    tracks = tracks[['id', 'name', 'artist_id','popularity', 'type']]
    
    tracks['genres'] = tracks['artist_id'].apply(lambda x:  sp.artist(x)['genres'])
    
    tracks['audio_features'] = tracks['id'].apply(lambda x: sp.audio_features(x))
    
    tracks['audio_features'] = tracks['audio_features'].apply(pd.Series)
    
    tracks = tracks.drop('audio_features', 1).assign(**tracks['audio_features'].apply(pd.Series))
    
    return(tracks)
   

# %%

likedSongs = getPlaylistTracks(sp,  sp.playlist('2BfD0vT8mD157T0QmuQkU8'))

likedSongs['ratings'] = 1

# %%
dislikedSongs = getPlaylistTracks(sp, sp.playlist('6wDxperVoneQB3PYdBzHyB'))
dislikedSongs['ratings'] = 0



# %%
new_df = pd.concat([likedSongs,dislikedSongs], axis=0)



# %%

X = new_df[['popularity', 'danceability', 'energy',
                        'key', 'loudness', 'mode', 'speechiness', 'acousticness', 'instrumentalness',
                        'liveness', 'valence', 'tempo', 'time_signature', 'genres']]  # order here is important for xgboost later
y = new_df['ratings']
X = X.dropna()


X = pd.concat([X, X['genres'].str.join('|').str.get_dummies()], axis=1)

X.drop(['genres'], axis=1, inplace=True)
for i in X.dtypes:
    print(i)



X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=10)


# %%
from sklearn.ensemble import RandomForestClassifier
forestModel = RandomForestClassifier(n_estimators = 800, random_state=25)
parameters = {'min_samples_leaf': [1, 3, 5, 8], 
                      'max_depth': [3, 4, 5, 8, 12, 16, 20], 
                     }
forestModelGrid = GridSearchCV(forestModel, parameters, n_jobs=-1, cv=StratifiedKFold(2), verbose=1, scoring='roc_auc')
forestModelGrid.fit(X_train, y_train)


# %%
print(classification_report(y_test, rfe_gcv.predict(X_test)))


