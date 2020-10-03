# pro slova najde a uloží obrázky
import os, json, requests, time
import urllib.request
from urllib.parse import urlencode

url_data = dict(
	client_id='S_fw-J1RWDP0PHHoxxt6TFDLbnWqJ5AH_YPMwBeAbpg',
	per_page=3,
	content_filter='high',
	orientation='landscape',
)

baseUrl = f'https://api.unsplash.com/search/photos?{urlencode((url_data))}&query='

json_path = 'C:\\Users\\suche\\Documents\\GitHub\\suche.cz-minima\\assets\\data\\puzzle-word'
img_path = 'C:\\Users\\suche\\Documents\\GitHub\\suche.cz-minima\\assets\\img\\puzzle-word'

start_words = {
	'animals': None,
	'clothes': None,
	'body': None,
	'buildings': None,
	"sport": None,
}


def load():
	json_files = os.listdir(json_path)

	for json_file in json_files:
		folder_name = json_file.split('.')[0]

		save_to = os.path.join(img_path, folder_name)
		os.makedirs(save_to, exist_ok=True)

		with open(os.path.join(json_path, json_file), encoding='UTF-8') as f:
			data = json.load(f)
			start = False
			for item in data:

				if folder_name not in start_words or item['en'] == start_words[folder_name]:
					start = True

				if start:
					time.sleep(3)
					url = baseUrl + item['en'] + '%20' + folder_name
					print('request', url)
					req = requests.get(url)
					print(req.status_code)
					if req.status_code == 200:
						req_data = json.loads(req.text)
						for index, item2 in enumerate(req_data['results']):
							small_img_url = item2['urls']['small']
							urllib.request.urlretrieve(small_img_url, os.path.join(save_to, item['en'] + f'-{index}.jpg'))


if __name__ == '__main__':
	load()
