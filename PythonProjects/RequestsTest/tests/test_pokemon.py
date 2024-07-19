import requests
import pytest

URL = 'https://api.pokemonbattle.ru/v2'
TOKEN = '0c0e454b05985902a9511a54e2c54a2b'
HEADER = {'Content-Type':'application/json', 'trainer_token' : TOKEN}
TRAINER_ID = '4307'

def test_ststus_code ():
    response = requests.get (url = f'{URL}/trainers', params = {'trainer_id' : TRAINER_ID})
    assert response.status_code == 200

def test_part_of_response ():
    response_get = requests.get (url = f'{URL}/trainers', params = {'trainer_id' : TRAINER_ID})
    assert response_get.json() ["data"] [0] ["trainer_name"] == 'Ольга'

@pytest.mark.parametrize('key, value', [('trainer_name', 'Ольга'), ('id', TRAINER_ID), ('city', 'Ижевск')])

def test_parametrize(key, value):
    response_parametrize = requests.get (url = f'{URL}/trainers', params = {'trainer_id' : TRAINER_ID})
    assert response_parametrize.json() ["data"] [0] [key] == value